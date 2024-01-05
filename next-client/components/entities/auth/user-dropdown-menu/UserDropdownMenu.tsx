import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shared/ui/dropdown-menu";
import { UserDataDto } from "@/lib/dto/auth/user-data.dto";
import { Routing } from "@/lib/routing";
import Link from "next/link";
import { UserMenuProfile } from "..";

interface UserDropdownMenuProps {
  children: React.ReactNode;
  user: UserDataDto;
}

export function UserDropdownMenu(props: UserDropdownMenuProps) {
  const { user, children } = props;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
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
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href={Routing.auth.signOut}>Sign out</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
