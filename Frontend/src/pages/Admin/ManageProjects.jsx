import { useState } from "react";

function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addProject = () => {
    if (title && description) {
      setProjects([...projects, { title, description }]);
      setTitle("");
      setDescription("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Manage Projects</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={addProject}>Add Project</button>
      </div>

      <h2>Project List</h2>
      <ul>
        {projects.map((p, i) => (
          <li key={i}>
            <strong>{p.title}:</strong> {p.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageProjects;
