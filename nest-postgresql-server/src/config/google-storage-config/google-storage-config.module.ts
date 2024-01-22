import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GoogleStorageConfigService } from "./google-storage-config.service";

@Module({
  imports: [ConfigModule],
  providers: [GoogleStorageConfigService],
  exports: [GoogleStorageConfigService],
})
export class GoogleStorageConfigModule {}
