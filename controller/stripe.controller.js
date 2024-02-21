import stripe from "stripe";
import OrderModel from "../models/Order.model.js";
import { invoiceTemplate, sendMail } from "../utils/nodeMailerConfig.js";
const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.WEBHOOK_ENDPOINT;

export const stripeController = async (req, res) => {
  const { totalAmount, orderId } = req.body;
  const paymentIntent = await stripeClient.paymentIntents.create({
    amount: Math.round(totalAmount * 100),
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: { orderId },
  });
  res.json({
    clientSecret: paymentIntent.client_secret,
  });
};

export const stripeWebhookController = async (request, response) => {
  const sig = request.headers["stripe-signature"];
  let event;
  try {
    event = stripeClient.webhooks.constructEvent(
      request.body,
      sig,
      endpointSecret
    );
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.canceled":
      const paymentIntentCanceled = event.data.object;
      const orderCancel = await OrderModel.findById(
        paymentIntentCanceled.metadata.orderId
      );
      orderCancel.paymentStatus = "canceled";
      orderCancel.status = "cancelled";
      await orderCancel.save();
      // Then define and call a function to handle the event payment_intent.canceled
      break;

    case "payment_intent.payment_failed":
      const paymentIntentPaymentFailed = event.data.object;
      const orderFailed = await OrderModel.findById(
        paymentIntentPaymentFailed.metadata.orderId
      );
      orderFailed.paymentStatus = "failed";
      orderFailed.status = "cancelled";
      await orderFailed.save();
      // Then define and call a function to handle the event payment_intent.payment_failed
      break;
    case "payment_intent.succeeded":
      const paymentIntentSucceeded = event.data.object;
      const orderSuccess = await OrderModel.findById(
        paymentIntentSucceeded.metadata.orderId
      )
        .populate("items.product")
        .populate("user", "email")
        .populate("selectedAddress");
      orderSuccess.paymentStatus = "succeeded";
      orderSuccess.status = "dispatched";
      await orderSuccess.save();
      const {
        user: { email },
      } = orderSuccess;
      const subject = "E-commerce Order Placed";
      const html = invoiceTemplate(orderSuccess);
      //!don't want to block the code execution so no await
      sendMail({ to: email, subject, html });
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
};
