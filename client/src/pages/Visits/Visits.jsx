import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { motion } from "framer-motion";
import { CalendarDays, MapPin, PlusCircle } from "lucide-react";

export default function Visits() {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // ✅ Check if admin (logged in)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAdmin(!!user);
    });
    return () => unsubscribe();
  }, []);

  // ✅ Fetch visits from backend
  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const { data } = await axios.get("http://localhost:2000/api/visits");
        console.log("Fetched Visits:", data);
        setVisits(Array.isArray(data) ? data : data.data || []);
      } catch (error) {
        console.error("Error fetching visits:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVisits();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-green-700 text-xl font-medium">
        Loading visits...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white pb-16">
      {/* Hero Header */}
      <section className="bg-gradient-to-r from-green-700 to-emerald-500 text-white py-16 px-6 text-center relative overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-3"
        >
          Foundation Visits
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl max-w-2xl mx-auto"
        >
          Each visit marks another step in transforming lives — through care,
          education, and compassion.
        </motion.p>

        {isAdmin && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/admin/visits/add")}
            className="mt-6 bg-white text-green-800 font-semibold px-6 py-3 rounded-full flex items-center gap-2 mx-auto shadow-md hover:bg-lime-100 transition"
          >
            <PlusCircle size={20} /> Add New Visit
          </motion.button>
        )}
      </section>

      {/* No Visits */}
      {!visits.length ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-600">
          <img
            src="/images/empty-visits.png"
            alt="No Visits"
            className="w-48 mb-6 opacity-80"
          />
          <p className="text-lg mb-2">No visits have been added yet.</p>
          {isAdmin && (
            <button
              onClick={() => navigate("/admin/visits/add")}
              className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition"
            >
              + Add First Visit
            </button>
          )}
        </div>
      ) : (
        // Visit Cards Grid
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-16 mt-14"
        >
          {visits.map((visit, i) => (
            <motion.div
              key={visit._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <Link to={`/visits/${visit._id}`}>
                <div className="group bg-white/60 backdrop-blur-md border border-green-100 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                  {/* Image */}
                  {visit.images?.length > 0 ? (
                    <img
                      src={visit.images[0].url}
                      alt="Visit"
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-56 bg-green-100 flex items-center justify-center text-green-700 font-medium">
                      No Image
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-5">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      {visit.visitType || "Visit"}
                    </h2>

                    <div className="flex items-center text-gray-600 mb-1 text-sm">
                      <MapPin size={16} className="mr-1 text-green-600" />
                      {visit.location || "Unknown Location"}
                    </div>

                    <div className="flex items-center text-gray-500 text-sm">
                      <CalendarDays size={16} className="mr-1 text-green-500" />
                      {new Date(visit.visitDate).toLocaleDateString()}
                    </div>

                    <div className="mt-4 text-center">
                      <span className="inline-block bg-green-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-green-700 transition">
                        View Details
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
