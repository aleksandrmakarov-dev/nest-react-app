import { Input } from "@/components/shared/ui/input";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export function ArticleFilter() {
  return <Input className="mb-3" startIcon={faSearch} placeholder="Search" />;
}
