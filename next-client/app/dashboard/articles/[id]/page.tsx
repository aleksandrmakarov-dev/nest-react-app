import { DashboardHeader } from "@/components/shared";
import { CurrentArticleEditor } from "@/components/widgets/article";

interface ArticleEditPageContext {
  params: {
    id: string;
  };
}

export default function ArticlePage(context: ArticleEditPageContext) {
  const { params } = context;

  return (
    <>
      <DashboardHeader
        title="Update article"
        subtitle="Manage article content"
      />
      <CurrentArticleEditor id={params.id} />
    </>
  );
}
