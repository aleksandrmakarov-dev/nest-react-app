import { FieldController, FormController } from "@/shared";
import { Input } from "@/shared/ui/input";
import {
  ArticleFilterDto,
  articleFilterSchema,
} from "@/lib/dto/article/article-filter.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

interface ArticleFilterProps {
  query?: string | null;
}

export function ArticleFilter(props: ArticleFilterProps) {
  const { query } = props;

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const form = useForm<ArticleFilterDto>({
    resolver: zodResolver(articleFilterSchema),
    defaultValues: {
      query: "",
    },
    values: {
      query: query ?? "",
    },
  });

  const onSubmit = (values: ArticleFilterDto) => {
    const params = new URLSearchParams(searchParams);

    values.query && values.query.length > 0
      ? params.set("query", values.query)
      : params.delete("query");

    navigate(`${location.pathname}?${params.toString()}`);
  };

  return (
    <FormController form={form} submit={onSubmit}>
      <FieldController
        control={form.control}
        name="query"
        render={({ field }) => (
          <Input type="search" placeholder="Search" {...field} />
        )}
      />
    </FormController>
  );
}
