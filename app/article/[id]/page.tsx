import { notFound } from "next/navigation";

import ArticleComponent from "./ArticleComponent";

import prisma from "@/prisma/client";
import { getServerAuthSession } from "@/auth";

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
    updatedAt: Date;
}

export default async function Article({
    params,
}: {
    params: { id : string };
}) {
    console.log(params.id);
    const session = await getServerAuthSession();
    const thatArticle = await prisma.article.findFirst({
        where: {
            id: params.id,
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

    // format
    const article: Article = {
        id: thatArticle.id,
        title: thatArticle.title,
        category: thatArticle.category,
        emoji: thatArticle.emoji,
        content: thatArticle.content,
        updatedAt: thatArticle.updatedAt,
        author: {
            name: author.name,
            avatar: author.avatar || "",
        },
};

return <ArticleComponent article={article} />;

}