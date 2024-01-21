"use client";
import { useDeleteProjectById } from "@/components/features/project";
import { DialogBase } from "@/components/shared";
import { Button } from "@/components/shared/ui/button";
import { LoadingButton } from "@/components/shared/ui/loading-button";
import { useState } from "react";

interface DeleteProjectProps {
  trigger: JSX.Element;
  id: string;
}

export function DeleteProjectDialog(props: DeleteProjectProps) {
  const { trigger, id } = props;

  const { mutate, isPending, isError, error } = useDeleteProjectById();
  const [open, setOpen] = useState<boolean>(false);

  const close = () => setOpen(false);

  const onSubmit = () => {
    mutate(id, {
      onSuccess: () => {
        close();
      },
    });
  };

  return (
    <DialogBase
      open={open}
      setOpen={setOpen}
      trigger={trigger}
      title="Delete project"
      isError={isError}
      error={error?.response?.data.message}
      actions={
        <>
          <Button disabled={isPending} variant="outline" onClick={close}>
            No, keep project
          </Button>
          <LoadingButton
            variant="destructive"
            loading={isPending}
            disabled={isPending}
            onClick={onSubmit}
          >
            Yes, delete project
          </LoadingButton>
        </>
      }
    >
      <p>
        Are you sure you want to delete this project? This action cannot be
        undone.
      </p>
    </DialogBase>
  );
}
