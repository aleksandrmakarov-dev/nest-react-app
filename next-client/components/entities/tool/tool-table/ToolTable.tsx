import { DataTable } from "@/components/shared";
import { Button } from "@/components/shared/ui/button";
import { ToolResponseDto } from "@/lib/dto/tool/tool-response.dto";
import { Pagination } from "@/lib/dto/shared/paged-response.dto";
import { formatDate } from "@/lib/utils";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ColumnDef } from "@tanstack/react-table";
import { CurrentToolDialog, DeleteToolDialog } from "@/components/widgets/tool";

interface ToolTableProps {
  tools?: ToolResponseDto[];
  pagination?: Pagination;
  isLoading?: boolean;
}

const columns: ColumnDef<ToolResponseDto>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
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
        <CurrentToolDialog
          id={row.original.id}
          trigger={
            <Button size="icon" variant="outline">
              <FontAwesomeIcon icon={faEdit} />
            </Button>
          }
        />
        <DeleteToolDialog
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

export function ToolTable(props: ToolTableProps) {
  const { tools, pagination, isLoading } = props;

  return (
    <DataTable
      columns={columns}
      data={tools}
      isLoading={isLoading}
      pagination={pagination}
    />
  );
}
