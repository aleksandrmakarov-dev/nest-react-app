import { prefetchTools } from "@/components/entities/tool";
import { DashboardHeader } from "@/components/shared";
import { Button } from "@/components/shared/ui/button";
import { DashboardToolTable, NewToolDialog } from "@/components/widgets/tool";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

interface ToolsPageContext {
  searchParams: {
    page?: number;
  };
}

export default async function ToolsPage(context: ToolsPageContext) {
  const {
    searchParams: { page },
  } = context;

  const client = await prefetchTools();

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <DashboardHeader
        title="Tools"
        subtitle="View and manage your tools"
        action={<NewToolDialog trigger={<Button>New</Button>} />}
      />
      <DashboardToolTable page={page} />
    </HydrationBoundary>
  );
}
