import { ArticleContentResponseDto } from "@/lib/dto/article/article-response.dto";
import { ArticleAuthor } from "../article-author/ArticleAuthor";
import { ArticleTags } from "..";
import Image from "next/image";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ArticleHeaderDto extends HTMLAttributes<HTMLDivElement> {
  article: ArticleContentResponseDto;
}

export function ArticleHeader(props: ArticleHeaderDto) {
  const { article, className, ...other } = props;

  return (
    <div className={cn("relative", className)} {...other}>
      <div className="grid grid-cols-5 h-full">
        <span className="col-span-3" />
        {article.image ? (
          <div className="relative h-96 col-span-2">
            <Image
              className="object-cover object-center rounded-sm"
              src={article?.image}
              alt="logo"
              fill
            />
          </div>
        ) : (
          <div />
        )}
      </div>
      <div className="absolute top-0 left-0 max-w-3xl h-full flex flex-col justify-center">
        <ArticleTags className="mb-5" tags={article.tags} />
        <h1 className="text-6xl font-medium text-secondary-foreground mb-5">
          {article.title}
        </h1>
        <h5 className="text-xl text-muted-foreground max-w-xl mb-3">
          {article.description}
        </h5>
        <ArticleAuthor user={article.user} createdAt={article.createdAt} />
      </div>
    </div>
  );
}
