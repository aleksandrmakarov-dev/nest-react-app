import { prefetchArticles } from "@/components/entities/article";
import { DashboardHeader } from "@/components/shared";
import { Button } from "@/components/shared/ui/button";
import { DashboardArticleTable } from "@/components/widgets/article";
import { routes } from "@/lib/routing";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import Link from "next/link";

interface ArticlesPageContext {
  searchParams: {
    page?: number;
  };
}

export default async function ArticlesPage(context: ArticlesPageContext) {
  const { searchParams } = context;
  const queryClient = await prefetchArticles({
    page: searchParams.page,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardHeader
        title="Articles"
        subtitle="View and manage your articles"
        action={
          <Button asChild>
            <Link href={routes.dashboard.articles.new()}>New</Link>
          </Button>
        }
      />
      <DashboardArticleTable page={searchParams.page} />
    </HydrationBoundary>
  );
}
