"use client";

import { motion } from "framer-motion";
import { 
    Bot, 
    Brain, 
    ShieldCheck, 
    LineChart, 
    Download, 
    Workflow, 
    Headphones, 
    Zap 
} from "lucide-react";

const features = [
    {
        icon: Bot,
        title: "Automated scraping",
        description: "Effortlessly collect data with our advanced automated web scraping system",
    },
    {
        icon: Brain,
        title: "AI-powered extraction",
        description: "Smart data extraction that adapts to changing website structures",
    },
    {
        icon: ShieldCheck,
        title: "Anti-detection System",
        description: "Advanced protection against bot detection and IP blocking",
    },
    {
        icon: LineChart,
        title: "Advanced analytics",
        description: "Comprehensive insights and real-time performance monitoring",
    },
    {
        icon: Download,
        title: "Flexible exports",
        description: "Export your data in multiple formats for seamless integration",
    },
    {
        icon: Workflow,
        title: "Flow builder",
        description: "Visual scraping workflow creator for custom data extraction",
    },
    {
        icon: Headphones,
        title: "Priority support",
        description: "Dedicated technical assistance and expert guidance",
    },
    {
        icon: Zap,
        title: "Quick-start Templates",
        description: "Pre-built scraping templates for rapid deployment",
    },
];

export function Features() {
    return (
        <section id="features" className="py-24 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <article className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Top-level scraping
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Powerful features to handle your most demanding data extraction needs
                    </p>
                </article>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05 }}
                            className="relative p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                        >
                            <div className="w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white">
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
