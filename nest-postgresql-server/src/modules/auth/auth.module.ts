import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { CoreModule } from "src/core/core.module";
import { ProvidersModule } from "./providers/providers.module";
import { RouterModule } from "@nestjs/core";
import { UsersModule } from "../users/users.module";
import { AccountsModule } from "../accounts/accounts.module";

@Module({
  imports: [
    CoreModule,
    RouterModule.register([
      {
        path: "auth",
        module: ProvidersModule,
      },
    ]),
    ProvidersModule,
    UsersModule,
    AccountsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
