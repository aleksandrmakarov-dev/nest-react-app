"use client";
import { FieldController, FormController } from "@/components/shared";
import { Input } from "@/components/shared/ui/input";
import {
  ArticleFilterDto,
  articleFilterSchema,
} from "@/lib/dto/article/article-filter.dto";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

interface ArticleFilterProps {
  query?: string;
}

export function ArticleFilter(props: ArticleFilterProps) {
  const { query } = props;

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

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

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <FormController form={form} submit={onSubmit}>
      <FieldController
        control={form.control}
        name="query"
        render={({ field }) => (
          <Input
            type="search"
            startIcon={faSearch}
            placeholder="Search"
            {...field}
          />
        )}
      />
    </FormController>
  );
}
