import { VerifyEmailCard } from "@/components/widgets/auth";

interface VerifyEmailPageContext {
  searchParams: {
    token?: string;
    email?: string;
  };
}

export default function VerifyEmailPage(props: VerifyEmailPageContext) {
  const {
    searchParams: { token, email },
  } = props;

  return <VerifyEmailCard token={token} email={email} />;
}
