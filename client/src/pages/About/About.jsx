import React, { useState, useEffect } from "react";
import { Leaf, School, Hammer, Sprout, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function About() {
  const teamMembers = [
    "Manish Jadhav",
    "Rohit Gaikwad",
    "Ganesh Gajjewar",
    "Sangeeta Bhise",
    "Sonali Amberkar",
    "Hanumant Ghule",
    "Jagannath Jadhav",
    "Raees Shah",
    "Om Jadhav",
  ];

  const heroImages = [
    "/images/image11.jpg",
    "/images/image18.jpg",
    "/images/image1.jpg",
    "/images/image26.jpg",
    "/images/image19.jpg",
    "/images/image17.jpg",
    "/images/image12.jpg",
    
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 5000); // change image every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center text-white text-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={heroImages[current]}
            src={heroImages[current]}
            alt="Ek Paul Foundation School Work"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 px-6">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-4 leading-tight"
          >
            About Ek Paul Foundation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-3xl mx-auto text-base md:text-xl opacity-90"
          >
            Established in 2017 by <strong>Jagannath Jadhav</strong>, Ek Paul Foundation — <i>previously known as Hira Jadhav Foundation</i> — is a government-approved charity committed to empowering children through education, community support, and sustainable initiatives. We may be small, but we are expanding rapidly online to reach more children in Palghar and Nashik.
          </motion.p>
        </div>
      </section>

      {/* ================= OUR JOURNEY ================= */}
      <section className="py-20 px-6 md:px-20 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Journey</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Since 2017, our small yet passionate team has been working tirelessly to bring education and support to underprivileged children. Starting with a few villages in Palghar and Nashik, we have grown into a recognized NGO, steadily expanding our initiatives.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Every year, we aim to reach more children, improve school environments, and engage communities to create a lasting impact. Our online expansion ensures that supporters from anywhere can contribute to our mission.
          </p>
        </div>
      </section>

      {/* ================= CORE VALUES ================= */}
      <section className="py-20 px-6 md:px-20 bg-green-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Transparency", icon: <Leaf className="w-14 h-14 text-white" />, color: "bg-gradient-to-br from-green-500 to-green-700", desc: "We operate with honesty and clarity in all initiatives." },
              { title: "Sustainability", icon: <Sprout className="w-14 h-14 text-white" />, color: "bg-gradient-to-br from-lime-500 to-green-500", desc: "Projects are designed to last and support future generations." },
              { title: "Community First", icon: <Users className="w-14 h-14 text-white" />, color: "bg-gradient-to-br from-green-600 to-green-800", desc: "Engaging local communities to ensure children are fully supported." },
            ].map((val, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`${val.color} rounded-3xl p-10 shadow-lg flex flex-col items-center text-center`}
              >
                {val.icon}
                <h3 className="text-xl font-bold mt-4 mb-2 text-white">{val.title}</h3>
                <p className="text-white opacity-90 text-sm">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= KEY INITIATIVES ================= */}
      <section className="py-20 px-6 md:px-20 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Key Initiatives</h2>
          {[
            {
              title: "School Support",
              icon: <School className="w-12 h-12 text-green-700" />,
              desc: "Helping government schools without infrastructure with essential supplies, furniture, and learning resources.",
              img: "image2.jpg",
              reverse: false,
            },
            {
              title: "Infrastructure Support",
              icon: <Hammer className="w-12 h-12 text-green-700" />,
              desc: "Creating safe, child-friendly classrooms and functional school environments through civil work projects.",
              img: "image3.jpg",
              reverse: true,
            },
            {
              title: "Community Engagement",
              icon: <Sprout className="w-12 h-12 text-green-700" />,
              desc: "Engaging families, volunteers, and communities to create holistic support systems for children.",
              img: "image11.jpg",
              reverse: false,
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: item.reverse ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col md:flex-row items-center mb-12 ${item.reverse ? "md:flex-row-reverse" : ""}`}
            >
              <div className="md:w-1/2 p-6">
                <div className="bg-white rounded-3xl p-8 shadow-lg text-center md:text-left">
                  <div className="flex justify-center md:justify-start mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-700">{item.desc}</p>
                </div>
              </div>
              <div className="md:w-1/2 p-6">
                <img src={`/images/${item.img}`} alt={item.title} className="rounded-2xl shadow-lg object-cover w-full h-64" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= PARASBAUG CONCEPT ================= */}
      <section className="py-20 bg-white px-6 md:px-20">
        <div className="max-w-5xl mx-auto text-center">
          <Sprout className="mx-auto text-green-600 w-14 h-14 mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">The Parasbaug Concept</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Our innovative <strong>“Parasbaug”</strong> initiative transforms unused school land into self-sustaining gardens. These gardens not only provide fresh produce for meals but also teach children about sustainability, agriculture, and the value of nature.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            By engaging children directly in these activities, we cultivate responsibility, teamwork, and environmental awareness — preparing them to become conscious future citizens.
          </p>
          <img src="/images/image5.jpg" alt="Parasbaug" className="rounded-2xl shadow-lg mt-6 w-full max-h-96 object-cover" />
        </div>
      </section>

      {/* ================= TEAM ================= */}
      <section className="py-20 px-6 md:px-20 bg-green-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Meet Our Team</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg text-center"
              >
                <div className="text-green-700 text-xl font-semibold mb-2">{member}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}
      <section className="bg-green-700 text-white py-20 text-center">
        <Leaf className="mx-auto w-12 h-12 mb-4 text-lime-300" />
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">One Step Can Change Many Lives</h2>
        <p className="max-w-2xl mx-auto text-lg mb-8">
          Together, we can nourish, educate, and empower the next generation.  
          Join hands with Ek Paul Foundation to make that one step count.
        </p>
        <Link to="/donate">
          <button className="bg-lime-400 hover:bg-lime-500 text-green-900 font-semibold px-8 py-3 rounded-full transition">
            Donate Now
          </button>
        </Link>
      </section>
    </div>
  );
}
