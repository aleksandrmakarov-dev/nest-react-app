import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as path from "path";
import * as process from "process";

@Injectable()
export class MailConfigService {
  constructor(private readonly configService: ConfigService) {}

  apiKey(): string {
    return this.configService.getOrThrow<string>("EMAIL_API_KEY");
  }

  from(): string {
    return this.configService.getOrThrow<string>("EMAIL_FROM");
  }

  template(name: string): string {
    return path.join(process.cwd(), "src/core/mail/template", `${name}.hbs`);
  }
}
