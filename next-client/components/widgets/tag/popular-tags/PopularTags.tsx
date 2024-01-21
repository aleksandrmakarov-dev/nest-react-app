"use client";

import { TagList, useTags } from "@/components/entities/tag";
import { Badge } from "@/components/shared/ui/badge";
import { Skeleton } from "@/components/shared/ui/skeleton";
import { routes } from "@/lib/routing";
import Link from "next/link";

export function PopularTags() {
  const { data, isLoading, isError, error } = useTags({ size: -1 });

  return (
    <TagList
      tags={data?.items}
      isLoading={isLoading}
      render={(tag) => (
        <Link
          className="hover:cursor-pointer"
          key={tag.id}
          href={routes.tags.byId(tag.id)}
        >
          <Badge className="text-sm" variant="tonal">
            {tag.name}
          </Badge>
        </Link>
      )}
      renderSkeleton={(i) => (
        <Skeleton key={i} className="w-24 h-6 rounded-full" />
      )}
      count={8}
    />
  );
}
