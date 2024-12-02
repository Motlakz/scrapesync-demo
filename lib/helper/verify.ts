import crypto from 'crypto';

export const WEBHOOK_SECRET = process.env.FUNGIES_WEBHOOK_SECRET;

export function verifySignature(payload: string, signature: string): boolean {
    const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET!);
    const calculatedSignature = `sha256_${hmac.update(payload).digest('hex')}`;
    return crypto.timingSafeEqual(
        Buffer.from(calculatedSignature),
        Buffer.from(signature)
    );
}