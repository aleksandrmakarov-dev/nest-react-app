import { TagForm } from "@/entities/tag";
import { useCreateTag } from "@/features/tag";
import { DialogBase } from "@/shared";
import { useAuth } from "@/context/auth-provider/AuthProvider";
import { EditTagDto } from "@/lib/dto/tag/edit-tag.dto";
import { useState } from "react";

interface NewTagProps {
  trigger: JSX.Element;
}

export function NewTagDialog(props: NewTagProps) {
  const { trigger } = props;

  const { session } = useAuth();

  const { mutate, isPending, isError, error } = useCreateTag();
  const [open, setOpen] = useState<boolean>(false);

  const close = () => setOpen(false);

  const onSubmit = (values: EditTagDto) => {
    mutate(values, {
      onSuccess: () => close(),
    });
  };

  return (
    <DialogBase
      open={open}
      setOpen={setOpen}
      trigger={trigger}
      title="Create Tag"
    >
      <TagForm
        isError={isError}
        error={error?.response?.data.message}
        isSubmitLoading={isPending}
        submit={onSubmit}
        tag={{
          name: "",
          userId: session?.id ?? "",
        }}
      />
    </DialogBase>
  );
}
