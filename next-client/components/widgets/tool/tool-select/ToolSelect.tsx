"use client";

import { useTools } from "@/components/entities/tool";
import { Select } from "@/components/shared";
import { Badge } from "@/components/shared/ui/badge";
import { Dispatch, SetStateAction } from "react";

interface ToolSelectProps {
  value: string[];
  onChange: Dispatch<SetStateAction<string[]>>;
  disabled?: boolean;
}

export function ToolSelect(props: ToolSelectProps) {
  const { data } = useTools({
    size: -1,
  });

  return (
    <Select
      options={data?.items ?? []}
      getValue={(option) => option.id}
      getLabel={(option) => option.name}
      renderOption={(option) => <span key={option.id}>{option.name}</span>}
      renderValue={(option) => (
        <Badge key={option.id} variant="secondaryDark">
          {option.name}
        </Badge>
      )}
      limit={5}
      {...props}
    />
  );
}
