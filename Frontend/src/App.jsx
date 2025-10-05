import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Public Pages
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Events from "./pages/Events";
import Donate from "./pages/Donate";
import Volunteer from "./pages/Volunteer";
import Contact from "./pages/Contact";

// Admin Pages
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminHome from "./pages/Admin/AdminHome";
import ManageEvents from "./pages/Admin/ManageEvents";
import ManageProjects from "./pages/Admin/ManageProjects";
import ManageVolunteers from "./pages/Admin/ManageVolunteers";
import ProtectedRoute from "./components/ProtectedRoute";

// SignUp Page
import AdminSignUp from "./pages/Admin/AdminSignUp";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/events" element={<Events />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/contact" element={<Contact />} />

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/events" element={<ManageEvents />} />
        <Route path="/admin/projects" element={<ManageProjects />} />
        <Route path="/admin/volunteers" element={<ManageVolunteers />} />
        <Route path="/admin/login" element={<AdminLogin />} />


        <Route path="/admin/signup" element={<AdminSignUp />} />
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute>
            <AdminHome />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/events" 
        element={
          <ProtectedRoute>
            <ManageEvents />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/projects" 
        element={
          <ProtectedRoute>
            <ManageProjects />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/volunteers" 
        element={
          <ProtectedRoute>
            <ManageVolunteers />
          </ProtectedRoute>
        } 
      />
          </Routes>
          <Footer />
    </Router>
  );
}

export default App;
