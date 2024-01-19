"use client";
import { SignInSignUp } from "@/components/entities/auth";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shared/ui/avatar";
import { Skeleton } from "@/components/shared/ui/skeleton";
import { useAuth } from "@/context/auth-provider/AuthProvider";
import { routes } from "@/lib/routing";
import { stringToColor, stringAvatar } from "@/lib/utils";
import {
  faDoorOpen,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export function DashboardUserProfile() {
  const { session, isLoading } = useAuth();

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
      ) : session ? (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <Avatar className="mr-3 w-8 h-8">
              <AvatarImage src={session.image} />
              <AvatarFallback
                className="text-white"
                style={{ backgroundColor: stringToColor(session.name) }}
              >
                {stringAvatar(session.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{session.name}</p>
              <p className="text-clip">{session.email}</p>
            </div>
          </div>
          <Link className="hover:text-black/80" href={routes.root}>
            <FontAwesomeIcon icon={faRightFromBracket} size="lg" />
          </Link>
        </div>
      ) : (
        <SignInSignUp />
      )}
    </div>
  );
}
