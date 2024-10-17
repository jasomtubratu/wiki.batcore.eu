import { notFound } from "next/navigation";

import AllUsersMiddle from "./AllUsers";

import prisma from "@/prisma/client";
import { getServerAuthSession } from "@/auth";

const usersPage = async () => {
    const session = await getServerAuthSession();

    if (!session || session.user.role !== "ADMIN") {
        notFound();
    }

    const userData = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            role: true,
        },
    });

    if (!userData) {
        notFound(); 
    }

    return <AllUsersMiddle userData={userData} />;
};

export default usersPage;
