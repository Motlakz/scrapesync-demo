"use client"

import { PurchaseCredits } from "@/actions/billing/purchaseCredits";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditsPacks, PackId } from "@/types/billing";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { FaCreditCard } from "react-icons/fa";
import { LiaCoinsSolid } from "react-icons/lia";
import { toast } from "sonner";

const CreditsPurchase = () => {
    const [selectedPack, setSelectedPack] = useState(PackId.MEDIUM);

    const mutation = useMutation({
        mutationFn: PurchaseCredits,
        onSuccess: (data) => {
            toast.success(`Purchase successful! New balance: ${data.newBalance}`);
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        },
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    <LiaCoinsSolid className="h-6 w-6 text-primary dark:text-violet-400" />
                    Purchase Credits
                </CardTitle>
                <CardDescription>
                    Select the number of credits you would like to purchase.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <RadioGroup onValueChange={(value) => setSelectedPack(value as PackId)} value={selectedPack}>
                    {CreditsPacks.map((pack) => (
                        <div key={pack.id} className="flex items-center space-x-3 bg-secondary/50 rounded-lg p-3 dark:hover:bg-violet-800/10 hover:bg-violet-100" onClick={() => setSelectedPack(pack.id)}>
                            <RadioGroupItem value={pack.id} id={pack.id} />
                            <Label className="flex justify-between w-full cursor-pointer items-center">
                                <span className="font-medium">{pack.name} - {pack.label}</span>
                                <span className="font-bold text-primary dark:text-violet-400">${(pack.price / 100).toFixed(2)}</span>
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </CardContent>
            <CardFooter>
                <Button 
                    disabled={mutation.isPending} 
                    className="w-full group hover:bg-violet-800/10 dark:hover:text-violet-400 hover:text-violet-600 border border-transparent hover:border-violet-500"
                    onClick={() => {
                        mutation.mutate(selectedPack)
                    }}
                >
                    <FaCreditCard className="mr-2 h-5 w-5 group-hover:text-violet-500" /> Purchase Credits
                </Button>
            </CardFooter>
        </Card>
    )
}

export default CreditsPurchase