"use client";
import {
  ArticleCard,
  useInfinityArticles,
} from "@/components/entities/article";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useRef } from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

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

  const intObserverRef = useRef<IntersectionObserver | null>(null);
  const lastArticleRef = useCallback(
    (article: HTMLDivElement) => {
      if (isFetchingNextPage) return;
      if (intObserverRef.current) intObserverRef.current.disconnect();

      intObserverRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (article) intObserverRef.current.observe(article);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-10">
      {data?.pages.map((page, i) => {
        return (
          <>
            {page.items.map((item, j) => {
              const isLast =
                data?.pages.length === i + 1 && page.items.length === j + 1;
              return (
                <ArticleCard
                  ref={isLast ? lastArticleRef : undefined}
                  key={item.id}
                  article={item}
                />
              );
            })}
          </>
        );
      })}
      {isFetchingNextPage && (
        <p className="text-center col-span-2">
          <FontAwesomeIcon
            className="text-muted-foreground"
            icon={faSpinner}
            spinPulse
            size="2xl"
          />
        </p>
      )}
    </div>
  );
}
