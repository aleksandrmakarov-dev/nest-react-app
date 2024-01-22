import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as path from "path";

@Injectable()
export class GoogleStorageConfigService {
  constructor(private readonly configService: ConfigService) {}

  bucketName() {
    return this.configService.getOrThrow<string>("BUCKET_NAME");
  }

  projectId() {
    return this.configService.getOrThrow<string>("PROJECT_ID");
  }

  keyFilename() {
    return path.join(
      process.cwd(),
      this.configService.getOrThrow<string>("KEY_FILENAME"),
    );
  }
}
