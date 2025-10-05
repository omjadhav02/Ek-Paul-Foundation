import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
  const admins = JSON.parse(localStorage.getItem("admins")) || [];
  const found = admins.find(a => a.username === username && a.password === password);

  if (found) {
    localStorage.setItem("isAdmin", "true");
    navigate("/admin");
  } else {
    setError("Invalid username or password");
  }
};


  return (
    <div style={styles.container}>
      <h1>Admin Login</h1>
      <div style={styles.form}>
        <input
          type="text"
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleLogin} style={styles.button}>Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    gap: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    background: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

<p style={{ marginTop: "10px" }}>
  Don't have an account? <a href="/admin/signup">Sign Up</a>
</p>

export default AdminLogin;
