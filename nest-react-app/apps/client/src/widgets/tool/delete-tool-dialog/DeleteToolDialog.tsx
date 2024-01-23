"use client";
import { useDeleteToolById } from "@/features/tool";
import { DialogBase } from "@/shared";
import { Button } from "@/shared/ui/button";
import { LoadingButton } from "@/shared/ui/loading-button";
import { useState } from "react";

interface DeleteToolProps {
  trigger: JSX.Element;
  id: string;
}

export function DeleteToolDialog(props: DeleteToolProps) {
  const { trigger, id } = props;

  const { mutate, isPending, isError, error } = useDeleteToolById();
  const [open, setOpen] = useState<boolean>(false);

  const close = () => setOpen(false);

  const onSubmit = () => {
    mutate(id, {
      onSuccess: () => close(),
    });
  };

  return (
    <DialogBase
      open={open}
      setOpen={setOpen}
      trigger={trigger}
      title="Delete tool"
      isError={isError}
      error={error?.response?.data.message}
      actions={
        <>
          <Button disabled={isPending} variant="outline" onClick={close}>
            No, keep tool
          </Button>
          <LoadingButton
            variant="destructive"
            loading={isPending}
            disabled={isPending}
            onClick={onSubmit}
          >
            Yes, delete tool
          </LoadingButton>
        </>
      }
    >
      <p>
        Are you sure you want to delete this tool? This action cannot be undone.
      </p>
    </DialogBase>
  );
}
