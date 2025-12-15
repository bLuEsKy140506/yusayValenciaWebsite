import { useState, useEffect, useRef } from "react";

export default function PLNewCalculator() {
  const [monthly, setMonthly] = useState("");
  const [months, setMonths] = useState(18);
  const [withReferral, setWithReferral] = useState(true);
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
    const serviceFee = 400;
    const rfpl = (gross / 1000) * 2.5 * monthsVal;
    const atmCharges = monthsVal * 15;
    const itFee = gross <= 100000 ? 50 : 0.0005*gross;
    const notarial = 200;
    // Referral Fee (optional)
    let referralFee = 0;
    if (withReferral) {
      if (gross < 50000) referralFee = 0;
      else if (gross >= 50000 && gross < 100000) referralFee = 500;
      else if (gross >= 100000) referralFee = 1000;
    }

    const totalDeductions =
      interest + serviceFee + rfpl + atmCharges + itFee + referralFee + notarial;

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
      notarial
    });
  }, [monthly, months, withReferral]);

   const printRef = useRef();

  const handlePrint = () => {
  const printContent = printRef.current.innerHTML;
  const originalContent = document.body.innerHTML;

  document.body.innerHTML = `
    <html>
      <head>
        <title>REM Loan Computation</title>
        <style>
          @page {
            size: A4;
            margin: 12mm;
          }

          body {
            font-family: Arial, sans-serif;
            font-size: 10px;
            color: #000;
          }

          h2, h3 {
            margin: 6px 0;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 9px;
          }

          th, td {
            border: 1px solid #000;
            padding: 3px;
            text-align: center;
          }

          .no-print {
            display: none;
          }

          .section {
            margin-bottom: 8px;
          }

          .avoid-break {
            page-break-inside: avoid;
          }
        </style>
      </head>
      <body>
        ${printContent}
      </body>
    </html>
  `;

  window.print();
  document.body.innerHTML = originalContent;
  window.location.reload();
};

  return (
    <div  className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl flex flex-col items-center space-y-4 min-h-[300px] transition-all">
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        PLNew Loan Calculator
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
            className="w-[250px] px-4 py-2 border rounded-lg focus:ring focus:ring-green-200"
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
            className="w-[250px] px-4 py-2 border rounded-lg focus:ring focus:ring-green-200"
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
            className="w-[250px] px-4 py-2 border rounded-lg focus:ring focus:ring-green-200"
            min="4"
            max="36"
          /> */}
        </div>

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
        <div ref={printRef} className="mt-6 p-4 bg-gray-50 border rounded-lg space-y-3">
          <h3 className="text-xl font-semibold text-gray-800">Results @ {monthly.toLocaleString()} - {months} mos. term</h3>

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
           <div className="bg-white p-6 rounded-xl shadow-2xl w-full z-30 border border-green-200 animate-fadeIn">
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
        <li>2 co-makers (1 if retirement), 2 valid IDs and 2x2 ID picture</li>
      </ul>
    </div>
        </div>
      )}
           <button
  onClick={handlePrint}
  className="no-print mb-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
>
  Print PL Computation
</button>
    </div>
  );
}
