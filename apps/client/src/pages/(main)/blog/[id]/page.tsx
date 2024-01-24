import { ArticleContent } from "@/widgets/article";
import { useParams } from "react-router-dom";

export default function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  return <ArticleContent id={id!} />;
}
