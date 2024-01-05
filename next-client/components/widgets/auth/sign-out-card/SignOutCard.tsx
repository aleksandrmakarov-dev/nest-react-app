"use client";

import { useSignOut } from "@/components/features/auth";
import { Routing } from "@/lib/routing";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function SignOutCard() {
  const { mutate, isPending, isError, error, isSuccess } = useSignOut();

  useEffect(() => {
    mutate({});
  }, []);

  return (
    <>
      {isPending && <p>Signing out...</p>}
      {isError && <p>{error.response?.data.message}</p>}
      {isSuccess && (
        <p>
          Signed out of your account.{" "}
          <Link href={Routing.auth.signIn} className="font-semibold underline">
            Sign in
          </Link>
        </p>
      )}
    </>
  );
}
