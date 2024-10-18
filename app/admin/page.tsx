import { notFound } from "next/navigation";

import Admin from "./AdminPage";

import prisma from "@/prisma/client";
import { getServerAuthSession } from "@/auth";
export default async function Article() {

    const session = await getServerAuthSession();

    if (!session) {
        notFound();
    }

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
        select: {
            name: true,
        },
    });

    if (!user) {
        notFound();
    }

    const articles = await prisma.article.findMany({
        orderBy: {
            updatedAt: 'desc',
        },
        where: {
            isDeleted: false,
        },
        select: {
            id: true,
            title: true,
            updatedAt: true,
        }
    });



    const data = {
        "user": user.name,
        "totalArticles": articles.length,
        "latestArticles": articles.slice(0, 5) || [],
    }

    return <Admin data={data} />;

};
