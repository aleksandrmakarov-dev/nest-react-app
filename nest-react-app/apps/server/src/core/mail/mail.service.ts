import { Injectable } from "@nestjs/common";
import { Resend } from "resend";
import { MailConfigService } from "src/config/mail-config/mail-config.service";
import { EmailOptionsDto } from "./dto/email-options.dto";
import { EmailException } from "src/common/exceptions/email.exception";
import { TemplateService } from "../template/template.service";

@Injectable()
export class MailService {
  private readonly client: Resend;

  constructor(
    private readonly mailConfigService: MailConfigService,
    private readonly templateService: TemplateService,
  ) {
    this.client = new Resend(this.mailConfigService.apiKey());
  }

  async sendEmail(values: EmailOptionsDto) {
    const path = this.mailConfigService.template(values.template);
    const source = await this.templateService.read(path);
    const html = this.templateService.compile(source, values.context);

    const response = await this.client.emails.send({
      from: this.mailConfigService.from(),
      to: values.to,
      subject: values.subject,
      html: html,
    });

    if (response.error) {
      throw new EmailException(response.error.message);
    }

    return response.data.id;
  }
}
