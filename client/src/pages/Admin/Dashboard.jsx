import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem("admin"));
    if (storedAdmin) {
      setAdmin(storedAdmin);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:2000/api/admin/logout", {}, { withCredentials: true });

      localStorage.removeItem("admin");
      localStorage.removeItem("token");

      alert("Logout successful!");
      navigate("/admin/login");
    } catch (err) {
      console.error("Logout error:", err);
      alert("Failed to logout, please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-300 p-8">
      <div className="bg-white rounded-2xl shadow-xl max-w-3xl mx-auto p-8 text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-4">
          Welcome, {admin?.name || "Admin"} 👋
        </h1>
        <p className="text-gray-600 mb-8">
          You are logged in as <span className="font-medium">{admin?.email}</span>
        </p>

        <div className="space-x-4">
          <button
            onClick={() => navigate("/admin/manage-visits")}
            className="bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Manage Visits
          </button>

          <button
            onClick={() => navigate("/admin/manage-events")}
            className="bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Manage Events
          </button>
          <button
            onClick={() => navigate("/admin/manage-donations")}
            className="bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Manage Donations
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
