"use client";

import { TagList, useTags } from "@/components/entities/tag";
import { Badge } from "@/components/shared/ui/badge";

export function PopularTags() {
  const { data, isLoading, isError, error } = useTags();

  return (
    <TagList
      tags={data}
      isLoading={isLoading}
      render={(tag) => (
        <Badge key={tag.id} className="text-sm" variant="secondaryDark">
          {tag.name}
        </Badge>
      )}
    />
  );
}
