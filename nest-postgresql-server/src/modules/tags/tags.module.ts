import { Module } from "@nestjs/common";
import { TagsService } from "./tags.service";
import { DatabaseModule } from "src/core/database/database.module";
import { CoreModule } from "src/core/core.module";
import { TagsController } from './tags.controller';

@Module({
  imports: [CoreModule],
  providers: [TagsService],
  controllers: [TagsController],
})
export class TagsModule {}
