"use client";
import { ToolForm } from "@/components/entities/tool";
import { useCreateTool } from "@/components/features/tool";
import { DialogBase } from "@/components/shared";
import { useAuth } from "@/context/auth-provider/AuthProvider";
import { EditToolDto } from "@/lib/dto/tool/edit-tool.dto";
import { useState } from "react";

interface NewToolProps {
  trigger: JSX.Element;
}

export function NewToolDialog(props: NewToolProps) {
  const { trigger } = props;

  const { session } = useAuth();

  const { mutate, isPending, isError, error } = useCreateTool();
  const [open, setOpen] = useState<boolean>(false);

  const close = () => setOpen(false);

  const onSubmit = (values: EditToolDto) => {
    mutate(values, {
      onSuccess: () => close(),
    });
  };

  return (
    <DialogBase
      open={open}
      setOpen={setOpen}
      trigger={trigger}
      title="Create Tool"
    >
      <ToolForm
        isError={isError}
        error={error?.response?.data.message}
        isSubmitLoading={isPending}
        submit={onSubmit}
        tool={{
          name: "",
          userId: session?.id ?? "",
        }}
      />
    </DialogBase>
  );
}
