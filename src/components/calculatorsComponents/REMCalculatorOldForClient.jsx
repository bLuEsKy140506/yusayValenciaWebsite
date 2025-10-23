import React, { useState, useEffect } from "react";

// Interest rate mapping based on months
const interestRates = {
  4: 0.06,
  5: 0.075,
  6: 0.09,
  7: 0.095,
  8: 0.1,
  9: 0.105,
  10: 0.11,
  11: 0.115,
  12: 0.12,
  13: 0.13,
  14: 0.14,
  15: 0.15,
  16: 0.16,
  17: 0.17,
  18: 0.18,
  19: 0.19,
  20: 0.2,
  21: 0.21,
  22: 0.22,
  23: 0.23,
  24: 0.24,
};

const REMCalculatorOldForNewClient = () => {
  const [gross, setGross] = useState("");
  const [months, setMonths] = useState("");
  const [result, setResult] = useState(null);

  const formatNumber = (num) =>
    new Intl.NumberFormat("en-PH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);

  useEffect(() => {
    const grossAmount = parseFloat(gross);
    const term = parseInt(months);

    if (!grossAmount || !term || term < 4 || term > 24) {
      setResult(null);
      return;
    }

    // Get interest rate based on months
    const interestRate = interestRates[term] || 0;
    const totalInterest = grossAmount * interestRate;

    // PN Notarial Fee (fixed 100)
    const pnNotary = 100;
    const ciFee = 1500;
    const itFee = grossAmount <= 100000 ? 50 : 0.0005 * grossAmount;
    const registrationFee = grossAmount * 0.03; // Assuming 0 as not specified
    // Total Deduction
    const totalDeduction =
      totalInterest + pnNotary + ciFee + itFee + registrationFee;

    // Net Proceeds
    const netProceeds = grossAmount - totalDeduction;

    // Monthly Payment
    const monthlyPayment = grossAmount / term;

    setResult({
      interestRate: (interestRate * 100).toFixed(2) + "%",
      interestAmount: formatNumber(totalInterest),
      pnNotary: formatNumber(pnNotary),
      totalDeduction: formatNumber(totalDeduction),
      netProceeds: formatNumber(netProceeds),
      monthlyPayment: formatNumber(monthlyPayment),
      registrationFee: formatNumber(registrationFee),
      ciFee: formatNumber(ciFee),
      itFee: formatNumber(itFee),
    });
  }, [gross, months]);

  return (
    <div className="flex flex-col items-center min-h-[260px] transition-all">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        REM Loan Calculator (Old Scheme)
      </h2>

      <div className="flex flex-col items-center space-y-4">
        {/* Gross Input */}
        <input
          type="text"
          placeholder="Gross Amount"
          value={gross}
          onChange={(e) => {
            const val = e.target.value;
            if (/^\d*$/.test(val)) setGross(val); // allow only digits
          }}
          onKeyDown={(e) => {
            if (
              !/[0-9]/.test(e.key) &&
              e.key !== "Backspace" &&
              e.key !== "Delete" &&
              e.key !== "ArrowLeft" &&
              e.key !== "ArrowRight" &&
              e.key !== "Tab"
            ) {
              e.preventDefault();
            }
          }}
          className="w-[200px] border rounded-lg px-4 py-2"
        />

        {/* Months Input */}
        <select
          value={months}
          onChange={(e) => setMonths(e.target.value)}
          className="w-[200px] px-4 py-2 border rounded-lg focus:ring focus:ring-green-200"
        >
          <option value="">Select months</option>
          {[...Array(21).keys()].map((num) => (
            <option key={num + 4} value={num + 4}>
              {num + 4}
            </option>
          ))}
        </select>
      </div>

       {result && (
        <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner space-y-3 w-full max-w-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Calculation Results
          </h3>

          <div className="grid grid-cols-2 gap-y-2 text-gray-700">
            

            <span className="font-semibold">Net Proceeds:</span>
            <span className="text-right font-semibold text-green-700">
              ₱{result.netProceeds}
            </span>

            <span className="font-semibold">Monthly Payment:</span>
            <span className="text-right font-semibold">
              ₱{result.monthlyPayment}
            </span>
          </div>
        </div>
      )}
      <div className="bg-white p-6 rounded-xl shadow-2xl w-80 z-30 border border-green-200 animate-fadeIn mt-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-green-800">
          REM Loan Requirements
        </h2>
       
      </div>

      {/* Content */}
      <ul className="text-sm text-gray-700 list-disc pl-4 space-y-1">
        <li>Owner’s Duplicate Copy of Title</li>
        <li>Certified True Copy of Title</li>
        <li>Lot Plan with Vicinity Map</li>
        <li>Tax Declaration & Receipts</li>
        <li>Land Tax Clearance</li>
        <li>Pictures of Property (2 outside, 2 inside)</li>
        <li>2 Valid IDs (Applicant & Co-Maker)</li>
        <li>1 2x2 ID Picture (Applicant & Co-Maker)</li>
        <li>TIN (Applicant)</li>
        <li>CAR (Certificate Authorizing Registration)</li>
      </ul>
    </div>
    </div>
  );
};

export default REMCalculatorOldForNewClient;
