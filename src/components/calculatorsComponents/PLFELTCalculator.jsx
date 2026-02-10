import React, { useState, useEffect } from "react";

export default function PLFELTCalculator() {
  const [monthly, setMonthly] = useState(5000);
  const [months, setMonths] = useState(36);
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
    const rfpl = (gross / 1000) * 2.0 * monthsVal;
    const atmCharges = monthsVal * 50;
    const itFee = gross <= 100000 ? 50 : 0.0005 * gross;
    const notarial = 200;

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
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={withReferral}
            onChange={(e) => setWithReferral(e.target.checked)}
          />
          <label className="text-gray-700">With Referral</label>
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
            <span>Interest (0.8% per month):</span>
            <span className="text-right">
              ₱{result.interest.toLocaleString()}
            </span>

            <span>Service Fee:</span>
            <span className="text-right">
              ₱{result.serviceFee.toLocaleString()}
            </span>

            <span>RFPL (2.0 / 1,000 × Months):</span>
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

            {withReferral && (
              <>
                <span>Miscellaneous Fee:</span>
                <span className="text-right font-semibold">
                  ₱{result.referralFee.toLocaleString()}
                </span>
              </>
            )}
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
