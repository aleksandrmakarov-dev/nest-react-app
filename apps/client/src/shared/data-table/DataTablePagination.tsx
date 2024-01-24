"use client";
import { Pagination as PaginationDto } from "@/lib/dto/shared/paged-response.dto";
import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { cn } from "@/lib/utils";
import { useLocation, useSearchParams } from "react-router-dom";

interface DataTablePaginationProps {
  pagination: PaginationDto;
}

export function DataTablePagination(props: DataTablePaginationProps) {
  const {
    pagination: { page, totalPages },
  } = props;

  const location = useLocation();
  const [searchParams] = useSearchParams();

  const hasPrevPage = page > 1;
  const hasNextPage = page < totalPages;

  const getUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `${location.pathname}?${params.toString()}`;
  };

  return (
    <Pagination className="p-2 min-h-12">
      <PaginationContent className="flex justify-between w-full">
        <PaginationPrevious
          className={cn({ hidden: !hasPrevPage })}
          href={hasPrevPage ? getUrl(page - 1) : undefined}
        />
        <PaginationNext
          className={cn({ hidden: !hasNextPage })}
          href={hasNextPage ? getUrl(page + 1) : undefined}
        />
      </PaginationContent>
    </Pagination>
  );
}
