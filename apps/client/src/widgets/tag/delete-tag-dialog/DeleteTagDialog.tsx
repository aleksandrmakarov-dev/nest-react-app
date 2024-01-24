import { useDeleteTagById } from "@/features/tag";
import { DialogBase } from "@/shared";
import { Button } from "@/shared/ui/button";
import { LoadingButton } from "@/shared/ui/loading-button";
import { useState } from "react";

interface DeleteTagProps {
  trigger: JSX.Element;
  id: string;
}

export function DeleteTagDialog(props: DeleteTagProps) {
  const { trigger, id } = props;

  const { mutate, isPending, isError, error } = useDeleteTagById();
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
      title="Delete tag"
      isError={isError}
      error={error?.response?.data.message}
      actions={
        <>
          <Button disabled={isPending} variant="outline" onClick={close}>
            No, keep tag
          </Button>
          <LoadingButton
            variant="destructive"
            loading={isPending}
            disabled={isPending}
            onClick={onSubmit}
          >
            Yes, delete tag
          </LoadingButton>
        </>
      }
    >
      <p>
        Are you sure you want to delete this tag? This action cannot be undone.
      </p>
    </DialogBase>
  );
}
