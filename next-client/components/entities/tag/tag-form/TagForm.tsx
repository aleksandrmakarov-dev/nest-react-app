"use client";
import { EditTagDto, editTagSchema } from "@/lib/dto/tag/edit-tag.dto";
import { TagFormBody } from "@/components/entities/tag";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormController } from "@/components/shared";
import { LoadingButton } from "@/components/shared/ui/loading-button";

interface TagFormProps {
  tag?: EditTagDto;
  edit?: boolean;
  isDataLoading?: boolean;
  isSubmitLoading?: boolean;
  isError?: boolean;
  error?: React.ReactNode;
  isSucces?: boolean;
  success?: React.ReactNode;
  submit: (values: EditTagDto) => void;
}

export function TagForm(props: TagFormProps) {
  const {
    tag,
    edit,
    isDataLoading,
    isSubmitLoading,
    isError,
    error,
    isSucces,
    success,
    submit,
  } = props;

  const form = useForm<EditTagDto>({
    resolver: zodResolver(editTagSchema),
    defaultValues: {
      name: "",
      userId: "",
    },
    values: tag,
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
        <TagFormBody
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
