import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MailConfigModule } from "./config/mail-config/mail-config.module";
import { CoreModule } from "./core/core.module";
import { JwtConfigModule } from "./config/jwt-config/jwt-config.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { AccountsModule } from "./modules/accounts/accounts.module";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./modules/auth/guards/auth.guard";
import { TagsModule } from './modules/tags/tags.module';
@Module({
  imports: [
    MailConfigModule,
    CoreModule,
    JwtConfigModule,
    AuthModule,
    UsersModule,
    AccountsModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
