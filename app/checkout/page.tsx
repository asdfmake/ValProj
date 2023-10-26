"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebaseClient";
import Encrypt from "./EncryptData";
const CryptoJS = require("crypto-js");

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);


export default function checkoutPage() {
  const [user, loading] = useAuthState(auth);

  const handleCheckout = async (userId: string) => {
    const stripe = await stripePromise;

    // menjaj link ispod da dobijes adekvatan session
    const response = await fetch("/api/create-checkout-session/teir1checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
      }),
    });

    const session = await response.json();
    console.log(session);
    // Redirect the user to the Stripe checkout page
    const result = await stripe!.redirectToCheckout({
      sessionId: session.id,
    });
  };

  //if (user) {
    return (
      <div>
        <button className="btn" onClick={()=>{handleCheckout(user?.uid!)}}>
          Checkout with Stripe
        </button>

        <button
          className="btn"
          onClick={() => {
            Encrypt("kita");
          }}
        >
          Encrypt shit
        </button>
      </div>
    );
  //}
}
