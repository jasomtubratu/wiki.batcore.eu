import { notFound } from "next/navigation";


import EditUser from "./EditUser";

import prisma from "@/prisma/client";
import { getServerAuthSession } from "@/auth";

export default async function editUserPage({
    params,
}: {
    params: { id : string };
}) {
    const session = await getServerAuthSession();

    if (!params.id) {
        notFound();
    }

    if (!session || session.user.role !== "ADMIN") {
        notFound();
    }

    const userData = await prisma.user.findUnique({
        where: {
            id: params.id,
        },
        select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            role: true,
        },
    });

    const userArticles = await prisma.article.findMany({
        where: {
            author: params.id,
        },
        select: {
            id: true,
            title: true,
        }
    });

    if (!userData) {
        notFound(); 
    }

    const formattedUserData = {
        ...userData,
        avatar: userData.avatar || "",
        articles: userArticles,
    };

    return <EditUser userData={formattedUserData} />;
};
