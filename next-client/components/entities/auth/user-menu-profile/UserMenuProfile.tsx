import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shared/ui/avatar";
import { Skeleton } from "@/components/shared/ui/skeleton";
import { UserDataDto } from "@/lib/dto/auth/user-data.dto";
import { cn } from "@/lib/utils";
import React, { HtmlHTMLAttributes } from "react";

interface UserMenuProfileProps extends HtmlHTMLAttributes<HTMLDivElement> {
  user: UserDataDto;
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
        ) : (
          <>
            <Avatar className="mr-3 w-8 h-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="font-medium">{user.name}</span>
          </>
        )}
      </div>
    );
  }
);

UserMenuProfile.displayName = "UserMenuProfile";
