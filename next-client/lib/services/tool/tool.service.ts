import { EditToolDto } from "@/lib/dto/tool/edit-tool.dto";
import baseService from "../base.service";
import { ToolResponseDto } from "@/lib/dto/tool/tool-response.dto";

const toolService = baseService<EditToolDto, ToolResponseDto>("/tools");

export default toolService;
