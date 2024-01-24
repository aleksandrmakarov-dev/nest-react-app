import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MailConfigModule } from "./config/mail-config/mail-config.module";
import { CoreModule } from "./core/core.module";
import { JwtConfigModule } from "./config/jwt-config/jwt-config.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { AccountsModule } from "./modules/accounts/accounts.module";
import { APP_FILTER, APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./modules/auth/guards/auth.guard";
import { TagsModule } from "./modules/tags/tags.module";
import { ArticlesModule } from "./modules/articles/articles.module";
import { AllExceptionFilter } from "./common/filters/all-exception.filter";
import { ProjectsModule } from "./modules/projects/projects.module";
import { ToolsModule } from "./modules/tools/tools.module";
import { FilesModule } from "./modules/files/files.module";
import { GoogleStorageConfigModule } from "./config/google-storage-config/google-storage-config.module";
import { GoogleStorageModule } from "./core/google-storage/google-storage.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "../../..", "client", "dist"),
    }),
    MailConfigModule,
    CoreModule,
    JwtConfigModule,
    AuthModule,
    UsersModule,
    AccountsModule,
    TagsModule,
    ArticlesModule,
    ProjectsModule,
    ToolsModule,
    FilesModule,
    GoogleStorageConfigModule,
    GoogleStorageModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
