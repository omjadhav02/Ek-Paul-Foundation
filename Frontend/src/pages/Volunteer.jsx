function Volunteer() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Be a Volunteer</h1>
      <p>Join us to help children in rural areas. Fill the form below to get started.</p>
      <form>
        <input type="text" placeholder="Your Name" required style={{ margin: "5px" }}/>
        <input type="email" placeholder="Email" required style={{ margin: "5px" }}/>
        <textarea placeholder="Why do you want to volunteer?" style={{ margin: "5px" }}></textarea>
        <br />
        <button type="submit">Join Us</button>
      </form>
    </div>
  );
}

export default Volunteer;
