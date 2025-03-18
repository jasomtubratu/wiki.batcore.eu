"use client";
import { Input, Card, CardHeader, CardFooter } from "@nextui-org/react";
import Link from "next/link";
import { IconSearch, IconUser } from "@tabler/icons-react";
import { useState } from "react";
import { Emoji } from "emoji-picker-react";

import { Navbar } from "@/components/navbar";
import Footer from "@/components/main/footer";

interface Article {
  id: string;
  title: string;
  updatedAt: Date;
  emoji: string;
  customUrl: string;
  count: number;
}

export default function CategoryComponent({
  articles,
  category,
}: {
  articles: Article[];
  category: string;
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div
        aria-hidden="true"
        className="absolute inset-0 h-max w-full m-auto grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
      >
        <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
        <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
      </div>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">
          {category === "minecraft" && "Minecraft"}
          {category === "vps" && "VPS"}
          {category === "ostatne" && "Ostatné"}
        </h1>
        <div className="relative mb-6">
          <Input
            className=""
            placeholder="Vyhľadať v kategórii..."
            startContent={<IconSearch />}
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="grid gap-4">
          {filteredArticles
            .sort(
              (a, b) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime()
            )
            .map((article, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="text-sm font-medium">
                    <Link
                      className="hover:underline"
                      href={`/article/${article.customUrl}`}
                    >
                      <div className="flex gap-2">
                        <Emoji size={20} unified={article.emoji} />
                        {article.title}
                      </div>
                    </Link>
                  </div>
                  <div className="flex items-center space-x-2">
                    <IconUser color="gray" size={18} />
                    <p className="text-gray-500 text-sm">{article.count}</p>
                  </div>
                </CardHeader>
                <CardFooter>
                  <p className="text-xs text-muted-foreground">
                    Posledná úprava:{" "}
                    {new Date(article.updatedAt).toLocaleDateString([], {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}{" "}
                    {new Date(article.updatedAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
