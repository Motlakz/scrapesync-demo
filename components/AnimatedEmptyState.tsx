"use client"

import { motion } from "framer-motion";
import { ReactNode } from "react";

// Define the props interface
interface AnimatedEmptyStateProps {
    title: string;
    description: string;
    icon: ReactNode; // Accept any ReactNode for the icon, allowing flexibility with icons
}

export const AnimatedEmptyState = ({ title, description, icon }: AnimatedEmptyStateProps) => {
    const FloatingShape = ({ children, initialX, initialY }: { children: ReactNode, initialX: number, initialY: number }) => {
        return (
            <motion.div
                initial={{ x: initialX, y: initialY }}
                animate={{
                    x: [initialX - 20, initialX + 20, initialX],
                    y: [initialY - 20, initialY + 20, initialY],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                }}
                className="absolute opacity-10"
                style={{
                    left: `${initialX}%`,
                    top: `${initialY}px`
                }}
            >
                {children}
            </motion.div>
        );
    };

    const BackgroundShapes = () => {
        return (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <FloatingShape initialX={10} initialY={100}>
                    <div className="w-16 h-16 border-2 border-violet-400 rounded-lg" />
                </FloatingShape>
                <FloatingShape initialX={30} initialY={200}>
                    <div className="w-20 h-20 border-2 border-violet-400 rounded-full" />
                </FloatingShape>
                <FloatingShape initialX={50} initialY={150}>
                    <div className="w-12 h-12 border-2 border-violet-400 rounded-lg rotate-45" />
                </FloatingShape>
                <FloatingShape initialX={70} initialY={400}>
                    <div className="w-24 h-24 border-2 border-violet-400 rounded-lg" />
                </FloatingShape>
                <FloatingShape initialX={90} initialY={300}>
                    <motion.div 
                        className="w-32 h-1 bg-violet-400"
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                </FloatingShape>
                {/* Additional shapes for more coverage */}
                <FloatingShape initialX={20} initialY={500}>
                    <div className="w-16 h-16 border-2 border-violet-400 rounded-full" />
                </FloatingShape>
                <FloatingShape initialX={40} initialY={250}>
                    <div className="w-14 h-14 border-2 border-violet-400 rounded-lg rotate-12" />
                </FloatingShape>
                <FloatingShape initialX={60} initialY={350}>
                    <div className="w-20 h-20 border-2 border-violet-400 rounded-full" />
                </FloatingShape>
                <FloatingShape initialX={80} initialY={150}>
                    <div className="w-10 h-10 border-2 border-violet-400 rounded-lg rotate-45" />
                </FloatingShape>
            </div>
        );
    };

    return (
        <section className="w-full p-6 relative">
            <BackgroundShapes />
            <div className="min-h-screen text-center flex flex-col items-center gap-2 justify-center relative">
                <motion.div 
                    className="rounded-full bg-violet-200 w-20 h-20 mb-6 flex items-center justify-center"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                    }}
                >
                    {icon}
                </motion.div>
                <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h3 className="font-bold">{title}</h3>
                    <p className="text-sm text-muted-foreground">
                        {description}
                    </p>
                </motion.article>
            </div>
        </section>
    );
};
