"use client";
import { Input, Card, CardHeader, CardFooter } from "@nextui-org/react";
import Link from "next/link";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";

import { Emoji } from "emoji-picker-react";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/main/footer";
interface Article {
  id: string;
  title: string;
  updatedAt: Date;
  emoji: string;
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

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">
          {category.charAt(0).toUpperCase() + category.slice(1)}
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
          {filteredArticles.map((article, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="text-sm font-medium">
                  <Link
                    className="hover:underline"
                    href={`/article/${article.id}`}
                  >
                    <div className="flex gap-2">
                    <Emoji size={20} unified={article.emoji} />
                    {article.title}
                    </div>
                  </Link>
                </div>
              </CardHeader>
              <CardFooter>
                <p className="text-xs text-muted-foreground">
                  Posledná úprava: {" "}
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
