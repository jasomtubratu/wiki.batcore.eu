"use client";
import { Card, CardBody, CardFooter, Divider, Spinner, User } from "@nextui-org/react";
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";

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

    const Breadcrumb = () => {
        return (
            <Breadcrumbs>
                <BreadcrumbItem href="/">Domov</BreadcrumbItem>
                <BreadcrumbItem href={"/category/" + article.category}>{article.category.charAt(0).toUpperCase() + article.category.slice(1)}</BreadcrumbItem>
                <BreadcrumbItem isDisabled>{article.title}</BreadcrumbItem>
            </Breadcrumbs>
        );
    }

    return (
        <>
            {article.title ? (
                <>
                    <Navbar />

                    <article className="container mx-auto px-4 py-8 max-w-4xl">
                    <Breadcrumb />

      <h1 className="text-4xl font-bold mb-4">
      {article.title}
      </h1>

      <div className="flex items-center space-x-4 mb-8">
      <User avatarProps={{ src: article.author.avatar }} name={article.author.name} />
      </div>

      <div className="prose prose-slate max-w-none">
    <span dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>
    </article>


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
