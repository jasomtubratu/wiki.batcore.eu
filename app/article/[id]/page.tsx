import { notFound } from "next/navigation";
import { headers } from "next/headers";

import ArticleComponent from "./ArticleComponent";

import prisma from "@/prisma/client";
import { getServerAuthSession } from "@/auth";
import { encryptIPAddress } from "@/utils/handleIP";

interface Article {
  id: string;
  title: string;
  category: string;
  content: string;
  emoji: string;
  count: number;
  author: {
    avatar: string;
    name: string;
  };
  updatedAt: Date;
}

export default async function Article({ params }: { params: { id: string } }) {
  const headersList = headers();

  const session = await getServerAuthSession();
  const test = String(params.id)

  const thatArticle = await prisma.article.findFirst({
    where: {
      customUrl: test,
      isDeleted: false,
    },
    select: {
      id: true,
      title: true,
      emoji: true,
      category: true,
      content: true,
      author: true,
      updatedAt: true,
      isPublic: true,
    },
  });

  if (!thatArticle || (thatArticle.isPublic === false && !session)) {
    notFound();
  }

  if (!thatArticle) notFound();

  // search author
  const author = await prisma.user.findUnique({
    where: {
      id: thatArticle.author,
    },
    select: {
      name: true,
      avatar: true,
    },
  });

  if (!author) notFound();

  const ip = headersList.get("x-forwarded-for") || "121.0.0.1";
  const encryptedIP = "10";

  if (!encryptedIP) {
    throw new Error('Failed to encrypt IP address');
  }

  const articleView = await prisma.articleView.findFirst({
    where: {
      articleId: thatArticle.id,
    },
  });

  if (articleView) {
    if (!articleView.ipAddress.includes(encryptedIP)) {
      await prisma.articleView.update({
        where: {
          id: articleView.id,
        },
        data: {
          ipAddress: {
            push: encryptedIP,
          },
          count: {
            increment: 1,
          },
        },
      });
    }
  } else {
    await prisma.articleView.create({
      data: {
        articleId: thatArticle.id,
        ipAddress: [encryptedIP],
        count: 1,
      },
    });
  }

  const article: Article = {
    id: thatArticle.id,
    title: thatArticle.title,
    category: thatArticle.category,
    emoji: thatArticle.emoji,
    content: thatArticle.content,
    updatedAt: thatArticle.updatedAt,
    count: articleView ? articleView.count : 0,
    author: {
      name: author.name,
      avatar: author.avatar || "",
    },
  };

  return <ArticleComponent article={article} />;
}