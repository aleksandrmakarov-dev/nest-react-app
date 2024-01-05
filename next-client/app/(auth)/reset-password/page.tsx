import { ResetPasswordCard } from "@/components/widgets/auth";

interface ResetPasswordPageContext {
  searchParams: {
    token?: string;
  };
}

export default function ResetPasswordPage(context: ResetPasswordPageContext) {
  const {
    searchParams: { token },
  } = context;

  return <ResetPasswordCard token={token} />;
}
