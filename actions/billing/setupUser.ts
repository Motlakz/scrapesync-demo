"use server";

import prisma from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function SetupUser() {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("unauthenticated");
    }

    try {
        // Create initial balance if not exists
        const balance = await prisma.userBalance.findUnique({
            where: { userId }
        });

        if (!balance) {
            await prisma.userBalance.create({
                data: {
                    userId,
                    credits: 100
                }
            });
        }

        // Get user details from Clerk
        const user = await currentUser();
        if (!user) throw new Error("User not found");

        // Create Stykite customer
        const stykiteResponse = await fetch(
            `${process.env.STYKITE_API_URL}/company/${process.env.STYKITE_COMPANY_ID}/country/${process.env.STYKITE_COUNTRY_ID}/customer`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.STYKITE_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: user.emailAddresses[0].emailAddress,
                    customer_identifier: userId,
                    first_name: user.firstName || user.emailAddresses[0].emailAddress.split("@")[0],
                }),
            }
        );

        const stykiteData = await stykiteResponse.json();

        // Only throw error if the customer creation failed
        if (!stykiteResponse.ok) {
            throw new Error(stykiteData.message || "Failed to create Stykite customer");
        }

        // Successful customer creation, perform redirect
        return revalidatePath("/dashboard");

    } catch (error) {
        console.error("Setup error:", error);
        throw error;
    }
}
