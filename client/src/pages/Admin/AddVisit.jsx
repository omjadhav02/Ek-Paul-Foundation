import { useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function AddVisit() {
  const [formData, setFormData] = useState({
    visitType: "School",
    location: "",
    visitDate: "",
    volunteer: "",
    itemsProvided: [{ itemName: "", quantity: "", category: "", costPerUnit: "" }],
    packagingCost: "",
    transportationCost: "",
    otherExpenses: "",
    notes: "",
  });

  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...formData.itemsProvided];
    updated[index][name] = value;
    setFormData((prev) => ({ ...prev, itemsProvided: updated }));
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      itemsProvided: [...prev.itemsProvided, { itemName: "", quantity: "", category: "", costPerUnit: "" }],
    }));
  };

  const removeItem = (index) => {
    const updated = formData.itemsProvided.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, itemsProvided: updated }));
  };

  const handleFiles = (e, type) => {
    const files = Array.from(e.target.files);
    if (type === "image") setImages((prev) => [...prev, ...files]);
    if (type === "video") setVideos((prev) => [...prev, ...files]);
  };

  const uploadToCloudinary = async (files, type) => {
    const uploaded = [];
    for (const file of files) {
      const form = new FormData();
      form.append("file", file);
      form.append("upload_preset", "ekpaul_uploads"); // 👈 your Cloudinary preset
      form.append("resource_type", type === "video" ? "video" : "image");

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${type}/upload`,
        form
      );

      uploaded.push({
        url: res.data.secure_url,
        public_id: res.data.public_id,
      });
    }
    return uploaded;
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      setMessage("❌ You must be logged in as admin.");
      setLoading(false);
      return;
    }

    const token = await user.getIdToken();

    const formDataToSend = new FormData();

    // Append regular fields
    for (const key in formData) {
      if (key === "itemsProvided") {
        formDataToSend.append(key, JSON.stringify(formData[key]));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    // Append files
    images.forEach((file) => formDataToSend.append("images", file));
    videos.forEach((file) => formDataToSend.append("videos", file));

    await axios.post("http://localhost:2000/api/visits/add", formDataToSend, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    setMessage("✅ Visit added successfully!");

    navigate("/visits");
    
    // Reset form logic here
  } catch (error) {
    console.error(error);
    setMessage("❌ Failed to add visit.");
  } finally {
    setLoading(false);
  }
};


  

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-6">Add New Visit</h1>

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-4">
        {/* Visit Type */}
        <div>
          <label className="block text-gray-700 mb-1">Visit Type</label>
          <select name="visitType" value={formData.visitType} onChange={handleChange} className="w-full border rounded p-2">
            <option>School</option>
            <option>Orphanage</option>
            <option>Community</option>
            <option>Other</option>
          </select>
        </div>

        {/* Basic Info */}
        <div>
          <label className="block text-gray-700 mb-1">Location</label>
          <input name="location" value={formData.location} onChange={handleChange} className="w-full border rounded p-2" required />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Visit Date</label>
          <input type="date" name="visitDate" value={formData.visitDate} onChange={handleChange} className="w-full border rounded p-2" required />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Volunteer Name</label>
          <input name="volunteer" value={formData.volunteer} onChange={handleChange} className="w-full border rounded p-2" />
        </div>

        {/* Items Provided */}
        <div>
          <label className="block text-gray-700 mb-2">Items Provided</label>
          {formData.itemsProvided.map((item, index) => (
            <div key={index} className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
              <input placeholder="Item Name" name="itemName" value={item.itemName} onChange={(e) => handleItemChange(index, e)} className="border rounded p-2" />
              <input placeholder="Qty" name="quantity" type="number" value={item.quantity} onChange={(e) => handleItemChange(index, e)} className="border rounded p-2" />
              <input placeholder="Category" name="category" value={item.category} onChange={(e) => handleItemChange(index, e)} className="border rounded p-2" />
              <input placeholder="Cost/Unit" name="costPerUnit" type="number" value={item.costPerUnit} onChange={(e) => handleItemChange(index, e)} className="border rounded p-2" />
              <button type="button" onClick={() => removeItem(index)} className="text-red-500 hover:text-red-700 text-sm">Remove</button>
            </div>
          ))}
          <button type="button" onClick={addItem} className="bg-green-600 text-white px-3 py-1 rounded">+ Add Item</button>
        </div>

        {/* Expenses */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input placeholder="Packaging Cost" name="packagingCost" type="number" value={formData.packagingCost} onChange={handleChange} className="border rounded p-2" />
          <input placeholder="Transportation Cost" name="transportationCost" type="number" value={formData.transportationCost} onChange={handleChange} className="border rounded p-2" />
          <input placeholder="Other Expenses" name="otherExpenses" type="number" value={formData.otherExpenses} onChange={handleChange} className="border rounded p-2" />
        </div>

        {/* Notes */}
        <textarea name="notes" placeholder="Additional Notes..." value={formData.notes} onChange={handleChange} className="w-full border rounded p-2"></textarea>

        {/* File Uploads */}
        <div>
          <label className="block text-gray-700 mb-1">Upload Images</label>
          <input type="file" multiple accept="image/*" onChange={(e) => handleFiles(e, "image")} className="border p-2 w-full rounded" />
          <div className="flex flex-wrap gap-2 mt-2">
            {images.map((img, i) => (
              <img key={i} src={URL.createObjectURL(img)} alt="preview" className="h-16 w-16 object-cover rounded" />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Upload Videos</label>
          <input type="file" multiple accept="video/*" onChange={(e) => handleFiles(e, "video")} className="border p-2 w-full rounded" />
          <div className="flex flex-wrap gap-2 mt-2">
            {videos.map((vid, i) => (
              <video key={i} src={URL.createObjectURL(vid)} className="h-16 w-16 object-cover rounded" />
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition"
        >
          {loading ? "Uploading..." : "Add Visit"}
        </button>

        {message && <p className="text-center text-sm mt-3">{message}</p>}
      </form>
    </div>
  );
}
