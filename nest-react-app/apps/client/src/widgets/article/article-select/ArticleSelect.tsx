import { useArticles } from "@/entities/article";
import { Select } from "@/shared";

interface ArticleSelectProps {
  value?: string;
  onChange: (value: string | undefined) => void;
  disabled?: boolean;
}

export function ArticleSelect(props: ArticleSelectProps) {
  const { data } = useArticles({
    size: -1,
  });

  return (
    <Select
      options={data?.items ?? []}
      getLabel={(option) => option.title}
      getValue={(option) => option.id}
      renderInput={(o) => !Array.isArray(o) && <span>{o?.title}</span>}
      renderOption={(option) => <span>{option.title}</span>}
      close
      {...props}
    />
  );
}
