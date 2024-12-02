import React from 'react'
import { Cookie } from 'lucide-react'
import {
    AlertDialog,
    AlertDialogTitle,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
} from "@/components/ui/alert-dialog"
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

interface CookiePopupProps {
    isOpen: boolean;
    onAccept: () => void;
    onDecline: () => void;
}

const CookiePopup = ({ isOpen, onAccept, onDecline }: CookiePopupProps) => {
    return (
        <AlertDialog open={isOpen}>
            <AlertDialogContent className="p-0 overflow-hidden bg-transparent border-none">
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            transition={{ duration: 0.3 }}
                            className="relative w-full p-6 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl"
                        >
                            <AlertDialogTitle className="highlight-mini-shadow text-2xl font-bold mb-4 text-violet-400 flex items-center">
                                <Cookie className="mr-2 text-cyan-500" size={24} />
                                Cookie Consent
                            </AlertDialogTitle>
                            <AlertDialogDescription className="mb-6 text-violet-300 highlight-mini-shadow">
                                We use cookies to enhance your experience on our website. By continuing to browse, you agree to our use of cookies. 
                                <Link href="/cookie-policy" className="text-cyan-200 hover:underline ml-1">
                                    Learn more
                                </Link>
                            </AlertDialogDescription>
                            <AlertDialogFooter className="flex justify-end space-x-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={onDecline}
                                    className="px-4 py-2 bg-gray-300 text-violet-800 rounded-lg hover:bg-gray-400 hover:text-violet-900 transition-colors"
                                >
                                    Decline
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={onAccept}
                                    className="px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition-colors"
                                >
                                    Accept
                                </motion.button>
                            </AlertDialogFooter>
                        </motion.div>
                    )}
                </AnimatePresence>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default CookiePopup
