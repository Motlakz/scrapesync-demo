"use client"

import CookiePopup from "@/components/CookiePopup";
import { FAQ } from "@/components/FAQSection";
import { Features } from "@/components/Features";
import { HeroSection } from "@/components/HeroSection";
import { Pricing } from "@/components/PricingSection";
import { useEffect, useState } from "react";

export default function Home() {
    const [showCookiePopup, setShowCookiePopup] = useState(false);

    useEffect(() => {
        // Check if user has already accepted cookies
        const cookiesAccepted = localStorage.getItem('cookiesAccepted');
        if (!cookiesAccepted) {
            setShowCookiePopup(true);
        }
    }, []);

    const handleAcceptCookies = () => {
        localStorage.setItem('cookiesAccepted', 'true');
        setShowCookiePopup(false);
    };

    const handleDeclineCookies = () => {
        // Handle declining cookies (e.g., use only necessary cookies)
        setShowCookiePopup(false);
    };

    return (
        <>
            <HeroSection />
            <Features />
            <Pricing />
            <FAQ />
            <CookiePopup
                isOpen={showCookiePopup} 
                onAccept={handleAcceptCookies} 
                onDecline={handleDeclineCookies} 
            />
        </>
    );
}