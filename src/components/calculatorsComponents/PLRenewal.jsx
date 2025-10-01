import React, { useState, useEffect } from "react";

export default function PLRenewalCalculator() {
  const [monthly, setMonthly] = useState("");
  const [months, setMonths] = useState("");
  const [result, setResult] = useState(null);

    const handleNumericInput = (e, setter) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setter(value);
    }
  };


  useEffect(() => {
    const monthlyVal = parseFloat(monthly);
    const monthsVal = parseInt(months);

    if (isNaN(monthlyVal) || isNaN(monthsVal)) {
      setResult(null);
      return;
    }

    if (monthsVal < 4 || monthsVal > 36 || monthlyVal <= 0) {
      setResult(null);
      return;
    }

    const gross = monthlyVal * monthsVal;

    // Deductions
    const interest = gross * monthsVal * 0.01;
    const serviceFee = 200; // Renewal service fee
    const rfpl = (gross / 1000) * 2.5 * monthsVal;
    const atmCharges = monthsVal * 15;
    const itFee = gross <= 100000 ? 50 : 0.0005 * gross;
    const notarial = 100;

    const totalDeductions =
      interest + serviceFee + rfpl + atmCharges + itFee + notarial;

    const netProceeds = gross - totalDeductions;

    setResult({
      gross,
      interest,
      serviceFee,
      rfpl,
      atmCharges,
      itFee,
      notarial,
      totalDeductions,
      netProceeds,
    });
  }, [monthly, months]);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl flex flex-col items-center space-y-4 min-h-[300px] transition-all">
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        PL Renewal Loan Calculator
      </h2>

      {/* Input Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">
            Monthly Amortization
          </label>
          <input
            type="text"
            value={monthly}
            onChange={(e) => handleNumericInput(e, setMonthly)}
            placeholder="Enter monthly amortization"
            className="w-[300px] px-4 py-2 border rounded-lg focus:ring focus:ring-green-200"
            min="1"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">
            Number of Months
          </label>
           <select
            value={months}
            onChange={(e) => setMonths(e.target.value)}
            className="w-[300px] px-4 py-2 border rounded-lg focus:ring focus:ring-green-200"
          >
            <option value="">Select months</option>
            {[...Array(27).keys()].map((num) => (
              <option key={num + 4} value={num + 4}>
                {num + 4}
              </option>
            ))}
          </select>
          {/* <input
            type="number"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
            placeholder="Enter 4 - 30 months"
            className="w-[300px] px-4 py-2 border rounded-lg focus:ring focus:ring-green-200"
            min="4"
            max="36"
          /> */}
        </div>
      </div>

      {/* Results Section */}
      {result && (
        <div className="mt-6 p-4 bg-gray-50 border rounded-lg space-y-3">
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
            <span>Interest (1% per month):</span>
            <span className="text-right">
              ₱{result.interest.toLocaleString()}
            </span>

            <span>Service Fee:</span>
            <span className="text-right">
              ₱{result.serviceFee.toLocaleString()}
            </span>

            <span>RFPL (2.5 / 1,000 × Months):</span>
            <span className="text-right">
              ₱{result.rfpl.toLocaleString()}
            </span>

            <span>ATM Charges (₱15 × Months):</span>
            <span className="text-right">
              ₱{result.atmCharges.toLocaleString()}
            </span>

            <span>IT Fee:</span>
            <span className="text-right font-semibold">
              ₱{result.itFee.toLocaleString()}
            </span>

            <span>Notarial:</span>
            <span className="text-right font-semibold">
              ₱{result.notarial.toLocaleString()}
            </span>
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
