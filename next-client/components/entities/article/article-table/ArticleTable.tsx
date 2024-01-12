import { DataTable } from "@/components/shared";
import { ArticleResponseDto } from "@/lib/dto/article/article-response.dto";
import { ColumnDef } from "@tanstack/react-table";
import { ArticleAuthor } from "..";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { routes } from "@/lib/routing";
import { Pagination } from "@/lib/dto/shared/paged-response.dto";

interface ArticleTableProps {
  articles?: ArticleResponseDto[];
  pagination?: Pagination;
  isLoading?: boolean;
}

const columns: ColumnDef<ArticleResponseDto>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      return <p>{formatDate(row.original.createdAt)}</p>;
    },
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => {
      return <ArticleAuthor size="xs" user={row.original.user} />;
    },
  },
  {
    id: "view",
    cell: ({ row }) => {
      return (
        <Link
          className="font-medium text-primary"
          href={routes.dashboard.articles.edit(row.original.id)}
        >
          View
        </Link>
      );
    },
  },
];

export function ArticleTable(props: ArticleTableProps) {
  const { articles, pagination, isLoading } = props;

  return (
    <DataTable
      columns={columns}
      data={articles}
      pagination={pagination}
      isLoading={isLoading}
    />
  );
}
