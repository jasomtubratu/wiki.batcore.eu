import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { Providers } from "./providers";
import AuthProvider from "./AuthProvider";

export const metadata: Metadata = {
  title: "BatCore.eu - Znalostná Databáza",
  description:
    "Potrebuješ nejakú pomoc? Tu ti ukážame tie najčastajšie problémy spojené s Batcorom!",
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

export default function RootLayout({ children }: any) {
  return (
    <html lang="sk">
      <body className={inter.className}>
        <AuthProvider>
          <Providers>
          <div aria-hidden="true" className="absolute inset-0 h-max w-full m-auto grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20 z-20">
                        <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
                        <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
                    </div>
            {children}
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
