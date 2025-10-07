import express from "express";
import { handleRazorpayWebhook } from "../controllers/webhook.controller.js";

const router = express.Router();

// Webhook expects RAW body for signature verification
router.post(
  "/razorpay",
  express.json({ type: "application/json" }),
  handleRazorpayWebhook
);

export default router;
