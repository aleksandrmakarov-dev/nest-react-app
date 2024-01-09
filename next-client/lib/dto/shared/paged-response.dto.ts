export interface Pagination {
  page: number;
  size: number;
  total: number;
}

export interface PagedResponseDto<T> {
  items: T[];
  pagination: Pagination;
}
