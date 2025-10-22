import React, { useState, useEffect } from "react";
import PDICalculatorLumpsum from "../components/pdiCalculators/PDICalculatorLumpsum";
import PDICalculatorMonthly from "../components/pdiCalculators/PDICalculatorMonthly";
import LongOverDueREMLumpsum from "../components/pdiCalculators/LongOverDueREMLumpsum";


// ✅ Sub-component for Non-LL
const PDICalculatorNonLL = () => {
  const [activeMode, setActiveMode] = useState("lumpsum"); // "lumpsum" or "monthly"

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-7">
      {/* Header */}
      <h2 className="text-lg font-semibold text-center text-green-800 mb-4">
        Non-LL REM — PDI + Payment Option Calculator
      </h2>

      {/* Mode Switch */}
      <div className="flex justify-center gap-2 mb-6">
        <button
          onClick={() => setActiveMode("lumpsum")}
          className={`px-4 py-2 rounded-md font-medium flex-1 transition ${
            activeMode === "lumpsum"
              ? "bg-green-600 text-white shadow"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          Lumpsum
        </button>

        <button
          onClick={() => setActiveMode("monthly")}
          className={`px-4 py-2 rounded-md font-medium flex-1 transition ${
            activeMode === "monthly"
              ? "bg-green-600 text-white shadow"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          Monthly
        </button>
      </div>

      {/* Conditional Render */}
      <div className="border-t border-gray-200 pt-4">
        {activeMode === "lumpsum" ? (
          <PDICalculatorLumpsum />
        ) : (
          <PDICalculatorMonthly />
        )}
      </div>
    </div>
  );
};

// ✅ Main Switcher
const PDICalculatorSwitcher = () => {
  const [isLongOverdue, setIsLongOverdue] = useState(false);
  useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 mt-20">
      {/* Header */}
      <h2 className="text-xl font-semibold text-center text-green-800 mb-6">
        Specify the status of the account
      </h2>

      {/* Toggle Buttons */}
      <div className="flex justify-center gap-3 mb-8">
        <button
          onClick={() => setIsLongOverdue(false)}
          className={`px-5 py-2 rounded-md font-medium transition ${
            !isLongOverdue
              ? "bg-green-600 text-white shadow"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          Not Overdue
        </button>

        <button
          onClick={() => setIsLongOverdue(true)}
          className={`px-5 py-2 rounded-md font-medium transition ${
            isLongOverdue
              ? "bg-green-600 text-white shadow"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          Long Overdue - Lumpsum Only
        </button>
      </div>

      {/* Conditional Calculator */}
      {isLongOverdue ? <LongOverDueREMLumpsum /> : <PDICalculatorNonLL />}
    </div>
  );
};


export default PDICalculatorSwitcher;
