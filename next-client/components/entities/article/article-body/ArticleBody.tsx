import { MarkdownPreview } from "@/components/shared";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface ArticleBodyProps extends HTMLAttributes<HTMLDivElement> {
  content: string;
}

export function ArticleBody(props: ArticleBodyProps) {
  const { content, className, ...other } = props;

  return (
    <div className={cn(className)} {...other}>
      <MarkdownPreview content={content} />
    </div>
  );
}
