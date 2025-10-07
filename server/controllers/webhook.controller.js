import crypto from "crypto";
import Donation from "../models/donation.model.js";

export const handleRazorpayWebhook = async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers["x-razorpay-signature"];

    // Verify webhook signature
    const shasum = crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if (digest !== signature) {
      console.error("❌ Invalid webhook signature");
      return res.status(400).json({ message: "Invalid signature" });
    }

    const event = req.body.event;
    const payment = req.body.payload.payment.entity;

    console.log(`🔔 Webhook received: ${event}`);

    // Update donation status based on event type
    if (event === "payment.captured") {
      await Donation.findOneAndUpdate(
        { orderId: payment.order_id },
        { transactionId: payment.id, paymentStatus: "success" }
      );
    } else if (event === "payment.failed") {
      await Donation.findOneAndUpdate(
        { orderId: payment.order_id },
        { transactionId: payment.id, paymentStatus: "failed" }
      );
    }

    res.status(200).json({ message: "Webhook processed successfully" });
  } catch (error) {
    console.error("⚠️ Webhook error:", error);
    res.status(500).json({ message: error.message });
  }
};
