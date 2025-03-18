"use client";
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteSection,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import {
  IconArrowRight,
  IconBook2,
  IconBrandMinecraft,
  IconQuestionMark,
  IconSearch,
  IconServer,
  IconUser,
} from "@tabler/icons-react";
import { Emoji } from "emoji-picker-react";
import { motion } from "framer-motion";

import { Navbar } from "@/components/navbar";
import Footer from "@/components/main/footer";
import { useRouterWithLoader } from "@/components/useRouterNprogress";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { ShootingStars } from "@/components/ui/shooting-stars";

type Article = {
  id: string;
  title: string;
  emoji: string;
  category: string;
  customUrl: string;
  viewCount: number;
  updatedAt: Date;
};

type CategorizedArticles = {
  [x: string]: any;
  vps: Article[];
  minecraft: Article[];
  others: Article[];
};

export default function Home({ articles }: { articles: CategorizedArticles }) {
  const router = useRouterWithLoader();

  const getCount = (category: keyof CategorizedArticles) =>
    articles[category].length;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <ShootingStars />
      <div
        aria-hidden="true"
        className="absolute inset-0 h-max w-full m-auto grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
      >
        <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
        <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
      </div>
      <main className="flex-grow">
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              className="text-4xl font-bold mb-4"
              initial={{ y: 5, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              whileInView={{
                y: 0,
                opacity: 1,
              }}
            >
              Znalostná Databáza BatCore.eu
            </motion.h1>
            <TextGenerateEffect
              className="text-lg mb-8"
              words={
                "Vyhľadajte odpoveď na svoju otázku alebo sa dozviete viac o našich službách."
              }
            />
            <motion.div
              className="max-w-2xl mx-auto flex"
              initial={{ y: 5, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              whileInView={{
                y: 0,
                opacity: 1,
              }}
            >
              <Autocomplete
                className="flex-grow"
                defaultItems={Object.values(articles).flat()}
                listboxProps={{
                  emptyContent: "Nenašli sa žiadne výsledky pre hľadaný výraz",
                }}
                placeholder="Zadajte text pre vyhľadávanie..."
                startContent={<IconSearch />}
                type="text"
                onSelectionChange={(item) =>
                  router.push("/article/" + item, undefined)
                }
              >
                {Object.entries(articles).map(([category, articles]) => (
                  <AutocompleteSection
                    key={category}
                    title={category.toUpperCase()}
                  >
                    {articles.map((article: Article) => (
                      <AutocompleteItem
                        key={article.customUrl}
                        startContent={
                          <Emoji size={20} unified={article.emoji} />
                        }
                        title={article.title}
                        onClick={() =>
                          router.push("/article/" + article.customUrl, undefined)
                        }
                      />
                    ))}
                  </AutocompleteSection>
                ))}
              </Autocomplete>
            </motion.div>
          </div>
        </section>

        <Divider />

        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl font-bold mb-8 text-center"
              initial={{ y: 5, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              whileInView={{
                y: 0,
                opacity: 1,
              }}
            >
              Kategórie
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: IconServer,
                  title: "VPS servery",
                  href: "vps",
                  count: getCount("vps"),
                },
                {
                  icon: IconBrandMinecraft,
                  title: "Minecraft servery",
                  href: "minecraft",
                  count: getCount("minecraft"),
                },
                {
                  icon: IconQuestionMark,
                  title: "Ostatné",
                  href: "ostatne",
                  count: getCount("others"),
                },
              ].map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  transition={{ delay: 0.8 + index * 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                  whileInView={{
                    opacity: 1,
                  }}
                >
                  <Card>
                    <CardHeader className="flex flex-row items-center space-x-4">
                      <category.icon className="h-8 w-8 text-primary" />
                      <div>
                        {category.title}
                        <p className="text-sm text-muted-foreground">
                          {category.count} článkov
                        </p>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <Button
                        className="p-0"
                        variant="shadow"
                        onClick={() =>
                          router.push("/category/" + category.href, undefined)
                        }
                      >
                        Pozrieť články{" "}
                        <IconArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl font-bold mb-8 text-center"
              initial={{ y: 5, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              whileInView={{
                y: 0,
                opacity: 1,
              }}
            >
              Najpopulárnejšie články
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Object.values(articles)
                .flat()
                .sort((a: Article, b: Article) => b.viewCount - a.viewCount)
                .slice(0, 6)
                .map((article: Article, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    whileInView={{ opacity: 1, y: 0 }}
                  >
                    <Card>
                      <CardHeader className="flex justify-between items-center">
                        <div className="flex gap-2 items-start">
                          <Emoji size={20} unified={article.emoji} />
                          <div>
                            <h1 className="text-lg font-bold">
                              {article.title}
                            </h1>
                            <p className="text-sm text-gray-500">
                              {article.category.charAt(0).toUpperCase() +
                                article.category.slice(1)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <IconUser color="gray" size={18} />
                          <p className="text-gray-500 text-sm">
                            {article.viewCount}
                          </p>
                        </div>
                      </CardHeader>
                      <CardBody>
                        <Button
                          className="p-0"
                          variant="ghost"
                          onClick={() =>
                            router.push("/article/" + article.customUrl, undefined)
                          }
                        >
                          Prečítať článok <IconBook2 className="h-4 w-4 ml-1" />
                        </Button>
                      </CardBody>
                    </Card>
                  </motion.div>
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
