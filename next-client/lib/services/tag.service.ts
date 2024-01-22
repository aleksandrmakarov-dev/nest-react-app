import { EditTagDto } from "@/lib/dto/tag/edit-tag.dto";
import {
  TagResponseDto,
  TagResponseWithCountDto,
} from "@/lib/dto/tag/tag-response.dto";
import baseService from "./base.service";

const tagService = baseService<
  EditTagDto,
  TagResponseDto,
  TagResponseWithCountDto
>("/tags");

export default tagService;
