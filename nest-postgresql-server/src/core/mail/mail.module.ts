import { Module } from "@nestjs/common";
import { MailService } from "./mail.service";
import { MailConfigModule } from "src/config/mail-config/mail-config.module";
import { TemplateModule } from "../template/template.module";

@Module({
  imports: [TemplateModule],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
