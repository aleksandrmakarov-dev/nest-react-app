"use client";

import { TagList, useTags } from "@/components/entities/tag";
import { Badge } from "@/components/shared/ui/badge";

export function PopularTags() {
  const { data, isLoading, isError, error } = useTags({ size: -1 });

  return (
    <TagList
      tags={data?.items}
      isLoading={isLoading}
      render={(tag) => (
        <Badge key={tag.id} className="text-sm" variant="secondaryDark">
          {tag.name}
        </Badge>
      )}
    />
  );
}
