import { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";

function Home() {
  const [photos, setPhotos] = useState([
    { url: "https://via.placeholder.com/150", caption: "School 1" },
    { url: "https://via.placeholder.com/150", caption: "School 2" },
  ]);

  const [newUrl, setNewUrl] = useState("");
  const [newCaption, setNewCaption] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const addOrUpdatePhoto = () => {
    if (!newUrl) return;

    if (editIndex !== null) {
      const updatedPhotos = [...photos];
      updatedPhotos[editIndex] = { url: newUrl, caption: newCaption };
      setPhotos(updatedPhotos);
      setEditIndex(null);
    } else {
      setPhotos([...photos, { url: newUrl, caption: newCaption }]);
    }

    setNewUrl("");
    setNewCaption("");
  };

  const editPhoto = (index) => {
    setNewUrl(photos[index].url);
    setNewCaption(photos[index].caption);
    setEditIndex(index);
  };

  const deletePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="hero">
        <div className="heroContent">
          <h1>Empowering Children in Rural Maharashtra</h1>
          <p>Together, we can build schools, provide resources, and create opportunities.</p>
          <Link to="/donate">
            <button>Donate Now</button>
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ padding: "20px" }}>
        <h2>Quick Actions</h2>
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          <Link to="/projects" style={{ textDecoration: "none", color: "black" }}>
            <Card title="Our Projects" description="See the schools and initiatives we are working on." />
          </Link>
          <Link to="/events" style={{ textDecoration: "none", color: "black" }}>
            <Card title="Upcoming Events" description="Join our events to make a real difference." />
          </Link>
          <Link to="/donate" style={{ textDecoration: "none", color: "black" }}>
            <Card title="Donate" description="Support children by donating money, clothes, or food." />
          </Link>
          <Link to="/volunteer" style={{ textDecoration: "none", color: "black" }}>
            <Card title="Be a Volunteer" description="Join us to help children and rural communities." />
          </Link>
        </div>

        {/* Schools Section */}
        <h2>Our Schools</h2>
        <Card title="School 1" description="Built in Village A" />
        <Card title="School 2" description="Built in Village B" />

        {/* Photos Section */}
        <h2>Photo Gallery</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {photos.map((p, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <img src={p.url} alt={p.caption} style={{ width: "150px", height: "100px", objectFit: "cover" }} />
              <p>{p.caption}</p>
              {isAdmin && (
                <div>
                  <button onClick={() => editPhoto(i)}>Edit</button>
                  <button onClick={() => deletePhoto(i)}>Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>

        {isAdmin && (
          <div style={{ marginTop: "20px" }}>
            <input
              type="text"
              placeholder="Photo URL"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              style={{ marginRight: "10px" }}
            />
            <input
              type="text"
              placeholder="Caption"
              value={newCaption}
              onChange={(e) => setNewCaption(e.target.value)}
              style={{ marginRight: "10px" }}
            />
            <button onClick={addOrUpdatePhoto}>{editIndex !== null ? "Update Photo" : "Add Photo"}</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
