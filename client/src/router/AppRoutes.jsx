import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Events from "../pages/Events/Events";
import Donation from "../pages/Donation/Donation";
import Gallery from "../pages/Gallery/Gallery";
import Contact from "../pages/Contact/Contact";
import Login from "../pages/Admin/Login";
import Dashboard from "../pages/Admin/Dashboard";
import NotFound from "../pages/NotFound/NotFound";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import EventDetail from "../pages/Events/EventDetail";
import OurImpact from "../pages/OurImpact/OurImpact";
import Visits from "../pages/Visits/Visits";
import VisitDetail from "../pages/Visits/VisitDetail";
import Signup from "../pages/Admin/Signup";
import ProtectedRoute from "../components/ProtectRoute/ProtectedRoute";
import ManageEvents from "../pages/Admin/ManageEvents";
import ManageVisits from "../pages/Admin/ManageVisits";
import ManageDonations from "../pages/Admin/ManageDonations";
import AddVisit from "../pages/Admin/AddVisit";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/donate" element={<Donation />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/our-impact" element={<OurImpact />} />
        
        {/* <Route path="/events" element={<Events />} /> */}
        
        {/* <Route path="/gallery" element={<Gallery />} /> */}
        
        {/* <Route path="/events/:id" element={<EventDetail />} /> */}
        
        {/* <Route path="/visits" element={<Visits />} /> */}
        {/* <Route path="/visits/:id" element={<VisitDetail />} /> */}
        {/* <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/signup" element={<Signup />} /> */}

        {/* Protected (Admin only) routes */}
        {/* <Route element={<ProtectedRoute />}> */}
          {/* <Route path="/admin/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/admin/manage-events/:id" element={<ManageEvents />} /> */}
          {/* <Route path="/admin/manage-visits/:id" element={<ManageVisits />} /> */}
          {/* <Route path="/admin/manage-donations" element={<ManageDonations />} /> */}
          {/* <Route path="/admin/visits/add" element={<AddVisit />} /> */}
        {/* </Route> */}

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
