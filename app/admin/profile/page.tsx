import { notFound } from "next/navigation";

import MyInformation from "./profileComponent";

import prisma from "@/prisma/client";
import { getServerAuthSession } from "@/auth";

const profilePage = async () => {
    const session = await getServerAuthSession();

    if (!session) notFound();
    
    const userData = await prisma.user.findFirst({
        where: {
            email: session.user.email,
        },
    });

    if (!userData) notFound();

    return <MyInformation userData={userData} />;
}

export default profilePage;