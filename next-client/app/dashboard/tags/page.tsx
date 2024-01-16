import { prefetchTags } from "@/components/entities/tag";
import { DashboardHeader } from "@/components/shared";
import { Button } from "@/components/shared/ui/button";
import { NewTagDialog, DashboardTagTable } from "@/components/widgets/tag";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

interface TagsPageContext {
  searchParams: {
    page?: number;
  };
}

export default async function TagsPage(context: TagsPageContext) {
  const {
    searchParams: { page },
  } = context;

  const client = await prefetchTags();

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <DashboardHeader
        title="Tags"
        subtitle="View and manage your tags"
        action={<NewTagDialog trigger={<Button>New</Button>} />}
      />
      <DashboardTagTable page={page} />
    </HydrationBoundary>
  );
}
