"use client";

import { Card, Spinner } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { useEffect } from "react";


export default function LogOut() {
  useEffect(() => {
    signOut({
      redirect: true,
      callbackUrl: process.env.NEXT_PUBLIC_APP_URL,
    });
  }, []);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md p-6 shadow-lg rounded-lg">
          <div className="flex items-center justify-center">
            <Spinner color="primary" size="lg" />
            <h1 className="ml-4 text-lg">
              Prebieha odhlásenie...
            </h1>
          </div>
        </Card>
      </div>
    </>
  );
}