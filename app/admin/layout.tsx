"use client"
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export interface ProvidersProps {
  children: React.ReactNode;
}
import { Layout } from "@/components/admin/layout/layout";

export interface ProvidersProps {
    children: React.ReactNode;
    themeProps?: ThemeProviderProps;
}

export default function RootLayout({ children, themeProps }: ProvidersProps) {
    const { status } = useSession();
    const router = useRouter();

    if (status === "unauthenticated") {
        router.push("/");
    
        return <></>;
      }

    return (
        <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="system" {...themeProps}>
                <Layout>
                    <div className="h-full w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] ">
                        <div className="absolute pointer-events-none inset-0 flex [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" /> {/* dark:bg-black bg-white */}
                        {children}
                    </div>
                </Layout>

            </NextThemesProvider>
        </NextUIProvider>
    );
}