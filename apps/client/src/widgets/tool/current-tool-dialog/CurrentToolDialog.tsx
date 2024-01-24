import { ToolForm, useToolById } from "@/entities/tool";
import { useUpdateToolById } from "@/features/tool";
import { DialogBase } from "@/shared";
import { EditToolDto } from "@/lib/dto/tool/edit-tool.dto";
import { useState } from "react";

interface CurrentToolProps {
  id: string;
  trigger: JSX.Element;
}

export function CurrentToolDialog(props: CurrentToolProps) {
  const { trigger, id } = props;

  const {
    data,
    isLoading: isDataLoading,
    isError: isDataError,
    error: dataError,
  } = useToolById(id);

  const {
    mutate,
    isPending: isUpdateLoading,
    isError: isUpdateError,
    error: updateError,
  } = useUpdateToolById();
  const [open, setOpen] = useState<boolean>(false);

  const close = () => setOpen(false);

  const onSubmit = (values: EditToolDto) => {
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
      title="Update Tool"
    >
      <ToolForm
        tool={data}
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
