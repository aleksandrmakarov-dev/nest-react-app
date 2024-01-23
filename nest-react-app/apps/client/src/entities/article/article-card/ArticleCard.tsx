import { ArticleResponseDto } from "@/lib/dto/article/article-response.dto";
import React from "react";
import { ArticleAuthor } from "../article-author/ArticleAuthor";
import { ArticleTags } from "..";
import { routes } from "@/lib/routing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

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
        <ArticleAuthor className="mb-3" user={user} createdAt={createdAt} />
        <div className="w-full h-64 relative mb-3">
          {image ? (
            <img
              className="object-center object-cover rounded-sm w-full h-full"
              alt="logo"
              src={image}
            />
          ) : (
            <div className="bg-gray-100 w-full h-full rounded-sm flex items-center justify-center">
              <FontAwesomeIcon
                className="text-gray-400"
                icon={faImage}
                size="2xl"
              />
            </div>
          )}
        </div>
        <h5 className="text-2xl font-semibold mb-3 flex items-start gap-x-2 hover:underline underline-offset-2 hover:cursor-pointer">
          <a className="mr-1" href={routes.blog.byId(id)}>
            {title}
          </a>
        </h5>
        <p className="mb-2">{description}</p>
        <ArticleTags tags={tags} />
      </div>
    );
  }
);

ArticleCard.displayName = "ArticleCard";
