"use client"
import { Suspense } from "react";

export interface ProvidersProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: ProvidersProps) {
    return (
        <Suspense>
            {children}
        </Suspense>
    )
}