import React, { useState } from "react";
import { Link } from "react-router-dom";
import REMCalculatorOld from "../components/calculatorsComponents/REMCalculatorOld";
import REMCalculatorNew from "../components/calculatorsComponents/REMCalculatorNew";

// Pension Loan Components
import PLNew from "../components/calculatorsComponents/PLNew";
import PLRenewal from "../components/calculatorsComponents/PLRenewal";
// import PLAdditional from "../components/calculatorsComponents/PLAdditional";
// // import PL13thMonth from "../components/calculatorsComponents/PL13thMonth";

const LoanCalculator = () => {
  const [activeTab, setActiveTab] = useState("REM"); // Top-level tab: REM or PL
  const [remTab, setRemTab] = useState("new"); // Sub-tab for REM: old or new
  const [plTab, setPlTab] = useState("new"); // Sub-tab for PL: new, renewal, additional, 13th

  return (
    <section className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-6 py-12 pt-20 md:px-8">
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
        Loan Calculator
      </h1>

      {/* Top-Level Tabs */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab("REM")}
          className={`px-6 py-2 rounded-lg font-medium transition ${
            activeTab === "REM"
              ? "bg-green-900 text-white shadow-md"
              : "bg-white text-gray-700 border border-gray-300"
          }`}
        >
          REM
        </button>
        <button
          onClick={() => setActiveTab("PL")}
          className={`px-6 py-2 rounded-lg font-medium transition ${
            activeTab === "PL"
              ? "bg-green-900 text-white shadow-md"
              : "bg-white text-gray-700 border border-gray-300"
          }`}
        >
          PL
        </button>
      </div>

      {/* Calculator Form */}
      <div className="w-full max-w-6xl bg-white p-8 rounded-2xl shadow-lg overflow-x-auto">
        {activeTab === "REM" ? (
          <>
            {/* Sub-tabs for Old/New */}
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              <button
                onClick={() => setRemTab("old")}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  remTab === "old"
                    ? "bg-green-800 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-300"
                }`}
              >
                Old Scheme
              </button>
              <button
                onClick={() => setRemTab("new")}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  remTab === "new"
                    ? "bg-green-800 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-300"
                }`}
              >
                New Scheme
              </button>
            </div>

            {/* Show selected REM calculator */}
            {remTab === "old" ? <REMCalculatorOld /> : <REMCalculatorNew />}
          </>
        ) : (
          <>
            {/* Sub-tabs for Pension Loan Types */}
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              <button
                onClick={() => setPlTab("new")}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  plTab === "new"
                    ? "bg-green-800 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-300"
                }`}
              >
                NEW
              </button>
              <button
                onClick={() => setPlTab("renewal")}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  plTab === "renewal"
                    ? "bg-green-800 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-300"
                }`}
              >
                RENEWAL
              </button>
              <button
                onClick={() => setPlTab("additional")}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  plTab === "additional"
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-300"
                }`}
              >
                ADDITIONAL
              </button>
              <button
                onClick={() => setPlTab("13th")}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  plTab === "13th"
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-300"
                }`}
              >
                13th Month
              </button>
            </div>

            {/* Show selected PL calculator */}
            {plTab === "new" && <PLNew />}
           {plTab === "renewal" && <PLRenewal />}
            {/* {plTab === "additional" && <PLAdditional />}
            {plTab === "13th" && <PL13thMonth />}  */}
          </>
        )}
      </div>

      {/* Example Back Button */}
      <div className="mt-8">
        <Link to="/" className="text-blue-600 hover:underline">
          Back to Home
        </Link>
      </div>
    </section>
  );
};

export default LoanCalculator;
