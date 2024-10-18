"use client";
import { Input, Card, CardHeader, Divider, CardBody } from "@nextui-org/react";
import { Emoji } from "emoji-picker-react";
import Link from "next/link";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";

import { Navbar } from "@/components/navbar";
import { title, subtitle } from "@/components/primitives";
import Footer from "@/components/main/footer";
interface Article {
  id: string;
  title: string;
  createdAt: Date;
  emoji: string;
}

export default function CategoryComponent({
  articles,
  category,
}: {
  articles: Article[];
  category: string;
}) {
  const [search, setSearch] = useState("");

  return (
    <>
      <Navbar />
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title({ color: "blue" })}>
            {category.toString().toUpperCase()}&nbsp;
          </h1>
        </div>

        <Input
          classNames={{
            base: "max-w-full sm:max-w-[20rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Píš pre vyhľadávanie...."
          size="sm"
          startContent={<IconSearch size={18} />}
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Divider />

        <div className="grid grid-cols-1 md:grid-cols-2">
          {articles
            .filter((article: Article) =>
              article.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((article: Article) => (
              <Link key={article.id} href={"/article/" + article.id}>
                <Card className="w-60 md:w-96 my-1 order-gray-500/100 border-2 bg-background/60 dark:bg-default-100/50 hover:border-indigo-500/100 transform transition duration-500 hover:scale-110">
                  <CardHeader>
                    <h1 className="flex">
                      {<Emoji size={30} unified={article.emoji} />}
                      {"⠀"}
                      <div>
                        <h1 className="font-bold text-xl">{article.title}</h1>
                        <p className="text-sm text-gray-500">
                          {new Date(article.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </h1>
                  </CardHeader>
                  <Divider />
                </Card>
              </Link>
            ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
