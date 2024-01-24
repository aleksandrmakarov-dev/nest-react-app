import { Module } from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { ProjectsController } from "./projects.controller";
import { CoreModule } from "src/core/core.module";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [CoreModule, UsersModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
