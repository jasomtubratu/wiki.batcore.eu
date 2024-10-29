"use client";

import { Button } from "@nextui-org/button";
import { IconAlertTriangle } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error }: ErrorProps) {
  const [path, setPath] = useState("");

  useEffect(() => {
    setPath(window.location.pathname);
  }, []);

  const errorInfo = JSON.stringify(
    {
      route: path,
      message: error.message,
    },
    null,
    2
  );

  useEffect(() => {
    console.log(errorInfo);
  }, [errorInfo]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <IconAlertTriangle className="mx-auto h-12 w-12 text-yellow-400" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Ups..</h2>
          <p className="mt-2 text-sm text-gray-600">
            Niečo sa pokazilo pri načítaní stránky.
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <p className="text-md text-gray-500">
            Veľmi nás to mrzí. Kontaktujte nás ak sa problém bude opakovať.
          </p>
          <div className="flex justify-center">
            <Button
              color="primary"
              variant="flat"
              onClick={() => window.location.reload()}
            >
              Skúsiť znova
            </Button>
          </div>
          <div>
            <Link
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              href="/"
            >
              Vrátiť sa!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
