import { Section } from "@/shared";
import { ArticleFilter, GlobalArticleFeed } from "@/widgets/article";
import { PopularTags, TagHeader } from "@/widgets/tag";
import { useParams, useSearchParams } from "react-router-dom";

export default function BlogPage() {
  const { tagId } = useParams<{ tagId?: string }>();

  const [searchParams] = useSearchParams();

  const queryParams = { query: searchParams.get("query"), tagId: tagId };

  return (
    <div className="grid grid-cols-10 w-full items-start">
      {tagId && (
        <div className="col-span-10 mb-10">
          <TagHeader id={tagId} />
        </div>
      )}
      <div className="col-span-3 mr-14 sticky top-20">
        <Section className="mb-5" header="Filter">
          <ArticleFilter query={searchParams.get("query")} />
        </Section>
        <Section header="Popular tags">
          <PopularTags />
          <a className="text-sm font-medium mt-3 block underline" href={"/"}>
            See more tags
          </a>
        </Section>
      </div>
      <div className="col-span-7">
        <GlobalArticleFeed params={queryParams} />
      </div>
    </div>
  );
}
