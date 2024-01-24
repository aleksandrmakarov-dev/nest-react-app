import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { SessionDto } from "@/lib/dto/auth/session.dto";
import { routes } from "@/lib/routing";
import { ComponentRoleGuard } from "@/shared";

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
          <ComponentRoleGuard roles={["ADMIN"]}>
            <DropdownMenuItem className="cursor-pointer" asChild>
              <a href={routes.dashboard.home()}>Dashboard</a>
            </DropdownMenuItem>
          </ComponentRoleGuard>
          {/* <DropdownMenuItem className="cursor-pointer" asChild>
            <a href={routes.dashboard.settings.profile()}>Profile</a>
          </DropdownMenuItem> */}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" asChild>
            <a href={routes.auth.signOut}>Sign out</a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
