import { notFound } from "next/navigation";

import CategoryComponent from "./CategoryComponent";

import prisma from "@/prisma/client";

interface Article {
    id: string;
    title: string;
    updatedAt: Date;
    emoji: string;
}

export default async function Article({
    params,
}: {
    params: { id : string };
}) {

    if (!params.id) notFound();
    if (params.id !== "vps" && params.id !== "minecraft" && params.id !== "ostatne") notFound();
    
    const thatArticle = await prisma.article.findMany({
        where: {
            category: params.id,
            isDeleted: false,
            isPublic: true,
        },
        select: {
            id: true,
            title: true,
            emoji: true,
            updatedAt: true,
        },
    });

    if (!thatArticle) notFound();

    const articleViews = await prisma.articleView.groupBy({
        by: ['articleId'],
        _count: {
            articleId: true,
        },
        where: {
            articleId: {
                in: thatArticle.map(article => article.id),
            },
        },
    });

    const viewCounts: Record<string, number> = articleViews.reduce((acc: Record<string, number>, view) => {
        acc[view.articleId] = view._count.articleId;

        return acc;
    }, {});

    const formattedArticles = thatArticle.map((article) => {
        return {
            id: article.id,
            title: article.title,
            updatedAt: article.updatedAt,
            emoji: article.emoji,
            count: viewCounts[article.id] || 0,
        };
    });


    return <CategoryComponent articles={formattedArticles} category={params.id} />;

};
