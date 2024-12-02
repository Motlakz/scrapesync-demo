"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreditsPacks, PackId, planFeatures } from "@/types/billing";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function Pricing() {
    const { isSignedIn, isLoaded } = useAuth();
    const router = useRouter();
    
    const formatPrice = (price: number) => {
        return `$${(price / 100).toFixed(2)}`;
    };

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            router.push("/dashboard/billing");
        }
    }, [isSignedIn, isLoaded, router]);

    const handleClick = () => {
        if (!isSignedIn) {
            router.push("/sign-up");
        } else {
            router.push("/dashboard/billing");
        }
    };

    return (
        <section id="pricing" className="py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <article className="text-center mb-12">  
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Choose Your Scraping Power
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Select the credit pack that matches your automation needs
                    </p>
                </article>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {CreditsPacks.map((pack, index) => (
                        <motion.div
                            key={pack.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`relative rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-lg ${
                                pack.id === PackId.MEDIUM
                                ? "border-2 border-violet-500 dark:border-violet-400"
                                : ""
                            }`}
                        >
                            {pack.id === PackId.MEDIUM && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <span className="bg-gradient-to-r from-violet-600 to-cyan-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    {pack.name}
                                </h3>
                                <div className="mt-4 flex items-baseline justify-center">
                                    <span className="text-5xl font-bold text-gray-900 dark:text-white">
                                        {formatPrice(pack.price)}
                                    </span>
                                </div>
                                <p className="mt-2 text-gray-600 dark:text-gray-300">
                                    {pack.label}
                                </p>
                            </div>

                            <ul className="mt-8 space-y-4">
                                {planFeatures[pack.id].map((feature) => (
                                    <li key={feature} className="flex items-center">
                                        <Check className="h-5 w-5 text-violet-500 mr-3" />
                                        <span className="text-gray-600 dark:text-gray-300">
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                className={`w-full mt-8 ${
                                    pack.id === PackId.MEDIUM
                                        ? "bg-gradient-to-r from-violet-600 to-cyan-600 text-white"
                                        : "dark:hover:bg-slate-900"
                                    }`}
                                variant={pack.id === PackId.MEDIUM ? "default" : "outline"}
                                onClick={handleClick}
                            >
                                Get your credits today
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
