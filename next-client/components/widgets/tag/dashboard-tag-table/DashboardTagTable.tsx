"use client";

import { TagTable, useTags } from "@/components/entities/tag";

interface DashboardTagTableProps {
  page?: number;
}

export function DashboardTagTable(props: DashboardTagTableProps) {
  const { page } = props;

  const { data, isLoading } = useTags({
    page: page,
  });

  return (
    <TagTable
      tags={data?.items}
      pagination={data?.pagination}
      isLoading={isLoading}
    />
  );
}
