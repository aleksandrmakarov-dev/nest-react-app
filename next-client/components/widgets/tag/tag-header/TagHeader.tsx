"use client";
import { useTagById } from "@/components/entities/tag";
import { Button } from "@/components/shared/ui/button";
import { Skeleton } from "@/components/shared/ui/skeleton";
import { cn } from "@/lib/utils";
import { faBookmark, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HTMLAttributes } from "react";

interface TagHeaderProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
}

export function TagHeader(props: TagHeaderProps) {
  const { id, className, ...other } = props;

  const { data, isLoading, isError, error } = useTagById(id);

  if (isError) {
    return <p>{error.response?.data.message}</p>;
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center border-b border-border pb-5",
        className
      )}
      {...other}
    >
      {isLoading ? (
        <>
          <Skeleton className="w-96 h-10 mb-3" />
          <Skeleton className="w-64 h-6 mb-3.5" />
          <Skeleton className="w-24 h-8" />
        </>
      ) : (
        <>
          <h3 className="text-3xl font-medium mb-3">{data?.name}</h3>
          <p className="mb-3 text-secondary-foreground text-lg">
            Topic • {data?._count.articles} articles
          </p>
          <Button>
            <FontAwesomeIcon className="mr-1.5" icon={faBookmark} />
            <span>Follow</span>
          </Button>
        </>
      )}
    </div>
  );
}
