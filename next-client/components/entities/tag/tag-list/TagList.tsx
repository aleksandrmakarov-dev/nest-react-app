import { TagResponseDto } from "@/lib/dto/tag/tag-response.dto";
import { render } from "react-dom";

interface TagListProps {
  tags?: TagResponseDto[];
  render: (tag: TagResponseDto) => React.ReactNode;
  isLoading?: boolean;
}

export function TagList(props: TagListProps) {
  const { tags, render, isLoading } = props;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {tags?.map((tag) => render(tag))}
    </div>
  );
}
