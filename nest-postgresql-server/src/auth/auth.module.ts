import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { DatabaseModule } from "src/database/database.module";
import { EmailModule } from "src/email/email.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [DatabaseModule, EmailModule, ConfigModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
