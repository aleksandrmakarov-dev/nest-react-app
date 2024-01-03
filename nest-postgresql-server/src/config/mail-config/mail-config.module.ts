import { Module } from "@nestjs/common";
import { MailConfigService } from "./mail-config.service";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfigModule],
  providers: [MailConfigService],
  exports: [MailConfigService],
})
export class MailConfigModule {}
