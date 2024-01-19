import { prefetchProjects } from "@/components/entities/project";
import { DashboardHeader } from "@/components/shared";
import { Button } from "@/components/shared/ui/button";
import { DashboardProjectTable } from "@/components/widgets/project";
import { routes } from "@/lib/routing";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import Link from "next/link";

interface ProjectsPageContext {
  searchParams: {
    page?: number;
  };
}

export default async function ProjectsPage(context: ProjectsPageContext) {
  const { searchParams } = context;
  const queryClient = await prefetchProjects({
    page: searchParams.page,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardHeader
        title="Projects"
        subtitle="View and manage your projects"
        action={
          <Button asChild>
            <Link href={routes.dashboard.projects.new()}>New</Link>
          </Button>
        }
      />
      <DashboardProjectTable page={searchParams.page} />
    </HydrationBoundary>
  );
}
