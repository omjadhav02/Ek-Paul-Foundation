import Card from "../components/Card";

function Projects() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Our Projects</h1>
      <Card title="School Construction" description="Built 5 new schools in rural Maharashtra." />
      <Card title="Clothing Donation" description="Distributed clothes to 200+ children." />
    </div>
  );
}

export default Projects;
