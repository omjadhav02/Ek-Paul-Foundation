import { useState } from "react";

function ManageVolunteers() {
  const [volunteers, setVolunteers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const addVolunteer = () => {
    if (name && email) {
      setVolunteers([...volunteers, { name, email, message }]);
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Manage Volunteers</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="Message (optional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={addVolunteer}>Add Volunteer</button>
      </div>

      <h2>Volunteer List</h2>
      <ul>
        {volunteers.map((v, i) => (
          <li key={i}>
            <strong>{v.name}</strong> ({v.email}) - {v.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageVolunteers;
