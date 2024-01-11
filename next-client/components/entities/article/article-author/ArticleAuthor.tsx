import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shared/ui/avatar";
import { UserResponseDto } from "@/lib/dto/user/user-response.dto";
import { stringToColor, stringAvatar, formatDate } from "@/lib/utils";

interface ArticleAuthorProps {
  user: UserResponseDto;
  createdAt: Date;
}

export function ArticleAuthor(props: ArticleAuthorProps) {
  const { createdAt, user } = props;

  return (
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
  );
}
