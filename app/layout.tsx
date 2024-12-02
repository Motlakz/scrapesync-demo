import type { Metadata } from "next";
import { Montserrat, Quicksand } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ClerkProvider, SignedOut } from '@clerk/nextjs'
import QueryProvider from "@/components/providers/QueryProvider";
import { Toaster } from "@/components/ui/sonner";
import LoadingWrapper from "@/components/LoadingWrapper";
import { LoadingProvider } from "@/context/LoadingContext";
import { ReactNode } from "react";
import NextTopLoader from "nextjs-toploader";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Web Scraping Automation - Sync and Extract Data Seamlessly",
  description: "Transform your data collection process with our advanced web scraping tool. Effortlessly extract, analyze, and integrate data from various sources with AI-powered automation and anti-detection protection.",
  keywords: [
    "workflow builder", "flow chart builder", "workflow creator",
    "visual workflow builder", "workflow diagram builder", "web scraping", 
    "ai workflow builder", "data automation", "AI-powered scraping", "web scraping tool", 
    "data extraction", "anti-detection system", "data analytics", "flow builder", 
    "scraping templates", "web scraping API", "data insights"
  ],
  openGraph: {
    title: "Web Scraping Automation - Sync and Extract Data Seamlessly",
    description: "Effortlessly collect and analyze data with an AI-powered, automated web scraping solution. Protect your IP and export your data seamlessly.",
    url: "https://scrapesync.com",
    images: "/og-image.png",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Scraping Automation - Sync and Extract Data Seamlessly",
    description: "Transform your data collection process with our advanced web scraping tool. Effortlessly extract, analyze, and integrate data from various sources with AI-powered automation and an intuitive workflow builder.",
    images: "/social-image.png",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <ClerkProvider 
      afterSignOutUrl="/"
      appearance={{
        elements: {
          formButtonPrimary: "bg-primary hover:bg-primary/90 text-sm"
        }
      }}
    >
      <html lang="en" suppressHydrationWarning={true}>
        <body
          className={`${montserrat.variable} ${quicksand.variable} antialiased font-sans`}
          style={{
            fontFamily: `var(--font-montserrat), var(--font-quicksand), sans-serif`,
          }}
        >
          <QueryProvider>
            <NextTopLoader color="blueviolet" showSpinner={false} />
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
            >
              <SignedOut>
                <Navbar />
              </SignedOut>
              <LoadingProvider>
                <LoadingWrapper />
                {children}
              </LoadingProvider>
            </ThemeProvider>
          </QueryProvider>
          <Toaster position="top-center" richColors />
          <SignedOut>
            <Footer />
          </SignedOut>
        </body>
      </html>
    </ClerkProvider>
  );
}
