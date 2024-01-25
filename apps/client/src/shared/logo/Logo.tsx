import { routes } from "@/lib/routing";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComputer } from "@fortawesome/free-solid-svg-icons";

interface LogoProps extends HTMLAttributes<HTMLDivElement> {}

export function Logo(props: LogoProps) {
  const { className } = props;

  return (
    <div className={cn(className)}>
      <a className="flex items-center" href={routes.root}>
        <FontAwesomeIcon
          className="mr-3 text-primary"
          icon={faComputer}
          size="xl"
        />
        <span className="hidden sm:block text-xl font-semibold text-secondary-foreground">
          Aleksandr Makarov
        </span>
      </a>
    </div>
  );
}
