import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "./StripeCheckout";
import { useSelector } from "react-redux";
import { selectOrder } from "../features/order/orderSlice";
import "../Stripe.css";
import PageNotFound from "./404";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function StripePay() {
  const [clientSecret, setClientSecret] = useState("");
  const { currentOrder } = useSelector(selectOrder);
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/v1/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        totalAmount: currentOrder?.totalAmount,
        orderId: currentOrder?.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  // Check if the user's system prefers dark mode
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
          <StripeCheckout />
        </Elements>
      )}
    </div>
  );
}
