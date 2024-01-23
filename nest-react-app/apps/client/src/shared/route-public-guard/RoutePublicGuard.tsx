import { useAuth } from "@/context";
import { routes } from "@/lib/routing";
import { Navigate, Outlet } from "react-router-dom";

export function RoutePublicGuard() {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return session ? <Navigate to={routes.root} /> : <Outlet />;
}
