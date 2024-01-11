import Link from "next/link";
import Image from "next/image";
import { routes } from "@/lib/routing";

export function Logo() {
  return (
    <Link className="flex items-center" href={routes.root}>
      <Image
        className="mr-3"
        src="https://flowbite.com/images/logo.svg"
        alt="logo"
        width={32}
        height={32}
      />
      <p className="text-xl font-semibold text-secondary-foreground">
        Code Journey
      </p>
    </Link>
  );
}
