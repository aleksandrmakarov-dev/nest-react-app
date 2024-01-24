import { Module } from "@nestjs/common";
import { MailService } from "./mail.service";
import { MailConfigModule } from "src/config/mail-config/mail-config.module";
import { TemplateModule } from "../template/template.module";

@Module({
  imports: [MailConfigModule, TemplateModule],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
