"use client";

import { Button } from "@nextui-org/button";
import { IconAlertTriangle } from "@tabler/icons-react";
import Link from "next/link";


export default function Error404() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <IconAlertTriangle className="mx-auto h-12 w-12 text-yellow-400" />
          <h2 className="mt-6 text-3xl font-extrabold">Kde to som?!</h2>
          <p className="mt-2 text-sm text-gray-600">
            Táto stránka by nemala existovať...
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <p className="text-md">
            Ak si myslíte, že ide o chybu, kontaktujte nás.
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
