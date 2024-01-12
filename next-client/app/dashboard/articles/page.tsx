import { DashboardHeader } from "@/components/shared";
import { DashboardArticleTable } from "@/components/widgets/article";

interface ArticlesPageContext {
  searchParams: {
    page?: number;
  };
}

export default function ArticlesPage(context: ArticlesPageContext) {
  const { searchParams } = context;

  return (
    <div>
      <DashboardHeader
        title="Articles"
        subtitle="View and manage your articles"
      />
      <DashboardArticleTable page={searchParams.page} />
    </div>
  );
}
