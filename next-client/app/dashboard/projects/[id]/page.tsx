import { DashboardHeader } from "@/components/shared";
import { CurrentProjectEditor } from "@/components/widgets/project";

interface ProjectEditPageContext {
  params: {
    id: string;
  };
}

export default function ProjectPage(context: ProjectEditPageContext) {
  const { params } = context;

  return (
    <>
      <DashboardHeader
        title="Update project"
        subtitle="Manage project content"
      />
      <CurrentProjectEditor id={params.id} />
    </>
  );
}
