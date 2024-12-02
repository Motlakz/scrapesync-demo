"use server"

import { PackId, CreditsPacks } from "@/types/billing";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function PurchaseCredits(packId: PackId) {
    // Authenticate the user
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthenticated: User must be logged in.");
    }

    // Find the pack directly from CreditsPacks array using PackId
    const selectedPack = CreditsPacks.find(pack => pack.id === packId);
    if (!selectedPack) {
        throw new Error("Invalid pack: The selected credit pack does not exist.");
    }

    // before we update the balance, let STYKITE handle the plan selection and make the payment first.

    try {
        // Update user's credit balance in the database
        const userBalance = await prisma.userBalance.upsert({
            where: { userId },
            create: { userId, credits: selectedPack.credits },
            update: {
                credits: {
                    increment: selectedPack.credits,
                },
            },
        });

        revalidatePath("/dashboard/billing");

        console.log(`Successfully purchased credits for user ${userId}:`, {
            creditsAdded: selectedPack.credits,
            newBalance: userBalance.credits,
            timestamp: new Date().toISOString(),
        });

        return {
            message: "Purchase successful.",
            newBalance: userBalance.credits,
        };
    } catch (error) {
        console.error("Error processing credit purchase:", error);
        throw new Error("Purchase failed: There was an error while processing the purchase.");
    }
}
