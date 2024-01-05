import { CheckEmailCard } from "@/components/widgets/auth";

interface CheckEmailPageContext {
  searchParams: {
    email?: string;
  };
}

export default function CheckEmailPage(context: CheckEmailPageContext) {
  const {
    searchParams: { email },
  } = context;

  return <CheckEmailCard email={email} />;
}
