import type { QueryClient } from "@tanstack/react-query";

import { createRouter } from "@tanstack/react-router";

import type { useTRPC } from "@/lib/trpc";

import { routeTree } from "@/routeTree.gen";

export type RouterContext = {
  queryClient: QueryClient | null;
  trpc: ReturnType<typeof useTRPC>;
};

// Create a new router instance
export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
  context: {
    queryClient: null,
    trpc: null,
  } as unknown as RouterContext,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  // eslint-disable-next-line ts/consistent-type-definitions
  interface Register {
    router: typeof router;
  }
}
