"use client";

import { ProjectCard, useProjects } from "@/components/entities/project";

export function FeaturedProjectList() {
  const { data, isLoading, isError, error } = useProjects({
    size: 3,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error.response?.data.message ?? "error"}</p>;
  }

  return (
    <div className="flex flex-col gap-10 lg:gap-20">
      {data?.items.map((item, i) => (
        <ProjectCard key={item.id} project={item} rtl={i % 2 === 0} />
      ))}
    </div>
  );
}
