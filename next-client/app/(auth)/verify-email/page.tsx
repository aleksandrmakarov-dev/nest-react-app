import { VerifyEmailCard } from "@/components/widgets/auth";

interface VerifyEmailPageContext {
  searchParams: {
    token?: string;
    email?: string;
  };
}

export default function VerifyEmailPage(context: VerifyEmailPageContext) {
  const {
    searchParams: { token, email },
  } = context;

  return <VerifyEmailCard token={token} email={email} />;
}
