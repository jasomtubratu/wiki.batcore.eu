import Home from "./MainPage";

import prisma from "@/prisma/client";

type Article = {
    id: string;
    title: string;
    emoji: string;
    category: string;
};

type CategorizedArticles = {
    vps: Article[];
    minecraft: Article[];
    others: Article[];
};

const ArticlePage = async () => {
    const userArticles: Article[] = await prisma.article.findMany({
        where: {
            isPublic: true,
        },
        select: {
            id: true,
            title: true,
            emoji: true,
            category: true,
        },
    });

    const categorizedArticles: CategorizedArticles = userArticles.reduce((acc: CategorizedArticles, article: Article) => {
        if (article.category === 'vps' || article.category === 'minecraft' || article.category === 'others') {
            acc[article.category].push(article);
        }

        return acc;
    }, {
        vps: [],
        minecraft: [],
        others: []
    });

    const topArticlesByCategory: CategorizedArticles = {
        vps: categorizedArticles.vps.slice(0, 5),
        minecraft: categorizedArticles.minecraft.slice(0, 5),
        others: categorizedArticles.others.slice(0, 5)
    };

    return <Home articles={topArticlesByCategory} />;
}

export default ArticlePage;