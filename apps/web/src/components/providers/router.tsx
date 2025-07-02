import { useQueryClient } from "@tanstack/react-query";
import { RouterProvider as PrimaryRouterProvider } from "@tanstack/react-router";

import { router } from "@/lib/router";
import { useTRPC } from "@/lib/trpc";

export function RouterProvider() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return (
    <PrimaryRouterProvider
      router={router}
      context={{ trpc, queryClient }}
    />
  );
}
