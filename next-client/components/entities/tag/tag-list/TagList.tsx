import { TagResponseDto } from "@/lib/dto/tag/tag-response.dto";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface TagListProps extends HTMLAttributes<HTMLDivElement> {
  tags?: TagResponseDto[];
  isLoading?: boolean;
  count?: number;
  render: (tag: TagResponseDto) => React.ReactNode;
  renderSkeleton?: (i: number) => React.ReactNode;
}

export function TagList(props: TagListProps) {
  const {
    tags,
    isLoading,
    count,
    render,
    renderSkeleton,
    className,
    ...other
  } = props;

  return (
    <div className={cn("flex flex-wrap gap-1.5", className)} {...other}>
      {!isLoading ? (
        tags?.map((tag) => render(tag))
      ) : renderSkeleton ? (
        Array(count ?? 3)
          .fill(0)
          .map((_, i) => renderSkeleton(i))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
