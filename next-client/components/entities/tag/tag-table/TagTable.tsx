import { DataTable } from "@/components/shared";
import { Button } from "@/components/shared/ui/button";
import { DeleteTagDialog, CurrentTagDialog } from "@/components/widgets/tag";
import { Pagination } from "@/lib/dto/shared/paged-response.dto";
import { TagResponseDto } from "@/lib/dto/tag/tag-response.dto";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ColumnDef } from "@tanstack/react-table";

interface TagTableProps {
  tags?: TagResponseDto[];
  pagination?: Pagination;
  isLoading?: boolean;
}

const columns: ColumnDef<TagResponseDto>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1">
        <CurrentTagDialog
          id={row.original.id}
          trigger={
            <Button size="icon" variant="outline">
              <FontAwesomeIcon icon={faEdit} />
            </Button>
          }
        />
        <DeleteTagDialog
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

export function TagTable(props: TagTableProps) {
  const { tags, pagination, isLoading } = props;

  return (
    <DataTable
      columns={columns}
      data={tags}
      isLoading={isLoading}
      pagination={pagination}
    />
  );
}
