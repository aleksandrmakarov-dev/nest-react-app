import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { HTMLAttributes } from "react";

interface NavigationTabProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export const NavigationTab = React.forwardRef<
  HTMLAnchorElement,
  NavigationTabProps
>((props, ref) => {
  const { className, ...other } = props;

  return (
    <Link
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        className
      )}
      {...other}
    />
  );
});
NavigationTab.displayName = "NavigationTab";
