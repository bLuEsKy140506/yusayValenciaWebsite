import React, { useState, useEffect } from "react";

export default function PL13thMonthCalculator() {
  const [gross, setGross] = useState("");
  const [months, setMonths] = useState(6);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const grossVal = parseFloat(gross);
    const monthsVal = parseInt(months);

    if (isNaN(grossVal) || isNaN(monthsVal)) {
      setResult(null);
      return;
    }

    if (monthsVal < 1 || monthsVal > 6 || grossVal <= 0) {
      setResult(null);
      return;
    }

    // Interest table based on months
    const interestRates = {
      1: 0.03,
      2: 0.06,
      3: 0.08,
      4: 0.10,
      5: 0.12,
      6: 0.14,
    };

    const interestRate = interestRates[monthsVal];
    const interest = grossVal * interestRate;
    const cf = (grossVal / 1000) * 2.5 * monthsVal;
    const notarial = 200;
    const itFee = 50;
    const atm = 50; // fixed ATM charge

    const totalDeductions = interest + cf + notarial + itFee + atm;
    const netProceeds = grossVal - totalDeductions;

    setResult({
      gross: grossVal,
      interest,
      interestRate: Math.round(interestRate * 100), // percentage no decimals
      cf,
      notarial,
      itFee,
      atm,
      totalDeductions,
      netProceeds,
    });
  }, [gross, months]);

  // Allow only digits
  const handleGrossChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setGross(value);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl flex flex-col items-center space-y-4 min-h-[300px] transition-all">
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        PL 13th Month Loan Calculator
      </h2>

      {/* Input Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">
            Gross Loan Amount
          </label>
          <input
            type="text"
            value={gross}
            onChange={handleGrossChange}
            placeholder="Enter gross amount"
            className="w-[250px] px-4 py-2 border rounded-lg focus:ring focus:ring-green-200"
            inputMode="numeric"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">
            Number of Lump Sum Months
          </label>
          <select
            value={months}
            onChange={(e) => setMonths(e.target.value)}
            className="w-[250px] px-4 py-2 border rounded-lg focus:ring focus:ring-green-200"
          >
            <option value="">Select months</option>
            {[1, 2, 3, 4, 5, 6].map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Section */}
      {result && (
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
            <span>Interest ({result.interestRate}%):</span>
            <span className="text-right">
              ₱{result.interest.toLocaleString()}
            </span>

            <span>CF Payable (2.5 / 1,000 × Months):</span>
            <span className="text-right">
              ₱{result.cf.toLocaleString()}
            </span>

            <span>IT Fee:</span>
            <span className="text-right font-semibold">
              ₱{result.itFee.toLocaleString()}
            </span>

            <span>Notarial:</span>
            <span className="text-right font-semibold">
              ₱{result.notarial.toLocaleString()}
            </span>

            <span>ATM Charge:</span>
            <span className="text-right font-semibold">
              ₱{result.atm.toLocaleString()}
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
