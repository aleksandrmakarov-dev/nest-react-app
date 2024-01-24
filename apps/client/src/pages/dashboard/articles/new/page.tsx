import { DashboardHeader } from "@/shared";
import { NewArticleEditor } from "@/widgets/article";

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
