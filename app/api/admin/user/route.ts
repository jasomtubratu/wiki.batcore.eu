import { NextRequest, NextResponse } from "next/server";

import { getServerAuthSession } from "@/auth";
import { getUserFromDbByEmail } from "@/utils";
import prisma from "@/prisma/client";

export async function POST(req: NextRequest) {
    const session = await getServerAuthSession();
    const { avatar, username } = await req.json();

    if (!session) {
        return NextResponse.json({ error: "You are not logged in" }, { status: 401 });
    }

    const user = await getUserFromDbByEmail(session.user.email);

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (avatar.File) {
        const updateImage = avatar.File;

        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                avatar: updateImage,
            },
        });
    }

    if (username) {
        const usernameAlreadyExist = await prisma.user.findFirst({
            where: {
                name: username,
            },
        });

        if (usernameAlreadyExist) {
            return NextResponse.json({ error: "Username already exists in the database" }, { status: 409 });
        }

        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                name: username,
            },
        });
    }

    return NextResponse.json({ message: "User updated" });
}