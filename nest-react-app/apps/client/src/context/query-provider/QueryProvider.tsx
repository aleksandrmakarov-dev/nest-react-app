import { QueryClientConfig } from "@/lib/query-client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function QueryProvider(props: { children: React.ReactNode }) {
  const [queryClient] = useState<QueryClient>(
    () => new QueryClient(QueryClientConfig)
  );

  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
}
