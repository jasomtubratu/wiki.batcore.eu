"use client";
import { Card, CardBody, CardFooter, Divider, Spinner, User } from "@nextui-org/react";

import { title } from "@/components/primitives";
import Footer from "@/components/main/footer";
import { Navbar } from "@/components/navbar";

interface Article {
    id: string;
    title: string;
    category: string;
    content: string;
    emoji: string;
    author: {
        avatar: string;
        name: string;
    }
}
export default function ArticleComponent({
  article,
}: {
  article: Article;
}) {


    return (
        <>
            {article.title ? (
                <>
                    <Navbar />
                    <div aria-hidden="true" className="absolute inset-0 h-max w-full m-auto grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
                        <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
                        <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
                    </div>

                    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                        <div className="inline-block max-w-lg text-center justify-center">

                            <h1 className={title({ color: "blue" })}>{article.title}</h1>
                        </div>
                        <Divider />

                        <Card className="w-full md:w-1/2">
                            <CardBody>
                                <span dangerouslySetInnerHTML={{ __html: article.content }} />
                            </CardBody>
                            <Divider />
                            <CardFooter>
                                <User avatarProps={{ src: article.author.avatar }} name={article.author.name} />
                            </CardFooter>
                        </Card>
                    </section>

                    <Footer />
                </>
            ) : (
                <div className="flex items-center justify-center h-screen">
                    <Spinner color="primary" size="lg" />
                </div>
            )}
        </>
    );
}
