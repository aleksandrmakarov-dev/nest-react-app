import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  header: string;
}

export function Section(props: SectionProps) {
  const { header, children, className, ...other } = props;

  return (
    <div className={cn(className)} {...other}>
      <h6 className="text-xl font-medium mb-3">{header}</h6>
      {children}
    </div>
  );
}
