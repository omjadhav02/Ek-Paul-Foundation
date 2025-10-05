import { Link, useNavigate } from "react-router-dom";

function AdminHome() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin"); // remove login flag
    navigate("/admin/login"); // redirect to login page
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>
      <p>Manage your website content easily:</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
        <Link to="/admin/events"><button>Manage Events</button></Link>
        <Link to="/admin/projects"><button>Manage Projects</button></Link>
        <Link to="/admin/photos"><button>Manage Photos</button></Link>
        <Link to="/admin/volunteers"><button>Manage Volunteers</button></Link>
      </div>

      {/* Logout Button */}
      <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
    </div>
  );
}

const styles = {
  logoutButton: {
    padding: "10px 20px",
    background: "#D32F2F",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default AdminHome;
