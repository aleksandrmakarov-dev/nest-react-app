"use client";
import { Pagination as PaginationDto } from "@/lib/dto/shared/paged-response.dto";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";

interface DataTablePaginationProps {
  pagination: PaginationDto;
}

export function DataTablePagination(props: DataTablePaginationProps) {
  const {
    pagination: { page, size, total, totalPages },
  } = props;

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const hasPrevPage = page > 1;
  const hasNextPage = page < totalPages;

  const getUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <Pagination className="p-2">
      <PaginationContent className="flex justify-between w-full">
        <PaginationItem>
          <PaginationPrevious
            href={hasPrevPage ? getUrl(page - 1) : undefined}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href={hasNextPage ? getUrl(page + 1) : undefined} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
