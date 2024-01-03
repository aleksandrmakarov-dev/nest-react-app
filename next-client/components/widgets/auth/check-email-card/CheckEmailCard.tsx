import { Button } from "@/components/shared/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shared/ui/card";
import { Routing } from "@/lib/routing";
import Link from "next/link";

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
          <Link href={Routing.auth.verifyEmail(email)}>
            Enter code manually
          </Link>
        </Button>
        <p className="text-sm">
          <span className="text-muted-foreground">Back to</span>{" "}
          <Link
            className="text-primary font-semibold underline"
            href={Routing.auth.signIn}
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
