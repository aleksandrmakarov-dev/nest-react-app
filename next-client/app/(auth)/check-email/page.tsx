import { CheckEmailCard } from "@/components/widgets/auth";

interface CheckEmailPageContext {
  searchParams: {
    email?: string;
  };
}

export default function CheckEmailPage(props: CheckEmailPageContext) {
  const {
    searchParams: { email },
  } = props;

  return <CheckEmailCard email={email} />;
}
