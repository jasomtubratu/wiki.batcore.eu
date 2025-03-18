import { notFound } from "next/navigation";

import CategoryComponent from "./CategoryComponent";

import prisma from "@/prisma/client";

export const dynamic = "force-dynamic";

interface Article {
  id: string;
  title: string;
  updatedAt: Date;
  emoji: string;
  count: number;
  customUrl: string;
}

export default async function Article({ params }: { params: { id: string } }) {
  if (!params.id) notFound();
  if (
    params.id !== "vps" &&
    params.id !== "minecraft" &&
    params.id !== "ostatne"
  )
    notFound();

  const thatArticle = await prisma.article.findMany({
    where: {
      category: params.id,
      isDeleted: false,
      isPublic: true,
    },
    select: {
      id: true,
      title: true,
      customUrl: true,
      emoji: true,
      updatedAt: true,
    },
  });

  if (!thatArticle) notFound();

  const articleViews = await prisma.articleView.findMany({
    where: {
      articleId: {
        in: thatArticle.map((article) => article.id),
      },
    },
    select: {
      articleId: true,
      count: true,
    },
  });

  const viewCounts: Record<string, number> = articleViews.reduce(
    (acc: Record<string, number>, view) => {
      acc[view.articleId] = view.count;

      return acc;
    },
    {}
  );

  const formattedArticles = thatArticle.map((article) => {
    return {
      id: article.id,
      title: article.title,
      updatedAt: article.updatedAt,
      emoji: article.emoji,
      customUrl: article.customUrl,
      count: viewCounts[article.id] || 0,
    };
  });

  return (
    <CategoryComponent articles={formattedArticles} category={params.id} />
  );
}
