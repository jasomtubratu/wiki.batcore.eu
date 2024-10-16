import { notFound } from "next/navigation";

import ArticleComponent from "./ArticleComponent";

import prisma from "@/prisma/client";

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

export default async function Article({
    params,
}: {
    params: { id : string };
}) {
    console.log(params.id);
    const thatArticle = await prisma.article.findFirst({
        where: {
            id: params.id,
            isDeleted: false,
            isPublic: true,
        },
        select: {
            id: true,
            title: true,
            emoji: true,
            category: true,
            content: true,
            author: true,
        },
    });

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

    // format
    const article: Article = {
        id: thatArticle.id,
        title: thatArticle.title,
        category: thatArticle.category,
        emoji: thatArticle.emoji,
        content: thatArticle.content,
        author: {
            name: author.name,
            avatar: author.avatar || "",
        },
};

return <ArticleComponent article={article} />;

}