"use client";

import {
  ArticleCard,
  ArticleCardSkeleton,
  useArticles,
} from "@/components/entities/article";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/shared/ui/carousel";

export function LatestArticleList() {
  const { data, isLoading, isError, error } = useArticles({
    size: 6,
  });

  if (isError) {
    return <p>{error.response?.data.message}</p>;
  }

  return (
    <Carousel
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        {isLoading
          ? Array(6)
              .fill(0)
              .map((_, i) => (
                <CarouselItem className="md:basis-1/3" key={i}>
                  <ArticleCardSkeleton />
                </CarouselItem>
              ))
          : data?.items.map((item) => (
              <CarouselItem className="md:basis-1/3" key={item.id}>
                <ArticleCard article={item} />
              </CarouselItem>
            ))}
      </CarouselContent>
      <CarouselPrevious variant="secondary" />
      <CarouselNext variant="secondary" />
    </Carousel>
  );
}
