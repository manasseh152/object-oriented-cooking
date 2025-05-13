import { RouterProvider } from "@tanstack/react-router";

import { ThemeProvider } from "@/components/providers/theme";
import { router } from "@/lib/router";

import { LanguageProvider } from "./language";
import { TRPCProvider } from "./trpc";

export function Provider() {
  return (
    <LanguageProvider>
      <TRPCProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </TRPCProvider>
    </LanguageProvider>
  );
}
