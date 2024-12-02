"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        question: "How does the automated scraping system work?",
        answer: "Our automated scraping system uses your choice of algorithms to collect data from websites efficiently while adapting to changes in structure.",
    },
    {
        question: "What measures are in place to prevent detection?",
        answer: "We use an anti-detection system that includes rotating proxies, dynamic user agents, and throttling to minimize the risk of detection.",
    },
    {
        question: "Can I export the scraped data in custom formats?",
        answer: "Yes, you can export data in multiple formats such as JSON, CSV, and XML to ensure seamless integration with your existing systems.",
    },
    {
        question: "Do I need coding experience to use this app?",
        answer: "Not at all! Our visual workflow builder allows you to create custom scraping processes without writing a single line of code.",
    },
    {
        question: "What happens if the website structure changes?",
        answer: "Our AI-powered extraction engine adapts automatically to minor changes in website structures. For major changes, you can reconfigure the scraper using the flow builder.",
    },
    {
        question: "Do you offer templates to get started?",
        answer: "Yes, we offer pre-built templates to get you started. You can find them in the templates section of the sidebar or select the ones you prefer to use from the workflow creation form"
    }
];

export function FAQ() {
    return (
        <section id="faq" className="py-24 bg-gradient-to-br from-violet-100 to-cyan-100 dark:from-violet-950 dark:to-cyan-950">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Find answers to common questions about our services
                    </p>
                </motion.article>

                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <motion.section
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <AccordionItem value={`item-${index}`}>
                                <AccordionTrigger className="text-left">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent>
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        </motion.section>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
