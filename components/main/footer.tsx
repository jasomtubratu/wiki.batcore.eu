"use client";
import { Divider } from "@nextui-org/divider";

export default function Footer() {
  return (
    <footer className="w-full py-8">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 container">
        <Divider />
        <div className="flex justify-between items-center py-10">
          <p className="font-light font-bold">
            <span className="">© 2024 BatCore.eu </span>s ❤️
          </p>
          <div className="flex align-center">
            <a
              className="text-gray-500 hover:text-gray-700"
              href="/Zasady_ochrany_osobnych_udajov_BatCore.pdf"
            >
              Zásady ochrany osobných údajov
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
