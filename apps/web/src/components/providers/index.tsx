import { RouterProvider } from "@/components/providers/router";
import { ThemeProvider } from "@/components/providers/theme";
import { TRPCProvider } from "@/components/providers/trpc";

export function Provider() {
  return (
    <TRPCProvider>
      <ThemeProvider>
        <RouterProvider />
      </ThemeProvider>
    </TRPCProvider>
  );
}
