"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CirclePlay, Brain, LucideIcon } from "lucide-react";
import { GrAnalytics } from "react-icons/gr";
import { TbReport } from "react-icons/tb";
import { IconType } from "react-icons/lib";
import { BiMoney } from "react-icons/bi";
import { HiTemplate } from "react-icons/hi";

interface QuickStartCardProps {
    title: string;
    description: string;
    image: string;
    icon: LucideIcon | IconType;
    link: string;
}

const QuickStartCards = () => {
    const router = useRouter();

    const cards: QuickStartCardProps[] = [
        {
            title: "Kickstart Your Workflows",
            description: "Steer your workflow into gear with our templates.",
            image: "/templates.png",
            icon: HiTemplate,
            link: "/dashboard/templates",
        },
        {
            title: "Run New Workflow",
            description: "Launch a new automation workflow.",
            image: "/flow.png",
            icon: CirclePlay,
            link: "/dashboard/workflows",
        },
        {
            title: "View Analytics",
            description: "Track your workflow metrics.",
            image: "/scraperlytics.png",
            icon: GrAnalytics,
            link: "/dashboard/scraperlytics",
        },
        {
            title: "Check Status Reports",
            description: "Stay on track with your performance.",
            image: "/reports.png",
            icon: TbReport,
            link: "/dashboard/reports",
        },
        {
            title: "Add Your Credentials",
            description: "Add your API key to work with AI.",
            image: "/creds.png",
            icon: Brain,
            link: "/dashboard/credentials",
        },
        {
            title: "Recharge Your Credits",
            description: "Upgrade your package or recharge your credits",
            image: "/billing.png",
            icon: BiMoney,
            link: "/dashboard/billing",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards.map((card, index) => (
                <QuickStartCard
                    key={index}
                    {...card}
                    onAction={() => router.push(card.link)}
                />
            ))}
        </div>
    );
};

const QuickStartCard: React.FC<
    QuickStartCardProps & { onAction: () => void }
> = ({ title, description, image, icon: Icon, onAction }) => {
    return (
        <Card
            onClick={onAction}
            className="relative overflow-hidden h-full cursor-pointer transition-transform hover:scale-105 hover:shadow-lg"
        >
            {/* Header Image */}
            <div className="relative w-full h-64">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover group-hover:opacity-90"
                />
            </div>
            {/* Card Content */}
            <CardHeader className="pb-2">
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
                <p className="text-muted-foreground text-sm">{description}</p>
                <Icon size={20} className="text-primary dark:text-violet-400" />
            </CardContent>
        </Card>
    );
};

export default QuickStartCards;
