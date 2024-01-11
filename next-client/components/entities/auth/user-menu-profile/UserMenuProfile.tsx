import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shared/ui/avatar";
import { Skeleton } from "@/components/shared/ui/skeleton";
import { UserDataDto } from "@/lib/dto/auth/user-data.dto";
import { cn, stringAvatar, stringToColor } from "@/lib/utils";
import React, { HtmlHTMLAttributes } from "react";

interface UserMenuProfileProps extends HtmlHTMLAttributes<HTMLDivElement> {
  user: UserDataDto | null;
  isLoading?: boolean;
}

export const UserMenuProfile = React.forwardRef(
  (props: UserMenuProfileProps, ref: React.Ref<HTMLDivElement>) => {
    const { user, isLoading, className, ...other } = props;

    return (
      <div
        className={cn(
          "flex items-center hover:cursor-pointer text-foreground",
          className
        )}
        ref={ref}
        {...other}
      >
        {isLoading ? (
          <>
            <Skeleton className="mr-3 w-8 h-8 rounded-full" />
            <Skeleton className="h-4 w-16" />
          </>
        ) : user ? (
          <>
            <Avatar className="mr-3 w-8 h-8">
              <AvatarImage src={user.image} />
              <AvatarFallback
                className="text-white"
                style={{ backgroundColor: stringToColor(user.name) }}
              >
                {stringAvatar(user.name)}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium">{user.name}</span>
          </>
        ) : (
          <p>error</p>
        )}
      </div>
    );
  }
);

UserMenuProfile.displayName = "UserMenuProfile";
