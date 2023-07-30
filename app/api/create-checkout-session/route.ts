import { loadStripe } from '@stripe/stripe-js';
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server';
import stripe from "../../../stripe/stripeClient"


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
//NE MOZE DA RADI BEZ STRIPE CLI A

export async function POST(req: Request, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {

        let reqBody = await req.json();
        let user_id = reqBody.user_id;
        console.log("create session:", user_id)
            
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
            {
                price: 'price_1N9cWTD33Gveml2rFy3rHMcT', // Replace with your actual price ID
                quantity: 1,
            },
            ],
            mode: 'subscription',
            success_url: "http://localhost:3000/checkout",
            cancel_url: "http://localhost:3000/checkout",
            metadata: {
                'user_id': user_id,
              },
        });
        
        return NextResponse.json({ id: session.id });
        } catch (error: any) {
            
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
            return NextResponse.json({ error: error.message });
        }
    } else {
        console.log("jebem li ga neki error")
    }
}
.3

/* export async function POST(request: Request) {
    const res = await request.json();
    return NextResponse.json({ res });
} */