"use client";

import { TagTable, useTags } from "@/components/entities/tag";

interface DashboardTagTableProps {
  page?: number;
}

export function DashboardTagTable(props: DashboardTagTableProps) {
  const { page } = props;

  const { data, isLoading } = useTags();

  return <TagTable tags={data} isLoading={isLoading} />;
}
