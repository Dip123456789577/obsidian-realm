import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">Beyond the Wall</p>
        <h1 className="mt-4 font-display text-7xl text-gold-gradient">404</h1>
        <h2 className="mt-4 font-serif text-2xl text-foreground">Beyond the Realm</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The chronicles you seek do not exist in this realm.
        </p>
        <div className="mt-8">
          <Link to="/" className="btn-royal">Return to the Realm</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">The Magic Failed</p>
        <h1 className="mt-4 font-serif text-2xl text-foreground">This page did not load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something disturbed the currents. Try again or return home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="btn-royal"
          >
            Try again
          </button>
          <a href="/" className="btn-ghost-royal">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Chronicles of the Realm — Legends of the Realm" },
      { name: "description", content: "An epic cinematic fantasy saga of dragons, kingdoms, and shattered crowns. Enter the realm of Chronicles of the Realm." },
      { name: "author", content: "Chronicles of the Realm Studios" },
      { property: "og:title", content: "Chronicles of the Realm — Epic Fantasy Saga" },
      { property: "og:description", content: "A realm forged in blood. A crown claimed in fire. Enter the cinematic world of Chronicles of the Realm." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
