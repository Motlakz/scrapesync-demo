import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { CreditsPacks } from '@/types/billing';

interface BaseWebhookData {
    company_id: string;
    country_id: string;
    customer_id: string;
    customer_identifier: string;
    timestamp: number;
    plan_id: string;
}

interface SubscriptionStatusData extends BaseWebhookData {
    reason: string | null;
    status: string;
    trial_used: boolean;
}

interface StykiteWebhookEvent {
    id: string;
    event: string;
    data: SubscriptionStatusData;
    created_at: number;
}

const getCreditsByPlanId = (planId: string): number => {
    const pack = CreditsPacks.find(p => p.planId === planId);
    return pack?.credits || 0;
};

async function handleSubscriptionStatusUpdate(data: SubscriptionStatusData) {
    const { customer_id, status, plan_id } = data;
  
    try {
        // Get current balance
        const currentBalance = await prisma.userBalance.findUnique({
            where: { userId: customer_id }
        });

        if (!currentBalance) {
            throw new Error('User balance not initialized');
        }

        let newCredits: number;
        
        switch (status) {
            case 'active':
                // Set credits to plan amount plus any remaining free credits
                const planCredits = getCreditsByPlanId(plan_id);
                const freeCredits = currentBalance.credits <= 100 ? currentBalance.credits : 100;
                newCredits = planCredits + freeCredits;
                break;
                
            case 'cancelled':
            case 'suspended':
                // Keep free credits (up to 100) when subscription ends
                newCredits = Math.min(currentBalance.credits, 100);
                break;
                
            case 'past_due':
                // Optionally handle past due status - could keep current credits or reduce to free tier
                newCredits = currentBalance.credits;
                break;
                
            default:
                // For unknown status, maintain current balance
                newCredits = currentBalance.credits;
        }

        // Update user balance
        await prisma.userBalance.update({
            where: { userId: customer_id },
            data: { credits: newCredits }
        });

        console.log(`Subscription updated for user ${customer_id}:`, {
            status,
            planId: plan_id,
            previousCredits: currentBalance.credits,
            newCredits,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error handling subscription update:', error);
        throw error;
    }
}

async function handleAddonPurchase(data: BaseWebhookData) {
    const { customer_id, plan_id } = data;
    
    try {
        const additionalCredits = getCreditsByPlanId(plan_id);
        
        if (additionalCredits <= 0) {
            throw new Error(`Invalid addon plan credits for plan: ${plan_id}`);
        }

        // Add the addon credits to existing balance
        await prisma.userBalance.update({
            where: { userId: customer_id },
            data: {
                credits: {
                    increment: additionalCredits
                }
            }
        });

        console.log(`Addon purchase processed for user ${customer_id}:`, {
            planId: plan_id,
            creditsAdded: additionalCredits,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error handling addon purchase:', error);
        throw error;
    }
}
  
export async function POST(request: NextRequest) {
    try {
        // Verify Stykite webhook
        const apiHost = request.headers.get('x-api-host');
        const apiKey = request.headers.get('x-api-key');
        
        if (apiHost !== 'stykite' || apiKey !== process.env.STYKITE_WEBHOOK_SECRET) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const event: StykiteWebhookEvent = await request.json();

        switch (event.event) {
            case 'customer.subscription_status.update':
                await handleSubscriptionStatusUpdate(event.data as SubscriptionStatusData);
                break;
                
            case 'addon.purchase.success':
                await handleAddonPurchase(event.data);
                break;
                
            default:
                console.log('Unhandled event type:', event.event);
        }

        return NextResponse.json({ received: true }, { status: 200 });

    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
