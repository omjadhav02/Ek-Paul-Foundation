import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function sendThankYouSMS(to, name, amount, paymentId) {
  try {
    const message = `Dear ${name}, thank you for your generous contribution of ₹${amount} to Ek Paul Foundation. Your support helps us create real change. Payment ID: ${paymentId} Visit : https://ekpaulfoundation.org Contact: contact@ekpaulfoundation.org - Ek Paul Foundation`;


    const response = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER, // your Twilio number
      to: `+91${to}`, // donor’s phone number (India)
    });

    console.log("✅ SMS sent:", response.sid);
    return response.sid;
  } catch (error) {
    console.error("❌ SMS sending failed:", error.message);
    throw error;
  }
}
