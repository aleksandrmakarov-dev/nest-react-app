import { routes } from "@/lib/routing";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface LogoProps extends HTMLAttributes<HTMLDivElement> {}

export function Logo(props: LogoProps) {
  const { className } = props;

  return (
    <div className={cn(className)}>
      <a className="flex items-center" href={routes.root}>
        <img
          className="mr-3"
          src="https://flowbite.com/images/logo.svg"
          alt="logo"
          width={32}
          height={32}
        />
        <p className="hidden sm:block text-xl font-semibold text-secondary-foreground">
          Code Journey
        </p>
      </a>
    </div>
  );
}
