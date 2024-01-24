import { ProjectForm, useProjectById } from "@/entities/project";
import { useUpdateProjectById } from "@/features/project";
import { EditProjectDto } from "@/lib/dto/project/edit-project.dto";

interface CurrentProjectEditorProps {
  id: string;
}

export function CurrentProjectEditor(props: CurrentProjectEditorProps) {
  const { id } = props;

  const {
    data,
    isLoading: isDataLoading,
    isError: isDataError,
    error: dataError,
  } = useProjectById(id);

  const {
    mutate,
    isPending: isUpdateLoading,
    isError: isUpdateError,
    error: updateError,
    isSuccess: isUpdateSucess,
  } = useUpdateProjectById();

  const onSubmit = (values: EditProjectDto) => {
    mutate({
      id: id,
      values: values,
    });
  };

  return (
    <ProjectForm
      project={
        data
          ? {
              ...data,
              toolIds: data.tools.map((t) => t.id),
              userId: data.userId,
            }
          : undefined
      }
      isDataLoading={isDataLoading}
      isSubmitLoading={isUpdateLoading}
      submit={onSubmit}
      isError={isDataError || isUpdateError}
      error={
        dataError?.response?.data.message || updateError?.response?.data.message
      }
      isSucces={isUpdateSucess}
      success={<p>Project has been updated.</p>}
      edit
    />
  );
}
