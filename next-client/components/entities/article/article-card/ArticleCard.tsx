import { ArticleResponseDto } from "@/lib/dto/article/article-response.dto";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ArticleAuthor } from "../article-author/ArticleAuthor";
import { ArticleTags } from "..";
import { routes } from "@/lib/routing";

interface ArticleCardProps {
  article: ArticleResponseDto;
}

export const ArticleCard = React.forwardRef<HTMLDivElement, ArticleCardProps>(
  (props, ref) => {
    const {
      article: { id, title, description, createdAt, image, user, tags },
    } = props;

    return (
      <div ref={ref}>
        <ArticleAuthor user={user} createdAt={createdAt} />
        <div className="w-full h-64 relative mb-3">
          {image ? (
            <Image
              className="object-center object-cover rounded-sm"
              alt="logo"
              src={image}
              fill
            />
          ) : (
            <div className="bg-gray-100 w-full h-full" />
          )}
        </div>
        <h5 className="text-2xl font-semibold mb-3 flex items-start gap-x-2 hover:underline hover:cursor-pointer">
          <Link className="mr-1" href={routes.blog.byId(id)}>
            {title}
          </Link>
        </h5>
        <p className="mb-2">{description}</p>
        <ArticleTags tags={tags} />
      </div>
    );
  }
);
