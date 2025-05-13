import type { ReactNode } from "react";

import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "@/lib/query-client";
import { TRPCProvider as PrimaryTRPCProvider, trpcClient } from "@/lib/trpc";

export function TRPCProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <PrimaryTRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {children}
      </PrimaryTRPCProvider>
    </QueryClientProvider>
  );
}
