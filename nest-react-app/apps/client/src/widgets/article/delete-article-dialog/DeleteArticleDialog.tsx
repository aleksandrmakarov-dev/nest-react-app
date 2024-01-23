"use client";
import { useDeleteArticleById } from "@/features/article";
import { DialogBase } from "@/shared";
import { Button } from "@/shared/ui/button";
import { LoadingButton } from "@/shared/ui/loading-button";
import { useState } from "react";

interface DeleteArticleProps {
  trigger: JSX.Element;
  id: string;
}

export function DeleteArticleDialog(props: DeleteArticleProps) {
  const { trigger, id } = props;

  const { mutate, isPending, isError, error } = useDeleteArticleById();
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
      title="Delete article"
      isError={isError}
      error={error?.response?.data.message}
      actions={
        <>
          <Button disabled={isPending} variant="outline" onClick={close}>
            No, keep article
          </Button>
          <LoadingButton
            variant="destructive"
            loading={isPending}
            disabled={isPending}
            onClick={onSubmit}
          >
            Yes, delete article
          </LoadingButton>
        </>
      }
    >
      <p>
        Are you sure you want to delete this article? This action cannot be
        undone.
      </p>
    </DialogBase>
  );
}
