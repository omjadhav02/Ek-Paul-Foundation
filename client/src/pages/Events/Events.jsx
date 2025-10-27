import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FiEdit } from "react-icons/fi"; // ← Import pencil icon

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false); // ✅ Track admin
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin token exists
    const token = localStorage.getItem("token");
    setIsAdmin(!!token);

    const fetchEvents = async () => {
      try {
        const res = await axios.get(`http://localhost:2000/api/events`);
        const eventData = Array.isArray(res.data)
          ? res.data
          : res.data?.events || [];
        setEvents(eventData);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-green-700 font-semibold text-lg">
        Loading events...
      </div>
    );

  if (!events.length)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        No events available yet.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <h2 className="text-4xl font-bold text-green-700 text-center mb-12">
        Our Recent Events
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {events.map((event, index) => (
          <motion.div
            key={event._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="relative bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-all flex flex-col h-full"
          >
            {/* Edit Icon Button (only if admin) */}
            {isAdmin && (
              <button
                onClick={() => navigate(`/admin/manage-events/${event._id}`)}
                className="absolute top-2 right-2 bg-green-700 text-white p-2 rounded-full z-10 hover:bg-green-800 cursor-pointer"
              >
                <FiEdit size={18} />
              </button>
            )}

            {/* Main media */}
            <div className="w-full h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
              {event.images?.length > 0 ? (
                <img
                  src={event.images[0].url}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              ) : event.videos?.length > 0 ? (
                <video
                  controls
                  className="w-full h-full object-cover"
                  src={event.videos[0].url}
                />
              ) : (
                <div className="text-gray-400 italic">No media available</div>
              )}
            </div>

            {/* Event info */}
            <Link
              to={`/events/${event._id}`}
              className="flex-grow flex flex-col cursor-pointer"
            >
              <div className="flex-grow p-6 flex flex-col justify-between text-center">
                <div>
                  <h3 className="text-xl font-semibold text-green-700 mb-2">
                    {event.title}
                  </h3>
                  {event.date && (
                    <p className="text-gray-500 text-sm mb-2">
                      {new Date(event.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  )}
                  {event.location && (
                    <p className="text-gray-600 text-sm italic mb-3">
                      📍 {event.location}
                    </p>
                  )}
                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                    {event.description || "No description available."}
                  </p>
                </div>
              </div>

              {/* Extra media previews */}
              {(event.images?.length > 1 || event.videos?.length > 1) && (
                <div className="px-4 pb-4 flex flex-wrap gap-2 justify-center">
                  {event.images.slice(1).map((img) => (
                    <img
                      key={img.public_id}
                      src={img.url}
                      alt="extra"
                      className="w-16 h-16 object-cover rounded-md border border-gray-200"
                    />
                  ))}
                  {event.videos.slice(1).map((vid) => (
                    <video
                      key={vid.public_id}
                      src={vid.url}
                      className="w-16 h-16 object-cover rounded-md border border-gray-200"
                    />
                  ))}
                </div>
              )}
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
