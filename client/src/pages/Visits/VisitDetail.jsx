import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { motion } from "framer-motion";

export default function VisitDetail() {
  const { id } = useParams();
  const [visit, setVisit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false); // Track admin login
  const navigate = useNavigate();

  // Check if admin is logged in
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAdmin(!!user); // true if logged in
    });
    return () => unsubscribe();
  }, []);

  // Fetch visit data
  useEffect(() => {
    const fetchVisit = async () => {
      try {
        const { data } = await axios.get(`http://localhost:2000/api/visits/${id}`);
        setVisit(data.visit || data);
      } catch (error) {
        console.error("Error fetching visit:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVisit();
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading visit...</div>;
  if (!visit) return <div className="text-center py-10">Visit not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <Link
          to="/visits"
          className="text-green-600 hover:underline font-semibold"
        >
          ← Back to Visits
        </Link>

        {/* Only show buttons if admin is logged in */}
        {isAdmin && (
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/admin/manage-visits/${visit._id}`)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition shadow"
            >
              ✏️ Edit
            </button>

            <button
              onClick={async () => {
                if (!window.confirm("Are you sure you want to delete this visit?")) return;

                try {
                  const auth = getAuth();
                  const user = auth.currentUser;
                  if (!user) {
                    alert("❌ You must be logged in as admin.");
                    return;
                  }
                  const token = await user.getIdToken();

                  await axios.delete(`http://localhost:2000/api/visits/${visit._id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                  });

                  alert("✅ Visit deleted successfully!");
                  navigate("/visits");
                } catch (error) {
                  console.error("Error deleting visit:", error);
                  alert("❌ Failed to delete visit.");
                }
              }}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition shadow"
            >
              🗑️ Delete
            </button>
          </div>
        )}
      </div>

      {/* Visit Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl shadow-md p-6 mb-8"
      >
        <h1 className="text-3xl font-bold text-green-700 mb-2">{visit.visitType}</h1>
        <p className="text-gray-600 mb-1">📍 {visit.location || "Unknown Location"}</p>
        {visit.volunteer && <p className="text-gray-600 mb-1">🙋 Volunteer: {visit.volunteer}</p>}
        <p className="text-gray-500 mb-4">📅 {new Date(visit.visitDate).toLocaleDateString()}</p>
        {visit.notes && (
          <p className="bg-green-50 p-4 rounded-lg shadow-sm text-gray-700">
            📝 {visit.notes}
          </p>
        )}
      </motion.div>

      {/* Images */}
      {visit.images?.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">📸 Images</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {visit.images.map((img, i) => (
              <img
                key={i}
                src={img.url}
                alt={`Visit ${i + 1}`}
                className="w-full h-48 object-cover rounded-lg shadow hover:scale-105 transition-transform"
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Videos */}
      {visit.videos?.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🎥 Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {visit.videos.map((vid, i) => (
              <video
                key={i}
                controls
                src={vid.url}
                className="w-full h-64 rounded-lg shadow hover:scale-105 transition-transform"
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Items Provided */}
      {visit.itemsProvided?.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8 bg-white rounded-xl shadow-md p-6"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🎁 Items Provided</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-green-100">
                <tr>
                  <th className="border p-2">Item</th>
                  <th className="border p-2">Category</th>
                  <th className="border p-2">Qty</th>
                  <th className="border p-2">Cost/Unit</th>
                  <th className="border p-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {visit.itemsProvided.map((item, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="border p-2">{item.itemName}</td>
                    <td className="border p-2">{item.category || "-"}</td>
                    <td className="border p-2 text-center">{item.quantity}</td>
                    <td className="border p-2 text-center">₹{item.costPerUnit}</td>
                    <td className="border p-2 text-center">₹{item.totalCost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Costs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mb-8 bg-white rounded-xl shadow-md p-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">💰 Costs</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-700 text-sm">
          <p>Items Total: <strong>₹{visit.totalItemsCost || 0}</strong></p>
          <p>Packaging: <strong>₹{visit.packagingCost || 0}</strong></p>
          <p>Transportation: <strong>₹{visit.transportationCost || 0}</strong></p>
          <p>Other Expenses: <strong>₹{visit.otherExpenses || 0}</strong></p>
          <p className="col-span-2 md:col-span-3">Total Visit Cost: <strong>₹{visit.totalVisitCost || 0}</strong></p>
        </div>
      </motion.div>
    </div>
  );
}
