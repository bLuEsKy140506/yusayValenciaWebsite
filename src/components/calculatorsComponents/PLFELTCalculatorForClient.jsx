import React, { useState, useEffect } from "react";
import PensionBookmark from "../bookmarks/PensionBookmark";

export default function PLFELTCalculatorForClient() {
  const [monthly, setMonthly] = useState("");
  const [months, setMonths] = useState("");
  const [withReferral, setWithReferral] = useState(true);
  const [result, setResult] = useState(null);

  // 🔹 helper: allow only numeric input
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

    if (monthsVal < 24 || monthsVal > 36 || monthlyVal <= 0) {
      setResult(null);
      return;
    }

    const gross = monthlyVal * monthsVal;

    // Deductions
    const interest = gross * monthsVal * 0.008; // 0.8% per month
    const serviceFee = 400;
    const rfpl = (gross / 1000) * 2.5 * monthsVal;
    const atmCharges = monthsVal * 15;
    const itFee = gross <= 100000 ? 50 : 0.0005 * gross;
    const notarial = 100;

    // Referral Fee (optional)
    let referralFee = 0;
    if (withReferral) {
      if (gross < 50000) referralFee = 0;
      else if (gross >= 50000 && gross < 100000) referralFee = 500;
      else if (gross >= 100000) referralFee = 1000;
    }

    const totalDeductions =
      interest +
      serviceFee +
      rfpl +
      atmCharges +
      itFee +
      referralFee +
      notarial;

    const netProceeds = gross - totalDeductions;

    setResult({
      gross,
      interest,
      serviceFee,
      rfpl,
      atmCharges,
      itFee,
      referralFee,
      totalDeductions,
      netProceeds,
      notarial,
    });
  }, [monthly, months, withReferral]);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl flex flex-col items-center space-y-4 min-h-[300px] transition-all">
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        PL FELT {`For BUY-OUT only`}
      </h2>

      {/* Input Fields */}
      <div className="space-y-4">
        {/* Monthly Amortization */}
        <div>
          <label className="block text-gray-700 font-medium">
            Monthly Amortization
          </label>
          <input
            type="text" // changed to text
            value={monthly}
            onChange={(e) => handleNumericInput(e, setMonthly)}
            placeholder="Enter monthly amortization"
            className="w-[250px] px-4 py-2 border rounded-lg focus:ring focus:ring-green-200"
          />
        </div>

        {/* Number of Months Dropdown */}
        <div>
          <label className="block text-gray-700 font-medium">
            Number of Months
          </label>
          <select
            value={months}
            onChange={(e) => setMonths(e.target.value)}
            className="w-[250px] px-4 py-2 border rounded-lg focus:ring focus:ring-green-200"
          >
            <option value="">Select months</option>
            {[...Array(13).keys()].map((num) => (
              <option key={num + 24} value={num + 24}>
                {num + 24}
              </option>
            ))}
          </select>
        </div>

        {/* Referral Checkbox */}
       
      </div>

      {/* Results Section */}
      {result && (
        <div className="mt-6 p-4 bg-gray-50 border rounded-lg space-y-3">
          <h3 className="text-xl font-semibold text-gray-800">Results</h3>

          {/* Gross */}
          

        

          {/* Deductions */}
        

          {/* Totals */}
          

          <div className="grid grid-cols-2 text-lg font-bold text-green-700">
            <span>Net Proceeds:</span>
            <span className="text-right">
              ₱{result.netProceeds.toLocaleString()}
            </span>
          </div>
        </div>
      )}
        <div className="bg-white p-6 rounded-xl shadow-2xl w-80 z-30 border border-green-200 animate-fadeIn">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-green-800">
          Pension Loan Requirements
        </h2>
       
      </div>

      {/* Content */}
      <ul className="text-sm text-gray-700 list-disc pl-4 space-y-1">
        <li>SSS/GSIS ID Number</li>
        <li>DDR Print / SSS Certification</li>
        <li>Voucher / Retirement Notice from SSS/GSIS</li>
        <li>Bank Statement of ATM</li>
        <li>ATM Card and Photocopy</li>
        <li>2 Valid IDs</li>
        <li>One (1) 2x2 ID Picture</li>
        <li>Marriage Contract (Authenticated)</li>
        <li>Birth Certificate (if with dependents)</li>
        <li>Cedula / Barangay Clearance</li>
        <li>Proof of Billing (Electric/Water)</li>
      </ul>
    </div>
    </div>
  );
}
