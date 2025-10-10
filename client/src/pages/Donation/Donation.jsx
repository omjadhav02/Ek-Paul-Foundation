import { useState } from "react";
import axios from "axios";

export default function Donation() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    amount: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Step 1: Create order
      const { data } = await axios.post(
        "http://localhost:2000/api/donations/create-order",
        form
      );

      const { orderId, amount, currency } = data;

      // Step 2: Initialize Razorpay
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // from .env frontend
        amount,
        currency,
        name: "Ek Paul Foundation",
        description: "Donation Support",
        order_id: orderId,
        handler: async function (response) {
          const verifyData = {
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          };
          try {
            await axios.post(
              "http://localhost:2000/api/donations/verify-payment",
              verifyData
            );
            alert("🎉 Thank you! Your payment was successful.");
            setForm({ name: "", email: "", amount: "", message: "" });
          } catch (err) {
            console.error("Verification failed:", err);
            alert("⚠️ Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: form.name,
          email: form.email,
        },
        theme: { color: "#16a34a" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Something went wrong while creating order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full border border-gray-100">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Make a Donation 💚
        </h2>

        <form onSubmit={handleDonate} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="number"
            name="amount"
            placeholder="Donation Amount (₹)"
            value={form.amount}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <textarea
            name="message"
            placeholder="Your message (optional)"
            value={form.message}
            onChange={handleChange}
            rows="3"
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition disabled:opacity-60"
          >
            {loading ? "Processing..." : "Donate Now"}
          </button>
        </form>
      </div>
    </div>
  );
}
