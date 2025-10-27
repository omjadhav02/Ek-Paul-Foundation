import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function ManageEvents() {
  const { id } = useParams(); // If editing, event id
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  const [existingImages, setExistingImages] = useState([]);
  const [existingVideos, setExistingVideos] = useState([]);

  const [newImages, setNewImages] = useState([]);
  const [newVideos, setNewVideos] = useState([]);

  const [removeImages, setRemoveImages] = useState([]);
  const [removeVideos, setRemoveVideos] = useState([]);

  const [loading, setLoading] = useState(false);

  // Fetch event if editing
  useEffect(() => {
    if (!id) return;
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:2000/api/events/${id}`);
        const event = res.data;
        setTitle(event.title || "");
        setDescription(event.description || "");
        setDate(event.date ? event.date.slice(0, 10) : "");
        setLocation(event.location || "");
        setExistingImages(event.images || []);
        setExistingVideos(event.videos || []);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };
    fetchEvent();
  }, [id]);

  const handleNewImages = (e) => {
    setNewImages(Array.from(e.target.files));
  };

  const handleNewVideos = (e) => {
    setNewVideos(Array.from(e.target.files));
  };

  const toggleRemoveImage = (public_id) => {
    if (removeImages.includes(public_id)) {
      setRemoveImages(removeImages.filter(id => id !== public_id));
    } else {
      setRemoveImages([...removeImages, public_id]);
    }
  };

  const toggleRemoveVideo = (public_id) => {
    if (removeVideos.includes(public_id)) {
      setRemoveVideos(removeVideos.filter(id => id !== public_id));
    } else {
      setRemoveVideos([...removeVideos, public_id]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("date", date);
      formData.append("location", location);

      removeImages.forEach(id => formData.append("removeImages[]", id));
      removeVideos.forEach(id => formData.append("removeVideos[]", id));

      newImages.forEach(file => formData.append("images", file));
      newVideos.forEach(file => formData.append("videos", file));

      if (id) {
        // Edit existing event
        await axios.put(`http://localhost:2000/api/events/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        alert("Event updated successfully!");
      } else {
        // Create new event
        await axios.post(`http://localhost:2000/api/events/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        alert("Event created successfully!");
      }

      navigate("/events");
    } catch (error) {
      console.error("Error submitting event:", error);
      alert("Error: " + error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async () => {
    if (!id) return;
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      setLoading(true);
      await axios.delete(`http://localhost:2000/api/events/${id}`, {
        withCredentials: true,
      });
      alert("Event deleted successfully!");
      navigate("/events");
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Error: " + error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-10 px-6 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-green-700 mb-6">
          {id ? "Edit Event" : "Add New Event"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded"
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border p-2 rounded"
          />

          {/* Existing Images */}
          {existingImages.length > 0 && (
            <div>
              <p className="font-medium mb-2">Existing Images:</p>
              <div className="flex flex-wrap gap-2">
                {existingImages.map(img => (
                  <div key={img.public_id} className="relative">
                    <img src={img.url} alt="existing" className="w-24 h-24 object-cover rounded" />
                    <button
                      type="button"
                      onClick={() => toggleRemoveImage(img.public_id)}
                      className={`absolute top-0 right-0 bg-red-500 text-white px-1 rounded ${
                        removeImages.includes(img.public_id) ? "line-through" : ""
                      }`}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Existing Videos */}
          {existingVideos.length > 0 && (
            <div>
              <p className="font-medium mb-2">Existing Videos:</p>
              <div className="flex flex-wrap gap-2">
                {existingVideos.map(vid => (
                  <div key={vid.public_id} className="relative">
                    <video src={vid.url} className="w-32 h-24 object-cover rounded" controls />
                    <button
                      type="button"
                      onClick={() => toggleRemoveVideo(vid.public_id)}
                      className={`absolute top-0 right-0 bg-red-500 text-white px-1 rounded ${
                        removeVideos.includes(vid.public_id) ? "line-through" : ""
                      }`}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Uploads */}
          <div>
            <label className="font-medium">Add Images:</label>
            <input type="file" multiple accept="image/*" onChange={handleNewImages} />
          </div>

          <div>
            <label className="font-medium">Add Videos:</label>
            <input type="file" multiple accept="video/*" onChange={handleNewVideos} />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-800"
          >
            {loading ? "Submitting..." : id ? "Update Event" : "Create Event"}
          </button>

          {/* Delete button */}
          {id && (
            <button
              type="button"
              onClick={handleDeleteEvent}
              className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
            >
              Delete Event
            </button>
          )}
        </form>
      </div>
    </div>
  );
}