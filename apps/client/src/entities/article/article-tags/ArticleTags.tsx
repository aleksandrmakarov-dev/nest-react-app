import { TagResponseDto } from "@/lib/dto/tag/tag-response.dto";
import { TagList } from "../../tag/tag-list/TagList";
import { Badge } from "@/shared/ui/badge";
import { HTMLAttributes } from "react";
import { Skeleton } from "@/shared/ui/skeleton";

interface ArticleTagsProps extends HTMLAttributes<HTMLDivElement> {
  tags?: TagResponseDto[];
  isLoading?: boolean;
}

export function ArticleTags(props: ArticleTagsProps) {
  const { tags, isLoading, className, ...other } = props;

  return (
    <TagList
      className={className}
      tags={tags}
      isLoading={isLoading}
      render={(tag) => (
        <Badge key={tag.id} className="text-sm" variant="tonal">
          {tag.name}
        </Badge>
      )}
      renderSkeleton={(i) => (
        <Skeleton key={i} className="w-24 h-6 rounded-full" />
      )}
      count={3}
      {...other}
    />
  );
}
