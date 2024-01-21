import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface PageSectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  preheader?: React.ReactNode;
  header: React.ReactNode;
  subheader?: React.ReactNode;
  action?: React.ReactNode;
}

export function PageSectionHeader(props: PageSectionHeaderProps) {
  const { preheader, header, subheader, action, className, ...other } = props;

  return (
    <div
      className={cn(
        "w-full flex flex-col sm:flex-row items-start justify-between gap-x-10 gap-y-3",
        className
      )}
      {...other}
    >
      <div>
        <p className="text-primary font-medium mb-2">{preheader}</p>
        <h2 className="text-4xl font-medium mb-3">{header}</h2>
        {subheader && <p className="text-gray-600 text-lg">{subheader}</p>}
      </div>
      {action}
    </div>
  );
}
