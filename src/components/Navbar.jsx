import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="YCFC Logo" className="h-10" />
        </Link>

        {/* Links + Button (desktop) */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/about" className="hover:text-primary">About</Link>
          <Link to="/services" className="hover:text-primary">Services</Link>
          <Link to="/assets" className="hover:text-primary">Acquired Asset</Link>
          {/* <Link to="/calculator" className="hover:text-primary">Loan Calculator</Link> */}
          
          {/* Always visible button on desktop */}
          <Link
            to="/appointment"
            className="bg-green-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Make an Appointment
          </Link>
        </div>

        {/* Burger (mobile) */}
    <button
  className="md:hidden flex flex-col gap-1 relative z-50"
  onClick={() => setIsOpen(!isOpen)}
>
  <span className="w-6 h-0.5 bg-black"></span>
  <span className="w-6 h-0.5 bg-black"></span>
  <span className="w-6 h-0.5 bg-black"></span>
</button>

      </div>
    


      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md flex flex-col items-start p-4 space-y-3">
          <Link to="/about" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-green-600">About</Link>
          <Link to="/services" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-green-600">Services</Link>
          <Link to="/assets" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-green-600">Acquired Asset</Link>
          <Link to="/calculator" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-green-600">Loan Calculator</Link>
          
          {/* Mobile button */}
          <Link
            to="/appointment"
            className="bg-green-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-green-700 transition"
            onClick={() => setIsOpen(false)}
          >
            Make an Appointment
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
