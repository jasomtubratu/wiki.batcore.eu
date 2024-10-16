import { NextRequest, NextResponse } from "next/server";

import { getServerAuthSession } from "@/auth";
import { getUserFromDbByEmail } from "@/utils";
import prisma from "@/prisma/client";

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
  ) {
    const session = await getServerAuthSession();
    
    if (!session) {
        return NextResponse.json({ error: "You are not logged in" }, { status: 401 });
    }

    const user = await getUserFromDbByEmail(session.user.email);

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const article = await prisma.article.findUnique({
        where: {
            id: params.id,
            author: user.id,
        },
    });

    if (!article) {
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

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
  ) {
    const session = await getServerAuthSession();
    
    if (!session) {
        return NextResponse.json({ error: "You are not logged in" }, { status: 401 });
    }

    const user = await getUserFromDbByEmail(session.user.email);

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const article = await prisma.article.findUnique({
        where: {
            id: params.id,
            author: user.id,
        },
        select: {
            title: true,
            category: true,
            content: true,
            isPublic: true,
            emoji: true,
        },
    });

    if (!article) {
        return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json({ article });

}

export async function POST(
    req: NextRequest,
    { params }: { params: { id: string } }
  ) {
    const session = await getServerAuthSession();
    const { title, category, content, emoji, isPublic } = await req.json();

    if (!title || !category || !content || !isPublic || !emoji) {
        return NextResponse.json({ error: "Please provide all required fields" }, { status: 400 });
    }
    if (!session) {
        return NextResponse.json({ error: "You are not logged in" }, { status: 401 });
    }

    const user = await getUserFromDbByEmail(session.user.email);

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const article = await prisma.article.findUnique({
        where: {
            id: params.id,
            author: user.id,
        },
    });

    if (!article) {
        return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    const updatedArticle = await prisma.article.update({
        where: {
            id: params.id,
        },
        data: {
            title,
            category,
            content,
            isPublic: Boolean(isPublic),
            emoji,
        },
    });

    if (!updatedArticle) {
        return NextResponse.json({ error: "Error while updating article" }, { status: 500 });
    }

    return NextResponse.json({ message: "Article updated" });
}