import { Module } from "@nestjs/common";
import { GoogleStorageConfigModule } from "src/config/google-storage-config/google-storage-config.module";
import { GoogleStorageService } from "./google-storage.service";

@Module({
  imports: [GoogleStorageConfigModule],
  providers: [GoogleStorageService],
  exports: [GoogleStorageService],
})
export class GoogleStorageModule {}
