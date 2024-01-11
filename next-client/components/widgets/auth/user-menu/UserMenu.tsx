"use client";
import { UserDropdownMenu, UserMenuProfile } from "@/components/entities/auth";
import { useAuth } from "@/context/auth-provider/AuthProvider";

interface UserMenuProps {
  fallback: React.ReactNode;
}

export function UserMenu(props: UserMenuProps) {
  const { fallback } = props;

  const { user, isLoading } = useAuth();

  return (
    <>
      {!user && !isLoading ? (
        fallback
      ) : (
        <UserDropdownMenu user={user}>
          <UserMenuProfile user={user} isLoading={isLoading} />
        </UserDropdownMenu>
      )}
    </>
  );
}
