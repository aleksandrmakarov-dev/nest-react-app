import { ApiProperty } from "@nestjs/swagger";

export class Pagination {
  @ApiProperty()
  page: number;

  @ApiProperty()
  size: number;

  @ApiProperty()
  total: number;

  constructor(page: number, size: number, total: number) {
    this.page = page;
    this.size = size;
    this.total = total;
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
