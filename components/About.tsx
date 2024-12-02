"use client";

import { motion } from "framer-motion";
import { BackgroundShapes } from "./LoadingAnimation";

const About = () => {
    return (
        <section
            id="about"
            className="relative py-32 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
        >
            <BackgroundShapes />
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-white/10 dark:from-gray-800/40 dark:to-gray-900/10 backdrop-blur-xl -z-10"></div>

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
                {/* Heading Section */}
                <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
                        About Us
                    </h2>
                    <p className="sm:text-lg text-base text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Changing the way you extract and analyze data, one website at a time.
                    </p>
                </motion.article>

                {/* Two Columns Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    {/* Mission Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="space-y-6 p-8 rounded-xl bg-cyan-400/10 dark:bg-cyan-800/50 backdrop-blur-md shadow-lg"
                    >
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Our Mission
                        </h3>
                        <p className="sm:text-lg text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                            At <span className="font-bold">ScrapeSync</span>, our mission is to make data
                            extraction effortless, accessible, and reliable for businesses and
                            individuals. We believe that everyone should have the power to harness
                            the internet&apos;s potential without technical barriers or complexities.
                        </p>
                    </motion.div>

                    {/* Why Choose Us Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="space-y-6 p-8 rounded-xl bg-violet-400/10 dark:bg-violet-800/50 backdrop-blur-md shadow-lg"
                    >
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Why Choose Us?
                        </h3>
                        <p className="sm:text-lg text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                            Our platform is designed with cutting-edge technology and a
                            user-first approach. Whether you’re an experienced developer or a
                            novice, our tools adapt to your skill level. From automated scraping
                            to real-time analytics, we ensure you get accurate, actionable data
                            every time.
                        </p>
                    </motion.div>
                </div>

                {/* Values Section */}
                <div className="mt-24">
                    <motion.article
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto text-center space-y-6 p-10 rounded-xl bg-slate-500/10 dark:bg-slate-800/50 backdrop-blur-md shadow-lg"
                    >
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Our Values
                        </h3>
                        <p className="sm:text-lg text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                            Innovation, transparency, and reliability are at the heart of
                            everything we do. We are committed to empowering our users with
                            intuitive tools and unparalleled support to unlock the full potential
                            of data extraction.
                        </p>
                    </motion.article>
                </div>
            </div>
        </section>
    );
};

export default About;
