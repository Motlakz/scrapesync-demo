"use server"

import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function DownloadInvoice(id: string) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("unauthenticated")
    }

    const purchase = await prisma.userPurchase.findUnique({
        where: { id, userId },
    })

    if(!purchase) {
        throw new Error("Bad request")
    }
}