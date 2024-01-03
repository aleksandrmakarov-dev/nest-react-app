import { Injectable } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Injectable()
export class JwtConfigService {
  constructor(private readonly configService: ConfigService) {}

  jwtSecretKey(): string {
    return this.configService.getOrThrow<string>("JWT_SECRET_KEY");
  }
}
