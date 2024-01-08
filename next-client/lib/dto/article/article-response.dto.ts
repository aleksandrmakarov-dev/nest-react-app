import { TagResponseDto } from "../tag/tag-response.dto";
import { UserResponseDto } from "../user/user-response.dto";

export interface ArticleResponseDto {
  id: string;
  title: string;
  description: string;
  image?: string;
  createdAt: Date;
  user: UserResponseDto;
  tags: TagResponseDto[];
}
