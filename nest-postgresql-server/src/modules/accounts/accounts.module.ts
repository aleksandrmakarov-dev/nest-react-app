import { Module } from "@nestjs/common";
import { AccountsService } from "./accounts.service";
import { CoreModule } from "src/core/core.module";

@Module({
  imports: [CoreModule],
  providers: [AccountsService],
  exports: [AccountsService],
})
export class AccountsModule {}
