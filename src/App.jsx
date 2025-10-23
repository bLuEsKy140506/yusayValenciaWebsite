import React, { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";

// Lazy load heavy pages & components
const LoanCalculator = lazy(() => import("./pages/LoanCalculator"));
const LoanCalculatorForClient = lazy(() =>
  import("./pages/LoanCalculatorForClient")
);
const ApplyNow = lazy(() => import("./components/ApplyNow"));
const AboutUs = lazy(() => import("./components/AboutUs"));
const ServicesSection = lazy(() => import("./components/ServicesSection"));
const PropertyList = lazy(() => import("./pages/PropertyList"));
const PropertyDetails = lazy(() => import("./pages/PropertyDetails"));
const MakeAppointment = lazy(() => import("./pages/MakeAppointment"));
const PDICalculatorSwitcher = lazy(() =>
  import("./pages/PDICalculatorSwitcher")
);

// 🧭 Scroll smoothly to hash links
function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    }
  }, [location]);

  return null;
}

// ➕➖ Floating zoom controls for mobile
function ZoomControls({ onZoomIn, onZoomOut }) {
  return (
    <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 flex gap-3 md:hidden">
      <button
        onClick={onZoomOut}
        className="bg-gradient-to-br from-green-500 to-emerald-600 text-white text-2xl font-extrabold w-7 h-7 rounded-full shadow-lg flex items-center justify-center leading-none active:scale-95 transition-transform duration-150"
        aria-label="Zoom Out"
      >
        <span className="relative top-[-1px]">−</span>
      </button>
      <button
        onClick={onZoomIn}
        className="bg-gradient-to-br from-green-500 to-emerald-600 text-white text-2xl font-extrabold w-7 h-7 rounded-full shadow-lg flex items-center justify-center leading-none active:scale-95 transition-transform duration-150"
        aria-label="Zoom In"
      >
        <span className="relative top-[-1px]">+</span>
      </button>
    </div>
  );
}


function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [scale, setScale] = useState(1);

  // ✅ Load homepage sections faster
  useEffect(() => {
    if (isHome) {
      import("./components/ServicesSection");
      import("./components/AboutUs");
    }
  }, [isHome]);

  // ✅ Preload pages for faster nav
  const preloadProperties = () => {
    import("./pages/PropertyList");
    import("./pages/PropertyDetails");
  };

  const preloadLoanCalculator = () => {
    import("./pages/LoanCalculator");
  };

  // ➕ Zoom handlers
  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.5));

 return (
  <div className="relative">
    {/* Floating zoom buttons */}
    <ZoomControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />

    {/* ✅ Keep Navbar OUTSIDE the scaled container */}
    <div className="sticky top-0 z-40">
      <Navbar
        onPreloadProperties={preloadProperties}
        onPreloadLoanCalculator={preloadLoanCalculator}
      />
    </div>

    {/* 🧩 Zoomed app container */}
    <div
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "top center",
        transition: "transform 0.2s ease-in-out",
      }}
      className="flex flex-col min-h-screen bg-gray-50 text-gray-900"
    >
      <ScrollToHash />

      {/* Main content */}
      <main className="flex-grow">
        <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <ServicesSection id="services" />
                  <AboutUs id="about" />
                  <ApplyNow />
                </>
              }
            />
            <Route path="/properties" element={<PropertyList />} />
            <Route path="/properties/:id" element={<PropertyDetails />} />
            <Route path="/calculator" element={<LoanCalculator />} />
            <Route
              path="/calculator-forclient"
              element={<LoanCalculatorForClient />}
            />
            <Route path="/appointment" element={<MakeAppointment />} />
            <Route path="/pdi-calculator" element={<PDICalculatorSwitcher />} />
            <Route
              path="*"
              element={
                <div className="p-6 text-center text-gray-700">
                  404 - Page Not Found
                </div>
              }
            />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  </div>
);

}

export default App;
