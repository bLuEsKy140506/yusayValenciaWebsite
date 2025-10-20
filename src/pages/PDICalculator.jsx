import React, { useState, useEffect } from "react";

const PDICalculator = () => {
  const [mode, setMode] = useState("funds"); // 'funds' or 'percent'
  const [formData, setFormData] = useState({
    principal: "",
    maturityDate: "",
    paymentDate: "",
    availableFunds: "",
    percent: "",
  });

  const [pdi, setPdi] = useState(null);
  const [results, setResults] = useState([]);
  const [bestOption, setBestOption] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // --- STEP 1: Compute PDI ---
  const handleComputePDI = (e) => {
    e.preventDefault();
    const { principal, maturityDate, paymentDate } = formData;
    const P = parseFloat(principal);

    if (!P || !maturityDate || !paymentDate) {
      alert("Please fill in the principal, maturity date, and payment date.");
      return;
    }

    const mDate = new Date(maturityDate);
    const pDate = new Date(paymentDate);
    const diffDays = Math.max(0, (pDate - mDate) / (1000 * 60 * 60 * 24));

    // 5% annual rate × 12 months ÷ 365 days
    const computedPDI = P * (12 / 365) * 0.05 * diffDays;
    setPdi(computedPDI);
    alert("✅ PDI has been computed. Proceed with the next step.");
  };

  // --- Extension options ---
  const extensions = [
    { months: 1, percent: 0.03 },
    { months: 2, percent: 0.05 },
    { months: 3, percent: 0.07 },
    { months: 4, percent: 0.08 },
    { months: 5, percent: 0.1 },
    { months: 6, percent: 0.12 },
  ];

  // --- MODE 1: Available Funds Mode (auto compute when funds change) ---
  useEffect(() => {
    if (mode !== "funds") return;

    const { principal, availableFunds } = formData;
    const P = parseFloat(principal);
    const X = parseFloat(availableFunds);

    if (!pdi || !P || !X || X <= 0) {
      setResults([]);
      return;
    }

    const validExtensions = extensions.filter((opt) => P * opt.percent + pdi < X);

    const computedOptions = [];

    validExtensions.forEach((opt) => {
      let base = P * opt.percent;
      let bestMatch = null;
      let smallestDiff = Infinity;

      // Increment base by ₱1 until total nearly equals available funds
      while (base < X) {
        const remaining = P - base;
        const interest = remaining * opt.percent;
        const total = base + interest + pdi;
        const diff = X - total;

        if (diff >= 0 && diff < smallestDiff) {
          smallestDiff = diff;
          bestMatch = { ...opt, base, remaining, interest, total, diff };
        }

        if (total >= X) break;
        base += 1;
      }

      if (bestMatch) computedOptions.push(bestMatch);
    });

    setResults(computedOptions);
  }, [formData.availableFunds, pdi, formData.principal, mode]);

  // --- MODE 2: Percent Mode (manual compute) ---
  const handleComputeByPercent = (e) => {
    e.preventDefault();
    if (mode !== "percent") return;

    const { principal, percent } = formData;
    const P = parseFloat(principal);
    const downPercent = parseFloat(percent) / 100;

    if (!P || !downPercent || !pdi) {
      alert("Please enter valid principal, percent, and compute PDI first.");
      return;
    }

    const resultsArray = extensions.map((opt) => {
      const base = P * downPercent;
      const remaining = P - base;
      const interest = remaining * opt.percent;
      const total = base + interest + pdi;
      return { ...opt, base, remaining, interest, total };
    });

    setResults(resultsArray);
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-xl">
        <h1 className="text-2xl font-bold text-green-700 mb-6 text-center">
          💰non-LL REM Lumpsum< br></br> PDI + Payment Option Calculator
        </h1>

        {/* Toggle Mode */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setMode("funds")}
            className={`px-4 py-2 rounded-lg font-semibold ${
              mode === "funds"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Available Funds Mode
          </button>
          <button
            onClick={() => setMode("percent")}
            className={`px-4 py-2 rounded-lg font-semibold ${
              mode === "percent"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Percent Mode
          </button>
        </div>

        {/* --- STEP 1: PDI FORM --- */}
        <form onSubmit={handleComputePDI} className="space-y-4">
          <input
            type="number"
            name="principal"
            placeholder="Principal Amount"
            value={formData.principal}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            required
          />

          <input
            type="date"
            name="maturityDate"
            value={formData.maturityDate}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            required
          />

          <input
            type="date"
            name="paymentDate"
            value={formData.paymentDate}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-medium"
          >
            Compute PDI
          </button>
        </form>

        {/* --- Display Computed PDI --- */}
        {pdi !== null && (
          <div className="mt-6 text-center">
            <h2 className="text-lg font-semibold text-gray-800">Computed PDI:</h2>
            <p className="text-2xl font-bold text-green-700">
              ₱ {pdi.toFixed(2)}
            </p>
          </div>
        )}

        {/* --- STEP 2: Conditional Inputs --- */}
        {mode === "funds" ? (
          <div className="mt-6 space-y-4">
            <input
              type="number"
              name="availableFunds"
              placeholder="Available Funds"
              value={formData.availableFunds}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              disabled={!pdi}
            />
            {!pdi && (
              <p className="text-sm text-gray-500 text-center">
                💡 Compute PDI first to unlock this step.
              </p>
            )}
          </div>
        ) : (
          <form onSubmit={handleComputeByPercent} className="mt-6 space-y-4">
            <input
              type="number"
              name="percent"
              placeholder="Downpayment %"
              value={formData.percent}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              disabled={!pdi}
            />
            <button
              type="submit"
              disabled={!pdi}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-medium"
            >
              Compute Percent Options
            </button>
          </form>
        )}

        {/* --- STEP 3: Results Table --- */}
        {results.length > 0 && (
          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-sm border border-gray-200">
              <thead className="bg-green-100">
                <tr>
                  <th className="p-2">Months Extn</th>
                  <th className="p-2">% Rate</th>
                  <th className="p-2">Base</th>
                  <th className="p-2">Interest</th>
                  <th className="p-2">PDI</th>
                  <th className="p-2">Total + PDI</th>
                  <th className="p-2">Remaining</th>
                  {mode === "funds" && <th className="p-2">Unspent</th>}
                </tr>
              </thead>
              <tbody>
                {results.map((opt, i) => (
                  <tr
                    key={i}
                    className={`text-center ${
                      opt.diff <= (formData.availableFunds || 0) * 0.01
                        ? "bg-green-50 font-semibold"
                        : ""
                    }`}
                  >
                    <td className="p-2">{opt.months}</td>
                    <td className="p-2">{(opt.percent * 100).toFixed(1)}%</td>
                    <td className="p-2">₱{opt.base.toFixed(2)}</td>
                    
                    <td className="p-2">₱{opt.interest.toFixed(2)}</td>
                    <td className="p-2">₱{pdi.toFixed(2)}</td>
                    <td className="p-2 text-green-700">
                      ₱{opt.total.toFixed(2)}
                    </td>
                    <td className="p-2">₱{opt.remaining.toFixed(2)}</td>
                    {mode === "funds" && (
                      <td className="p-2 text-gray-600">
                        ₱{opt.diff.toFixed(2)}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default PDICalculator;
