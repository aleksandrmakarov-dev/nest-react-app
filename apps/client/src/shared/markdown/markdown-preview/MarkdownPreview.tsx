import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import Markdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { P } from "../components/P";
import { Image } from "../components/Image";
import { A } from "../components/A";
import { Li, Ol, Ul } from "../components/Lists";
import { H1, H2, H3, H4, H5, H6 } from "../components/Headers";
import { Code } from "../components/Code";

interface MarkdownPreviewProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function MarkdownPreview(props: MarkdownPreviewProps) {
  const { value, className, ...other } = props;

  return (
    <Markdown
      className={cn(className)}
      rehypePlugins={[rehypeSlug]}
      remarkPlugins={[remarkGfm]}
      components={{
        h1: H1,
        h2: H2,
        h3: H3,
        h4: H4,
        h5: H5,
        h6: H6,
        p: P,
        img: Image,
        a: A,
        li: Li,
        ol: Ol,
        ul: Ul,
        code: Code,
      }}
      {...other}
    >
      {value}
    </Markdown>
  );
}
