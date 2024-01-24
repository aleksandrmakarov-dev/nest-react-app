import { DashboardHeader } from "@/shared";
import { CurrentProjectEditor } from "@/widgets/project";
import { useParams } from "react-router-dom";

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <DashboardHeader
        title="Update project"
        subtitle="Manage project content"
      />
      <CurrentProjectEditor id={id!} />
    </>
  );
}
