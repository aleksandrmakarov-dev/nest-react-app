import { ToolResponseDto } from "../tool/tool-response.dto";

export interface ProjectResponseDto {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  image?: string;
  url?: string;
  label?: string;
  articleId?: string;
  userId: string;
  featured: boolean;
  tools: ToolResponseDto[];
}
