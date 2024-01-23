"use client";

import { useUsers } from "@/entities/user";
import { Select } from "@/shared";
import { Dispatch, SetStateAction } from "react";

interface UserSelectProps {
  value?: string;
  onChange: Dispatch<SetStateAction<string>>;
  disabled?: boolean;
}

export function UserSelect(props: UserSelectProps) {
  const { data } = useUsers({
    size: -1,
  });

  return (
    <Select
      options={data?.items ?? []}
      getValue={(option) => option.id}
      getLabel={(option) => option.name}
      renderOption={(option) => <span key={option.id}>{option.name}</span>}
      renderInput={(value) =>
        !Array.isArray(value) && <span>{value?.name}</span>
      }
      limit={3}
      close
      {...props}
    />
  );
}
