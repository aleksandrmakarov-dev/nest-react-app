import { Module } from "@nestjs/common";
import { ToolsService } from "./tools.service";
import { ToolsController } from "./tools.controller";
import { CoreModule } from "src/core/core.module";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [CoreModule, UsersModule],
  controllers: [ToolsController],
  providers: [ToolsService],
})
export class ToolsModule {}
