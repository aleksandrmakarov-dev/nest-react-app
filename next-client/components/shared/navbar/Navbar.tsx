import { Routing, navLinks } from "@/lib/routing";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { UserMenu } from "@/components/widgets/auth";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="w-full max-w-screen-2xl flex items-center h-14 px-10 mx-auto justify-between">
        <div className="flex items-center">
          <Link className="flex items-center mr-8" href={Routing.root}>
            <Image
              className="mr-3"
              src="logo.svg"
              alt="logo"
              width={32}
              height={32}
            />
            <p className="text-2xl font-semibold text-secondary-foreground">
              Code Journey
            </p>
          </Link>
          <div className="space-x-8">
            {navLinks.map((link) => (
              <Link
                className="text-secondary-foreground font-medium transition-colors hover:text-primary"
                key={link.route}
                href={link.route}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <UserMenu
          fallback={
            <div>
              <Button className="mr-3" variant="text" asChild>
                <Link href={Routing.auth.signIn}>Sign in</Link>
              </Button>
              <Button asChild>
                <Link href={Routing.auth.signUp}>Sign up</Link>
              </Button>
            </div>
          }
        />
      </div>
    </nav>
  );
}
