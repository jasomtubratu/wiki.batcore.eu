import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";

import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "BatCore.eu - Znalostná Databáza",
  description: "Potrebuješ nejakú pomoc? Tu ti ukážame tie najčastajšie problémy spojené s Batcorom!",
  icons: {
    icon: "/favicon.ico",
  },
};

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children } :any) {
  return (
    <html lang="sk">
      <body className={inter.className}>
        <Providers>
          <Suspense fallback={<div>Loading....</div>}>
          {children}
          </Suspense>
          </Providers>
      </body>
    </html>
  );
}