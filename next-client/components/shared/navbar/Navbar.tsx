import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { UserMenu } from "@/components/widgets/auth";
import { NavLink, routes } from "@/lib/routing";
import { Logo } from "..";

const navLinks: NavLink[] = [
  {
    name: "Home",
    route: routes.root,
  },
  {
    name: "Blog",
    route: routes.blog.root,
  },
  {
    name: "About me",
    route: routes.aboutMe,
  },
];

export function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="w-full max-w-screen-2xl flex items-center h-14 px-10 mx-auto justify-between">
        <div className="flex items-center">
          <Logo className="mr-3" />
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
                <Link href={routes.auth.signIn}>Sign in</Link>
              </Button>
              <Button asChild>
                <Link href={routes.auth.signUp}>Sign up</Link>
              </Button>
            </div>
          }
        />
      </div>
    </nav>
  );
}
