import { motion } from "framer-motion";
import { School, Users, HeartPulse, Sprout, Globe2, BookOpen } from "lucide-react";

const stats = [
  { label: "Schools Supported", value: 6, icon: <School className="w-10 h-10 text-emerald-700" /> },
  { label: "Children Reached", value: "250+", icon: <Users className="w-10 h-10 text-emerald-700" /> },
  { label: "Volunteers", value: "10+", icon: <Sprout className="w-10 h-10 text-emerald-700" /> },
  { label: "Health Checkups", value: "Regular", icon: <HeartPulse className="w-10 h-10 text-emerald-700" /> },
];

const impacts = [
  {
    title: "Quality Education",
    description:
      "Most children had little to no access to proper education. With Ek Paul, we provided school bags, notebooks, books, and basic learning materials — giving every child the chance to dream and learn fearlessly.",
    image: "/images/image5.jpg",
  },
  {
    title: "Better Health & Nutrition",
    description:
      "Malnutrition and lack of medical support were common. Through regular health checkups and supplementary mid-day meals — including soya granules, rava, chikki, and laddus — we’ve significantly improved the children's health and overall wellbeing.",
    image: "/images/image11.jpg",
  },
  {
    title: "Improved Infrastructure",
    description:
      "We repaired classrooms, built safe study spaces, and ensured clean water and sanitation. Our initiatives create safe, child-friendly learning environments where children can focus on learning without worry.",
    image: "/images/image3.jpg",
  },
  {
    title: "Empowering Communities",
    description:
      "We provided sandals, clothes, and essential items, while involving local people in each initiative — building a sense of ownership, dignity, and long-term sustainability. Change begins when a community believes in itself.",
    image: "/images/image1.jpg",
  },
  {
    title: "Digital Learning & Awareness",
    description:
      "In a world moving rapidly toward technology, we aim to bridge the digital divide. Through awareness drives and digital literacy programs, we’ve helped children in tribal areas understand and use basic tech tools — opening new doors of opportunity.",
    image: "/images/image28.jpg",
  },
  {
    title: "Environmental Awareness",
    description:
      "We actively involve children and families in tree plantation drives, waste management workshops, and cleanliness campaigns — helping them learn to protect and nurture the earth that sustains them.",
    image: "/images/image10.jpg",
  },
];

export default function OurImpact() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-6 md:px-16 py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-emerald-700 mb-4">
          Our Impact — One Step at a Time
        </h1>
        <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
          Since 2017, Ek Paul Foundation (formerly known as Hira Jadhav Foundation)
          has been transforming lives in tribal communities across Palghar and Nashik.
          Through education, nutrition, healthcare, and community empowerment,
          we’re helping children rise beyond limitations — one small step at a time.
        </p>
      </motion.div>

      {/* Stats Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-20"
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            className="relative bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center justify-center text-center hover:scale-105 transition-transform duration-500"
          >
            <div className="bg-emerald-100 rounded-full p-4 mb-3">{stat.icon}</div>
            <h3 className="text-2xl md:text-3xl font-bold text-emerald-700 mb-1">
              {stat.value}
            </h3>
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Impact Sections */}
      <div className="space-y-20">
        {impacts.map((impact, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col md:flex-row items-center gap-10 ${
              i % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <div className="w-full md:w-1/2 rounded-3xl overflow-hidden shadow-lg relative group">
              <img
                src={impact.image}
                alt={impact.title}
                className="w-full h-[350px] object-cover rounded-3xl transform transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1"
              />
            </div>

            {/* Text */}
            <div className="w-full md:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-500"
              >
                <h3 className="text-3xl font-semibold text-emerald-700 mb-4">
                  {impact.title}
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {impact.description}
                </p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Final Message */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="mt-24 max-w-3xl mx-auto text-center"
      >
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
          Today, these children smile with confidence, curiosity, and joy. Each
          time we visit Mokhada, Palghar, and Trimbak, their happiness reminds
          us why we started — <strong>their smiles make our lives more beautiful.</strong> 💚
        </p>
      </motion.div>

      {/* CTA Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="mt-24 bg-emerald-700 text-white text-center rounded-3xl py-14 px-6 shadow-xl"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Us in Making a Difference</h2>
        <p className="max-w-2xl mx-auto text-lg mb-8 text-emerald-100">
          Every act of kindness counts. Whether you volunteer, donate, or simply spread the word —
          your support helps us reach more children and create a brighter tomorrow.
        </p>
        <a
          href="/donate"
          className="bg-white text-emerald-700 font-semibold px-8 py-3 rounded-full shadow-md hover:bg-emerald-100 transition-all"
        >
          Donate Now 💚
        </a>
      </motion.div>
    </div>
  );
}
