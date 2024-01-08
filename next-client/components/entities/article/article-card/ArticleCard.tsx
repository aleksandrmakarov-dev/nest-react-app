import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shared/ui/avatar";
import { ArticleResponseDto } from "@/lib/dto/article/article-response.dto";
import { formatDate, stringAvatar, stringToColor } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/shared/ui/badge";
import { Routing } from "@/lib/routing";
import { TagList } from "../../tag";

interface ArticleCardProps {
  article: ArticleResponseDto;
}

export function ArticleCard(props: ArticleCardProps) {
  const {
    article: { id, title, description, createdAt, image, user, tags },
  } = props;

  return (
    <div>
      <div className="flex items-center mb-3">
        <Avatar className="mr-2 w-10 h-10">
          <AvatarImage src={user.image} alt="avatar" />
          <AvatarFallback
            className="text-white"
            style={{ backgroundColor: stringToColor(user.name) }}
          >
            {stringAvatar(user.name)}
          </AvatarFallback>
        </Avatar>
        <p>
          <span className="font-medium">{user.name}</span>
          {" • "}
          <span>{formatDate(createdAt)}</span>
        </p>
      </div>
      <div className="w-full h-64 relative mb-3">
        {image ? (
          <Image
            className="object-center object-cover"
            alt="logo"
            src={image}
            fill
          />
        ) : (
          <div className="bg-gray-100 w-full h-full" />
        )}
      </div>
      <h5 className="text-2xl font-semibold mb-3 flex items-start gap-x-2 hover:underline hover:cursor-pointer">
        <Link className="mr-1" href={Routing.blog.byId(id)}>
          {title}
        </Link>
      </h5>
      <p className="mb-2">{description}</p>
      <TagList
        tags={tags}
        render={(tag) => (
          <Badge key={tag.id} className="text-sm" variant="secondaryDark">
            {tag.name}
          </Badge>
        )}
      />
    </div>
  );
}
