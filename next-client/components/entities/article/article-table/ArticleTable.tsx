import { DataTable } from "@/components/shared";
import { ArticleResponseDto } from "@/lib/dto/article/article-response.dto";
import { ColumnDef } from "@tanstack/react-table";
import { ArticleAuthor } from "..";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { routes } from "@/lib/routing";
import { Pagination } from "@/lib/dto/shared/paged-response.dto";
import { Button } from "@/components/shared/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { DeleteArticleDialog } from "@/components/widgets/article";

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
    id: "actions",
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1">
        <Button size="icon" variant="outline" asChild>
          <Link href={routes.dashboard.articles.byId(row.original.id)}>
            <FontAwesomeIcon icon={faEdit} />
          </Link>
        </Button>
        <DeleteArticleDialog
          id={row.original.id}
          trigger={
            <Button size="icon" variant="outline">
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          }
        />
      </div>
    ),
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
