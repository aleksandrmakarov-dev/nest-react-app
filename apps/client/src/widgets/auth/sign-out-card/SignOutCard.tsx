"use client";

import { useSignOut } from "@/features/auth";
import { useAuth } from "@/context/auth-provider/AuthProvider";
import { routes } from "@/lib/routing";
import { useEffect } from "react";

export function SignOutCard() {
  const { mutate, isPending, isError, error, isSuccess } = useSignOut();
  const { setSession } = useAuth();

  useEffect(() => {
    mutate(
      {},
      {
        onSuccess: (_) => setSession(null),
      }
    );
  }, [setSession]);

  return (
    <>
      {isPending && <p>Signing out...</p>}
      {isError && <p>{error.response?.data.message}</p>}
      {isSuccess && (
        <p>
          Signed out of your account.{" "}
          <a href={routes.auth.signIn} className="font-semibold underline">
            Sign in
          </a>
        </p>
      )}
    </>
  );
}
