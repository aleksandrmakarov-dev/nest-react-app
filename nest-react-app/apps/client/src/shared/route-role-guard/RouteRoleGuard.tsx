import { useAuth } from "@/context";
import { routes } from "@/lib/routing";
import { Navigate, Outlet } from "react-router-dom";

interface RouteRoleGuardProps {
  roles?: string[];
}

export function RouteRoleGuard(props: RouteRoleGuardProps) {
  const { roles } = props;

  const { session, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (session) {
    if (roles && roles.includes(session.role)) {
      return <Outlet />;
    } else {
      return <Navigate to={routes.exceptions.accessDenied()} replace />;
    }
  } else {
    return <Navigate to={routes.auth.signIn} replace />;
  }
}
