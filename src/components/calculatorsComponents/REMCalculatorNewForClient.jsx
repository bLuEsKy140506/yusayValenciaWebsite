import React, { useState, useEffect } from "react";

// Fire Insurance Premium Table
const fireInsuranceTable = [
  { max: 1000000, premium: 1527.0 },
  { max: 1500000, premium: 2290.5 },
  { max: 2000000, premium: 3054.0 },
  { max: 2500000, premium: 3817.5 },
  { max: 3000000, premium: 4581.0 },
  { max: 3500000, premium: 5344.5 },
  { max: 4000000, premium: 6108.0 },
  { max: 4500000, premium: 6871.5 },
  { max: 5000000, premium: 7635.0 },
  { max: 5500000, premium: 8398.5 },
  { max: 6000000, premium: 9162.0 },
  { max: 6500000, premium: 9925.5 },
  { max: 7000000, premium: 10689.0 },
  { max: 7500000, premium: 11452.5 },
  { max: 8000000, premium: 12216.0 },
  { max: 8500000, premium: 12979.5 },
  { max: 9000000, premium: 13743.0 },
  { max: 9500000, premium: 14506.5 },
  { max: 10000000, premium: 15270.0 },
];

// Interest table based on term
const getMonthlyInterestRate = (months) => {
  if (months >= 4 && months <= 6) return 0.015;
  if (months === 7) return 0.0136;
  if (months === 8) return 0.0125;
  if (months === 9) return 0.0117;
  if (months === 10) return 0.011;
  if (months === 11) return 0.0105;
  if (months >= 12 && months <= 60) return 0.01;
  return 0;
};

const REMCalculatorNewForClient = () => {
  const [gross, setGross] = useState("");
  const [months, setMonths] = useState(36);
  const [includeFireInsurance, setIncludeFireInsurance] = useState(false);
  const [result, setResult] = useState(null);

  const formatNumber = (num) =>
    new Intl.NumberFormat("en-PH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);

  const getFireInsurance = (grossAmount) => {
    if (!includeFireInsurance) return 0;
    const row = fireInsuranceTable.find((r) => grossAmount <= r.max);
    return row
      ? row.premium
      : fireInsuranceTable[fireInsuranceTable.length - 1].premium;
  };

  const calculate = () => {
    const grossAmount = parseFloat(gross);
    const term = parseInt(months);

    if (!grossAmount || term < 4 || term > 60) {
      setResult(null);
      return;
    }

    // Interest rate per month
    const monthlyInterestRate = getMonthlyInterestRate(term);

    // Deductions (NO advance 12% now)
    const ciFee = 1500;
    const rodFee = grossAmount * 0.03;
    const processingFee = grossAmount * 0.0075;
    const itFee = grossAmount * 0.0007 <= 50 ? 50 : grossAmount * 0.0007;
    const pnNotary = 100;
    const fireInsurance = getFireInsurance(grossAmount);

    const totalDeductions =
      ciFee +
      rodFee +
      processingFee +
      itFee +
      pnNotary +
      (includeFireInsurance ? fireInsurance : 0);

    const netProceeds = grossAmount - totalDeductions;

    // Monthly amortization
    const basePrincipal = grossAmount / term;
    const monthlyInterest = grossAmount * monthlyInterestRate;
    const fireAmort = includeFireInsurance ? fireInsurance / term : 0;

    const monthlyPayment = basePrincipal + monthlyInterest + fireAmort;

    // Amortization schedule
    let balance = grossAmount;
    const schedule = [];

    for (let i = 1; i <= term; i++) {
      const interest = grossAmount * monthlyInterestRate;
      const principal = monthlyPayment - interest - fireAmort;
      balance -= principal;
      if (balance < 0) balance = 0;

      schedule.push({
        month: i,
        amortization: monthlyPayment,
        interest,
        principal,
        insurance: fireAmort,
        balance,
        preterminationFee: balance * 0.03,
      });
    }

    setResult({
      breakdown: {
        "CI Fee": ciFee,
        "ROD Registration (3%)": rodFee,
        "Processing Fee (0.75%)": processingFee,
        "IT Fee": itFee,
        "PN Notary": pnNotary,
        ...(includeFireInsurance && { "Fire Insurance": fireInsurance }),
      },
      totalDeductions,
      netProceeds,
      monthlyPayment,
      schedule,
    });
  };

  useEffect(() => {
    calculate();
  }, [gross, months, includeFireInsurance]);

  return (
    <div className="flex flex-col items-center px-2 min-h-[260px] transition-all">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
        REM Loan Calculator (Add-on Scheme)
      </h2>

      <div className="flex flex-col items-center space-y-4 w-[200px] max-w-md ">
        <input
          type="text"
          placeholder="Gross Amount"
          value={gross}
          onChange={(e) => {
            const val = e.target.value;
            if (/^\d*$/.test(val)) setGross(val);
          }}
          className="w-[200px] border rounded-lg px-4 py-2"
        />

        <select
          value={months}
          onChange={(e) => setMonths(e.target.value)}
          className="w-[200px] border rounded-lg px-4 py-2"
        >
          <option value="">Select Term (Months)</option>
          {[...Array(57)].map((_, i) => (
            <option key={i + 4} value={i + 4}>
              {i + 4} months
            </option>
          ))}
        </select>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={includeFireInsurance}
            onChange={(e) => setIncludeFireInsurance(e.target.checked)}
          />
          <span>Include Fire Insurance</span>
        </label>
      </div>

      {result && (
        <div className="mt-6 space-y-4 w-full max-w-2xl">
          {/* Deduction Breakdown */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
            {/* <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Deduction Breakdown:
            </h3> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
              {/* {Object.entries(result.breakdown).map(([label, value]) => (
                <React.Fragment key={label}>
                  <span className="font-medium">{label}</span>
                  <span>₱{formatNumber(value)}</span>
                </React.Fragment>
              ))} */}
              {/* <span className="font-semibold">Total Deductions</span>
              <span className="font-semibold">
                ₱{formatNumber(result.totalDeductions)}
              </span> */}
              <span className="font-semibold">Net Proceeds</span>
              <span className="font-semibold text-green-700">
                ₱{formatNumber(result.netProceeds)}
              </span>
              <span className="font-semibold">Monthly Payment</span>
              <span className="font-semibold text-blue-700">
                ₱{formatNumber(result.monthlyPayment)}
              </span>
            </div>
          </div>

          {/* Amortization Table */}
          <div className="bg-white p-6 rounded-xl shadow-2xl z-30 border border-green-200 animate-fadeIn">
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
      )}
    </div>
  );
};

export default REMCalculatorNewForClient;
