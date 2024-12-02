export enum PackId {
    SMALL = "SMALL",
    MEDIUM = "MEDIUM",
    LARGE = "LARGE"
}

export type CreditsPack = {
    id: PackId;
    name: string;
    label: string;
    credits: number;
    price: number;
    priceId: string;
    planId: string;
}

export const CreditsPacks: CreditsPack[] = [
    {
        id: PackId.SMALL,
        name: "Data Explorer",
        label: "1,000 credits",
        credits: 1000,
        price: 1299,
        priceId: process.env.DATA_EXPLORER_TEST_PRICE_ID!,
        planId: process.env.DATA_EXPLORER_TEST_PLAN_ID!,
    },
    {
        id: PackId.MEDIUM,
        name: "Automation Scout",
        label: "5,000 credits",
        credits: 5000,
        price: 2999,
        priceId: process.env.AUTOMATION_SCOUT_TEST_PRICE_ID!,
        planId: process.env.AUTOMATION_SCOUT_TEST_PLAN_ID!,
    },
    {
        id: PackId.LARGE,
        name: "Scrape Master",
        label: "10,000 credits",
        credits: 10000,
        price: 4999,
        priceId: process.env.SCRAPE_MASTER_TEST_PRICE_ID!,
        planId: process.env.SCRAPE_MASTER_TEST_PLAN_ID!,
    }
]

export const planFeatures = {
    [PackId.SMALL]: [
        "Automated web scraping",
        "Interactive flow builder",
        "Anti bot-detection system",
        "Detailed analytics",
        "Performance reports",
        "Data exports",
        "Quick-start templates",
        "Support",
        "1000 credits",
    ],
    [PackId.MEDIUM]: [
        "Automated web scraping with the help of AI",
        "Interactive flow builder",
        "Anti bot-detection system",
        "Advanced analytics with exports",
        "Pre-made templates",
        "Real-time reports",
        "Dedicated support",
        "5000 credits",
    ],
    [PackId.LARGE]: [
        "Everything in Automation Scout",
        "Priority support",
        "10000 credits",
    ],
};

export const getCreditsPackByPlanId = (planId: string) => CreditsPacks.find((p) => p.planId === planId);
