import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // ✅ Scroll to top only for full-page routes (not hash links)
  useEffect(() => {
    const topRoutes = ["/", "/properties", "/calculator", "/appointment"];
    if (topRoutes.includes(location.pathname)) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsOpen(false); // ✅ Close dropdown on route change
  }, [location]);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      {/* Navbar Container */}
      <div className="container mx-auto flex items-center justify-between px-4 py-2 md:py-3">
        {/* Logo */}
        <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
          <img src={logo} alt="YCFC Logo" className="h-8 md:h-10" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 items-center">
          <HashLink smooth to="/#about" className="hover:text-green-700">
            About Us
          </HashLink>
          <HashLink smooth to="/#services" className="hover:text-green-700">
            Services
          </HashLink>
          <Link to="/properties" className="hover:text-green-700">
            Properties For Sale
          </Link>
          <Link
            to="/appointment"
            className="bg-green-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Make an Appointment
          </Link>
        </div>

        {/* Burger Icon (Mobile) */}
        <button
          className="md:hidden flex flex-col gap-[4px] relative z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="w-6 h-[2px] bg-black"></span>
          <span className="w-6 h-[2px] bg-black"></span>
          <span className="w-6 h-[2px] bg-black"></span>
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden bg-white shadow-md transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-64 opacity-100 py-2" : "max-h-0 opacity-0 py-0"
        }`}
      >
        <div className="flex flex-col items-start px-4 space-y-2">
          <HashLink
            smooth
            to="/#about"
            className="hover:text-green-700 py-1"
            onClick={() => setIsOpen(false)}
          >
            About Us
          </HashLink>
          <HashLink
            smooth
            to="/#services"
            className="hover:text-green-700 py-1"
            onClick={() => setIsOpen(false)}
          >
            Services
          </HashLink>
          <Link
            to="/properties"
            className="hover:text-green-700 py-1"
            onClick={() => setIsOpen(false)}
          >
            Properties For Sale
          </Link>
          <Link
            to="/calculator"
            className="hover:text-green-700 py-1"
            onClick={() => setIsOpen(false)}
          >
            Loan Calculator
          </Link>
          <Link
            to="/appointment"
            className="bg-green-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-green-700 transition mt-1"
            onClick={() => setIsOpen(false)}
          >
            Make an Appointment
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
