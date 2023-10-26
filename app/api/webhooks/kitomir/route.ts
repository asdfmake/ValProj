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

let event: any;

export async function GET(req: any, res: NextApiResponse) {
  return NextResponse.json({event}, {status: 201})
}

export async function POST(req: any, res: NextApiResponse) {
  bodyParser.raw({type: "application/json"})
  let sig : string = headers().get("stripe-signature")!;
  event = await req.json();
  if(event.type=="checkout.session.completed"){//OVDE DOBIJAS METADATA
    console.log("checkout.session.completed user id:", event.data.object.metadata.user_id)
    console.log(event.data.object.metadata)
    upgradeUser(event.data.object.metadata.user_id, event.data.object.metadata.product)
  }
    
  return NextResponse.json({}, {status: 200});
}