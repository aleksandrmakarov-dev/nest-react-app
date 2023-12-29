import { ResetPasswordCard } from "@/components/widgets/auth";

interface ResetPasswordPageContext {
  searchParams: {
    token?: string;
  };
}

export default function ResetPasswordPage(props: ResetPasswordPageContext) {
  const {
    searchParams: { token },
  } = props;

  return <ResetPasswordCard token={token} />;
}
