import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Menu, X, LogOut } from "lucide-react";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const links = [
    { to: "/", label: "Home", icon: <Home className="w-6 h-6 inline mb-1" /> },
    { to: "/about", label: "About" },
    { to: "/our-impact", label: "Our Impact" },
    { to: "/donate", label: "Donate Now" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-md transition-all">
      <div className="container mx-auto px-6 flex justify-between items-center h-24">
        {/* Logo & Tagline */}
        <Link to="/" className="flex flex-col leading-tight group">
          <span className="text-3xl font-bold text-green-700 hover:text-green-800 transition-all">
            Ek Paul Foundation
          </span>
          <span className="text-sm text-gray-500 font-medium tracking-wide">
            Empowering one step at a time
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-12 text-xl font-medium items-center">
          {links.map((link) => {
            const isActive = location.pathname === link.to;
            const isDonate = link.label === "Donate Now";
            return isDonate ? (
              <Link
                key={link.to}
                to={link.to}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-7 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition transform hover:scale-105"
              >
                {link.label}
              </Link>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                className={`relative transition-all ${
                  isActive
                    ? "text-green-700"
                    : "text-gray-700 hover:text-green-600"
                }`}
              >
                {link.icon && link.icon} {link.label !== "Home" && link.label}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-green-500 to-green-700 transition-all ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  } origin-left`}
                />
              </Link>
            );
          })}

          {user && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-full font-semibold transition shadow-md hover:scale-105"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-green-700"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t border-gray-200 shadow-sm overflow-hidden"
          >
            <div className="flex flex-col items-center py-5 space-y-5 text-lg font-medium">
              {links.map((link) => {
                const isActive = location.pathname === link.to;
                const isDonate = link.label === "Donate Now";
                return isDonate ? (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:scale-105 transition"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={`transition-all ${
                      isActive
                        ? "text-green-700"
                        : "text-gray-700 hover:text-green-600"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {user && (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-full font-semibold cursor-pointer shadow-md"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
