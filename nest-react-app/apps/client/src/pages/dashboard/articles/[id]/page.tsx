import { DashboardHeader } from "@/shared";
import { CurrentArticleEditor } from "@/widgets/article";
import { useParams } from "react-router-dom";

export default function ArticlePage() {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <DashboardHeader
        title="Update article"
        subtitle="Manage article content"
      />
      <CurrentArticleEditor id={id!} />
    </>
  );
}
