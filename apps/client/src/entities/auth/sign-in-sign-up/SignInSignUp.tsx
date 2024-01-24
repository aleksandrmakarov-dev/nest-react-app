import { Button } from "@/shared/ui/button";
import { routes } from "@/lib/routing";

export function SignInSignUp() {
  return (
    <div>
      <Button className="mr-3" variant="text" asChild>
        <a href={routes.auth.signIn}>Sign in</a>
      </Button>
      <Button asChild>
        <a href={routes.auth.signUp}>Sign up</a>
      </Button>
    </div>
  );
}
