import { createRootRouteWithContext, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useTranslation } from "react-i18next";

import type { RouterContext } from "@/lib/router";

import { LanguageSelector } from "@/components/language-selector";
import { ThemeSelector } from "@/components/theme-selector";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});

function RootLayout() {
  const { t } = useTranslation("root-layout");

  return (
    <>
      <nav className="w-full flex flex-col bg-background text-foreground" role="navigation">
        <div className="flex items-center gap-1">
          <ul className="flex gap-1" aria-label="External Links">
            <li>
              <a
                className="flex text-foreground hover:underline p-4"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("learnReact")}
              </a>
            </li>
            <li>
              <a
                className="flex text-foreground hover:underline p-4"
                href="https://tanstack.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("learnTanStack")}
              </a>
            </li>
          </ul>
          <Separator orientation="vertical" />
          <ul className="flex gap-1" aria-label="Internal Links">
            <li>
              <Link
                className="flex text-foreground hover:underline p-4"
                activeProps={{ className: "text-primary underline" }}
                to="/"
              >
                {t("navigation.home")}
              </Link>
            </li>
            <li>
              <Link
                className="flex text-foreground hover:underline p-4"
                activeProps={{ className: "text-primary underline" }}
                to="/forms"
              >
                {t("navigation.forms")}
              </Link>
            </li>
          </ul>
          <div className="ml-auto flex items-center gap-1 pe-2">
            <ul className="flex gap-1" aria-label="Settings">
              <li>
                <ThemeSelector />
              </li>
              <li>
                <LanguageSelector />
              </li>
            </ul>
          </div>
        </div>
        <Separator />
      </nav>
      <Outlet />
      <TanStackRouterDevtools />
      <Toaster position="bottom-right" richColors />
    </>
  );
}
