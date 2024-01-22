import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { SignUpDto } from "./dto/sign-up.dto";
import { Role, User } from "@prisma/client";
import { MailService } from "src/core/mail/mail.service";
import moment from "moment";
import { isExpired } from "src/common/utils/date.utils";
import { VerifyEmailDto } from "./dto/verify-email.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { AccountsService } from "../accounts/accounts.service";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { UserDataDto } from "./dto/user-data.dto";
import { BcryptService } from "src/core/bcrypt/bcrypt.service";
import { JwtService } from "@nestjs/jwt";
import { UserAndTokenDto } from "./dto/user-and-token.dto";
import { CryptoService } from "src/core/crypto/crypto.service";
import { JwtPayloadDto } from "./dto/jwt-payload.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
    private readonly accountService: AccountsService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
    private readonly cryptoService: CryptoService,
  ) {}

  async signUp(dto: SignUpDto) {
    const foundUser = await this.usersService.findByEmail(dto.email);
    if (foundUser) {
      throw new BadRequestException("Email is already registered");
    }

    const token = await this.getEmailVerificationToken(dto.email);

    await this.usersService.create({
      role: Role.USER,
      emailVerificationToken: token,
      emailVerificationTokenExpiresAt: moment().add(1, "day").toDate(),
      ...dto,
    });

    const origin = "http://localhost:3000";
    const url = `${origin}/verify-email?token=${token}`;

    await this.mailService.sendEmail({
      subject: "Complete registration - Verify email",
      to: dto.email,
      template: "./verify-email",
      context: {
        name: dto.name,
        url: url,
        token: token,
      },
    });
  }

  async verifyEmail(dto: VerifyEmailDto) {
    const { token } = dto;
    const { sub } = await this.jwtService.verifyAsync<{
      sub: string;
    }>(token);

    const foundUser = await this.usersService.findByEmailVerificationToken({
      email: sub,
      token: token,
    });

    if (!foundUser) {
      throw new UnauthorizedException("Invalid email verification token");
    }

    const isTokenExpired = isExpired(foundUser.emailVerificationTokenExpiresAt);

    if (isTokenExpired) {
      throw new UnauthorizedException("Email verification token expired");
    }

    await this.usersService.updateById(foundUser.id, {
      emailVerificationToken: null,
      emailVerificationTokenExpiresAt: null,
      emailVerifiedAt: moment().toDate(),
    });
  }

  async signIn(dto: SignInDto): Promise<UserAndTokenDto> {
    const foundUser = await this.usersService.findByEmail(dto.email);

    if (!foundUser) {
      throw new NotFoundException(
        "User not found or invalid email or password",
      );
    }

    const match = await this.bcryptService.compare(
      dto.password,
      foundUser.passwordHash,
    );

    if (!match) {
      throw new UnauthorizedException("Invalid email or password");
    }

    if (!foundUser.emailVerifiedAt) {
      throw new UnauthorizedException("Email not verified");
    }

    const { accessToken, refreshToken } = await this.getTokens(foundUser);

    await this.accountService.create({
      refreshToken: refreshToken,
      expiresAt: moment().add(7, "days").toDate(),
      type: "LOCAL",
      userId: foundUser.id,
    });

    const userData: UserDataDto = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      image: foundUser.image,
      role: foundUser.role,
      accessToken: accessToken,
    };

    return {
      refreshToken: refreshToken,
      userData: userData,
    };
  }

  async refreshToken(dto: RefreshTokenDto): Promise<UserAndTokenDto> {
    if (!dto.token) {
      throw new UnauthorizedException("Token not found");
    }

    const foundAccount = await this.accountService.findByRefreshToken(
      dto.token,
    );

    if (!foundAccount) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    const isActive =
      !isExpired(foundAccount.expiresAt) && !foundAccount.revokedAt;

    if (!isActive) {
      throw new UnauthorizedException("Token is expired or revoked");
    }

    const foundUser = await this.usersService.findById(foundAccount.userID);

    if (!foundUser) {
      throw new UnauthorizedException(
        "There is not user associated with account",
      );
    }

    const { accessToken, refreshToken } = await this.getTokens(foundUser);

    // await this.accountService.rotateRefreshToken(foundAccount.id, {
    //   refreshToken: refreshToken,
    //   expiresAt: moment().add(7, "days").toDate(),
    // });

    const userData: UserDataDto = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      image: foundUser.image,
      role: foundUser.role,
      accessToken: accessToken,
    };

    return {
      //refreshToken: refreshToken,
      userData: userData,
      refreshToken: dto.token,
    };
  }

  private async getTokens(user: User) {
    const rt = this.cryptoService.hex(256);

    const payload: JwtPayloadDto = {
      id: user.id,
      role: user.role,
    };

    const at = await this.jwtService.signAsync(payload, {
      expiresIn: "24h",
    });

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }

  private async getEmailVerificationToken(email: string) {
    return await this.jwtService.signAsync(
      { sub: email },
      {
        expiresIn: "1d",
      },
    );
  }
}
