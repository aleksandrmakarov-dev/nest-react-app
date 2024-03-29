import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiTags } from "@nestjs/swagger";
import { SignUpDto } from "./dto/sign-up.dto";
import { VerifyEmailDto } from "./dto/verify-email.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { Response } from "express";
import { TOKEN_COOKIE, TOKEN_COOKIE_OPTIONS } from "./auth.constants";
import { GenericResponseDto } from "src/common/dto/generic-response.dto";
import { Cookie } from "src/common/decorators/cookie.decorator";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-up")
  async signUp(@Body() dto: SignUpDto) {
    await this.authService.signUp(dto);

    const res: GenericResponseDto = {
      message: "Verify your email address to complete registration.",
    };

    return res;
  }

  @Post("sign-in")
  async signIn(
    @Body() dto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { refreshToken, userData } = await this.authService.signIn(dto);

    response.cookie(TOKEN_COOKIE, refreshToken, TOKEN_COOKIE_OPTIONS);

    return userData;
  }

  @Post("refresh-token")
  async refreshToken(
    @Cookie(TOKEN_COOKIE) token: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { userData } = await this.authService.refreshToken({
      token: token,
    });

    //response.cookie(TOKEN_COOKIE, refreshToken, TOKEN_COOKIE_OPTIONS);

    return userData;
  }

  @Delete("sign-out")
  @HttpCode(HttpStatus.NO_CONTENT)
  async signOut(@Res({ passthrough: true }) response: Response) {
    response.clearCookie(TOKEN_COOKIE, TOKEN_COOKIE_OPTIONS);
    response.cookie(TOKEN_COOKIE, "", { maxAge: 0 });
    return null;
  }

  @Post("verify-email")
  async verifyEmail(@Body() dto: VerifyEmailDto) {
    await this.authService.verifyEmail(dto);

    const res: GenericResponseDto = {
      message: "Email verified, registration completed.",
    };

    return res;
  }
}
