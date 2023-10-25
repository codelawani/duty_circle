import type { Metadata } from "next";
import { NextAuthProvider } from "./providers";
import { Analytics } from "@vercel/analytics/react";
import { siteConfig } from "../config/site";
import { fontSans } from "../lib/fonts";
import { cn } from "../lib/utils";
import { SiteHeader } from "../components/site-header";
import { ThemeProvider } from "../components/theme-provider";

import "../styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          fontSans.variable
        )}
      >
        <NextAuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {/* <Header /> */}
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <div className="flex-1">{children}</div>
            </div>
          </ThemeProvider>
          <Analytics />
        </NextAuthProvider>
      </body>
    </html>
  );
}
