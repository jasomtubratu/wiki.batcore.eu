"use client";
import { Button, Card, CardBody, CardHeader, Divider, Input } from "@nextui-org/react";
import { IconArrowRight, IconBook2, IconBrandMinecraft, IconQuestionMark, IconSearch, IconServer } from "@tabler/icons-react";
import { Emoji } from "emoji-picker-react";

import { Navbar } from "@/components/navbar";
import Footer from "@/components/main/footer";
import { useRouterWithLoader } from "@/components/useRouterNprogress";

type Article = {
  id: string;
  title: string;
  emoji: string;
  category: string;
  updatedAt: Date;
};

type CategorizedArticles = {
  [x: string]: any;
  vps: Article[];
  minecraft: Article[];
  others: Article[];
};

export default function Home({
  articles,
}: {
  articles: CategorizedArticles;
}) {
  const router = useRouterWithLoader();

  const getCount = (category: keyof CategorizedArticles) => articles[category].length;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">
              Znalostná Databáza BatCore.eu
            </h1>
            <p className="text-xl mb-8">
              Vyhľadajte odpoveď na svoju otázku alebo sa dozviete viac o našich službách.
            </p>
            <div className="max-w-2xl mx-auto flex">
              <Input className="flex-grow" placeholder="Zadajte text pre vyhľadávanie..." startContent={<IconSearch/> } type="text"/>
            </div>
          </div>
        </section>

        <Divider />

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Kategórie
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: IconServer, title: "VPS servery", count: getCount("vps") },
                { icon: IconBrandMinecraft, title: "Minecraft servery", count: getCount("minecraft") },
                { icon: IconQuestionMark, title: "Ostatné", count: getCount("others") },
              ].map((category, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center space-x-4">
                    <category.icon className="h-8 w-8 text-primary" />
                    <div>
                      {category.title}
                      <p className="text-sm text-muted-foreground">{category.count} článkov</p>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <Button className="p-0" variant="shadow" onClick={() => router.push("/category/" + category.title, undefined)}>
                      Pozrieť články <IconArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Posledné články
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Object.values(articles)
                .flat()
                .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                .slice(0, 6)
                .map((article: Article, index: number) => (
                  <Card key={index}>
                    <CardHeader className="flex justify-between items-center">
                      <div className="flex gap-2 items-center">
                        <Emoji size={20} unified={article.emoji} />
                        <h1 className="text-lg">{article.title}</h1>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          {article.updatedAt.toLocaleDateString()} {article.updatedAt.toLocaleTimeString()}
                        </p>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <Button className="p-0" variant="ghost" onClick={() => router.push("/article/" + article.id, undefined)}>
                        Prečítať článok <IconBook2 className="h-4 w-4 ml-1" />
                      </Button>
                    </CardBody>
                  </Card>
                ))}
            </div>
          </div>
        </section>
      </main>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}