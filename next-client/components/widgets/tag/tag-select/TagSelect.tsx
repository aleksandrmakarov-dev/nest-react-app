"use client";

import { useTags } from "@/components/entities/tag";
import { Select } from "@/components/shared";
import { Badge } from "@/components/shared/ui/badge";
import { Dispatch, SetStateAction } from "react";

interface TagSelectProps {
  value: string[];
  onChange: Dispatch<SetStateAction<string[]>>;
  disabled?: boolean;
}

export function TagSelect(props: TagSelectProps) {
  const { data } = useTags();

  return (
    <Select
      options={data ?? []}
      getValue={(option) => option.id}
      getLabel={(option) => option.name}
      renderOption={(option) => <span key={option.id}>{option.name}</span>}
      renderValue={(option) => (
        <Badge key={option.id} variant="secondaryDark">
          {option.name}
        </Badge>
      )}
      limit={3}
      {...props}
    />
  );
}
