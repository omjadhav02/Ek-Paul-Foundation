import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Events from "../pages/Events/Events";
import Donation from "../pages/Donation/Donation";
import Gallery from "../pages/Gallery/Gallery";
import Contact from "../pages/Contact/Contact";
import AdminLogin from "../pages/Admin/Login";
import Dashboard from "../pages/Admin/Dashboard";
import NotFound from "../pages/NotFound/NotFound";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import EventDetail from "../pages/Events/EventDetail";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/donate" element={<Donation />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/events/:id" element={<EventDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
