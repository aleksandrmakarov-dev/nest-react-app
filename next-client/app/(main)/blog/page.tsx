import {
  ArticleFilter,
  prefetchInfinityArticles,
} from "@/components/entities/article";
import Section from "@/components/shared/section/Section";
import { GlobalArticleFeed } from "@/components/widgets/article";
import { PopularTags } from "@/components/widgets/tag";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import Link from "next/link";

export default async function BlogPage() {
  const queryClient = await prefetchInfinityArticles();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="grid grid-cols-10 w-full max-w-screen-xl mx-auto">
        <div className="col-span-3 mr-14 flex flex-col gap-5">
          <Section header="Filter">
            <ArticleFilter />
          </Section>
          <Section header="Popular tags">
            <PopularTags />
            <Link
              className="text-sm font-medium mt-3 block underline"
              href={"/"}
            >
              See more tags
            </Link>
          </Section>
        </div>
        <div className="col-span-7">
          <GlobalArticleFeed />
        </div>
      </div>
    </HydrationBoundary>
  );
}
