import { DashboardHeader } from "@/shared";
import { Button } from "@/shared/ui/button";
import { NewTagDialog, DashboardTagTable } from "@/widgets/tag";
import { useSearchParams } from "react-router-dom";

export default function TagsPage() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : undefined;

  return (
    <>
      <DashboardHeader
        title="Tags"
        subtitle="View and manage your tags"
        action={<NewTagDialog trigger={<Button>New</Button>} />}
      />
      <DashboardTagTable page={page} />
    </>
  );
}
