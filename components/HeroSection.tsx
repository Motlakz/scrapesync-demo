"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ScrapeFlowDemo from "./demo/ScrapeFlowDemo";

export function HeroSection() {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-100 to-cyan-100 dark:from-violet-950 dark:to-cyan-950">
                <motion.div
                    className="absolute inset-0 opacity-50"
                    animate={{
                        background: [
                            "radial-gradient(circle at 0% 0%, violet 0%, transparent 50%)",
                            "radial-gradient(circle at 100% 100%, cyan 0%, transparent 50%)",
                            "radial-gradient(circle at 0% 100%, violet 0%, transparent 50%)",
                            "radial-gradient(circle at 100% 0%, cyan 0%, transparent 50%)",
                            "radial-gradient(circle at 0% 0%, violet 0%, transparent 50%)",
                        ],
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-3xl sm:text-6xl font-bold tracking-tight mb-8">
                        <span className="drop-shadow-xl highlight-mini dark:bg-violet-400 bg-violet-600 bg-clip-text text-transparent">
                            Scrape the web,
                        </span>
                        {' '}
                        <span className="drop-shadow-xl highlight-mini-cyan dark:bg-cyan-400 bg-cyan-600 bg-clip-text text-transparent">
                            Sync your flow:
                        </span>
                        <br />
                        <span className="text-gray-900 dark:text-white highlight-mini-shadow drop-shadow-xl">
                            Empower your insights today!
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-12">
                        Transform your data into actionable insights with a smart and simple web scraping automation tool that works silently in the background
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-violet-600 to-cyan-600 text-white hover:opacity-90" asChild
                        >
                            <Link href="/sign-up">
                                Get your 100 free credits now
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-2 dark:hover:border-white dark:hover:bg-slate-800" asChild
                        >
                            <Link href="/about">Learn More</Link>
                        </Button>
                    </div>
                    <div className="my-12">
                        <ScrapeFlowDemo />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
