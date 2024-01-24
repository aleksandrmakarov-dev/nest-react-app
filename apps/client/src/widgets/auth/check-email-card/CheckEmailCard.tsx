import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { routes } from "@/lib/routing";

interface CheckEmailCardProps {
  email?: string;
}

export function CheckEmailCard(props: CheckEmailCardProps) {
  const { email } = props;

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle>Check your email</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        We sent a verification link to{" "}
        <span className="font-semibold">{email ?? "your email address"}</span>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button className="w-full mb-3" asChild>
          <a href={routes.auth.verifyEmail(email)}>Enter code manually</a>
        </Button>
        <p className="text-sm">
          <span className="text-muted-foreground">Back to</span>{" "}
          <a
            className="text-primary font-semibold underline"
            href={routes.auth.signIn}
          >
            Sign in
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}
