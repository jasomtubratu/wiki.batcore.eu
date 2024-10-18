"use client";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import { IconBrandDiscord } from "@tabler/icons-react";
export default function Footer({isArticle}: {isArticle?: boolean}) {
  return (
    <footer className={`${isArticle ? '' : 'fixed bottom-0'} w-full`}>
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <Divider />
        <div className="flex justify-between items-center py-10">
            <p className="font-light font-bold">
                <span className="">© 2024 BatCore.eu </span>
                s ❤️
            </p>
            <a href="https://batcore.eu/discord" rel="noreferrer noopener" target="_blank" title="Discord">
                <Button isIconOnly variant="light">
                    <IconBrandDiscord size={24} />
                </Button>
            </a>
        </div>
    </div>
    </footer>
  );
}