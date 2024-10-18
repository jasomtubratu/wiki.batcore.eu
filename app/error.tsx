"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error }: ErrorProps) {
  const { data: session, status } = useSession();
  const [path, setPath] = useState("");

  useEffect(() => {
    setPath(window.location.pathname);
  }, []);

  const errorInfo = JSON.stringify(
    {
      route: path,
      message: error.message,
      time: new Date().toISOString(),
      uuid: session?.user.id,
      lang: "en",
      isLogged: status,
    },
    null,
    2
  );

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center p-4 shadow-md rounded">
        <h1 className="text-6xl font-bold text-red-600">500</h1>
        <p className="text-lg font-medium text-gray-600 mt-4">
          Something went wrong on our end.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Please try again later or contact support if the issue persists.
        </p>
        <div className="mt-4">
          <code className="p-2 text-sm">{errorInfo}</code>
        </div>
      </div>
    </div>
  );
}