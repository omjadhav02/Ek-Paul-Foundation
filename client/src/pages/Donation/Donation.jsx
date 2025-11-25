import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { HeartHandshake, CreditCard, CheckCircle, Instagram } from "lucide-react";
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

  // Congrats modal state
  const [showCongrats, setShowCongrats] = useState(false);
  const [lastDonation, setLastDonation] = useState({ name: "", amount: "" });

  // Instagram URL
  const instaUrl = "https://instagram.com/ekpaulfoundation";

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
          } catch (err) {
            console.error("Verification issue (but payment captured):", err);
          }

          // Save donor info
          setLastDonation({
            name: form.name || "Friend",
            amount: form.amount || (amount / 100).toString(),
          });

          // Show popup
          setNotification({
            type: "success",
            message: "🎉 Thank you! Your donation was successful.",
          });
          setShowCongrats(true);

          // Clear form
          setForm({
            name: "",
            email: "",
            phone: "",
            amount: "",
            message: "",
          });
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

      {/* 🎉 Congrats Popup (NO MORE TIMER) */}
      <AnimatePresence>
        {showCongrats && (
          <motion.div
            key="congrats-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="relative z-50 max-w-lg w-full mx-6 bg-white rounded-3xl shadow-2xl border border-green-100 p-8 text-center"
            >
              <div className="bg-green-50 rounded-full p-4 mb-4 flex justify-center">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>

              <h2 className="text-3xl font-extrabold text-green-700 mb-2">
                Payment Successful
              </h2>

              <p className="text-gray-600 mb-4">
                Thank you{" "}
                <span className="font-semibold text-gray-800">
                  {lastDonation.name}
                </span>{" "}
                for donating{" "}
                <span className="font-semibold text-gray-800">
                  ₹{lastDonation.amount}
                </span>
                . Your support means a lot!
              </p>

              {/* Instagram CTA */}
              <a
                href={instaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white py-3 rounded-xl font-semibold shadow-lg transition transform hover:scale-105 mb-6"
              >
                <Instagram className="w-5 h-5" />
                Follow us on Instagram for regular updates
              </a>

              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setShowCongrats(false)}
                  className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
                >
                  Close
                </button>

                <Link
                  to="/"
                  className="flex-1"
                  onClick={() => setShowCongrats(false)}
                >
                  <button className="w-full bg-white border border-gray-200 text-gray-700 py-3 rounded-xl font-semibold shadow-sm hover:bg-gray-50 transition">
                    Back to Home
                  </button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rest of your donation layout unchanged */}
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">

        {/* Info Section */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center w-20 h-20 rounded-full bg-green-600 shadow-lg"
          >
            <HeartHandshake className="text-white w-10 h-10" />
          </motion.div>

          <h2 className="text-4xl font-bold text-green-700">Support Our Cause 💚</h2>
          <div className="w-24 h-1 bg-green-400 rounded-full"></div>

          <p className="text-gray-700 text-lg leading-relaxed">
            Your donation helps provide education, nutrition, and care to
            children in <strong>Mokhada and Trimbak</strong>.
          </p>

          <p className="text-gray-600">
            Payments are securely handled through <strong>Razorpay</strong>.
          </p>

          <Link to="/contact">
            <button className="mt-4 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-green-700 transition">
              Learn More
            </button>
          </Link>
        </div>

        {/* Donation Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-2xl rounded-3xl p-10 border border-gray-100"
        >
          <div className="text-center mb-6">
            <h3 className="text-3xl font-extrabold text-green-700">Ek Paul Foundation</h3>
            <div className="w-20 h-1 bg-green-600 mx-auto my-2 rounded-full"></div>
            <p className="text-gray-600 text-sm">Together, we create hope and change lives.</p>
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
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500"
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
                  placeholder="email@example.com"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Phone */}
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
                    const v = e.target.value.replace(/\D/g, "");
                    if (v.length <= 10)
                      setForm({ ...form, phone: v });
                  }}
                  required
                  placeholder="10-digit number"
                  maxLength="10"
                  className="w-full border border-gray-300 rounded-r-lg p-3 focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="text-sm text-gray-700 font-medium mb-1 block">
                Donation Amount (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                <input
                  type="number"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  required
                  min={100}
                  placeholder="Min ₹100"
                  className="w-full border border-gray-300 rounded-lg p-4 pl-10 text-xl font-bold bg-green-50 focus:ring-2 focus:ring-green-500 text-center"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="text-sm text-gray-700 font-medium mb-1 block">
                Message (optional)
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="3"
                placeholder="Your message..."
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Donate Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 shadow-md"
            >
              <CreditCard className="w-5 h-5" />
              {loading ? "Processing..." : "PAY WITH RAZORPAY (UPI RECOMMENDED)"}
            </motion.button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            100% of your donation goes directly towards our school programs.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
