import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, HeartPulse, Sprout } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* ========== HERO SECTION ========== */}
      <section className="relative bg-gradient-to-r from-green-700 to-green-500 text-white py-28 md:py-40 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-bold mb-4 leading-snug"
        >
          Together, We Take One Step — Ek Paul
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="max-w-2xl mx-auto text-base md:text-xl opacity-90 mb-10"
        >
          Nurturing young minds, supporting tribal schools, and empowering
          communities around Nashik — one step at a time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            to="/donate"
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-3 rounded-full font-semibold transition"
          >
            Donate Now
          </Link>
        </motion.div>
      </section>

      {/* ========== MISSION SECTION ========== */}
      <section className="py-20 px-6 bg-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-10">
          Our Mission
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-green-50 rounded-2xl shadow-sm hover:shadow-md transition">
            <BookOpen className="w-10 h-10 mx-auto text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Education Support</h3>
            <p className="text-gray-600 text-sm md:text-base">
              We provide notebooks, school supplies, and basic learning tools
              to children in tribal government schools.
            </p>
          </div>

          <div className="p-6 bg-green-50 rounded-2xl shadow-sm hover:shadow-md transition">
            <HeartPulse className="w-10 h-10 mx-auto text-rose-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Health & Nutrition</h3>
            <p className="text-gray-600 text-sm md:text-base">
              Regular medical checkups and healthy meals help ensure every child
              grows stronger and learns better.
            </p>
          </div>

          <div className="p-6 bg-green-50 rounded-2xl shadow-sm hover:shadow-md transition">
            <Sprout className="w-10 h-10 mx-auto text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Community Growth</h3>
            <p className="text-gray-600 text-sm md:text-base">
              Beyond schools, we aim to uplift families and local communities
              by promoting care, cleanliness, and unity.
            </p>
          </div>
        </div>
      </section>

      {/* ========== CALL TO ACTION ========== */}
      <section className="bg-green-100 py-20 text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-6">
          Be a Part of the Change
        </h2>
        <p className="max-w-2xl mx-auto text-gray-700 mb-8 text-sm md:text-base">
          Join our movement to bring better education, health, and hope to
          children in the tribal regions of Maharashtra.
        </p>
        <Link
          to="/contact"
          className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-full font-semibold transition"
        >
          Join Us
        </Link>
      </section>
    </div>
  );
}
