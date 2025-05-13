import type { AppRouter } from "@repo/api/routers";
import type { QueryClient } from "@tanstack/react-query";
import type { TRPCClient } from "@trpc/client";

import { createRouter } from "@tanstack/react-router";

import { queryClient } from "@/lib/query-client";
import { trpcClient } from "@/lib/trpc";
import { routeTree } from "@/routeTree.gen";

export type RouterContext = {
  queryClient: QueryClient;
  trpcClient: TRPCClient<AppRouter>;
};

// Create a new router instance
export const router = createRouter({
  routeTree,
  context: {
    queryClient,
    trpcClient,
  } satisfies RouterContext,
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  // eslint-disable-next-line ts/consistent-type-definitions
  interface Register {
    router: typeof router;
  }
}
