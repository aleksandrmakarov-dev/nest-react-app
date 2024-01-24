import { Injectable } from "@nestjs/common";
import * as crypto from "crypto";

@Injectable()
export class CryptoService {
  hex(length: number) {
    return crypto.randomBytes(length).toString("hex");
  }
}
