"use client";
import {
  EditProjectDto,
  editProjectSchema,
} from "@/lib/dto/project/edit-project.dto";
import { ProjectFormBody } from "@/components/entities/project";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormController } from "@/components/shared";
import { LoadingButton } from "@/components/shared/ui/loading-button";

interface ProjectFormProps {
  project?: EditProjectDto;
  edit?: boolean;
  isDataLoading?: boolean;
  isSubmitLoading?: boolean;
  isError?: boolean;
  error?: React.ReactNode;
  isSucces?: boolean;
  success?: React.ReactNode;
  submit: (values: EditProjectDto) => void;
}

export function ProjectForm(props: ProjectFormProps) {
  const {
    project,
    edit,
    isDataLoading,
    isSubmitLoading,
    isError,
    error,
    isSucces,
    success,
    submit,
  } = props;

  const form = useForm<EditProjectDto>({
    resolver: zodResolver(editProjectSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      toolIds: [],
      articleId: "",
      featured: false,
      userId: "",
      label: "",
      url: "",
    },
    values: project,
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
        <ProjectFormBody
          control={form.control}
          isLoading={isDataLoading || isSubmitLoading}
        />
        <div className="flex justify-end w-full">
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
