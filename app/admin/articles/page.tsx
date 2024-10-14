import { notFound } from "next/navigation";

import ArticleComponent from "./ArticlesComponent";

import prisma from "@/prisma/client";
import { getServerAuthSession } from "@/auth";

const ArticlePage = async () => {
    const session = await getServerAuthSession();

    if (!session) notFound();

    const userArticles = await prisma.article.findMany({
        where: {
            author: session.user.id,
        },
        select: {
            id: true,
            title: true,
            emoji: true,
            category: true,
            isPublic: true,
        },
    });

    return <ArticleComponent articles={userArticles} />;
}

export default ArticlePage;