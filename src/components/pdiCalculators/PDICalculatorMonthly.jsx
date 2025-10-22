import React, { useState, useEffect } from "react";

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

const PDICalculatorMonthly = () => {
  const [principal, setPrincipal] = useState("");
  const [hasFireInsurance, setHasFireInsurance] = useState(null);
  const [term, setTerm] = useState("");
  const [pastDue, setPastDue] = useState("");
  const [monthsPastDue, setMonthsPastDue] = useState("");
  const [alreadyPaid, setAlreadyPaid] = useState("");
  const [fireAmortization, setFireAmortization] = useState(0);
  const [pdiResult, setPdiResult] = useState(null);

  const getPremium = (amount) => {
    const amt = Number(amount) || 0;
    const found = fireInsuranceTable.find((row) => amt <= row.max);
    return found ? found.premium : fireInsuranceTable[fireInsuranceTable.length - 1].premium;
  };

  const computeFireAmortization = () => {
    if (!hasFireInsurance || !term) return 0;
    const premium = getPremium(principal);
    const years = Number(term);
    let months = 0;
    let totalYearsToCharge = years;

    if (years === 3) {
      months = 37;
      totalYearsToCharge = 4; // ✅ 3 years = 37 months = 4x premium
    } else if (years === 4) {
      months = 48;
      totalYearsToCharge = 4;
    } else if (years === 5) {
      months = 60;
      totalYearsToCharge = 5;
    }

    return ((premium * totalYearsToCharge) - premium) / months;
  };

  const handleComputePDI = () => {
    const pd = Number(pastDue) || 0;
    const mPast = Number(monthsPastDue) || 0;
    const paid = Number(alreadyPaid) || 0;
    let fiAmort = 0;
    let fiDeduction = 0;

    if (hasFireInsurance) {
      fiAmort = computeFireAmortization();
      fiDeduction = mPast * fiAmort;
    }

    const netPastDue = pd - fiDeduction;
    const pdi = netPastDue * 0.03;
    const totalPayment = netPastDue + pdi - paid;

    setFireAmortization(fiAmort);
    setPdiResult({ fiDeduction, netPastDue, pdi, totalPayment });
  };

  const reset = () => {
    setPrincipal("");
    setHasFireInsurance(null);
    setTerm("");
    setPastDue("");
    setMonthsPastDue("");
    setAlreadyPaid("");
    setFireAmortization(0);
    setPdiResult(null);
  };

  // 🧹 Clear fire insurance data when user switches to "No"
  useEffect(() => {
    if (hasFireInsurance === false) {
      setTerm("");
      setMonthsPastDue("");
      setFireAmortization(0);

      // If a result exists, recompute without fire insurance
      if (pdiResult) {
        const pd = Number(pastDue) || 0;
        const paid = Number(alreadyPaid) || 0;
        const netPastDue = pd;
        const pdi = netPastDue * 0.03;
        const totalPayment = netPastDue + pdi - paid;
        setPdiResult({ fiDeduction: 0, netPastDue, pdi, totalPayment });
      }
    }
  }, [hasFireInsurance]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 p-1">
      <h1 className="text-2xl font-bold text-green-700 mb-6 text-center">
        💰 Non-LL REM Monthly PDI Calculator
      </h1>

      {/* Input Fields */}
      <div className="space-y-3 w-full max-w-md">
        <input
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          placeholder="Principal Amount"
          className="w-full border rounded-md p-2"
        />

        <div>
          <label className="block text-sm font-medium mb-1">Has Fire Insurance?</label>
          <div className="flex gap-3">
            <button
              onClick={() => setHasFireInsurance(true)}
              className={`flex-1 py-2 rounded-md font-medium ${
                hasFireInsurance === true ? "bg-green-600 text-white" : "bg-gray-100"
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => setHasFireInsurance(false)}
              className={`flex-1 py-2 rounded-md font-medium ${
                hasFireInsurance === false ? "bg-green-600 text-white" : "bg-gray-100"
              }`}
            >
              No
            </button>
          </div>
        </div>

        {hasFireInsurance && (
          <>
            <select
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="w-full border rounded-md p-2"
            >
              <option value="">Select Term</option>
              <option value="3">3 years (37 months)</option>
              <option value="4">4 years (48 months)</option>
              <option value="5">5 years (60 months)</option>
            </select>

            <input
              type="number"
              value={monthsPastDue}
              onChange={(e) => setMonthsPastDue(e.target.value)}
              placeholder="Months Past Due (for Fire Insurance)"
              className="w-full border rounded-md p-2"
            />
          </>
        )}

        <input
          type="number"
          value={pastDue}
          onChange={(e) => setPastDue(e.target.value)}
          placeholder="Total Past Due Amount"
          className="w-full border rounded-md p-2"
        />

        <input
          type="number"
          value={alreadyPaid}
          onChange={(e) => setAlreadyPaid(e.target.value)}
          placeholder="Amount Paid on the past amount"
          className="w-full border rounded-md p-2"
        />

        <button
          onClick={handleComputePDI}
          className="w-full bg-green-600 text-white font-semibold py-2 rounded-md"
        >
          Compute PDI
        </button>
      </div>

      {/* Results Section */}
      {pdiResult && (
        <div className="mt-5 bg-green-50 p-4 rounded-lg text-sm text-gray-800 space-y-2 w-full max-w-md">
          {hasFireInsurance && (
            <>
              <p>
                <strong>Premium Used:</strong> ₱{getPremium(principal).toFixed(2)}
              </p>
              <p>
                <strong>Monthly Fire Insurance Amortization:</strong> ₱
                {fireAmortization.toFixed(2)}
              </p>
              <p>
                <strong>Fire Insurance Deduction:</strong> ₱
                {pdiResult.fiDeduction.toFixed(2)}
              </p>
            </>
          )}
          <p>
            <strong>Net Past Due:</strong> ₱{pdiResult.netPastDue.toFixed(2)}
          </p>
          <p>
            <strong>PDI (3%):</strong> ₱{pdiResult.pdi.toFixed(2)}
          </p>
          <p>
            <strong>Amount Already Paid:</strong> ₱{Number(alreadyPaid || 0).toFixed(2)}
          </p>
          <p className="text-green-700 font-semibold text-base pt-2 border-t border-green-200">
            Total Payment Due: ₱{pdiResult.totalPayment.toFixed(2)}
          </p>
          <button
            onClick={reset}
            className="mt-3 w-full bg-gray-200 py-2 rounded-md font-medium"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default PDICalculatorMonthly;
