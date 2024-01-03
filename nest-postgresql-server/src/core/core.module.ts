import { Module } from "@nestjs/common";
import { MailModule } from "./mail/mail.module";
import { DatabaseModule } from "./database/database.module";
import { TemplateModule } from "./template/template.module";
import { BcryptModule } from "./bcrypt/bcrypt.module";
import { JwtModule } from "@nestjs/jwt";
import { JwtConfigModule } from "src/config/jwt-config/jwt-config.module";
import { JwtConfigService } from "src/config/jwt-config/jwt-config.service";
import { CryptoModule } from "./crypto/crypto.module";

@Module({
  imports: [
    MailModule,
    DatabaseModule,
    TemplateModule,
    BcryptModule,
    JwtModule.registerAsync({
      imports: [JwtConfigModule],
      useFactory: (jwtConfigService: JwtConfigService) => ({
        secret: jwtConfigService.jwtSecretKey(),
      }),
      inject: [JwtConfigService],
    }),
    CryptoModule,
  ],
  exports: [
    MailModule,
    DatabaseModule,
    TemplateModule,
    BcryptModule,
    JwtModule,
    CryptoModule,
  ],
})
export class CoreModule {}
