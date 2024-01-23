import { Injectable } from "@nestjs/common";
import Handlebars from "handlebars";
import * as fs from "fs";

@Injectable()
export class TemplateService {
  compile(source: string, context: any): string {
    const template = Handlebars.compile(source);
    return template(context);
  }

  async read(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readFile(path, "utf-8", (err, data) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(data);
        }
      });
    });
  }
}
