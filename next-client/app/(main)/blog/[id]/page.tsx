import { prefetchArticleById } from "@/components/entities/article";
import { ArticleContent } from "@/components/widgets/article";
import { HydrationBoundary, dehydrate, hydrate } from "@tanstack/react-query";

interface ArticlePageContext {
  params: {
    id: string;
  };
}

export default async function ArticlePage(context: ArticlePageContext) {
  const client = await prefetchArticleById(context.params.id);

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <ArticleContent id={context.params.id} />
    </HydrationBoundary>
  );
}
