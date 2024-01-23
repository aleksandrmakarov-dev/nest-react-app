import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Skeleton } from "@/shared/ui/skeleton";
import { SessionDto } from "@/lib/dto/auth/session.dto";
import { cn, stringAvatar, stringToColor } from "@/lib/utils";
import React, { HtmlHTMLAttributes } from "react";

interface UserMenuProfileProps extends HtmlHTMLAttributes<HTMLDivElement> {
  session: SessionDto | null;
  isLoading?: boolean;
}

export const UserMenuProfile = React.forwardRef(
  (props: UserMenuProfileProps, ref: React.Ref<HTMLDivElement>) => {
    const { session, isLoading, className, ...other } = props;

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
        ) : session ? (
          <>
            <Avatar className="mr-3 w-8 h-8">
              <AvatarImage src={session.image} />
              <AvatarFallback
                className="text-white"
                style={{ backgroundColor: stringToColor(session.name) }}
              >
                {stringAvatar(session.name)}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium">{session.name}</span>
          </>
        ) : (
          <p>error</p>
        )}
      </div>
    );
  }
);

UserMenuProfile.displayName = "UserMenuProfile";
