import Home from "./MainPage";

import prisma from "@/prisma/client";

export const dynamic = "force-dynamic";

type Article = {
    id: string;
    title: string;
    emoji: string;
    category: string;
    customUrl: string;
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
            customUrl: true,
            updatedAt: true,
        },
    });

    const articlesView = await prisma.articleView.findMany({
        select: {
            articleId: true,
            count: true,
        },
    });

    const formattedArticles = userArticles.map(article => {
        const viewCount = articlesView.find(view => view.articleId === article.id)?.count || 0;

        return {
            ...article,
            viewCount,
        };
    }
    );

    const categorizedArticles = {
        vps: formattedArticles.filter(article => article.category === 'vps'),
        minecraft: formattedArticles.filter(article => article.category === 'minecraft'),
        others: formattedArticles.filter(article => article.category === 'ostatne'),
    };

    return <Home articles={categorizedArticles} />;
}

export default ArticlePage;