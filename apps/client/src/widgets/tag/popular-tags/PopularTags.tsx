import { TagList, useTags } from "@/entities/tag";
import { Badge } from "@/shared/ui/badge";
import { Skeleton } from "@/shared/ui/skeleton";
import { routes } from "@/lib/routing";
export function PopularTags() {
  const { data, isLoading } = useTags({ size: -1 });

  return (
    <TagList
      tags={data?.items}
      isLoading={isLoading}
      render={(tag) => (
        <a
          className="hover:cursor-pointer"
          key={tag.id}
          href={routes.tags.byId(tag.id)}
        >
          <Badge className="text-sm" variant="tonal">
            {tag.name}
          </Badge>
        </a>
      )}
      renderSkeleton={(i) => (
        <Skeleton key={i} className="w-24 h-6 rounded-full" />
      )}
      count={8}
    />
  );
}
