import React, { useState } from "react";
import { Link } from "react-router-dom";
import REMCalculatorOld from "../components/calculatorsComponents/REMCalculatorOld";
import REMCalculatorNew from "../components/calculatorsComponents/REMCalculatorNew";

// Pension Loan Components
import PLNew from "../components/calculatorsComponents/PLNew";
import PLRenewal from "../components/calculatorsComponents/PLRenewal";
import PLAdditionalCalculator from "../components/calculatorsComponents/PLAdditional";
import PL13thMonthCalculator from "../components/calculatorsComponents/PL13thMonth";
import PLExtensionCalculator from "../components/calculatorsComponents/PLExtension";
import PLFELTCalculator from "../components/calculatorsComponents/PLFELTCalculator";

const LoanCalculator = () => {
  const [activeTab, setActiveTab] = useState("REM");
  const [remTab, setRemTab] = useState("new");
  const [plTab, setPlTab] = useState("new");
  const [showNote, setShowNote] = useState(false); // modal state

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
            <div className="space-y-6 mb-4">
              {/* Section for New Clients */}
              <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                  New Clients can avail
                </h2>
                <div className="flex flex-wrap gap-2 justify-center">
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
                    onClick={() => setPlTab("felt")}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      plTab === "felt"
                        ? "bg-green-800 text-white shadow-md"
                        : "bg-white text-gray-700 border border-gray-300"
                    }`}
                  >
                    FELT
                  </button>
                </div>
              </div>

              {/* Section for Existing Clients */}
              <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                  Existing Clients can avail
                </h2>
                <div className="flex flex-wrap gap-2 justify-center">
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
                    onClick={() => setPlTab("extension")}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      plTab === "extension"
                        ? "bg-green-800 text-white shadow-md"
                        : "bg-white text-gray-700 border border-gray-300"
                    }`}
                  >
                    EXTENSION
                  </button>
                  <button
                    onClick={() => setPlTab("additional")}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      plTab === "additional"
                        ? "bg-green-800 text-white shadow-md"
                        : "bg-white text-gray-700 border border-gray-300"
                    }`}
                  >
                    ADDITIONAL
                  </button>
                  <button
                    onClick={() => setPlTab("13th")}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      plTab === "13th"
                        ? "bg-green-800 text-white shadow-md"
                        : "bg-white text-gray-700 border border-gray-300"
                    }`}
                  >
                    13th Month
                  </button>
                </div>
              </div>
              {/* Important Note Button */}
      <div className="mt-6 flex flex-col items-center justify-center">
        <button
          onClick={() => setShowNote(true)}
          className="px-5 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition"
        >
          Important Note
        </button>
      </div>

      {/* Modal */}
      {showNote && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Important Loan Term Note
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>64 years old & below – <strong>30 months maximum and can avail FELT</strong></li>
              <li>65 to 69 years old – <strong>24 months maximum</strong></li>
              <li>70 to 72 years old – <strong>18 months maximum</strong></li>
              <li>73 to 74 years old – <strong>12 months maximum</strong></li>
              <li>75 years old – <strong>6 months maximum</strong></li>
            </ul>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowNote(false)}
                className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

            </div>

            {/* Show selected PL calculator */}
            {plTab === "new" && <PLNew />}
            {plTab === "renewal" && <PLRenewal />}
            {plTab === "additional" && <PLAdditionalCalculator />}
            {plTab === "13th" && <PL13thMonthCalculator />}
            {plTab === "extension" && <PLExtensionCalculator />}
            {plTab === "felt" && <PLFELTCalculator />}
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
