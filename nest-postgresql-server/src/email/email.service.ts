import { Injectable, OnModuleInit } from "@nestjs/common";
import { SendEmailDto } from "./dto/send-email.dto";
import { Resend } from "resend";
import { ConfigService } from "@nestjs/config";
import { error } from "console";

@Injectable()
export class EmailService {
  private readonly client: Resend;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.getOrThrow<string>("RESEND_API_KEY");

    this.client = new Resend(apiKey);
  }

  async send(values: SendEmailDto) {
    const response = await this.client.emails.send({
      from: values.from,
      to: values.to,
      subject: values.subject,
      text: values.text,
    });

    if (response.error) {
      console.log(`${response.error.name}: ${response.error.message}`);

      return false;
    }

    console.log(`Email: ${values.text}`);

    return true;
  }
}
