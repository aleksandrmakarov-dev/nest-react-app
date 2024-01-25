"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Pagination } from "@/lib/dto/shared/paged-response.dto";
import { DataTablePagination } from "./DataTablePagination";
import { Skeleton } from "../ui/skeleton";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data?: TData[];
  pagination?: Pagination;
  isLoading?: boolean;
  fallback?: React.ReactNode;
}

export function DataTable<TData, TValue>(props: DataTableProps<TData, TValue>) {
  const { columns, data, pagination, isLoading, fallback } = props;

  const table = useReactTable({
    columns: columns,
    data: data ?? [],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="border border-border rounded-md">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((group) => (
            <TableRow key={group.id}>
              {group.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {!isLoading ? (
            <>
              {table.getRowModel().rows?.length
                ? table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : fallback}
            </>
          ) : (
            Array(10)
              .fill(0)
              .map((_, i) => (
                <TableRow key={i}>
                  <TableCell
                    colSpan={table.getHeaderGroups()?.[0].headers.length ?? 1}
                  >
                    <Skeleton className="w-full h-8" />
                  </TableCell>
                </TableRow>
              ))
          )}
        </TableBody>
      </Table>
      {pagination && <DataTablePagination pagination={pagination} />}
    </div>
  );
}
