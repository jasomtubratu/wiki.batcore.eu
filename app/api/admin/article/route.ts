import { NextRequest, NextResponse } from 'next/server';

import { getServerAuthSession } from '@/auth';
import { getUserFromDbByEmail } from '@/utils';
import prisma from '@/prisma/client';

export async function POST(
    req: NextRequest,
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

    // create article
    const article = await prisma.article.create({
        data: {
            title,
            category,
            content,
            author: user.id,
            emoji,
            isPublic: Boolean(isPublic),
        },
    });

    if (!article) {
        return NextResponse.json({ error: "Error while creating article" }, { status: 500 });
    }

    return NextResponse.json({ message: "Article created" });
}