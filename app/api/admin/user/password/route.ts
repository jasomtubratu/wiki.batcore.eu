import { NextRequest, NextResponse } from "next/server";

import { getServerAuthSession } from "@/auth";
import { getUserFromDbByEmail, hashPassword, verifyPassword } from "@/utils";
import prisma from "@/prisma/client";

export async function POST(req: NextRequest) {
    const { oldPassword, newPassword } = await req.json();
    const session = await getServerAuthSession();
    
    if (!session) {
        return NextResponse.json({ error: "You are not logged in" }, { status: 401 });
    }

    if (!oldPassword || !newPassword) {
        return NextResponse.json({ error: "Please provide old and new password" }, { status: 400 });
    }

    if (oldPassword === newPassword) {
        return NextResponse.json({ error: "Old and new password are the same" }, { status: 400 });
    }

    const user = await getUserFromDbByEmail(session.user.email);

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isValidPassword = await verifyPassword(user.password, oldPassword);

    if (!isValidPassword) {
        return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    const hashedNewPassword = await hashPassword(newPassword);

    if (!hashedNewPassword) {
        return NextResponse.json({ error: "Error while hashing password" }, { status: 500 });
    }

    const updatedUser = await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            password: hashedNewPassword,
        },
    });

    if (!updatedUser) {
        return NextResponse.json({ error: "Error while updating user" }, { status: 500 });
    }

    return NextResponse.json({ message: "Password updated" });

}