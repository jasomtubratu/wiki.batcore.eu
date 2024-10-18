import { NextRequest, NextResponse } from "next/server";

import { getServerAuthSession } from "@/auth";
import prisma from "@/prisma/client";

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const session = await getServerAuthSession();

    if (!params.id) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    if (!session) {
        return NextResponse.json({ error: "You are not logged in" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
    });

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.role !== "ADMIN") {
        return NextResponse.json({ error: "You are not authorized to delete this user" }, { status: 403 });
    }

    const articleToDelete = await prisma.article.findUnique({
        where: {
            id: params.id,
        },
    });

    if (!articleToDelete) {
        return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    const deletedArticle = await prisma.article.update({
        where: {
            id: params.id,
        },
        data: {
            isDeleted: true,
        },
    });

    if (!deletedArticle) {
        return NextResponse.json({ error: "Error while deleting article" }, { status: 500 });
    }

    return NextResponse.json({ message: "Article deleted" });
}

