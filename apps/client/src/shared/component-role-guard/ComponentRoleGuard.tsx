import { useAuth } from "@/context/auth-provider/AuthProvider";

interface RoleProtectedProps {
  roles?: string[];
  children: React.ReactNode;
}

export function ComponentRoleGuard(props: RoleProtectedProps) {
  const { roles, children } = props;

  const { session, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (session) {
    if (roles && roles.includes(session.role)) {
      return children;
    } else {
      return null;
    }
  } else {
    return null;
  }
}
