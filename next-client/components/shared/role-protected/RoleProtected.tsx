"use client";
import { useAuth } from "@/context/auth-provider/AuthProvider";
import { getSession } from "@/session";

interface RoleProtectedProps {
  roles?: string[];
  children: React.ReactNode;
}

export function RoleProtected(props: RoleProtectedProps) {
  const { roles, children } = props;

  const { session } = useAuth();

  return (
    <>
      {!session
        ? null
        : roles && !roles.includes(session.role)
        ? null
        : children}
    </>
  );
}
