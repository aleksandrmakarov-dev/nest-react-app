import { DashboardHeader } from "@/shared";
import { Button } from "@/shared/ui/button";
import { DashboardToolTable, NewToolDialog } from "@/widgets/tool";
import { useSearchParams } from "react-router-dom";

export default function ToolsPage() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : undefined;

  return (
    <>
      <DashboardHeader
        title="Tools"
        subtitle="View and manage your tools"
        action={<NewToolDialog trigger={<Button>New</Button>} />}
      />
      <DashboardToolTable page={page} />
    </>
  );
}
