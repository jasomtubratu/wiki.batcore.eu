import { NextRequest, NextResponse } from 'next/server';
import { JSDOM } from "jsdom";

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

    function extractScriptContent(htmlString: string): string | boolean {
        const dom = new JSDOM(htmlString);
        const scriptTag = dom.window.document.querySelector('script');

        if (!scriptTag) {
            return false; 
        }

        return scriptTag.textContent || false;
    }

    if (content.includes("<script>")) {
        const scriptContent = extractScriptContent(content);

        if (scriptContent) {
            const params = {
                username: "Znalostná databáza | WARNING",
                embeds: [
                    {
                        title: "Znalostná databáza | WARNING",
                        description: "Uživateľ sa pokusil vytvoriť článok s nebezpečným obsahom! Presnejšie použil <script> tag v článku!",
                        color: "15158332",
                        timestamp: new Date(),
                        footer: {
                            text: "Znalostná databáza | WARNING"
                        },
                        fields: [
                            {
                                name: "Uživateľ",
                                value: user.email
                            },
                            {
                                name: "Script tag",
                                value: scriptContent as string
                            }
                        ]
                    },
                ]
            };
        
            await fetch(process.env.WEBHOOK_URL ?? "", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(params)
            });
    
            return NextResponse.json({ error: "Article contains dangerous content" });
        }
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