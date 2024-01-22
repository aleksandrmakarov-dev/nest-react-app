import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as path from "path";

@Injectable()
export class GoogleStorageConfigService {
  constructor(private readonly configService: ConfigService) {}

  bucketName() {
    return this.configService.get<string>("BUCKET_NAME");
  }

  keyFilename() {
    return path.join(
      process.cwd(),
      this.configService.get<string>("KEY_FILENAME"),
    );
  }
}
