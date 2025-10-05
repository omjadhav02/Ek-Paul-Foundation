import Card from "../components/Card";

function Events() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Upcoming Events</h1>
      <Card title="Tree Plantation Drive" description="Join us to plant 1000 trees in Village A." />
      <Card title="Education Workshop" description="Helping children improve their reading skills." />
    </div>
  );
}

export default Events;
