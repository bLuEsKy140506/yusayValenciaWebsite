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

const REMCalculatorNew = () => {
  const [gross, setGross] = useState("");
  const [months, setMonths] = useState("");
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

    if (!grossAmount || ![37, 48, 60].includes(term)) {
      setResult(null);
      return;
    }

    // Deductions
    const deduction12Percent = grossAmount * 0.12;
    const ciFee = 1500;
    const rodFee = grossAmount * 0.03;
    const processingFee = grossAmount * 0.0075;
    const itFee = grossAmount <= 100000 ? 50 : 0.0005 * grossAmount;
    const pnNotary = 100;
    const fireInsurance = getFireInsurance(grossAmount);

    const totalDeductions =
      deduction12Percent +
      ciFee +
      rodFee +
      processingFee +
      itFee +
      pnNotary +
      (includeFireInsurance ? fireInsurance : 0);

    const netProceeds = grossAmount - totalDeductions;

    // Monthly Payment
    const baseAmort = grossAmount / term;
    const interestAmort = (grossAmount * ((term - 12) / term)) * 0.01;
    const fireMultiplier = term === 37 ? 3 : term === 48 ? 3 : 4;
    const fireAmort = includeFireInsurance
      ? (fireInsurance * fireMultiplier) / term
      : 0;

    const monthlyPayment = baseAmort + interestAmort + fireAmort;

    // Amortization Schedule
    let balance = grossAmount;
    const sched = [];
    for (let i = 1; i <= term; i++) {
      const interest = interestAmort; // simplified 1%/month model
      const principal = monthlyPayment - interest - fireAmort;
      balance -= principal;
      if (balance < 0) balance = 0;

      sched.push({
        month: i,
        amortization: monthlyPayment,
        interest,
        principal,
        insurance: fireAmort,
        balance,
        preterminationFee: balance * 0.03, // ✅ 3% of balance
      });
    }

    setResult({
      breakdown: {
        "12% Deduction": deduction12Percent,
        "CI Fee": ciFee,
        "ROD Registration (3%)": rodFee,
        "Processing Fee (0.75%)": processingFee,
        "IT Fee (₱50/100k)": itFee,
        "PN Notary": pnNotary,
        ...(includeFireInsurance && { "Fire Insurance": fireInsurance }),
      },
      totalDeductions,
      netProceeds,
      monthlyPayment,
      schedule: sched,
    });
  };

  // Auto-recompute when inputs change
  useEffect(() => {
    calculate();
  }, [gross, months, includeFireInsurance]);

  return (
    <div className="flex flex-col items-center px-2 min-h-[260px] transition-all">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
        REM Loan Calculator (New Scheme)
      </h2>

      <div className="flex flex-col items-center space-y-4 w-[200px] max-w-md ">
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

        <select
          value={months}
          onChange={(e) => setMonths(e.target.value)}
          className="w-[200px] border rounded-lg px-4 py-2"
        >
          <option value="">Select Term (Months)</option>
          <option value="37">37 months (3 years)</option>
          <option value="48">48 months (4 years)</option>
          <option value="60">60 months (5 years)</option>
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
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Deduction Breakdown:
            </h3>
            {/* ✅ Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
              {Object.entries(result.breakdown).map(([label, value]) => (
                <React.Fragment key={label}>
                  <span className="font-medium">{label}</span>
                  <span>₱{formatNumber(value)}</span>
                </React.Fragment>
              ))}
              <span className="font-semibold">Total Deductions</span>
              <span className="font-semibold">₱{formatNumber(result.totalDeductions)}</span>
              <span className="font-semibold">Net Proceeds</span>
              <span className="font-semibold text-green-700">₱{formatNumber(result.netProceeds)}</span>
              <span className="font-semibold">Monthly Payment</span>
              <span className="font-semibold text-blue-700">₱{formatNumber(result.monthlyPayment)}</span>
            </div>
          </div>
               <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={includeFireInsurance}
            onChange={(e) => setIncludeFireInsurance(e.target.checked)}
          />
          <span>Include Fire Insurance</span>
        </label>

          {/* Amortization Table */}
          <div className="overflow-x-auto max-h-[500px] overflow-y-scroll border rounded-lg">
            <table className="min-w-[800px] border-collapse text-sm">
              <thead className="bg-blue-600 text-white sticky top-0">
                <tr>
                  <th className="px-4 py-2 border">Month</th>
                  <th className="px-4 py-2 border">Amortization</th>
                  <th className="px-4 py-2 border">Interest</th>
                  <th className="px-4 py-2 border">Principal</th>
                  <th className="px-4 py-2 border">Insurance</th>
                  <th className="px-4 py-2 border">Balance</th>
                  <th className="px-4 py-2 border">Pretermination Fee (3%)</th>
                </tr>
              </thead>
              <tbody>
                {result.schedule.map((row) => (
                  <tr key={row.month} className="text-center">
                    <td className="px-4 py-2 border">{row.month}</td>
                    <td className="px-4 py-2 border">₱{formatNumber(row.amortization)}</td>
                    <td className="px-4 py-2 border">₱{formatNumber(row.interest)}</td>
                    <td className="px-4 py-2 border">₱{formatNumber(row.principal)}</td>
                    <td className="px-4 py-2 border">₱{formatNumber(row.insurance)}</td>
                    <td className="px-4 py-2 border">₱{formatNumber(row.balance)}</td>
                    <td className="px-4 py-2 border">₱{formatNumber(row.preterminationFee)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default REMCalculatorNew;
