import { DashboardHeader } from "@/components/shared";
import { NewProjectEditor } from "@/components/widgets/project";

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
