import { getServerAuthSession } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { hashPassword } from "@/utils";

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const session = await getServerAuthSession();

    if (!session) {
        return NextResponse.json({ error: "You are not logged in" }, { status: 401 });
    }

    if (session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "You are not authorized to delete this user" }, { status: 403 });
    }

    const user = await prisma.user.findUnique({
        where: {
            id: params.id,
        },
    });

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.role === "ADMIN") {
        return NextResponse.json({ error: "You cannot delete an admin user" }, { status: 403 });
    }

    await prisma.user.delete({
        where: {
            id: params.id,
        },
    });

    return NextResponse.json({ message: "User deleted" });
}

export async function POST(
    req: NextRequest,
    { params }: { params: { id: string } }
  ) {
    const session = await getServerAuthSession();

    if (!session) {
        return NextResponse.json({ error: "You are not logged in" }, { status: 401 });
    }

    if (session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "You are not authorized to update this user" }, { status: 403 });
    }

    const { avatar, username, password } = await req.json();

    const userChange = await prisma.user.findUnique({
        where: {
            id: params.id,
        },
    });

    if (!userChange) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (userChange.role === "ADMIN") {
        return NextResponse.json({ error: "You cannot update an admin user" }, { status: 403 });
    }

    if (password) {
        const hashedPassword = await hashPassword(password);

        if (!hashedPassword) {
            return NextResponse.json({ error: "Error while hashing password" }, { status: 500 });
        }

        await prisma.user.update({
            where: {
                id: params.id,
            },
            data: {
                password: hashedPassword,
            },
        });
    }

    if (avatar.File) {
        const updateImage = avatar.File;

        await prisma.user.update({
            where: {
                id: params.id,
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
                id: params.id,
            },
            data: {
                name: username,
            },
        });
    }

    return NextResponse.json({ message: "User updated" });

  }