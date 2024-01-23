import { EditProjectDto } from "@/lib/dto/project/edit-project.dto";
import { ProjectResponseDto } from "@/lib/dto/project/project-response.dto";
import baseService from "./base.service";

const articleService = baseService<EditProjectDto, ProjectResponseDto>(
  "/projects"
);

export default articleService;
