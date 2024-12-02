"use client"

import { GetCreditsUsageInPeriod } from "@/actions/analytics/getCreditsUsageInPeriod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ChartCandlestickIcon } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

type ChartData = Awaited<ReturnType<typeof GetCreditsUsageInPeriod>>;
const chartConfig = {
    success: {
        label: "Successful phases credits",
        color: "hsl(var(--chart-2))"
    },
    failed: {
        label: "Failed phases credits",
        color: "hsl(var(--chart-1))"
    }
}

const CreditsUsageChart = ({ data, title, description }: { data: ChartData, title: string, description: string }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="sm:text-2xl text-lg font-bold flex items-center gap-2">
                    <ChartCandlestickIcon className="w-6 h-6 text-primary dark:text-violet-400" />
                    {title}
                </CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="max-h-[200px] w-full">
                    <BarChart data={data} height={200} accessibilityLayer margin={{ top: 20 }}>
                        <CartesianGrid />
                        <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} minTickGap={32} tickFormatter={value => {
                            const date = new Date(value);
                            return date.toLocaleString("en-US", {
                                month: "short",
                                day: "numeric"
                            })
                        }} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <ChartTooltip content={<ChartTooltipContent className="w-[250px]" />} />
                        <Bar fill="var(--color-success)" fillOpacity={0.8} stroke="var(--color-success)" dataKey="success" stackId="a" />
                        <Bar fill="var(--color-failed)" fillOpacity={0.8} stroke="var(--color-failed)" dataKey="failed" stackId="a" />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default CreditsUsageChart