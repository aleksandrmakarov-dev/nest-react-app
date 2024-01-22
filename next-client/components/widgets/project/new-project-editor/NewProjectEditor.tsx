"use client";

import { ProjectForm } from "@/components/entities/project";
import { useCreateProject } from "@/components/features/project";
import { useAuth } from "@/context/auth-provider/AuthProvider";
import { EditProjectDto } from "@/lib/dto/project/edit-project.dto";

export function NewProjectEditor() {
  const { mutate, isPending, isError, error, isSuccess, data } =
    useCreateProject();

  const { session, isLoading: isSessionLoading } = useAuth();

  const onSubmit = (values: EditProjectDto) => {
    mutate(values);
  };

  return (
    <ProjectForm
      submit={onSubmit}
      isSubmitLoading={isPending}
      isDataLoading={isSessionLoading}
      isError={isError}
      error={error?.response?.data.message}
      isSucces={isSuccess}
      success={<p>Project has been created.</p>}
      project={{
        title: "",
        description: "",
        image: "",
        featured: undefined,
        articleId: "",
        userId: session?.id!,
        label: "",
        url: "",
        toolIds: [],
      }}
    />
  );
}
