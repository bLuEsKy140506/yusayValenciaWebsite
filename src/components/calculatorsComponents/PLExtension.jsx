import React, { useState, useEffect } from "react";

export default function PLExtensionCalculator() {
  const [monthly, setMonthly] = useState("");
  const [remaining, setRemaining] = useState("");
  const [extended, setExtended] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // Restrict monthly amortization input to numbers only
  const handleMonthlyChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); 
    setMonthly(value);
  };

  useEffect(() => {
    const monthlyVal = parseFloat(monthly);
    const remainingVal = parseInt(remaining);
    const extendedVal = parseInt(extended);

    if (
      isNaN(monthlyVal) ||
      isNaN(remainingVal) ||
      isNaN(extendedVal) ||
      monthlyVal <= 0
    ) {
      setResult(null);
      return;
    }

    if (remainingVal + extendedVal > 30) {
      setError("Total months (remaining + extended) must not exceed 30.");
      setResult(null);
      return;
    } else {
      setError("");
    }

    const gross = monthlyVal * extendedVal;

    // Deductions
    const interest =
      (monthlyVal * extendedVal) *
      (0.01 * (remainingVal + extendedVal));
    const serviceFee = 200;
    const cfPayable =
      ((monthlyVal * extendedVal) / 1000) * 2.5 * (extendedVal+remainingVal);
    const itFee = gross <= 100000 ? 50 : 50 * Math.ceil(gross / 100000);
    const atmCharges = 15 * extendedVal;
    const notarial = 200;

    const totalDeductions =
      interest + serviceFee + cfPayable + itFee + atmCharges + notarial;

    const netProceeds = gross - totalDeductions;

    setResult({
      gross,
      interest,
      serviceFee,
      cfPayable,
      itFee,
      atmCharges,
      notarial,
      totalDeductions,
      netProceeds,
    });
  }, [monthly, remaining, extended]);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        PL Extension Loan Calculator
      </h2>

      {/* Input Fields */}
      <div className="space-y-4">
        {/* Monthly Amortization */}
        <div>
          <label className="block text-gray-700 font-medium">
            Monthly Amortization
          </label>
          <input
            type="text"
            value={monthly}
            onChange={handleMonthlyChange}
            placeholder="Enter monthly amortization"
            className="w-[250px] px-4 py-2 border rounded-lg focus:ring focus:ring-green-200"
          />
        </div>

        {/* Remaining Months */}
        <div>
          <label className="block text-gray-700 font-medium">
            Number of Remaining Months
          </label>
          <select
            value={remaining}
            onChange={(e) => setRemaining(e.target.value)}
            className="w-[250px] px-4 py-2 border rounded-lg focus:ring focus:ring-green-200"
          >
            <option value="">Select months</option>
            {[...Array(29).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
        </div>

        {/* Extended Months */}
        <div>
          <label className="block text-gray-700 font-medium">
            Number of Months to Extend
          </label>
          <select
            value={extended}
            onChange={(e) => setExtended(e.target.value)}
            className="w-[250px] px-4 py-2 border rounded-lg focus:ring focus:ring-green-200"
          >
            <option value="">Select months</option>
            {[...Array(29).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-600 font-medium">{error}</p>}

      {/* Results Section */}
      {result && !error && (
        <div className="mt-6 p-4 bg-gray-50 border rounded-lg space-y-3 w-full">
          <h3 className="text-xl font-semibold text-gray-800">Results</h3>

          {/* Gross */}
          <div className="grid grid-cols-2">
            <span>Gross Loan:</span>
            <span className="text-right font-semibold">
              ₱{result.gross.toLocaleString()}
            </span>
          </div>

          <h4 className="font-medium text-gray-700 mt-2">Deductions:</h4>

          {/* Deductions */}
          <div className="grid grid-cols-2 gap-y-1 text-gray-700">
            <span>
              Interest (1% × {parseInt(remaining) + parseInt(extended)} months):
            </span>
            <span className="text-right">
              ₱{result.interest.toLocaleString()}
            </span>

            <span>Service Fee:</span>
            <span className="text-right">₱{result.serviceFee.toLocaleString()}</span>

            <span>CF Payable:</span>
            <span className="text-right">₱{result.cfPayable.toLocaleString()}</span>

            <span>IT Fee:</span>
            <span className="text-right">₱{result.itFee.toLocaleString()}</span>

            <span>ATM Charges:</span>
            <span className="text-right">₱{result.atmCharges.toLocaleString()}</span>

            <span>Notarial Fee:</span>
            <span className="text-right">₱{result.notarial.toLocaleString()}</span>
          </div>

          {/* Totals */}
          <div className="grid grid-cols-2 border-t pt-2 mt-2 font-bold text-gray-800">
            <span>Total Deductions:</span>
            <span className="text-right">
              ₱{result.totalDeductions.toLocaleString()}
            </span>
          </div>

          <div className="grid grid-cols-2 text-lg font-bold text-green-700">
            <span>Net Proceeds:</span>
            <span className="text-right">
              ₱{result.netProceeds.toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
