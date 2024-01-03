"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shared/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shared/ui/dropdown-menu";
import { useAuth } from "@/context/auth-provider/AuthProvider";

interface UserMenuProps {
  alt: React.ReactNode;
}

export function UserMenu(props: UserMenuProps) {
  const { alt } = props;

  const { user } = useAuth();

  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center hover:cursor-pointer text-foreground">
              <Avatar className="mr-3 w-8 h-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="font-medium">{user.name}</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mr-5">
            <div className="px-3 py-2 text-sm text-foreground">
              <div>{user.name}</div>
              <div className="font-medium truncate">{user.email}</div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        alt
      )}
    </>
  );
}
