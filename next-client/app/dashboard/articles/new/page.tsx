import { DashboardHeader } from "@/components/shared";
import { NewArticleEditor } from "@/components/widgets/article";

export default function NewArticlePage() {
  return (
    <>
      <DashboardHeader
        title="Create new article"
        subtitle="Fill required fields to create new article"
      />
      <NewArticleEditor />
    </>
  );
}
