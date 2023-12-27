import * as crypto from "crypto";
import * as moment from "moment";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { SignUpLocalDto } from "./dto/sign-up-local.dto";
import { DatabaseService } from "src/database/database.service";
import { Account, Profile, Role, User } from "@prisma/client";
import { SignInLocalDto } from "./dto/sign-in-local.dto";
import { EmailService } from "src/email/email.service";
import { VerifyEmailDto } from "./dto/verify-email.dto";
import { SendVerificationEmailDto } from "./dto/send-verification-email.dto";
import { AccountResponseDto } from "./dto/account-response.dto";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  private readonly verificationEmailExpireTime: moment.DurationInputArg1 = 5;
  private readonly verificationEmailExpireUnits: moment.DurationInputArg2 =
    "minutes";

  private readonly refreshTokenExpireTime: moment.DurationInputArg1 = 7;
  private readonly refreshTokenExpireUnits: moment.DurationInputArg2 = "days";

  private readonly accessTokenExpireTime: moment.DurationInputArg1 = 10;
  private readonly accessTokenExpireUnits: moment.DurationInputArg2 = "minutes";

  constructor(
    private readonly databaseService: DatabaseService,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
  ) {}

  // Public methods

  // Sign Up with Email and Password
  async signUpLocal(values: SignUpLocalDto): Promise<void> {
    const foundUser = await this.findUserByEmail(values.email);

    if (foundUser) {
      throw new ConflictException(
        `User with email ${values.email} is already registered`,
      );
    }

    const passwordHash = await this.hash(values.password);

    const emailVerificationToken = await this.generateEmailVerificationToken();
    const emailVerificationTokenExpritesAt = moment()
      .add(this.verificationEmailExpireTime, this.verificationEmailExpireUnits)
      .toDate();

    const createdUser = await this.databaseService.user.create({
      data: {
        email: values.email,
        passwordHash: passwordHash,
        role: Role.USER,
        emailVerificationToken: emailVerificationToken,
        emailVerificationTokenExpiresAt: emailVerificationTokenExpritesAt,
      },
    });

    if (!createdUser) {
      throw new InternalServerErrorException("Failed to create user");
    }

    const createdProfile = await this.databaseService.profile.create({
      data: {
        name: values.name,
        userID: createdUser.id,
      },
    });

    if (!createdProfile) {
      throw new InternalServerErrorException("Failed to create user profile");
    }

    const isEmailSent = await this.sendVerificationLetterToUser(
      createdUser,
      "https://localhost:3000",
    );

    if (!isEmailSent) {
      throw new InternalServerErrorException(
        "Failed to send verification letter to email address",
      );
    }
  }

  // Sign In with Email and Password
  async signInLocal(
    values: SignInLocalDto,
    ipAddress?: string,
  ): Promise<{ account: AccountResponseDto; refreshToken: string }> {
    // find user with received email
    const foundUser = await this.findUserByEmail(values.email);

    if (!foundUser) {
      throw new NotFoundException(`User with email ${values.email} not found`);
    }

    // check if given and hashed passwords match
    const match = await this.compare(values.password, foundUser.passwordHash);

    if (!match) {
      throw new UnauthorizedException(`Invalid email or password`);
    }

    // check if email is verified
    const isEmailVerifired = foundUser.emailVerifiedAt !== undefined;

    if (!isEmailVerifired) {
      throw new UnauthorizedException(
        "You should verify your email before signing in",
      );
    }

    // create account of type local, without external provider

    const refreshToken = await this.generateRefreshToken();
    const refreshTokenExpiresAt = moment()
      .add(this.refreshTokenExpireTime, this.refreshTokenExpireUnits)
      .toDate();

    const createdAccount = await this.databaseService.account.create({
      data: {
        type: "LOCAL",
        refreshToken: refreshToken,
        expiresAt: refreshTokenExpiresAt,
        createByIp: ipAddress,
        userID: foundUser.id,
      },
    });

    if (!createdAccount) {
      throw new InternalServerErrorException("Failed to create account");
    }

    // Find profile of account
    const foundProfile = await this.findProfileByUserId(foundUser.id);

    if (!foundProfile) {
      throw new NotFoundException("User profile not found");
    }

    // Generate access token, store user id and role

    const accessToken = await this.generateAccessToken(foundUser);

    // Create response
    const accountResponse: AccountResponseDto = {
      email: foundUser.email,
      name: foundProfile.name,
      image: foundProfile.image,
      accessToken: accessToken,
    };

    return {
      account: accountResponse,
      refreshToken: refreshToken,
    };
  }

  // Verify email with token
  async verifyEmail(values: VerifyEmailDto) {
    const foundUser = await this.findUserByEmailVerificationToken(values.token);

    if (!foundUser) {
      throw new NotFoundException("Invalid email verification token");
    }

    // Return true if email is already verified
    if (foundUser.emailVerifiedAt) {
      return;
    }

    const isTokenExpired = moment().isAfter(
      foundUser.emailVerificationTokenExpiresAt,
    );

    if (isTokenExpired) {
      throw new UnauthorizedException(
        "Token is expired, try to send new verification letter",
      );
    }

    await this.databaseService.user.update({
      where: {
        id: foundUser.id,
      },
      data: {
        emailVerifiedAt: moment().toDate(),
      },
    });
  }

  // Send verification email to already registered user
  async sendVerificationEmail(values: SendVerificationEmailDto) {
    const foundUser = await this.findUserByEmail(values.email);

    if (!foundUser) {
      throw new NotFoundException(`User with email ${values.email} not found`);
    }

    const isEmailAlreadyVerified = foundUser.emailVerifiedAt !== undefined;

    if (isEmailAlreadyVerified) {
      throw new BadRequestException("Email is already verified");
    }

    const newEmailVerificationToken =
      await this.generateEmailVerificationToken();
    const newEmailVerificationTokenExpiresAt = moment()
      .add(this.verificationEmailExpireTime, this.verificationEmailExpireUnits)
      .toDate();

    const updatedUser = await this.databaseService.user.update({
      where: {
        id: foundUser.id,
      },
      data: {
        emailVerificationToken: newEmailVerificationToken,
        emailVerificationTokenExpiresAt: newEmailVerificationTokenExpiresAt,
      },
    });

    const isEmailSent = await this.sendVerificationLetterToUser(
      updatedUser,
      "https://localhost:3000",
    );
    if (!isEmailSent) {
      throw new InternalServerErrorException(
        "Failed to send verification letter to email address",
      );
    }
  }

  // Refresh access token with refresh token in cookie
  async refreshToken(refreshToken: string): Promise<AccountResponseDto> {
    const foundAccount = await this.findAccountByRefreshToken(refreshToken);

    if (!foundAccount) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    const isRefreshTokenExpired = moment().isAfter(foundAccount.expiresAt);

    if (isRefreshTokenExpired) {
      throw new UnauthorizedException("Refresh token expired");
    }

    const foundUser = await this.databaseService.user.findUnique({
      where: {
        id: foundAccount.userID,
      },
      include: {
        profile: true,
      },
    });

    if (!foundUser) {
      throw new NotFoundException("User not found");
    }

    const newAccessToken = await this.generateAccessToken(foundUser);

    const profile = foundUser.profile;

    const response: AccountResponseDto = {
      name: profile.name,
      email: foundUser.email,
      image: profile.image,
      accessToken: newAccessToken,
    };

    return response;
  }

  // Private methods

  // Helper methods

  // Hash string value with bcrypt salt = 16
  private async hash(value: string): Promise<string> {
    const passwordHash = await bcrypt.hash(value, 16);
    return passwordHash;
  }

  // Compare string value and hash value with bcrypt
  private async compare(value: string, hash: string): Promise<boolean> {
    const match = await bcrypt.compare(value, hash);
    return match;
  }

  // Generate hex string of length n with crypto
  private hexString(length: number) {
    return crypto.randomBytes(length).toString("hex");
  }

  // Find methods

  // Find user by emails
  private async findUserByEmail(email: string): Promise<User | null> {
    return await this.databaseService.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  // Find user by email verification token
  private async findUserByEmailVerificationToken(
    token: string,
  ): Promise<User | null> {
    return await this.databaseService.user.findFirst({
      where: {
        emailVerificationToken: token,
      },
    });
  }

  // Find account by refresh token
  private async findAccountByRefreshToken(
    token: string,
  ): Promise<Account | null> {
    return await this.databaseService.account.findFirst({
      where: {
        refreshToken: token,
      },
    });
  }

  // Find profile by user id
  private async findProfileByUserId(userId: string): Promise<Profile | null> {
    return await this.databaseService.profile.findUnique({
      where: {
        userID: userId,
      },
    });
  }

  // Generate email verification token of length 64
  private async generateEmailVerificationToken(): Promise<string> {
    const verificationToken = this.hexString(64);
    const foundUser =
      await this.findUserByEmailVerificationToken(verificationToken);

    if (foundUser) {
      return this.generateEmailVerificationToken();
    }

    return verificationToken;
  }

  // Generate refresh token
  private async generateRefreshToken(): Promise<string> {
    const refreshToken = this.hexString(64);

    const foundUser = await this.findAccountByRefreshToken(refreshToken);

    if (foundUser) {
      return this.generateRefreshToken();
    }

    return refreshToken;
  }

  // Generate access token
  private generateAccessToken(user: User) {
    const userId = user.id;
    const userRole = user.role;

    const accessTokenSecretKey = this.configService.getOrThrow<string>(
      "ACCESS_TOKEN_SECRET_KEY",
    );

    const expiresIn = moment()
      .add(this.accessTokenExpireTime, this.accessTokenExpireUnits)
      .unix();

    const token = jwt.sign(
      { id: userId, role: userRole, exp: expiresIn },
      accessTokenSecretKey,
    );

    return token;
  }

  // Emails

  // Send verification email to user to complete registration
  private async sendVerificationLetterToUser(
    user: User,
    origin?: string,
  ): Promise<boolean> {
    let text = "";

    const emailVerificationToken = user.emailVerificationToken;

    if (origin) {
      const verifyUrl = `${origin}/account/verify-email?token=${emailVerificationToken}`;
      text = `<p>Please click the below link to verify your email address:</p>
                            <p><a href=""${verifyUrl}"">Link to verify email address</a></p>
                            <p>This link will expire in ${this.verificationEmailExpireTime} ${this.verificationEmailExpireUnits}</p>
                            <p>If you didn't request it, just ignore this message</p>`;
    } else {
      text = `<p>Please use the below token to verify your email address with the <code>/accounts/verify-email</code> api route:</p>
                            <p><code>${emailVerificationToken}</code></p>
                            <p>This token will expire in ${this.verificationEmailExpireTime} ${this.verificationEmailExpireUnits}</p>
                            <p>If you didn't request it, just ignore this message</p>`;
    }

    return await this.emailService.send({
      from: "noreply@aleksandrmakarov.com",
      to: user.email,
      subject: "Complete registration - Verify email",
      text: text,
    });
  }
}
