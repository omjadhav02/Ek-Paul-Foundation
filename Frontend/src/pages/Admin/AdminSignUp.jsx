import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminSignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = () => {
    if (!username || !password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Save new admin in localStorage
    const admins = JSON.parse(localStorage.getItem("admins")) || [];
    admins.push({ username, password });
    localStorage.setItem("admins", JSON.stringify(admins));

    alert("Sign Up Successful! Please login.");
    navigate("/admin/login");
  };

  return (
    <div style={styles.container}>
      <h1>Admin Sign Up</h1>
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSignUp} style={styles.button}>Sign Up</button>
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

export default AdminSignUp;
