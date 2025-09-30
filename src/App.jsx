import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";

function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className={`min-h-screen flex flex-col ${isHome ? "" : "bg-gray-50"}`}>
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/about" element={<div className="p-6">About Page</div>} />
          <Route path="/services" element={<div className="p-6">Services Page</div>} />
          <Route path="/assets" element={<div className="p-6">Acquired Assets</div>} />
          <Route path="/calculator" element={<div className="p-6">Loan Calculator</div>} />
        </Routes>
      </main>
      <footer className="bg-gray-100 py-4 text-center text-gray-600">
        © {new Date().getFullYear()} Yusay Credit & Finance Corporation
      </footer>
    </div>
  );
}

export default App;
