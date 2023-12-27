import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from "./auth/auth.module";
import { EmailModule } from './email/email.module';
@Module({
  imports: [UsersModule, DatabaseModule, AuthModule, EmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
