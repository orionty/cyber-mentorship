import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from "@/lib/stripe";
import axios from "axios";

export const config = {
    api: {
        bodyParser: false
    }
};

async function buffer(readable: any) {
    const chunks = [];
    for await (const chunk of readable) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    return Buffer.concat(chunks);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'] as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            buf,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        return res.status(400).json(`Webhook Error: ${error.message}`);
    }

    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session?.metadata?.userId;
    const courseId = session?.metadata?.courseId;

    if (event.type === "checkout.session.completed") {
        if (!userId || !courseId) {
            return res.status(400).json({ message: "Webhook Error: Missing metadata" });
        }

        try {
            await axios.post(
                `${process.env.BACK_END_URL}/api/courses/${courseId}/user/${userId}/purchased`
            );
            return res.status(200).json({ message: "Success" });
        } catch (error) {
            console.error('Purchase update error:', error);
            return res.status(500).json({ message: "Error updating purchase status" });
        }
    }

    return res.status(200).json({ message: `Unhandled event type ${event.type}` });
}