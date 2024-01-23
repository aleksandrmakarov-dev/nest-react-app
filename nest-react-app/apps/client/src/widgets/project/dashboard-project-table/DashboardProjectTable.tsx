import { ProjectTable, useProjects } from "@/entities/project";

interface DashboardProjectTableProps {
  page?: number;
}

export function DashboardProjectTable(props: DashboardProjectTableProps) {
  const { page } = props;

  const { data, isLoading } = useProjects({
    page: page,
  });

  return (
    <ProjectTable
      projects={data?.items}
      pagination={data?.pagination}
      isLoading={isLoading}
    />
  );
}
