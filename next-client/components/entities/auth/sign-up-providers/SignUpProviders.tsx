import { Button } from "@/components/shared/ui/button";
import Image from "next/image";
import GoogleIcon from "@/public/google-mark.svg";
import GithubIcon from "@/public/github-mark.svg";

export function SignUpProviders() {
  return (
    <div className="grid grid-cols-2 gap-x-3 mb-3">
      <Button variant="outline" type="button">
        <Image height={32} priority src={GoogleIcon} alt="GoogleIcon" />
        <span>Sign Up with Google</span>
      </Button>
      <Button variant="outline" type="button">
        <Image
          className="mr-1.5"
          height={22}
          priority
          src={GithubIcon}
          alt="GithubIcon"
        />
        <span>Sign Up with Github</span>
      </Button>
    </div>
  );
}
