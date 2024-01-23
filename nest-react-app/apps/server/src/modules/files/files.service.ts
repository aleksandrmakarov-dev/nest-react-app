import { Injectable } from "@nestjs/common";
import { GoogleStorageService } from "src/core/google-storage/google-storage.service";

@Injectable()
export class FilesService {
  constructor(private readonly googleStorageService: GoogleStorageService) {}

  async upload(file: Express.Multer.File) {
    return await this.googleStorageService.upload(file);
  }
}
