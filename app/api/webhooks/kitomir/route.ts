import { NextApiRequest, NextApiResponse } from "next";
import stripe from "../../../../stripe/stripeClient";
import Stripe from 'stripe'
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { upgradeUser } from "@/firebase/userFunctions";

const bodyParser = require("body-parser")


/* import Stripe from "stripe";
const stripe = new Stripe("whsec_756549f06a4550dbe3b23612942b47c76c15df7d36dddf6f7e9f0c2a5664f1d4", {apiVersion: "2022-11-15"}) */

const endpointSecret : string = "whsec_756549f06a4550dbe3b23612942b47c76c15df7d36dddf6f7e9f0c2a5664f1d4";

/* export const config = {
  api:{
    bodyParser: false,
  },
}; */
let event: any;

export async function GET(req: any, res: NextApiResponse) {
  return NextResponse.json({event}, {status: 201})
}

export async function POST(req: any, res: NextApiResponse) {
  bodyParser.raw({type: "application/json"})
  let sig : string = headers().get("stripe-signature")!;

  event = await req.json();

  //console.log(event.type, event.data.object)

  /* if(event.type=="customer.subscription.created"){
    console.log(event.data.object)
  } */

  if(event.type=="checkout.session.completed"){//OVDE DOBIJAS METADATA
    console.log("checkout.session.completed user id:", event.data.object.metadata.user_id)
    upgradeUser(event.data.object.metadata.user_id)
  }

  
  /* const rawBody = await buffer(req)
  console.log("\n", rawBody) */

  /* try {
    event = Stripe.webhooks.constructEvent(rawBody.toString(), sig, process.env.STRIPE_PRIVATE_KEY!);
    console.log(event.id)
  } catch (err:any) {
    console.log( "\n" + err.message)
    return NextResponse.json({"\nerror:": err.message}, {status: 400})
  } */
  
  /* try {
    event = stripe.webhooks.constructEvent(rawBody.toString(), sig, process.env.STRIPE_PRIVATE_KEY!);
  } catch (err:any) {
    console.log( "\n" + err.message)
    return NextResponse.json({"\nerror:": err.message}, {status: 400})
  }

  // Handle the event
  switch (event.type) {
    case 'invoice.payment_succeeded':
      const invoicePaymentSucceeded = event.data.object;
      console.log("invoice payment")
      // Then define and call a function to handle the event invoice.payment_succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  } */
    
  return NextResponse.json({}, {status: 200});
}