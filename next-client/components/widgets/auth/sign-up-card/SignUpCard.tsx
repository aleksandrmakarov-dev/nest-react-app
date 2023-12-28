"use client";
import { SignUpBody, SignUpProviders } from "@/components/entities/auth";
import { useSignUpLocal } from "@/components/features/auth";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/shared/ui/alert";
import { Button } from "@/components/shared/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/shared/ui/card";
import { Form } from "@/components/shared/ui/form";
import { Separator } from "@/components/shared/ui/separator";
import { SignUpDto, signUpDtoSchema } from "@/lib/dto/auth/sign-up.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { MdErrorOutline, MdCheckCircleOutline } from "react-icons/md";

export function SignUpCard() {
  const { mutate, isPending, isError, error, isSuccess, data } =
    useSignUpLocal();

  const form = useForm<SignUpDto>({
    resolver: zodResolver(signUpDtoSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: SignUpDto) {
    console.log(values);
    mutate(values);
  }

  return (
    <Card className="w-full max-w-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="text-center">Create your Account</CardTitle>
          </CardHeader>
          <CardContent>
            <SignUpProviders />
            <div className="relative text-center mb-3">
              <Separator className="absolute top-1/2" />
              <span className="bg-white relative px-3 text-muted-foreground">
                or
              </span>
            </div>
            {isError && (
              <Alert className="mb-3 bg-red-50 border-0 text-red-700">
                <MdErrorOutline className="h-5 w-5 !text-red-700" />
                <AlertTitle>{error.response?.data.error}</AlertTitle>
                <AlertDescription>
                  {error.response?.data.message}
                </AlertDescription>
              </Alert>
            )}
            {isSuccess && (
              <Alert className="mb-3 bg-green-50 border-0 text-green-700">
                <MdCheckCircleOutline className="h-5 w-5 !text-green-700" />
                <AlertTitle>Registration success</AlertTitle>
                <AlertDescription>{data.message}</AlertDescription>
              </Alert>
            )}
            <SignUpBody control={form.control} />
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button disabled={isPending} className="w-full mb-5" type="submit">
              Create an account
            </Button>
            <p className="text-muted-foreground text-sm">
              Already have an account?{" "}
              <Link
                className="text-primary font-semibold hover:underline"
                href={"/auth/sign-in"}
              >
                Sign in here
              </Link>
            </p>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
