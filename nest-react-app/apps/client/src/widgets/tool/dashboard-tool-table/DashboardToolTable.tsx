import { ToolTable, useTools } from "@/entities/tool";

interface DashboardToolTableProps {
  page?: number;
}

export function DashboardToolTable(props: DashboardToolTableProps) {
  const { page } = props;

  const { data, isLoading } = useTools({
    page: page,
  });

  return (
    <ToolTable
      tools={data?.items}
      pagination={data?.pagination}
      isLoading={isLoading}
    />
  );
}
