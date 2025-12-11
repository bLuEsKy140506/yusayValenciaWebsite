import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// REM Calculators
import REMCalculatorOld from "../components/calculatorsComponents/REMCalculatorOld";
import REMCalculatorNew from "../components/calculatorsComponents/REMCalculatorNew";

// Pension Loan Calculators
import PLNew from "../components/calculatorsComponents/PLNew";
import PLRenewal from "../components/calculatorsComponents/PLRenewal";
import PLAdditionalCalculator from "../components/calculatorsComponents/PLAdditional";
import PL13thMonthCalculator from "../components/calculatorsComponents/PL13thMonth";
import PLExtensionCalculator from "../components/calculatorsComponents/PLExtension";
import PLFELTCalculator from "../components/calculatorsComponents/PLFELTCalculator";

const LoanCalculator = () => {
  const location = useLocation();

  // Default Tabs
  const [activeTab, setActiveTab] = useState("REM"); // Main: REM or PL
  const [remTab, setRemTab] = useState("new"); // REM sub-tabs
  const [plTab, setPlTab] = useState("new"); // PL sub-tabs
  const [showNote, setShowNote] = useState(false);

  // 🔹 Read state from Link (from ServicesSection)
  useEffect(() => {
    if (location.state) {
      if (location.state.activeTab) setActiveTab(location.state.activeTab);
      if (location.state.remTab) setRemTab(location.state.remTab);
      if (location.state.plTab) setPlTab(location.state.plTab);
    }
  }, [location.state]);

  return (
    <section className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-6 py-12 pt-20 md:px-8">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
        Loan Calculator
      </h1>

      {/* Main Tabs */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab("REM")}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md ${
            activeTab === "REM"
              ? "bg-green-700 text-white shadow-lg scale-105"
              : "bg-white text-gray-700 hover:bg-green-50"
          }`}
        >
          Real Estate Mortgage Loan
        </button>

        <button
          onClick={() => setActiveTab("PL")}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md ${
            activeTab === "PL"
              ? "bg-green-700 text-white shadow-lg scale-105"
              : "bg-white text-gray-700 hover:bg-green-50"
          }`}
        >
          Pension Loan
        </button>
      </div>

      {/* Content Box */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-8">
      {activeTab === "REM" ? (
  <>
    {/* REM Tabs */}
    
    {/* REM Calculator */}
    <REMCalculatorNew />
  </>
) : (
  <>
    {/* PL Tabs */}
    <div className="mb-6">
      {/* New Clients */}
      <h3 className="text-lg font-semibold text-green-700 mb-3">
        🟢 New Clients
      </h3>
      <div className="flex flex-wrap gap-3 mb-6">
        {[
          { key: "new", label: "New" },
          { key: "felt", label: "FELT" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setPlTab(tab.key)}
            className={`px-5 py-2 rounded-lg font-medium transition-all ${
              plTab === tab.key
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Existing Clients */}
      <h3 className="text-lg font-semibold text-green-700 mb-3">
        🔵 Existing Clients
      </h3>
      <div className="flex flex-wrap gap-3">
        {[
          { key: "renewal", label: "Renewal" },
          { key: "additional", label: "Additional" },
          { key: "13th", label: "13th Month" },
          { key: "extension", label: "Extension" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setPlTab(tab.key)}
            className={`px-5 py-2 rounded-lg font-medium transition-all ${
              plTab === tab.key
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>

    {/* PL Calculator */}
    {plTab === "new" && <PLNew />}
    {plTab === "felt" && <PLFELTCalculator />}
    {plTab === "renewal" && <PLRenewal />}
    {plTab === "additional" && <PLAdditionalCalculator />}
    {plTab === "13th" && <PL13thMonthCalculator />}
    {plTab === "extension" && <PLExtensionCalculator />}
  </>
)}

      </div>

      {/* Note Button */}
      <div className="mt-8 text-center">
        <button
          onClick={() => setShowNote(!showNote)}
          className="px-5 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition-all"
        >
          {showNote ? "Hide Important Note" : "Show Important Note"}
        </button>

        {showNote && (
          <div className="mt-4 p-6 bg-yellow-100 border-l-4 border-yellow-500 rounded-lg text-left max-w-3xl mx-auto">
            <h3 className="text-lg font-bold mb-2">Important Notice:</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                This calculator is for <b>illustration purposes only</b>
              </li>
              <li>
                Final approval  will depend on{" "}
                <b>branch evaluation</b>.
              </li>
              <li>
                For clarifications, please contact our{" "}
                <b>Valencia Branch Office</b>.
              </li>
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default LoanCalculator;
