import Home from "./MainPage";

import prisma from "@/prisma/client";

export const dynamic = "force-dynamic";

type Article = {
    id: string;
    title: string;
    emoji: string;
    category: string;
    updatedAt: Date;
};

const ArticlePage = async () => {
    const userArticles: Article[] = await prisma.article.findMany({
        where: {
            isPublic: true,
            isDeleted: false,
        },
        select: {
            id: true,
            title: true,
            emoji: true,
            category: true,
            updatedAt: true,
        },
    });

    const categorizedArticles = {
        vps: userArticles.filter(article => article.category === 'vps'),
        minecraft: userArticles.filter(article => article.category === 'minecraft'),
        others: userArticles.filter(article => article.category === 'ostatne'),
    };

    return <Home articles={categorizedArticles} />;
}

export default ArticlePage;