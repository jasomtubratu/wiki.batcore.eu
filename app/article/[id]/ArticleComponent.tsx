"use client";
import {
  Spinner,
  User,
} from "@nextui-org/react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

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
  };
  updatedAt: Date;
}
export default function ArticleComponent({ article }: { article: Article }) {
  const Breadcrumb = () => {
    return (
      <Breadcrumbs>
        <BreadcrumbItem href="/">Domov</BreadcrumbItem>
        <BreadcrumbItem href={"/category/" + article.category}>
          {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
        </BreadcrumbItem>
        <BreadcrumbItem isDisabled>{article.title}</BreadcrumbItem>
      </Breadcrumbs>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
          <Navbar />

          <article className="container mx-auto px-4 py-8 max-w-4xl">
            <Breadcrumb />

            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>

            <div className="flex items-center space-x-4 mb-8">
              <User
                avatarProps={{ src: article.author.avatar }}
                description={`Posledná úprava: ${article.updatedAt.toLocaleDateString()} ${article.updatedAt.toLocaleTimeString()}`}
                name={article.author.name}
              />
            </div>

            <div className="prose prose-slate max-w-none">
              <span dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>
          </article>

          <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
