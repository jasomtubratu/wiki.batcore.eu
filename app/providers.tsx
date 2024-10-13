"use client";

import "react-toastify/dist/ReactToastify.css"
import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

import ToastComponent from "@/components/ToastComponent";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps} attribute="class" defaultTheme="dark">{children}</NextThemesProvider>

      <ToastComponent />
    </NextUIProvider>
  );
}
