import React, { useState } from "react";
import { Mail, Send } from "lucide-react";
import axios from "axios";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/contact`, formData);
      setStatus("Message sent successfully ✅");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("Something went wrong. Please try again ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-yellow-50 py-16 px-6 md:px-16 lg:px-24 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900">
            Contact <span className="text-yellow-500">Ek Paul Foundation</span>
          </h1>
          <p className="text-gray-600 mt-3 text-lg">
            Together, let's take one step forward — <em>Ek kadam Badlaav Ki Or.</em>
          </p>
          <div className="mt-2 w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Left Section - Info */}
          <div className="bg-white shadow-xl rounded-2xl p-8 border border-blue-100 flex flex-col justify-between">
            <h2 className="text-2xl font-semibold text-blue-800 mb-6">
              Get in Touch
            </h2>

            <div className="space-y-4 text-gray-700">
              <p>
                Ek Paul Foundation is committed to transforming the lives of children and communities in need. 
                Whether you want to volunteer, collaborate, or support financially, your contribution matters.
              </p>
              <p>
                Every small step helps — from spreading awareness, participating in events, or donating essential resources, 
                your support can create a meaningful impact.
              </p>
              <p>
                We believe in transparency, compassion, and consistent action. Together, we can ensure children have access 
                to education, nutrition, and a nurturing environment for growth.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-3 text-gray-700">
              <Mail className="text-blue-600" />
              <span>contact@ekpaulfoundation.org</span>
            </div>

            {/* Additional Info Section */}
            <div className="mt-6 bg-blue-50 p-4 rounded-xl border border-blue-100 shadow-sm">
              <h3 className="font-semibold text-blue-800 mb-2">Ways to Get Involved:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Volunteer at events and school programs</li>
                <li>Organize or participate in fundraising campaigns</li>
                <li>Provide educational supplies, books, or stationery</li>
                <li>Spread awareness about our initiatives in your community</li>
              </ul>
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <div className="bg-white shadow-xl rounded-2xl p-8 border border-blue-100">
            <h2 className="text-2xl font-semibold text-blue-800 mb-6">
              Send a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                required
              ></textarea>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-yellow-500 text-white w-full py-3 rounded-xl font-medium shadow-md hover:opacity-90 transition"
              >
                <Send size={18} /> Send Message
              </button>
            </form>

            {status && (
              <p className="text-center mt-4 text-sm text-gray-700">{status}</p>
            )}

            {/* Divider */}
            <div className="my-8 flex items-center gap-3">
              <div className="h-px bg-gray-300 flex-1"></div>
              <span className="text-gray-400 text-sm">or</span>
              <div className="h-px bg-gray-300 flex-1"></div>
            </div>

            {/* Donation QR Section */}
            <div className="text-center">
              <p className="text-gray-600 mb-5">Support our mission by donating</p>
                <a
                  href="/donate"
                  className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-semibold px-8 py-3 rounded-full shadow-md transition"
                >
                  Donate Now 💛
                </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
