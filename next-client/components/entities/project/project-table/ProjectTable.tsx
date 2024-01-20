import { DataTable } from "@/components/shared";
import { Button } from "@/components/shared/ui/button";
import { ProjectResponseDto } from "@/lib/dto/project/project-response.dto";
import { Pagination } from "@/lib/dto/shared/paged-response.dto";
import { routes } from "@/lib/routing";
import { formatDate } from "@/lib/utils";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

interface ProjectTableProps {
  projects?: ProjectResponseDto[];
  pagination?: Pagination;
  isLoading?: boolean;
}

const columns: ColumnDef<ProjectResponseDto>[] = [
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
    id: "actions",
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1">
        <Button size="icon" variant="outline" asChild>
          <Link href={routes.dashboard.projects.byId(row.original.id)}>
            <FontAwesomeIcon icon={faEdit} />
          </Link>
        </Button>
        <Button size="icon" variant="outline">
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </div>
    ),
  },
];

export function ProjectTable(props: ProjectTableProps) {
  const { projects, pagination, isLoading } = props;

  return (
    <DataTable
      columns={columns}
      data={projects}
      isLoading={isLoading}
      pagination={pagination}
    />
  );
}
