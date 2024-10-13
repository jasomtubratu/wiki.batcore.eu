import { NextRequest, NextResponse } from "next/server"

import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
    // get key from request headers
    const key = request.headers.get("Authorization")?.split(" ")[1];

    if (!key) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

    // find user by key in prisma
    const user = await prisma.user.findFirst({ where: { key: key } });

    if (!user) return NextResponse.json({ error: "Invalid key" }, { status: 400 });

    const role = user.role;

    return NextResponse.json({ role });
}