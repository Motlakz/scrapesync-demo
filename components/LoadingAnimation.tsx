/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

const FloatingShape = ({ children, initialX, initialY, animation }: { children: ReactNode, initialX: number, initialY: number, animation: any }) => {
    return (
        <motion.div
            initial={{ x: initialX, y: initialY }}
            animate={animation}
            transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
            }}
            className="absolute opacity-20"
            style={{
                left: `${initialX}%`,
                top: `${initialY}px`,
                transform: 'translate(-50%, -50%)',
            }}
        >
            {children}
        </motion.div>
    );
};

export const BackgroundShapes = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Top-left quadrant */}
            <FloatingShape initialX={30} initialY={100} animation={{
                x: [30 - 10, 30 + 10, 30],
                y: [100 - 10, 100 + 10, 100],
            }}>
                <div className="w-12 h-12 dark:bg-violet-200 bg-violet-400 rounded-lg shadow-lg" />
            </FloatingShape>
            <FloatingShape initialX={35} initialY={200} animation={{
                x: [35 - 15, 35 + 15, 35],
                y: [200 - 20, 200 + 20, 200],
            }}>
                <div className="w-14 h-14 border-2 border-violet-400 rounded-full" />
            </FloatingShape>

            {/* Top-right quadrant */}
            <FloatingShape initialX={75} initialY={150} animation={{
                x: [75 - 10, 75 + 10, 75],
                y: [150 - 15, 150 + 15, 150],
            }}>
                <div className="w-16 h-16 border-2 border-violet-400 rounded-lg rotate-45" />
            </FloatingShape>
            <FloatingShape initialX={80} initialY={100} animation={{
                x: [80 - 5, 80 + 5, 80],
                y: [100 - 10, 100 + 10, 100],
            }}>
                <motion.div className="w-28 h-1 dark:bg-violet-400 bg-violet-600" />
            </FloatingShape>

            {/* Bottom-left quadrant */}
            <FloatingShape initialX={25} initialY={650} animation={{
                x: [25 - 10, 25 + 10, 25],
                y: [650 - 20, 650 + 20, 650],
            }}>
                <div className="w-20 h-20 dark:bg-violet-200 bg-violet-400 rounded-full shadow-lg" />
            </FloatingShape>
            <FloatingShape initialX={35} initialY={550} animation={{
                x: [35, 35 + 10, 35 - 10, 35],
                y: [550 - 10, 550 + 10, 550],
            }}>
                <div className="w-16 h-16 border-2 border-violet-400 rounded-lg rotate-12" />
            </FloatingShape>

            {/* Bottom-right quadrant */}
            <FloatingShape initialX={85} initialY={600} animation={{
                x: [85 - 15, 85 + 15, 85],
                y: [600 - 10, 600 + 10, 600],
            }}>
                <div className="w-18 h-18 dark:bg-violet-200 bg-violet-400 rounded-lg shadow-lg" />
            </FloatingShape>
            <FloatingShape initialX={80} initialY={700} animation={{
                x: [80 - 10, 80 + 10, 80],
                y: [700 - 15, 700 + 15, 700],
            }}>
                <div className="w-12 h-12 border-2 border-violet-400 rounded-full" />
            </FloatingShape>

            {/* Closer edge shapes */}
            <FloatingShape initialX={90} initialY={250} animation={{
                x: [90 - 10, 90 + 10, 90],
                y: [250 - 10, 250 + 10, 250],
            }}>
                <div className="w-14 h-14 dark:bg-violet-200 bg-violet-400 rounded-full shadow-lg" />
            </FloatingShape>
        </div>
    );
};
