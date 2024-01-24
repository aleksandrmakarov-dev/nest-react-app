import { Storage } from "@google-cloud/storage";
import { v4 as uuid } from "uuid";
import { Injectable } from "@nestjs/common";
import { GoogleStorageConfigService } from "src/config/google-storage-config/google-storage-config.service";

@Injectable()
export class GoogleStorageService {
  private storage: Storage;

  constructor(
    private readonly googleStorageConfigService: GoogleStorageConfigService,
  ) {
    // this.storage = new Storage({
    //   keyFilename: googleStorageConfigService.keyFilename(),
    // });
  }

  async upload(file: Express.Multer.File) {
    const bucket = this.storage.bucket(
      this.googleStorageConfigService.bucketName(),
    );

    const name = `${uuid()}.${file.mimetype.split("/")[1]}`;
    await bucket.file(name).save(file.buffer, {
      public: true,
    });

    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${name}`;
    return publicUrl;
  }
}
