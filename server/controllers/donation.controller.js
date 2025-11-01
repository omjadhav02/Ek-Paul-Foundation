import razorpay from "../config/razorpay.js";
import Donation from "../models/donation.model.js";
import crypto from "crypto";
import { donationSuccessTemplate } from "../utils/email-templates/donationSuccess.js";
import { sendEmail } from "../utils/resend-email/resendEmail.js";
import { sendThankYouSMS } from "../utils/sms/sendThankYouSMS.js";
import { generateDonationReceipt } from "../utils/pdf/generateDonationReceipt.js";
import fs from "fs";

export const createOrder = async (req, res) => {
  try {
    const { amount, name, email, phone, message } = req.body;

    if (!amount || !name || !email || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const MIN_AMOUNT = 1;
    const MAX_AMOUNT = 500000;

    if (amount < MIN_AMOUNT || amount > MAX_AMOUNT) {
      return res.status(400).json({
        message: `Amount must be between ${MIN_AMOUNT} and ${MAX_AMOUNT}`,
      });
    }

    const options = {
      amount: amount * 100, // convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    const donation = await Donation.create({
      name,
      email,
      phone,
      amount,
      message,
      orderId: order.id,
      paymentStatus: "pending",
    });

    res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      donationId: donation._id,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ message: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { order_id, payment_id, signature } = req.body;

    // 🔐 Verify signature
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${order_id}|${payment_id}`)
      .digest("hex");

    if (generated_signature !== signature) {
      await Donation.findOneAndUpdate(
        { orderId: order_id },
        { paymentStatus: "failed" }
      );
      return res.status(400).json({ message: "Invalid Payment Signature" });
    }

    // ✅ Update donation record
    const donation = await Donation.findOneAndUpdate(
      { orderId: order_id },
      { transactionId: payment_id, paymentStatus: "success" },
      { new: true }
    );

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    // ✅ Generate PDF receipt first
    const pdfPath = await generateDonationReceipt(donation);

    // ✅ Prepare email template
    const html = donationSuccessTemplate(
      donation.name,
      donation.amount,
      new Date(donation.createdAt).toLocaleString(),
      donation.transactionId
    );

    // ✅ Send email with PDF
    await sendEmail({
      from: process.env.FOUNDATION_EMAIL,
      to: donation.email,
      subject: "Your Donation - Ek Paul Foundation",
      html,
      attachments: [
        {
          filename: `Receipt_${donation.transactionId}.pdf`,
          path: pdfPath,
          contentType: "application/pdf",
        },
      ],
    });

    // ✅ Delete temporary PDF safely
    if (fs.existsSync(pdfPath)) {
      fs.unlink(pdfPath, (err) => {
        if (err) console.error("⚠️ Error deleting temp PDF:", err);
      });
    }

    // ✅ Send thank-you SMS if phone exists
    // if (donation.phone) {
    //   await sendThankYouSMS(
    //     donation.phone,
    //     donation.name,
    //     donation.amount,
    //     donation.transactionId
    //   );
    // }

    // ✅ Final response
    res.status(200).json({
      message: "Payment verified, email and SMS sent successfully",
      donation,
    });
  } catch (error) {
    console.error("❌ Error in verifyPayment:", error);
    res.status(500).json({ message: error.message });
  }
};



export const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find({}).sort({date: -1});

    if(!donations){
      return res.status(401).json({message: "No Donations Yet!"});
    }

    res.status(200).json(donations);
  } catch (error) {
    console.error("Error in getAllDonations Controller:", error);
    res.status(500).json({ message: error.message });
  }
}

export const getDonationByID = async (req,res)=>{
  try {
    const donation = await Donation.findById(req.params.id);

    if(!donation){
      return res.status(404).json({message: "Donation Not Found!"})
    }

    res.status(200).json(donation);
  } catch (error) {
    console.error("Error in getDonationByID Controller:", error);
    res.status(500).json({ message: error.message });
  }
}

export const updateDonation = async (req,res) =>{
  try {
    const donation = await Donation.findByIdAndUpdate(req.params.id, req.body, {new:true});
    if(!donation){
      return res.status(404).json({message: "Donation Not Found!"})
    }
    res.status(200).json({message:"Donation Updated!"},donation);
  } catch (error) {
    console.error("Error in updateDonation Controller:", error);
    res.status(500).json({ message: error.message });
  }
}

export const deleteDonation = async (req,res)=>{
  try {
    const donation = await Donation.findByIdAndDelete(req.params.id);
    if(!donation){
      return res.status(404).json({message: "Donation Not Found!"})
    }
    res.status(200).json({message: "Donation deleted Successfully!"},donation)
  } catch (error) {
    console.error("Error in deleteDonation Controller:", error);
    res.status(500).json({ message: error.message });
  }
}
