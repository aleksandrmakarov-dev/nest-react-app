"use client";
import {
  ArticleCard,
  ArticleCardSkeleton,
  useInfinityArticles,
} from "@/components/entities/article";
import { useCallback, useRef } from "react";
import React from "react";
import { GetArticlesParamsDto } from "@/lib/dto/article/get-articles-params.dto";

interface GlobalArticleFeedProps {
  params: GetArticlesParamsDto;
}

export function GlobalArticleFeed(props: GlobalArticleFeedProps) {
  const { params } = props;

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfinityArticles(params);

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

  return (
    <div className="grid grid-cols-2 gap-10">
      {isLoading
        ? Array(4)
            .fill(0)
            .map((_, i) => <ArticleCardSkeleton />)
        : data?.pages.map((page, i) => {
            return (
              <React.Fragment key={`page-${i}`}>
                {page.items.map((item, j) => {
                  const isLast =
                    data?.pages.length === i + 1 && page.items.length === j + 1;
                  return (
                    <ArticleCard
                      key={item.id}
                      ref={isLast ? lastArticleRef : undefined}
                      article={item}
                    />
                  );
                })}
              </React.Fragment>
            );
          })}
      {isFetchingNextPage &&
        Array(2)
          .fill(0)
          .map((_, i) => <ArticleCardSkeleton />)}
    </div>
  );
}
