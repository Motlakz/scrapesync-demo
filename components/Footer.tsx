import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-50 dark:bg-gray-900 border-t dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Company
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Connect
                        </h3>
                        <div className="flex space-x-4">
                            <Link href="https://www.github.com/Motlakz" className="text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400">
                                <Github className="h-6 w-6" />
                            </Link>
                            <Link href="https://www.x.com/MotlalepulaSel6" className="text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400">
                                <Twitter className="h-6 w-6" />
                            </Link>
                            <Link href="https://www.linkedin.com/in/motlalepula-sello-37956813a/" className="text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400">
                                <Linkedin className="h-6 w-6" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                    <p className="text-center text-gray-600 dark:text-gray-300">
                        © {currentYear} <span className="text-primary dark:text-violet-400">Scrape</span><span className="text-cyan-600 dark:text-cyan-400">Sync</span>. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}