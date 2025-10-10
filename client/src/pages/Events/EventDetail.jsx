import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { CalendarDays, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:2000/api/events/${id}`);
        console.log("Fetched event:", res.data);
        // If backend sends { event: {...} }, use: setEvent(res.data.event)
        setEvent(res.data);
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-green-700 font-semibold text-lg">
        Loading event...
      </div>
    );

  if (!event)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        Event not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      {/* Back link */}
      <Link
        to="/events"
        className="inline-block mb-6 text-green-700 hover:text-green-800 font-medium"
      >
        &larr; Back to Events
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        {/* Title & Info */}
        <div className="p-6 text-center">
          <h1 className="text-3xl font-bold text-green-700 mb-3">{event.title}</h1>
          {event.date && (
            <p className="text-gray-500 mb-1 flex justify-center items-center gap-1">
              <CalendarDays /> {new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </p>
          )}
          {event.location && (
            <p className="text-gray-500 mb-3 flex justify-center items-center gap-1">
              <MapPin /> {event.location}
            </p>
          )}
          <p className="text-gray-700 text-base md:text-lg">{event.description || "No description available."}</p>
        </div>

        {/* Media Gallery */}
        <div className="p-6 grid sm:grid-cols-2 gap-4">
          {event.images?.map((img) => (
            <img
              key={img.public_id}
              src={img.url}
              alt={event.title}
              className="w-full h-56 object-cover rounded-lg"
            />
          ))}
          {event.videos?.map((vid) => (
            <video
              key={vid.public_id}
              controls
              src={vid.url}
              className="w-full h-56 object-cover rounded-lg"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
