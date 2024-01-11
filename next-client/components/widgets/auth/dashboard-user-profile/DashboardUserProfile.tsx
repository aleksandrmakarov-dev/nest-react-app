"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shared/ui/avatar";
import { Skeleton } from "@/components/shared/ui/skeleton";
import { useAuth } from "@/context/auth-provider/AuthProvider";
import { stringToColor, stringAvatar } from "@/lib/utils";

export function DashboardUserProfile() {
  const { user, isLoading } = useAuth();

  return (
    <div className="flex items-center">
      {isLoading ? (
        <>
          <Skeleton className="mr-3 w-8 h-8 rounded-full" />
          <div>
            <Skeleton className="h-4 w-24 mb-1" />
            <Skeleton className="h-4 w-24" />
          </div>
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
          <div className="text-sm">
            <p className="font-medium">{user.name}</p>
            <p className="text-clip">{user.email}</p>
          </div>
        </>
      ) : (
        <p>error</p>
      )}
    </div>
  );
}
