import { type Metadata } from "next";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import { headers } from "next/headers";
import { ClerkProvider } from "@clerk/nextjs";

import "~/styles/globals.css";

import { TRPCReactProvider } from "~/app/providers";
import { Analytics, TailwindIndicator, ThemeProvider } from "~/components";
import { siteConfig } from "~/config/site";
import { cn } from "~/lib/utils";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
const fontCal = LocalFont({
  src: "../styles/CalSans-SemiBold.woff2",
  variable: "--font-cal",
});

/**
 * Since we're passing `headers()` to the `TRPCReactProvider` we need to
 * make the entire app dynamic. You can move the `TRPCReactProvider` further
 * down the tree (e.g. /dashboard and onwards) to make part of the app statically rendered.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  creator: siteConfig.creator,
  authors: siteConfig.authors,
  keywords: siteConfig.keywords,
  icons: {
    apple: "/apple-touch-icon.png",
    icon: "/android-chrome-192x192.png",
    shortcut: "/favicon.ico",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    url: siteConfig.url,
    type: "website",
    locale: "en_US",
    // images: [
    //   {
    //     url: siteConfig.ogImage,
    //     width: 1200,
    //     height: 630,
    //     alt: siteConfig.name,
    //   },
    // ],
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    // images: [`${siteConfig.url}/og.jpg`],
    // creator: "@example",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ClerkProvider>
        <html lang="en">
          <body
            className={cn(
              "min-h-screen bg-background font-sans antialiased",
              fontSans.variable,
              fontCal.variable,
            )}
          >
            <TRPCReactProvider headers={headers()}>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
              >
                {children}

                <Analytics />
                <TailwindIndicator />
              </ThemeProvider>
            </TRPCReactProvider>
          </body>
        </html>
      </ClerkProvider>
    </>
  );
}
