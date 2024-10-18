import { notFound } from "next/navigation";

import CategoryComponent from "./CategoryComponent";

import prisma from "@/prisma/client";

interface Article {
    id: string;
    title: string;
    createdAt: Date;
    emoji: string;
}

export default async function Article({
    params,
}: {
    params: { id : string };
}) {

    if (!params.id) notFound();
    if (params.id !== "vps" && params.id !== "minecraft" && params.id !== "others") notFound();
    
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
            createdAt: true,
        },
    });

    if (!thatArticle) notFound();

    return <CategoryComponent articles={thatArticle} category={params.id} />;

};
