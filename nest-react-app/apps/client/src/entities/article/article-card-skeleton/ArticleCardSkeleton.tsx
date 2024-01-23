import { Skeleton } from "@/shared/ui/skeleton";
import { ArticleAuthor, ArticleTags } from "..";

export function ArticleCardSkeleton() {
  return (
    <div>
      <ArticleAuthor className="mb-3" isLoading={true} />
      <Skeleton className="w-full h-64 relative mb-3" />
      <Skeleton className="w-full h-24 mb-3" />
      <ArticleTags isLoading={true} />
    </div>
  );
}
