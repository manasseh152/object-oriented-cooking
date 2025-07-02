import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import type { RouterContext } from "@/lib/router";

import { Toaster } from "@/components/ui/sonner";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});

export function RootLayout() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools position="bottom-left" />
      <ReactQueryDevtools />
      <Toaster position="bottom-right" richColors />
    </>
  );
}
