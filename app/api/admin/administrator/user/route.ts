import { NextRequest, NextResponse } from "next/server";

import { getServerAuthSession } from "@/auth";
import prisma from "@/prisma/client";
import { hashPassword } from "@/utils";

export async function POST(
    req: NextRequest
  ) {
    const session = await getServerAuthSession();

    if (!session) {
        return NextResponse.json({ error: "You are not logged in" }, { status: 401 });
    }

    if (session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "You are not authorized to update this user" }, { status: 403 });
    }

    const { email, username, password } = await req.json();

    if (!email || !username || !password) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
        data: {
            email,
            name: username,
            password: hashedPassword,
        },
    });

    if (!user) {
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }


    return NextResponse.json({ message: "User created" });

  }