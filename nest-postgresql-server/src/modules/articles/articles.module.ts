import { Module } from "@nestjs/common";
import { ArticlesService } from "./articles.service";
import { ArticlesController } from "./articles.controller";
import { UsersModule } from "../users/users.module";
import { CoreModule } from "src/core/core.module";

@Module({
  imports: [CoreModule, UsersModule],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
