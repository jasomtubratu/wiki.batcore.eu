"use client";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { Emoji } from "emoji-picker-react";
import Link from "next/link";

import { title, subtitle } from "@/components/primitives";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/main/footer";
import { useRouterWithLoader } from "@/components/useRouterNprogress";

interface Article {
  id: string;
  title: string;
  emoji: string;
}

interface CategorizedArticles {
  vps: Article[];
  minecraft: Article[];
  others: Article[];
}

export default function Home({
  articles,
}: {
  articles: CategorizedArticles;
}) {
  const router = useRouterWithLoader();

  const renderArticles = (category: keyof CategorizedArticles, label: string, path: string) => (
    <Card
      isBlurred
      className="border-gray-500/100 border-2 bg-background/60 dark:bg-default-100/50 hover:border-indigo-500/100 transform transition duration-500 hover:scale-110 max-w-64"
    >
      <CardHeader>
        <h1 className="font-bold text-xl">{label}</h1>
      </CardHeader>
      <CardBody>
        {articles[category].map((article: Article) => (
          <Link key={article.id} href={`/article/${article.id}`}>
            <p className="flex my-1">
              <Emoji size={25} unified={article.emoji} />
              {"⠀"}
              {article.title}
            </p>  
          </Link>
        ))}
      </CardBody>
      <CardFooter>
        <Link href={`/category/${path}`} onClick={() => router.push(`/category/${path}`, undefined)}>
          <p className="text-blue-500 text-sm">Prečítať viac</p>
        </Link>
      </CardFooter>
    </Card>
  );

  return (
    <>
      <Navbar />
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 ">

        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Znalostná Databáza&nbsp;</h1>
          <h1 className={title({ color: "blue" })}>BatCore.eu&nbsp;</h1>

          <h2 className={subtitle({ class: "mt-4" })}>Ako ti môžeme dnes pomôcť?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {renderArticles("vps", "🖥️ VPS", "vps")}
              {renderArticles("minecraft", "🥦 Minecraft", "minecraft")}
              {renderArticles("others", "📙 Ostatné", "others")}
        </div>
      </section>
      <Footer />
    </>
  );
}