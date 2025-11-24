import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { HeartHandshake, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

export default function Donation() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDonate = async (e) => {
    e.preventDefault();

    if (Number(form.amount) < 100) {
      setNotification({
        type: "error",
        message: "⚠️ Minimum donation amount is ₹100.",
      });
      return;
    }

    setLoading(true);
    setNotification({ type: "", message: "" });

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/donations/create-order`,
        form
      );

      const { orderId, amount, currency } = data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
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
              `${import.meta.env.VITE_API_URL}/api/donations/verify-payment`,
              verifyData
            );
            setNotification({
              type: "success",
              message: "🎉 Thank you! Your donation was successful.",
            });
            setForm({
              name: "",
              email: "",
              phone: "",
              amount: "",
              message: "",
            });
          } catch (err) {
            console.error("Verification failed:", err);
            setNotification({
              type: "error",
              message: "⚠️ Payment verification failed. Please contact support.",
            });
          }
        },
        prefill: { name: form.name, email: form.email, contact: form.phone },
        theme: { color: "#16a34a" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      setNotification({
        type: "error",
        message: "⚠️ Something went wrong while creating order.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 flex items-center justify-center px-6 py-16">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
        {/* ================= INFO SECTION ================= */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center w-20 h-20 rounded-full bg-green-600 shadow-lg"
          >
            <HeartHandshake className="text-white w-10 h-10" />
          </motion.div>
          <h2 className="text-4xl font-bold text-green-700">
            Support Our Cause 💚
          </h2>
          <div className="w-24 h-1 bg-green-400 rounded-full"></div>
          <p className="text-gray-700 text-lg leading-relaxed">
            Your donation helps provide education, nutrition, and care to
            children in <strong>Mokhada and Trimbak</strong>. Every
            contribution, big or small, creates a lasting impact.
          </p>
          <p className="text-gray-600">
            Payments are securely handled via{" "}
            <strong>Razorpay</strong> for instant and safe transactions.
          </p>
          <Link to="/contact">
            <button className="mt-4 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-green-700 transition">
              Learn More
            </button>
          </Link>
        </div>

        {/* ================= DONATION FORM ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-2xl rounded-3xl p-10 border border-gray-100"
        >
          <div className="text-center mb-6">
            <h3 className="text-3xl font-extrabold text-green-700">
              Ek Paul Foundation
            </h3>
            <div className="w-20 h-1 bg-green-600 mx-auto my-2 rounded-full"></div>
            <p className="text-gray-600 text-sm">
              Together, we create hope and change lives.
            </p>
          </div>

          {notification.message && (
            <div
              className={`mb-5 px-4 py-3 rounded-lg text-center ${
                notification.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {notification.message}
            </div>
          )}

          <form onSubmit={handleDonate} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm text-gray-700 font-medium mb-1 block">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700 font-medium mb-1 block">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-700 font-medium mb-1 block">
                Phone Number
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-100 text-gray-600 text-sm">
                  +91
                </span>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ""); // remove non-digits
                    if (value.length <= 10) {
                      setForm({ ...form, phone: value });
                    }
                  }}
                  required
                  placeholder="Enter 10-digit number"
                  pattern="\d{10}"
                  maxLength="10"
                  className="w-full border border-gray-300 rounded-r-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1 text-center">
                Service available in India only (+91)
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-700 font-medium mb-1 block">
                Donation Amount (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                  ₹
                </span>
                <input
                  type="number"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  required
                  placeholder="Enter amount (min ₹100)"
                  min="100"
                  className="w-full border border-gray-300 rounded-lg p-4 pl-10 text-xl font-bold focus:outline-none focus:ring-2 focus:ring-green-500 text-center bg-green-50 placeholder:text-gray-400"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1 text-center">
                Minimum ₹100 required
              </p>
            </div>

            <div>
              <label className="text-sm text-gray-700 font-medium mb-1 block">
                Message (optional)
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="3"
                placeholder="Leave a kind message..."
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-60 shadow-md"
            >
              <CreditCard className="w-5 h-5" />
              {loading
                ? "Processing..."
                : "PAY WITH RAZORPAY (UPI RECOMMENDED)"}
            </motion.button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            100% of your donation goes directly towards our school support
            programs and nutrition drives.
          </p>
        </motion.div>
      </div>
    </div>
  );
}