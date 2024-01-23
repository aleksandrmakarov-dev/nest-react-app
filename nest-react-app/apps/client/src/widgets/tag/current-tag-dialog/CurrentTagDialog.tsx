import { TagForm, useTagById } from "@/entities/tag";
import { useUpdateTagById } from "@/features/tag";
import { DialogBase } from "@/shared";
import { EditTagDto } from "@/lib/dto/tag/edit-tag.dto";
import { useState } from "react";

interface CurrentTagProps {
  id: string;
  trigger: JSX.Element;
}

export function CurrentTagDialog(props: CurrentTagProps) {
  const { trigger, id } = props;

  const {
    data,
    isLoading: isDataLoading,
    isError: isDataError,
    error: dataError,
  } = useTagById(id);

  const {
    mutate,
    isPending: isUpdateLoading,
    isError: isUpdateError,
    error: updateError,
  } = useUpdateTagById();
  const [open, setOpen] = useState<boolean>(false);

  const close = () => setOpen(false);

  const onSubmit = (values: EditTagDto) => {
    mutate(
      { id: id, values: values },
      {
        onSuccess: () => close(),
      }
    );
  };

  return (
    <DialogBase
      open={open}
      setOpen={setOpen}
      trigger={trigger}
      title="Update Tag"
    >
      <TagForm
        tag={data}
        isDataLoading={isDataLoading}
        isSubmitLoading={isUpdateLoading}
        submit={onSubmit}
        isError={isDataError || isUpdateError}
        error={
          dataError?.response?.data.message ||
          updateError?.response?.data.message
        }
        edit
      />
    </DialogBase>
  );
}
