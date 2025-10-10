import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Menu, X } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: "/", label: "Home", icon: <Home className="w-5 h-5 inline mb-1" /> },
    { to: "/about", label: "About" },
    { to: "/events", label: "Events" },
    { to: "/donate", label: "Donate" },
    { to: "/gallery", label: "Gallery" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 flex justify-between items-center h-20">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-700">
          Ek Paul Foundation
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-lg font-medium">
          {links.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-1 transition-all ${
                  isActive
                    ? "text-green-700 border-b-2 border-green-700 pb-1"
                    : "text-gray-600 hover:text-green-600"
                }`}
              >
                {link.icon && link.icon}
                {link.label !== "Home" && link.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-green-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-sm">
          <div className="flex flex-col items-center py-4 space-y-4">
            {links.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-medium ${
                    isActive
                      ? "text-green-700 border-b-2 border-green-700 pb-1"
                      : "text-gray-600 hover:text-green-600"
                  }`}
                >
                  {link.icon && link.icon}
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
