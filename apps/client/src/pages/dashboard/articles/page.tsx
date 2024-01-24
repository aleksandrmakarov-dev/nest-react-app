import { DashboardHeader } from "@/shared";
import { Button } from "@/shared/ui/button";
import { DashboardArticleTable } from "@/widgets/article";
import { routes } from "@/lib/routing";
import { useSearchParams } from "react-router-dom";

export default function ArticlesPage() {
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : null;

  return (
    <>
      <DashboardHeader
        title="Articles"
        subtitle="View and manage your articles"
        action={
          <Button asChild>
            <a href={routes.dashboard.articles.new()}>New</a>
          </Button>
        }
      />
      <DashboardArticleTable page={page} />
    </>
  );
}
