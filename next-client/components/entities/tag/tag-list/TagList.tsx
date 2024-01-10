import { TagResponseDto } from "@/lib/dto/tag/tag-response.dto";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface TagListProps extends HTMLAttributes<HTMLDivElement> {
  tags?: TagResponseDto[];
  render: (tag: TagResponseDto) => React.ReactNode;
  isLoading?: boolean;
}

export function TagList(props: TagListProps) {
  const { tags, render, isLoading, className, ...other } = props;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={cn("flex flex-wrap gap-1.5", className)} {...other}>
      {tags?.map((tag) => render(tag))}
    </div>
  );
}
