"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FaTasks, 
    FaChartLine, 
    FaCheckCircle, 
    FaUsers 
} from 'react-icons/fa';

const colors = ['blue', 'cyan', 'orange', 'violet'];

const getColorClass = (color: string) => {
    switch (color) {
        case 'blue': return 'text-blue-300';
        case 'cyan': return 'text-cyan-500';
        case 'orange': return 'text-orange-500';
        case 'violet': return 'text-violet-400';
        default: return 'text-gray-500';
    }
};

const TaskIcon = ({ color }: { color: string }) => (
    <FaTasks className={`w-full h-full ${getColorClass(color)}`} />
);

const ProgressIcon = ({ color }: { color: string }) => (
    <FaChartLine className={`w-full h-full ${getColorClass(color)}`} />
);

const CompletionIcon = ({ color }: { color: string }) => (
    <FaCheckCircle className={`w-full h-full ${getColorClass(color)}`} />
);

const CollaborationIcon = ({ color }: { color: string }) => (
    <FaUsers className={`w-full h-full ${getColorClass(color)}`} />
);

const MainLoader = ({ isLoading }: { isLoading: boolean }) => {
    const [shape, setShape] = useState<'task' | 'progress' | 'completion' | 'collaboration'>('task');

    useEffect(() => {
        const interval = setInterval(() => {
            setShape((prevShape) => {
                if (prevShape === 'task') return 'progress';
                if (prevShape === 'progress') return 'completion';
                if (prevShape === 'completion') return 'collaboration';
                return 'task';
            });
        }, 1200);

        return () => clearInterval(interval);
    }, []);

    const containerVariants = {
        animate: {
            rotate: 360,
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "linear"
            }
        }
    };

    const itemVariants = {
        animate: () => ({
            rotate: -360,
            scale: [1, 1.5, 1],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "linear",
                scale: {
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                    times: [0, 0.5, 1]
                }
            }
        })
    };

    const loaderItems = colors.map((color, index) => (
        <motion.div
            key={color}
            className="absolute w-10 h-10"
            style={{
                left: `${Math.cos(index * Math.PI / 2) * 40 + 40}px`,
                top: `${Math.sin(index * Math.PI / 2) * 40 + 40}px`,
            }}
            variants={itemVariants}
            custom={index}
        >
            {shape === 'task' && <TaskIcon color={color} />}
            {shape === 'progress' && <ProgressIcon color={color} />}
            {shape === 'completion' && <CompletionIcon color={color} />}
            {shape === 'collaboration' && <CollaborationIcon color={color} />}
        </motion.div>
    ));

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm"
                >
                    <motion.div
                        className="relative w-32 h-32"
                        variants={containerVariants}
                        animate="animate"
                    >
                        {loaderItems}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MainLoader;
