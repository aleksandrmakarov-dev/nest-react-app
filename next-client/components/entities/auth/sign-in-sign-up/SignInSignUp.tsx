import { Button } from "@/components/shared/ui/button";
import { routes } from "@/lib/routing";
import Link from "next/link";

export function SignInSignUp() {
  return (
    <div>
      <Button className="mr-3" variant="text" asChild>
        <Link href={routes.auth.signIn}>Sign in</Link>
      </Button>
      <Button asChild>
        <Link href={routes.auth.signUp}>Sign up</Link>
      </Button>
    </div>
  );
}
