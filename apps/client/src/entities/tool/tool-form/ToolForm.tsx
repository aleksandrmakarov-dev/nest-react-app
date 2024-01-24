import { EditToolDto, editToolSchema } from "@/lib/dto/tool/edit-tool.dto";
import { ToolFormBody } from "@/entities/tool";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormController } from "@/shared";
import { LoadingButton } from "@/shared/ui/loading-button";

interface ToolFormProps {
  tool?: EditToolDto;
  edit?: boolean;
  isDataLoading?: boolean;
  isSubmitLoading?: boolean;
  isError?: boolean;
  error?: React.ReactNode;
  isSucces?: boolean;
  success?: React.ReactNode;
  submit: (values: EditToolDto) => void;
}

export function ToolForm(props: ToolFormProps) {
  const {
    tool,
    edit,
    isDataLoading,
    isSubmitLoading,
    isError,
    error,
    isSucces,
    success,
    submit,
  } = props;

  const form = useForm<EditToolDto>({
    resolver: zodResolver(editToolSchema),
    defaultValues: {
      name: "",
      userId: "",
    },
    values: tool,
  });

  return (
    <FormController
      form={form}
      submit={submit}
      isError={isError}
      error={error}
      isSuccess={isSucces}
      success={success}
    >
      <div className="flex flex-col gap-y-3">
        <ToolFormBody
          control={form.control}
          isLoading={isDataLoading || isSubmitLoading}
        />
        <div className="flex justify-end w-full mt-3">
          <LoadingButton
            loading={isSubmitLoading}
            disabled={isDataLoading || isSubmitLoading}
            variant="default"
            type="submit"
          >
            {edit ? "Save changes" : "Create"}
          </LoadingButton>
        </div>
      </div>
    </FormController>
  );
}
