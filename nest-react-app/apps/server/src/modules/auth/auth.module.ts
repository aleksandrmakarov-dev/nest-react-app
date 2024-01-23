import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { CoreModule } from "src/core/core.module";
import { UsersModule } from "../users/users.module";
import { AccountsModule } from "../accounts/accounts.module";

@Module({
  imports: [CoreModule, UsersModule, AccountsModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
