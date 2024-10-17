import { NextResponse } from "next/server";

import { getServerAuthSession } from "@/auth";
import { getUserFromDbByEmail } from "@/utils";

export async function GET() {
    const session = await getServerAuthSession();
    
    if (!session) {
        return NextResponse.json({ error: "You are not logged in" }, { status: 401 });
    }

    const user = await getUserFromDbByEmail(session.user.email);
    const avatar = user?.avatar || "";

    return NextResponse.json({ avatar });

}