import Link from "next/link";
import { UserMenu } from "@/components/widgets/auth";
import { NavLink, routes } from "@/lib/routing";
import { Logo } from "..";
import { SignInSignUp } from "@/components/entities/auth";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface NavbarProps extends HTMLAttributes<HTMLDivElement> {}

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

export function Navbar(props: NavbarProps) {
  const { className, ...other } = props;

  return (
    <nav
      className={cn("bg-white border-b border-gray-200", className)}
      {...other}
    >
      <div className="w-full max-w-screen-2xl flex items-center h-14 px-10 mx-auto justify-between">
        <div className="flex items-center">
          <Logo className="mr-10" />
          <div className=" hidden space-x-8">
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
        <UserMenu fallback={<SignInSignUp />} />
      </div>
    </nav>
  );
}
