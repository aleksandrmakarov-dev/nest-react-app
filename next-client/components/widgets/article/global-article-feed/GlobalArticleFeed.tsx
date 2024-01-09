"use client";
import {
  ArticleCard,
  useArticles,
  useInfinityArticles,
} from "@/components/entities/article";
import { Button } from "@/components/shared/ui/button";

export function GlobalArticleFeed() {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    isError,
    error,
    fetchNextPage,
  } = useInfinityArticles();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-10">
      {data?.pages.map((page) => {
        return (
          <>
            <p className="col-span-2">{JSON.stringify(page.pagination)}</p>
            {page.items.map((item) => (
              <ArticleCard key={item.id} article={item} />
            ))}
          </>
        );
      })}
      <div className="col-span-2 text-center">
        <Button
          disabled={!hasNextPage || isFetchingNextPage}
          className="max-w-md w-full"
          onClick={() => fetchNextPage()}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load more"
            : "Nothing to load"}
        </Button>
      </div>
    </div>
  );
}
