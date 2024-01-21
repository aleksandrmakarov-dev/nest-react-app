import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shared/ui/avatar";
import { Skeleton } from "@/components/shared/ui/skeleton";
import { UserResponseDto } from "@/lib/dto/user/user-response.dto";
import { stringToColor, stringAvatar, formatDate, cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes } from "react";

const avatarVariant = cva("mr-2", {
  variants: {
    size: {
      xs: "w-7 h-7",
      sm: "w-8 h-8",
      md: "w-9 h-9",
      default: "w-10 h-10",
    },
    defaultVariants: {
      size: "default",
    },
  },
});

interface ArticleAuthorProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariant> {
  user?: UserResponseDto;
  createdAt?: Date;
  isLoading?: boolean;
}

export function ArticleAuthor(props: ArticleAuthorProps) {
  const { createdAt, user, isLoading, size, className, ...other } = props;

  return (
    <div className={cn("flex items-center", className)} {...other}>
      {isLoading || !user ? (
        <>
          <Skeleton className="w-10 h-10 rounded-full mr-3" />
          <Skeleton className="h-6 w-full" />
        </>
      ) : (
        <>
          <Avatar className={cn(avatarVariant({ size }))}>
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
            {createdAt && (
              <>
                {" • "}
                <span>{formatDate(createdAt)}</span>
              </>
            )}
          </p>
        </>
      )}
    </div>
  );
}
