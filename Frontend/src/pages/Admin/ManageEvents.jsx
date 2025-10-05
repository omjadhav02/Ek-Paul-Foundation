import { useState } from "react";

function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const addOrUpdateEvent = () => {
    if (!title || !description) return;

    if (editIndex !== null) {
      const updatedEvents = [...events];
      updatedEvents[editIndex] = { title, description };
      setEvents(updatedEvents);
      setEditIndex(null);
    } else {
      setEvents([...events, { title, description }]);
    }

    setTitle("");
    setDescription("");
  };

  const editEvent = (index) => {
    setTitle(events[index].title);
    setDescription(events[index].description);
    setEditIndex(index);
  };

  const deleteEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Manage Events</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="Event Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={addOrUpdateEvent}>{editIndex !== null ? "Update Event" : "Add Event"}</button>
      </div>

      <h2>Event List</h2>
      <ul>
        {events.map((e, i) => (
          <li key={i}>
            <strong>{e.title}:</strong> {e.description}{" "}
            <button onClick={() => editEvent(i)}>Edit</button>{" "}
            <button onClick={() => deleteEvent(i)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageEvents;
