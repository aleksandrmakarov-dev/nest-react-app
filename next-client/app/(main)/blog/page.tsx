import { prefetchInfinityArticles } from "@/components/entities/article";
import { Section } from "@/components/shared";
import { ArticleFilter, GlobalArticleFeed } from "@/components/widgets/article";
import { PopularTags, TagHeader } from "@/components/widgets/tag";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import Link from "next/link";

interface BlogPageContext {
  params: {
    tagId?: string;
  };
  searchParams: {
    query?: string;
  };
}

export default async function BlogPage(context: BlogPageContext) {
  const {
    searchParams: { query },
    params: { tagId },
  } = context;

  const queryParams = { query: query, tagId: tagId };

  const queryClient = await prefetchInfinityArticles(queryParams);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="grid grid-cols-10 w-full items-start">
        {tagId && (
          <div className="col-span-10 mb-10">
            <TagHeader id={tagId} />
          </div>
        )}
        <div className="col-span-3 mr-14 sticky top-20">
          <Section className="mb-5" header="Filter">
            <ArticleFilter query={query} />
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
          <GlobalArticleFeed params={queryParams} />
        </div>
      </div>
    </HydrationBoundary>
  );
}
