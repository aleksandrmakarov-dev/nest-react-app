import { TagResponseDto } from "@/lib/dto/tag/tag-response.dto";
import { TagList } from "../../tag/tag-list/TagList";
import { Badge } from "@/components/shared/ui/badge";
import { HTMLAttributes } from "react";

interface ArticleTagsProps extends HTMLAttributes<HTMLDivElement> {
  tags: TagResponseDto[];
}

export function ArticleTags(props: ArticleTagsProps) {
  const { tags, className, ...other } = props;

  return (
    <TagList
      className={className}
      tags={tags}
      render={(tag) => (
        <Badge key={tag.id} className="text-sm" variant="secondaryDark">
          {tag.name}
        </Badge>
      )}
      {...other}
    />
  );
}
