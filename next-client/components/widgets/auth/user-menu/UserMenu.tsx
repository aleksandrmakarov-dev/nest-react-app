"use client";
import { UserDropdownMenu, UserMenuProfile } from "@/components/entities/auth";
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
          <UserMenuProfile user={session} isLoading={isLoading} />
        </UserDropdownMenu>
      )}
    </>
  );
}
