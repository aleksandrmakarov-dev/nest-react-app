import { ApiProperty } from "@nestjs/swagger";

export class Pagination {
  @ApiProperty()
  page: number;

  @ApiProperty()
  size: number;

  @ApiProperty()
  total: number;

  @ApiProperty()
  totalPages: number;

  constructor(page: number, size: number, total: number, totalPages: number) {
    this.page = page;
    this.size = size;
    this.total = total;
    this.totalPages = totalPages;
  }
}

export class PagedResponseDto<T> {
  items: T[];
  pagination: Pagination;

  constructor(items: T[], pagination: Pagination) {
    this.items = items;
    this.pagination = pagination;
  }
}
