"use client";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

// huge thanks to dogakorkmaz https://stackoverflow.com/questions/75902311/next-js-13-and-next-auth-issues-with-usesession-and-sessionprovider
export interface AuthProviderProps {
  children: React.ReactNode;
  session?: Session | null;
}

function AuthProvider({ children, session }: Readonly<AuthProviderProps>) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default AuthProvider;