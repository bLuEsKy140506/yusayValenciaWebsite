import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";

import History from "./pages/History";


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
const DemandLetterForm = lazy(()=> import("./components/DemandLetterForm"));
const PDICalculatorSwitcher = lazy(() =>
  import("./pages/PDICalculatorSwitcher")
);


function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      // Wait a short moment until elements are rendered
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 500); // 0.5s delay to ensure target exists
    }
  }, [location]);

  return null;
}

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
    // 🧩 Use flex-column layout so Footer stays below content
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      {/* Navbar */}
      <Navbar
        onPreloadProperties={preloadProperties}
        onPreloadLoanCalculator={preloadLoanCalculator}
      />

      <ScrollToHash />

      {/* Page content (pushes footer down) */}
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
             <Route path="/demand-letter" element={<DemandLetterForm />} />
             
              <Route path="/history" element={<History />} />

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
  );
}

export default App;
