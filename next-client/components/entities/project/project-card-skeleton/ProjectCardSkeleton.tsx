import { Skeleton } from "@/components/shared/ui/skeleton";
import { cn } from "@/lib/utils";

interface ProjectCardSkeletonProps {
  rtl?: boolean;
}

export function ProjectCardSkeleton(props: ProjectCardSkeletonProps) {
  const { rtl } = props;

  return (
    <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8 lg:gap-20">
      <div
        className={cn("flex flex-col justify-center", {
          "lg:order-2": rtl,
        })}
      >
        <div className="flex flex-wrap gap-3 items-center mb-3 lg:mb-5">
          {Array(3)
            .fill(1)
            .map((_, i) => (
              <Skeleton key={i} className="w-12 h-12 rounded-full" />
            ))}
        </div>
        <Skeleton className="font-semibold w-full h-10 mb-5" />
        <Skeleton className="h-12 mb-5" />
        <div className="flex items-center">
          <Skeleton className="w-32 h-10 rounded-sm mr-3" />
          <Skeleton className="w-32 h-10 rounded-sm" />
        </div>
      </div>
      <Skeleton className="h-64 sm:h-96 w-full bg-gray-200 relative shrink-0 rounded-md overflow-clip" />
    </div>
  );
}
