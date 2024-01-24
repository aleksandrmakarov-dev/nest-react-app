"use client";

import { useTags } from "@/entities/tag";
import { Select } from "@/shared";
import { Badge } from "@/shared/ui/badge";
import { Dispatch, SetStateAction } from "react";

interface TagSelectProps {
  value: string[];
  onChange: Dispatch<SetStateAction<string[]>>;
  disabled?: boolean;
}

export function TagSelect(props: TagSelectProps) {
  const { data } = useTags({
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
      limit={3}
      {...props}
    />
  );
}
