import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";

// Lazy load heavy pages & components
const LoanCalculator = lazy(() => import("./pages/LoanCalculator"));
const ApplyNow = lazy(() => import("./components/ApplyNow"));
const AboutUs = lazy(() => import("./components/AboutUs"));
const ServicesSection = lazy(() => import("./components/ServicesSection"));
const PropertyList = lazy(() => import("./pages/PropertyList"));
const PropertyDetails = lazy(() => import("./pages/PropertyDetails"));
const MakeAppointment = lazy(() => import("./pages/MakeAppointment"));

function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  // ✅ Preload homepage sections when on home
  useEffect(() => {
    if (isHome) {
      import("./components/ServicesSection");
      import("./components/AboutUs");
    }
  }, [isHome]);

  // ✅ Preload functions for Navbar hover events
  const preloadProperties = () => {
    import("./pages/PropertyList");
    import("./pages/PropertyDetails");
  };

  const preloadLoanCalculator = () => {
    import("./pages/LoanCalculator");
  };

  return (
    <div className={`min-h-screen flex flex-col ${isHome ? "" : "bg-gray-50"}`}>
      {/* Navbar with preloading callbacks */}
      <Navbar
        onPreloadProperties={preloadProperties}
        onPreloadLoanCalculator={preloadLoanCalculator}
      />

      {/* Main Content */}
      <main className="flex-grow">
        <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
          <Routes>
            {/* Homepage */}
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

            {/* Pages */}
            <Route path="/properties" element={<PropertyList />} />
            <Route path="/properties/:id" element={<PropertyDetails />} />
            <Route path="/calculator" element={<LoanCalculator />} />
            <Route path="/appointment" element={<MakeAppointment />} />
            <Route
              path="*"
              element={
                <div className="p-6 text-center">404 - Page Not Found</div>
              }
            />
          </Routes>
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-4 text-center text-gray-600">
        © {new Date().getFullYear()} Yusay Credit & Finance Corporation
      </footer>
    </div>
  );
}

export default App;
