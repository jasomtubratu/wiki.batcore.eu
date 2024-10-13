import { NextRequest, NextResponse } from "next/server"

export async function POST() {
    // get email and password from request body
    const { email, password } = NextRequest.body;

    // if email or password is missing, return an error
    if (!email || !password) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    // email to lowercase
    const realEmail = email.toLowerCase();
    // find user by email in prisma
    const user = await prisma.user.findUnique({ where: { email: realEmail } });

    return NextResponse.json({ message: "Hello, world!" });
}