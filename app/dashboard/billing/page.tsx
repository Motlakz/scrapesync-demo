import { GetAvailableCredits } from '@/actions/billing/getAvailableCredits'
import ReactCountUpWrapper from '@/components/ReactCountUpWrapper'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import React, { Suspense } from 'react'
import { LiaCoinsSolid } from "react-icons/lia";
import CreditsPurchase from './_components/CreditsPurchase'
import { GetUserPurchaseHistory } from '@/actions/billing/getUserPurchaseHistory'
import { ArrowRightLeft } from 'lucide-react'
import InvoiceBtn from './_components/InvoiceBtn'

const BillingPage = () => {
    return (
        <section className="mx-auto p-4 space-y-8">
            <h1 className="sm:text-3xl text-xl font-bold">Billing</h1>
            <Suspense fallback={<Skeleton className="h-[166px] w-full" />}>
                <BalanceCard />
            </Suspense>
            <CreditsPurchase />
            <Suspense fallback={<Skeleton className="h-[1300px] w-full" />}>
                <TransactionHistoryCard />
            </Suspense>
        </section>
    )
}

async function BalanceCard() {
    const userBalance = await GetAvailableCredits();
    return (
        <Card className="bg-gradient-to-br relative overflow-hidden from-primary/10 via-primary/5 to-background-border-primary/20 shadow-lg flex flex-col justify-between">
            <CardContent className="p-5 relative">
                <article className="flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-semibold text-foreground mb-1">Available Credits</h3>
                        <p className="sm:text-4xl text-2xl font-bold text-primary dark:text-violet-400"><ReactCountUpWrapper value={userBalance} /></p>
                    </div>
                    <LiaCoinsSolid size={140} className="text-primary/20 dark:text-violet-400/20 absolute bottom-0 right-0" />
                </article>
            </CardContent>
            <CardFooter className="text-muted-foreground text-sm">
                When your credit balance hits zero, your workflows will stop working.
            </CardFooter>
        </Card>
    )
}

async function TransactionHistoryCard() {
    const purchases = await GetUserPurchaseHistory();
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    <ArrowRightLeft className="h-6 w-6 text-primary dark:text-violet-400" />
                    Transaction History
                </CardTitle>
                <CardDescription>
                    View your transaction history and download invoices.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {purchases.length === 0 && (
                    <p className="text-muted-foreground">No transactions made yet.</p>
                )}
                {
                    purchases.map((purchase) => (
                        <section key={purchase.id} className="flex items-center justify-between p-4 border-b last:border-b-0">
                            <article>
                                <p className="font-medium">{formatDate(purchase.date)}</p>
                                <p className="text-sm text-muted-foreground">{purchase.description}</p>
                            </article>
                            <article>
                                <p className="font-medium">{formatAmount(purchase.amount, purchase.currency)}</p>
                                <InvoiceBtn id={purchase.id} />
                            </article>
                        </section>
                    ))
                }
            </CardContent>
        </Card>
    )
}

function formatDate(date: Date) {
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(date);
}

function formatAmount(amount: number, currency: string) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
    }).format(amount / 100);
}

export default BillingPage