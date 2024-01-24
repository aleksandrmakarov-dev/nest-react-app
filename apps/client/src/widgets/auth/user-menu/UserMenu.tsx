import { UserDropdownMenu, UserMenuProfile } from "@/entities/auth";
import { useAuth } from "@/context/auth-provider/AuthProvider";

interface UserMenuProps {
  fallback: React.ReactNode;
}

export function UserMenu(props: UserMenuProps) {
  const { fallback } = props;

  const { session, isLoading } = useAuth();

  return (
    <>
      {!session && !isLoading ? (
        fallback
      ) : (
        <UserDropdownMenu user={session}>
          <UserMenuProfile session={session} isLoading={isLoading} />
        </UserDropdownMenu>
      )}
    </>
  );
}
