import { RoleProtected } from "@/components/shared";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shared/ui/dropdown-menu";
import { SessionDto } from "@/lib/dto/auth/session.dto";
import { routes } from "@/lib/routing";
import Link from "next/link";

interface UserDropdownMenuProps {
  children: React.ReactNode;
  user: SessionDto | null;
}

export function UserDropdownMenu(props: UserDropdownMenuProps) {
  const { user, children } = props;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      {user && (
        <DropdownMenuContent className="w-56 mr-5">
          <div className="px-3 py-2 text-sm text-foreground">
            <div>{user.name}</div>
            <div className="font-medium truncate">{user.email}</div>
          </div>
          <DropdownMenuSeparator />
          <RoleProtected roles={["ADMIN"]}>
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link href={routes.dashboard.home()}>Dashboard</Link>
            </DropdownMenuItem>
          </RoleProtected>
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href={routes.dashboard.settings.profile()}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href={routes.auth.signOut}>Sign out</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
