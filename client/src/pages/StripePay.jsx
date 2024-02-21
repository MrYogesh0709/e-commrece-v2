import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "./StripeCheckout";
import { useLocation } from "react-router-dom";
import "../Stripe.css";
import PageNotFound from "./404";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function StripePay() {
  const [clientSecret, setClientSecret] = useState("");
  const { state } = useLocation();
  useEffect(() => {
    fetch("/api/v1/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        totalAmount: state?.totalAmount,
        orderId: state?.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const isDarkModePreferred = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const appearance = {
    theme: isDarkModePreferred ? "night" : "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  if (!clientSecret) {
    return <PageNotFound />;
  }

  return (
    <div className="Stripe ">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <StripeCheckout orderId={state.id} />
        </Elements>
      )}
    </div>
  );
}
