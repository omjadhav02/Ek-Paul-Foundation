import { Facebook, Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-green-800 text-gray-100 pt-16 pb-6 mt-10">
      <div className="container mx-auto px-6 grid gap-12 sm:grid-cols-2 md:grid-cols-3">
        {/* About */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Ek Paul Foundation</h3>
          <p className="text-gray-200 text-sm md:text-base leading-relaxed">
            Supporting tribal schools in Palghar & Nashik by providing education,
            nutrition, and community growth initiatives.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-200 text-sm md:text-base">
            <li><a href="/" className="hover:text-yellow-400 transition">Home</a></li>
            <li><a href="/about" className="hover:text-yellow-400 transition">About</a></li>
            <li><a href="/donate" className="hover:text-yellow-400 transition">Donate</a></li>
            <li><a href="/contact" className="hover:text-yellow-400 transition">Contact</a></li>
            <li><a href="/terms-and-conditions" className="hover:text-yellow-400 transition">Terms & Conditions</a></li>
            <li><a href="/privacy-policy" className="hover:text-yellow-400 transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Contact</h3>
          <p className="text-gray-200 mb-2 text-sm md:text-base">
            Email: contact@ekpaulfoundation.org
          </p>
          {/* <p className="text-gray-200 mb-4 text-sm md:text-base">
            Phone: +91 98765 43210
          </p> */}
          <br />
          <div className="flex gap-4">
            <a href="#" className="hover:text-yellow-400 transition"><Facebook className="w-6 h-6" /></a>
            <a href="#" className="hover:text-yellow-400 transition"><Instagram className="w-6 h-6" /></a>
            <a href="#" className="hover:text-yellow-400 transition"><Mail className="w-6 h-6" /></a>
          </div>
        </div>
      </div>

      <div className="text-center mt-10 text-gray-300 text-xs md:text-sm">
        © {new Date().getFullYear()} Ek Paul Foundation. All Rights Reserved.
      </div>
    </footer>
  );
}
