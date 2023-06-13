import { NextApiRequest, NextApiResponse } from "next";
/* import stripe from "../../../../stripe/stripeClient"; */
import Stripe from 'stripe'
import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { buffer } from 'micro';

const bodyParser = require("body-parser")

/* import Stripe from "stripe";
const stripe = new Stripe("whsec_756549f06a4550dbe3b23612942b47c76c15df7d36dddf6f7e9f0c2a5664f1d4", {apiVersion: "2022-11-15"}) */

const endpointSecret : string = "whsec_756549f06a4550dbe3b23612942b47c76c15df7d36dddf6f7e9f0c2a5664f1d4";

export async function POST(req: any, res: NextApiResponse) {
    bodyParser.raw({type: "application/json"})
    let request = await req.json();

    let rawData = '';

      for await (const chunk of request) {
        rawData += chunk;
      }

    return NextResponse.json({"nesto": rawData}, {status: 200});
}