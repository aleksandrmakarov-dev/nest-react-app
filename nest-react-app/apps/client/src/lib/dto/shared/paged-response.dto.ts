export interface Pagination {
  page: number;
  size: number;
  total: number;
  totalPages: number;
}

export interface PagedResponseDto<T> {
  items: T[];
  pagination: Pagination;
}
