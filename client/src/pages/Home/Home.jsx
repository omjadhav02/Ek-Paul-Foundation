import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Sprout, Users, School, HelpingHand, ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {
  const heroImages = ["/images/image5.jpg", "/images/image3.jpg", "/images/image2.jpg"];
  const galleryImages = [
    "/images/image10.jpg",
    "/images/image1.jpg",
    "/images/image15.jpg",
    "/images/image11.jpg",
    "/images/image5.jpg",
    "/images/image28.jpg",
    "/images/image22.jpg",
    "/images/image3.jpg",

  ];

  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

  // Auto-slide for hero
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [currentHeroIndex]);

  // Auto-slide for gallery
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGalleryIndex((prev) => (prev + 1) % galleryImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentGalleryIndex]);

  return (
    <div className="min-h-screen">
      {/* ================= HERO SECTION ================= */}
      <section className="relative text-white py-28 md:py-40 px-6 text-center overflow-hidden">
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={heroImages[currentHeroIndex]}
              src={heroImages[currentHeroIndex]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/50 z-0" />
        </div>

        <div className="relative z-20 text-center">
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
            Supporting children in Palghar and Nashik through education and community initiatives — one step at a time.
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
        </div>

        {/* Hero Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentHeroIndex(i)}
              className={`w-3 h-3 rounded-full transition ${
                i === currentHeroIndex ? "bg-yellow-400" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ================= MISSION SECTION ================= */}
      <section className="py-20 px-6 bg-green-50 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-10">
          Our Mission
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition">
            <BookOpen className="w-12 h-12 mx-auto text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Education Support</h3>
            <p className="text-gray-600 text-base">
              Providing notebooks, stationery, and learning resources to children in underprivileged schools.
            </p>
          </div>

          <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition">
            <Sprout className="w-12 h-12 mx-auto text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Community Growth</h3>
            <p className="text-gray-600 text-base">
              Engaging families and local communities to promote education, unity, and awareness.
            </p>
          </div>

          <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition">
            <Users className="w-12 h-12 mx-auto text-green-700 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Volunteer Engagement</h3>
            <p className="text-gray-600 text-base">
              Bringing together passionate individuals to actively support our children’s education and growth.
            </p>
          </div>
        </div>
      </section>

     {/* ================= IMPACT SECTION ================= */}
<section className="bg-white py-24 px-6 text-center">
  <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-10">
    Our Impact So Far
  </h2>
  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
    <div className="p-6 bg-green-50 rounded-2xl shadow hover:shadow-md transition">
      <School className="w-10 h-10 text-green-600 mx-auto mb-3" />
      <h3 className="text-3xl font-bold text-green-700">6</h3>
      <p className="text-gray-700 font-medium mb-2">Govt. Schools Supported</p>
      <p className="text-gray-600 text-sm">
        Helping government schools in Palghar and Nashik that lack basic infrastructure and resources, ensuring children have a better learning environment.
      </p>
    </div>

    <div className="p-6 bg-green-50 rounded-2xl shadow hover:shadow-md transition">
      <Users className="w-10 h-10 text-green-600 mx-auto mb-3" />
      <h3 className="text-3xl font-bold text-green-700">250+</h3>
      <p className="text-gray-700 font-medium mb-2">Children Reached</p>
      <p className="text-gray-600 text-sm">
        Providing support, learning materials, and guidance to over 250 children from underprivileged communities, helping them thrive academically.
      </p>
    </div>

    <div className="p-6 bg-green-50 rounded-2xl shadow hover:shadow-md transition">
      <HelpingHand className="w-10 h-10 text-green-600 mx-auto mb-3" />
      <h3 className="text-3xl font-bold text-green-700">10+</h3>
      <p className="text-gray-700 font-medium mb-2">Volunteers</p>
      <p className="text-gray-600 text-sm">
        Passionate volunteers mentoring, teaching, and supporting children, bringing hope and opportunities to those in need.
      </p>
    </div>
  </div>

  <p className="mt-8 max-w-2xl mx-auto text-gray-600 text-sm">
    Together, we are transforming underfunded government schools into nurturing spaces for children, empowering communities and inspiring the next generation.
  </p>
</section>



      {/* ================= MOMENTS OF CHANGE (Carousel) ================= */}
      <section className="relative py-24 px-6 text-center bg-green-50">
        <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-10">
          Moments of Change
        </h2>

        <div className="relative h-80 md:h-130 max-w-7xl mx-auto overflow-hidden rounded-xl shadow-lg">
          <AnimatePresence mode="wait">
            <motion.img
              key={galleryImages[currentGalleryIndex]}
              src={galleryImages[currentGalleryIndex]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
            {galleryImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentGalleryIndex(i)}
                className={`w-3 h-3 rounded-full transition ${
                  i === currentGalleryIndex ? "bg-green-700" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="bg-green-700 py-24 px-6 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Take One Step With Us
        </h2>
        <p className="max-w-2xl mx-auto mb-8 text-base md:text-lg opacity-90">
          Whether you contribute financially, volunteer your time, or simply spread awareness —
          every action counts. Join Ek Paul Foundation and help create lasting change.
        </p>
        <Link
          to="/donate"
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-3 rounded-full font-semibold transition"
        >
          Donate Now
        </Link>
      </section>
    </div>
  );
}
