"use client";

import { useTools } from "@/entities/tool";
import { Select } from "@/shared";
import { Badge } from "@/shared/ui/badge";
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
      renderInput={(value) =>
        Array.isArray(value) &&
        value.map((v) => (
          <Badge key={v.id} className="mr-1" variant="tonal">
            {v.name}
          </Badge>
        ))
      }
      limit={5}
      {...props}
    />
  );
}
