import { NextRequest, NextResponse } from "next/server"
import argon from "argon2";

import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
    // get email and password from request body
    const { email, password } = await request.json();

    // if email or password is missing, return an error
    if (!email || !password) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    // email to lowercase
    const realEmail = email.toLowerCase();
    // find user by email in prisma
    const user = await prisma.user.findUnique({ where: { email: realEmail } });

    if (!user) return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
    // verify password
    if (!(await argon.verify(user.password, password))) return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });

    // get user key and conver it to base64 and rotate it
    const fakeKey = Buffer.from(user.key).toString("base64").split("").reverse().join("");

    return NextResponse.json({ key: fakeKey });
}