import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { z } from 'zod';

// Validation schema for customer data
const customerSchema = z.object({
    email: z.string().email(),
    first_name: z.string().min(1),
    last_name: z.string().optional(),
});

type CustomerData = z.infer<typeof customerSchema>;

const STYKITE_API_URL = 'https://sandbox.api.stykite.com/v1';
const COMPANY_ID = process.env.STYKITE_COMPANY_ID;
const COUNTRY_ID = process.env.STYKITE_COUNTRY_ID;
const API_KEY = process.env.STYKITE_API_KEY;

async function createStykiteCustomer(data: CustomerData) {
    const response = await fetch(
        `${STYKITE_API_URL}/company/${COMPANY_ID}/country/${COUNTRY_ID}/customer`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
    );

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create customer in Stykite');
    }

    return response.json();
}

export async function POST(request: NextRequest) {
    try {
        // Verify authentication
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Validate environment variables
        if (!COMPANY_ID || !COUNTRY_ID || !API_KEY) {
            throw new Error('Missing required environment variables');
        }

        // Parse and validate request body
        const body = await request.json();
        const validatedData = customerSchema.parse({
            ...body,
            customer_identifier: userId, // Use Clerk userId as customer_identifier
        });

        // Create customer in Stykite
        const stykiteCustomer = await createStykiteCustomer(validatedData);

        // Return success response
        return NextResponse.json({
            status: true,
            data: stykiteCustomer
        }, { status: 201 });

    } catch (error) {
        console.error('Error creating customer:', error);

        if (error instanceof z.ZodError) {
            return NextResponse.json({
                status: false,
                error: 'Validation error',
                details: error.errors
            }, { status: 400 });
        }

        return NextResponse.json({
            status: false,
            error: error instanceof Error ? error.message : 'Internal server error'
        }, { status: 500 });
    }
}