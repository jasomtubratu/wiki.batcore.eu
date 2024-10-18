import { notFound } from "next/navigation";

import AllArticles from "./AllArticles";

import prisma from "@/prisma/client";
import { getServerAuthSession } from "@/auth";

const articlesPage = async () => {
    const session = await getServerAuthSession();

    if (!session || session.user.role !== "ADMIN") {
        notFound();
    }

    const articleData = await prisma.article.findMany({
        select: {
            id: true,
            title: true,
            emoji: true,
            category: true,
            isPublic: true,
            author: true,
            isDeleted: false,
        },
    });

    if (!articleData) {
        notFound(); 
    }

    return <AllArticles articleData={articleData} />;
};

export default articlesPage;
