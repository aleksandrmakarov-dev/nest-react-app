import { Module } from "@nestjs/common";
import { FilesService } from "./files.service";
import { FilesController } from "./files.controller";
import { GoogleStorageModule } from "src/core/google-storage/google-storage.module";

@Module({
  imports: [GoogleStorageModule],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
