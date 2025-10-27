import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuth } from "firebase/auth";

export default function ManageVisits() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    visitType: "School",
    location: "",
    visitDate: "",
    volunteer: "",
    notes: "",
    packagingCost: "",
    transportationCost: "",
    otherExpenses: "",
    itemsProvided: [],
    images: [],
    videos: [],
  });

  const [loading, setLoading] = useState(false);

  // Fetch visit data for edit mode
  useEffect(() => {
    if (isEdit) {
      axios
        .get(`http://localhost:2000/api/visits/${id}`)
        .then((res) => {
          const v = res.data.visit;
          setFormData({
            ...v,
            visitDate: v.visitDate?.split("T")[0] || "",
          });
        })
        .catch((err) => console.error("Error fetching visit:", err));
    }
  }, [id, isEdit]);

  // Handle form field updates
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Upload file to Cloudinary
  const uploadToCloudinary = async (file, type) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ekpaul_uploads"); // your Cloudinary preset

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/" +
        (type === "video" ? "video" : "image") +
        "/upload",
      data
    );
    return res.data.secure_url;
  };

  // Handle image upload
  const handleFileChange = async (e, type) => {
    const files = Array.from(e.target.files);
    try {
      setLoading(true);
      const urls = await Promise.all(
        files.map((file) => uploadToCloudinary(file, type))
      );
      setFormData((prev) => ({
        ...prev,
        [type === "video" ? "videos" : "images"]: [
          ...prev[type === "video" ? "videos" : "images"],
          ...urls.map((url) => ({ url })),
        ],
      }));
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to upload files.");
    } finally {
      setLoading(false);
    }
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        alert("❌ You must be logged in as admin!");
        return;
      }
      const token = await user.getIdToken();
      const headers = { Authorization: `Bearer ${token}` };

      const totalVisitCost =
        (Number(formData.packagingCost) || 0) +
        (Number(formData.transportationCost) || 0) +
        (Number(formData.otherExpenses) || 0);

      const payload = { ...formData, totalVisitCost };

      if (isEdit) {
        await axios.put(`http://localhost:2000/api/visits/${id}`, payload, {
          headers,
        });
        alert("✅ Visit updated successfully!");
      } else {
        await axios.post(`http://localhost:2000/api/visits/add`, payload, {
          headers,
        });
        alert("✅ Visit added successfully!");
      }

      navigate("/visits");
    } catch (error) {
      console.error("Error saving visit:", error);
      alert("❌ Failed to save visit.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <h1 className="text-2xl font-bold text-green-700 mb-4">
        {isEdit ? "Edit Visit" : "Add New Visit"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Visit Type</label>
            <select
              name="visitType"
              value={formData.visitType}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option>School</option>
              <option>Orphanage</option>
              <option>Community</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Location</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Enter location"
            />
          </div>

          <div>
            <label className="block mb-1">Visit Date</label>
            <input
              type="date"
              name="visitDate"
              value={formData.visitDate}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Volunteer</label>
            <input
              name="volunteer"
              value={formData.volunteer}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Volunteer name"
            />
          </div>
        </div>

        {/* Expenses */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1">Packaging Cost (₹)</label>
            <input
              name="packagingCost"
              type="number"
              value={formData.packagingCost}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Transportation Cost (₹)</label>
            <input
              name="transportationCost"
              type="number"
              value={formData.transportationCost}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Other Expenses (₹)</label>
            <input
              name="otherExpenses"
              type="number"
              value={formData.otherExpenses}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block mb-1">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Additional notes"
          ></textarea>
        </div>

        {/* Uploads */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Upload Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleFileChange(e, "image")}
            />
          </div>

          <div>
            <label className="block mb-1">Upload Videos</label>
            <input
              type="file"
              accept="video/*"
              multiple
              onChange={(e) => handleFileChange(e, "video")}
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            {loading ? "Saving..." : isEdit ? "Update Visit" : "Add Visit"}
          </button>
        </div>
      </form>
    </div>
  );
}
