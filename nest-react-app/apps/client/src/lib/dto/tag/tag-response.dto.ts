export interface TagResponseDto {
  id: string;
  name: string;
  userId: string;
}

export interface TagResponseWithCountDto extends TagResponseDto {
  _count: { articles: number };
}
