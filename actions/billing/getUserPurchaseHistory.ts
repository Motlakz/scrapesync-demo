"use server";

import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function GetUserPurchaseHistory() {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("unauthenticated");
    }

    return prisma.userPurchase.findMany({
        where: { userId },
        orderBy: { date: "desc" },
        select: {
            id: true,
            date: true,
            description: true,
            amount: true,
            currency: true,
        },
    });
}
