import React, { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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

const REMCalculatorNew = () => {
  const [gross, setGross] = useState("");
  const [months, setMonths] = useState(24);
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

    const monthlyInterestRate = getMonthlyInterestRate(term);

    const ciFee = 1500;
    const rodFee = grossAmount * 0.03;
    const processingFee = grossAmount * 0.0075;
    const itFee = grossAmount * 0.0007 <= 50 ? 50 : grossAmount * 0.0007;
    const pnNotary = 200;
    const docStamp = 100;

    // UPDATED --- FIRE INSURANCE LOGIC
    const fireInsurancePremium = getFireInsurance(grossAmount);
    const insuranceYears = includeFireInsurance
      ? Math.ceil(term / 12)
      : 0;

    const fireInsuranceUpfront = includeFireInsurance
      ? fireInsurancePremium
      : 0;

    const remainingInsuranceYears =
      insuranceYears > 1 ? insuranceYears - 1 : 0;

    const fireAmort = includeFireInsurance
      ? (remainingInsuranceYears * fireInsurancePremium) / term
      : 0;
    // END UPDATED

    const totalDeductions =
      ciFee +
      rodFee +
      processingFee +
      itFee +
      pnNotary + docStamp +
      fireInsuranceUpfront; // UPDATED

    const netProceeds = grossAmount - totalDeductions;

    const basePrincipal = grossAmount / term;
    const monthlyInterest = grossAmount * monthlyInterestRate;

    const monthlyPayment = basePrincipal + monthlyInterest + fireAmort; // UPDATED

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
        "Doc stamp": docStamp,
        "PN Notary": pnNotary,
        ...(includeFireInsurance && {
          "Fire Insurance (1st Year)": fireInsuranceUpfront, // UPDATED
        }),
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
  const handleGeneratePDF = async () => {
    const element = printRef.current;
    if (!element) return;

    // 🔑 Save original styles
    const original = {
      overflow: element.style.overflow,
      maxHeight: element.style.maxHeight,
      height: element.style.height,
    };

    // 🔥 FORCE FULL CONTENT RENDER (MOBILE FIX)
    element.style.overflow = "visible";
    element.style.maxHeight = "none";
    element.style.height = "auto";

    const canvas = await html2canvas(element, {
      scale: window.devicePixelRatio > 1 ? 2 : 1.3,
      useCORS: true,
      backgroundColor: "#ffffff",
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,

      onclone: (clonedDoc) => {
        const root =
          clonedDoc.querySelector("[data-print-root]") || clonedDoc.body;

        // Remove scroll limits in clone too
        root.style.overflow = "visible";
        root.style.maxHeight = "none";
        root.style.height = "auto";

        // Safe colors (no oklch)
        root.querySelectorAll("*").forEach((el) => {
          el.style.color = "#000";
          el.style.backgroundColor = "#fff";
          el.style.borderColor = "#000";
          el.style.boxShadow = "none";
        });
      },
    });

    // 🔁 Restore original styles
    element.style.overflow = original.overflow;
    element.style.maxHeight = original.maxHeight;
    element.style.height = original.height;

    // 🧾 Create PDF
    const imgData = canvas.toDataURL("image/jpeg", 0.75);
    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = 210;
    const pageHeight = 297;
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // 🔥 MULTI-PAGE SUPPORT (CRITICAL FOR MOBILE)
    while (heightLeft > 0) {
      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      position -= pageHeight;
      if (heightLeft > 0) pdf.addPage();
    }

    pdf.save("Loan_Computation_Full.pdf");
  };

  return (
    <div className="flex flex-col items-center px-2 min-h-[260px] transition-all ">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
        REM Loan Calculator
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
        <div
          className="mt-6 space-y-4 w-full max-w-2xl section avoid-break"
          ref={printRef}
          data-print-root
        >
          {/* <h3>@ {gross} </h3> */}
          {/* Deduction Breakdown */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Deduction Breakdown: @ {formatNumber(gross)} - {months} mos. term
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
              {Object.entries(result.breakdown).map(([label, value]) => (
                <React.Fragment key={label}>
                  <span className="font-medium">{label}</span>
                  <span>₱{formatNumber(value)}</span>
                </React.Fragment>
              ))}
              <span className="font-semibold">Total Deductions</span>
              <span className="font-semibold">
                ₱{formatNumber(result.totalDeductions)}
              </span>
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
          <div className="overflow-x-auto border rounded-lg">
            <table className="min-w-[800px] border-collapse text-sm section avoid-break">
              <thead className="bg-teal-600 text-black sticky top-0">
                <tr>
                  <th className="px-4 py-2 border">Month</th>
                  <th className="px-4 py-2 border">Amortization</th>
                  <th className="px-4 py-2 border">Interest</th>
                  <th className="px-4 py-2 border">Principal</th>
                  <th className="px-4 py-2 border">Insurance</th>
                  <th className="px-4 py-2 border">Balance</th>
                  <th className="px-4 py-2 border">Pretermination Fee</th>
                </tr>
              </thead>
              <tbody>
                {result.schedule.map((row) => (
                  <tr key={row.month} className="text-center">
                    <td className="px-4 py-2 border">{row.month}</td>
                    <td className="px-4 py-2 border">
                      ₱{formatNumber(row.amortization)}
                    </td>
                    <td className="px-4 py-2 border">
                      ₱{formatNumber(row.interest)}
                    </td>
                    <td className="px-4 py-2 border">
                      ₱{formatNumber(row.principal)}
                    </td>
                    <td className="px-4 py-2 border">
                      ₱{formatNumber(row.insurance)}
                    </td>
                    <td className="px-4 py-2 border">
                      ₱{formatNumber(row.balance)}
                    </td>
                    <td className="px-4 py-2 border">
                      ₱{formatNumber(row.preterminationFee)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-white p-3 rounded-xl shadow-2xl z-30 border border-green-200 avoid-break pdf-strong-text">
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold text-green-800">
                REM Loan Requirements
              </h2>
            </div>

            {/* Content */}
            <ul className="text-sm text-black list-disc pl-4 space-y-1">
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
          <button
            onClick={handlePrint}
            className="no-print mb-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Print REM Computation
          </button>
          <button
            onClick={handleGeneratePDF}
            className="no-print mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Generate PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default REMCalculatorNew;
