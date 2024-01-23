import { DashboardHeader } from "@/shared";
import { NewProjectEditor } from "@/widgets/project";

export default function NewProjectPage() {
  return (
    <>
      <DashboardHeader
        title="Create new project"
        subtitle="Fill required fields to create new project"
      />
      <NewProjectEditor />
    </>
  );
}
