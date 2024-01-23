import { DashboardHeader } from "@/shared";
import { Button } from "@/shared/ui/button";
import { DashboardProjectTable } from "@/widgets/project";
import { routes } from "@/lib/routing";
import { useSearchParams } from "react-router-dom";

export default function ProjectsPage() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : undefined;

  return (
    <>
      <DashboardHeader
        title="Projects"
        subtitle="View and manage your projects"
        action={
          <Button asChild>
            <a href={routes.dashboard.projects.new()}>New</a>
          </Button>
        }
      />
      <DashboardProjectTable page={page} />
    </>
  );
}
