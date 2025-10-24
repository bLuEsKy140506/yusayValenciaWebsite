import React, { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logo from "../../assets/logo2.png";

const defaultCharges = [
  { name: "Cost of Extension", amount: "0.00", fixed: true },
  { name: "Postage", amount: "" },
  { name: "Sheriff Fee", amount: "" },
  { name: "EJF & Publication fee", amount: "" },
  { name: "CGT", amount: "" },
  { name: "CGT, Documentary Stamp & CF", amount: "" },
  { name: "Transfer Tax & transfer of title", amount: "" },
  { name: "Land Tax", amount: "" },
  { name: "Transfer Tax (ROD)", amount: "" },
  { name: "Short of PDI", amount: "" },
  
];

const formatPeso = (raw) =>
  `₱${(Number(raw) || 0).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const parseNum = (v) => {
  const n = Number(String(v).replace(/,/g, ""));
  return isNaN(n) ? 0 : n;
};

export default function LongOverDueREMLumpsum() {
  const [account, setAccount] = useState({
    accountName: "",
    address: "",
    promissoryNo: "",
    originalLoan: "",
    outstandingPrincipal: "",
   
    numberMonthsToExtend: "0",
    maturityDate: "",
    cutOffDate: "",
    rateUnder: "PROMO RATE",
  });

  const [pdi, setPdi] = useState(null);
  const [overdueText, setOverdueText] = useState("");
  const [charges, setCharges] = useState(defaultCharges);
  const [totalPaid, setTotalPaid] = useState("");
  const [fullyPaid, setFullyPaid] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [pnList, setPnList] = useState([]);
  const printRef = useRef(null);

  /* =============================== 🧩 LOCAL STORAGE HANDLERS =============================== */
  const DB_KEY = "remlumpsum_db";
  const getDB = () => JSON.parse(localStorage.getItem(DB_KEY) || "{}");
  const saveDB = (data) => localStorage.setItem(DB_KEY, JSON.stringify(data));

  


  useEffect(() => {
    const db = getDB();
    setPnList(Object.keys(db));
  }, []);

  const handleSaveRecord = () => {
    if (!account.promissoryNo) {
      alert("Please enter a Promissory Note No.");
      return;
    }
    const db = getDB();
    db[account.promissoryNo] = { account, charges, totalPaid, fullyPaid };
    saveDB(db);
    setPnList(Object.keys(db));
    alert(`Record for PN# ${account.promissoryNo} saved.`);
  };

  const handleRetrieveRecord = (pn) => {
    const db = getDB();
    const record = db[pn];
    if (!record) {
      alert("Just change the PN number and complete the statement, then CLICK SAVE ");
      return;
    }
    setAccount(record.account);
    setCharges(record.charges);
    setTotalPaid(record.totalPaid);
    setFullyPaid(record.fullyPaid);
    alert(`Record for PN# ${pn} loaded.`);
  };

  const handleDeleteRecord = () => {
    if (!account.promissoryNo) return;
    const db = getDB();
    delete db[account.promissoryNo];
    saveDB(db);
    setPnList(Object.keys(db));
    alert(`Record for PN# ${account.promissoryNo} deleted.`);
  };

  /* =============================== ⏰ COMPUTATION LOGIC =============================== */
  useEffect(() => {
    const { maturityDate, cutOffDate } = account;
    if (!maturityDate || !cutOffDate) {
      setOverdueText("");
      return;
    }
    const start = new Date(maturityDate);
    const end = new Date(cutOffDate);
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();
    if (days < 0) {
      months--;
      days += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    setOverdueText(`${years}y ${months}m ${days}d`);
  }, [account.maturityDate, account.cutOffDate]);

  // ✅ Automatically compute PDI when cutoff date changes
useEffect(() => {
  const P = parseNum(account.outstandingPrincipal);
  if (!P || !account.maturityDate || !account.cutOffDate) {
    setPdi(0);
    return;
  }

  const start = new Date(account.maturityDate);
  const end = new Date(account.cutOffDate);
  const diffDays = Math.max(0, Math.floor((end - start) / (1000 * 60 * 60 * 24)));
  const computed = P * (12 / 365) * 0.05 * diffDays;
  setPdi(computed);
}, [account.cutOffDate, account.maturityDate, account.outstandingPrincipal]);


  /* =============================== 💸 CHARGES HANDLERS =============================== */
  const updateAccount = (field, value) =>
    setAccount((s) => ({ ...s, [field]: value }));

  const updateCharge = (i, field, value) => {
    if (field === "amount" && value && !/^\d*\.?\d*$/.test(value)) return; // only numeric input
    const updated = [...charges];
    updated[i][field] = value;
    setCharges(updated);
  };

  const addCharge = () => setCharges([...charges, { name: "", amount: "" }]);
  const removeCharge = (i) =>
   
  setCharges((s) => s.filter((item, idx) => idx !== i || item.fixed));
  

  // 🆕 Auto compute Cost of Extension
  useEffect(() => {
    const months = Number(account.numberMonthsToExtend);
    const balance = parseNum(account.outstandingPrincipal);
    const rates = { 1: 0.03, 2: 0.05, 3: 0.07, 4: 0.08, 5: 0.1, 6: 0.12 };
    const rate = rates[months] || 0;
    const cost = balance * rate;

    setCharges((prev) =>
      prev.map((c) =>
        c.name === "Cost of Extension"
          ? { ...c, amount: cost.toFixed(2) }
          : c
      )
    );
  }, [account.numberMonthsToExtend, account.outstandingPrincipal]);

  const extrasTotal = charges.reduce((s, it) => s + parseNum(it.amount), 0);
  const grandTotal = (pdi || 0) + extrasTotal;
  const paid = parseNum(totalPaid);
  const totalDue = grandTotal - paid;

  /* =============================== 📄 EXPORT TO PDF =============================== */
  const handleExportPDF = async () => {
    
    if (!printRef.current) return;
    const elements = printRef.current.querySelectorAll("*");
    elements.forEach((el) => {
      const style = getComputedStyle(el);
      if (style.color.includes("oklch")) el.style.color = "black";
      if (style.backgroundColor.includes("oklch"))
        el.style.backgroundColor = "white";
    });

    const canvas = await html2canvas(printRef.current, {
      scale: 1.1,
      useCORS: true,
    });
    const imgData = canvas.toDataURL("image/jpeg", 0.95);
    const pdf = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: [215.9, 330.2],
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const marginX = 10; // reduced side margin
    const marginY = 10;
    const imgWidth = pageWidth - marginX * 2;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const yPos = Math.max(marginY, (pageHeight - imgHeight) / 2);

    pdf.addImage(imgData, "JPEG", marginX, yPos, imgWidth, imgHeight);
    pdf.save(`SOA_${account.accountName.replace(/\s+/g, "_")}.pdf`);
  };

  /* =============================== 🖥️ RENDER UI =============================== */
  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="w-full max-w-4xl">
        {/* --- FORM INPUTS --- */}
        <div className="bg-white p-5 rounded shadow mb-6">
          <h3 className="text-lg font-bold text-green-800 mb-3">
            Statement Inputs
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Saved PN Dropdown */}
            <div>
              <label className="text-sm text-gray-600">Select Saved PN</label>
              <select
                className="w-full border p-2 rounded"
                value={account.promissoryNo}
                onChange={(e) => handleRetrieveRecord(e.target.value)}
              >
                <option value="">--Select or Make New Statement--</option>
                {pnList.map((pn) => (
                  <option key={pn} value={pn}>
                    {pn}
                  </option>
                ))}
              </select>
            </div>

            {/* Regular inputs */}
            {Object.entries({
              "Account Name": "accountName",
              Address: "address",
              "Promissory Note No.": "promissoryNo",
              "Original Loan Amount": "originalLoan",
              "Outstanding Principal": "outstandingPrincipal",
              "Rate Under": "rateUnder",
            }).map(([label, field]) => (
              <div key={field}>
                <label className="text-sm text-gray-600">{label}</label>
                <input
                  className="w-full border p-2 rounded"
                  placeholder={label}
                  value={account[field]}
                  onChange={(e) => updateAccount(field, e.target.value)}
                />
              </div>
            ))}

            {/* Months Dropdown */}
            <div>
              <label className="text-sm text-gray-600">
                Number of Months to Extend
              </label>
              <select
                className="w-full border p-2 rounded"
                value={account.numberMonthsToExtend}
                onChange={(e) =>
                  updateAccount("numberMonthsToExtend", e.target.value)
                }
              >
                {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "month" : "months"}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-600">Maturity Date</label>
              <input
                type="date"
                className="w-full border p-2 rounded"
                value={account.maturityDate}
                onChange={(e) =>
                  updateAccount("maturityDate", e.target.value)
                }
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Cut-Off Date</label>
              <input
                type="date"
                className="w-full border p-2 rounded"
                value={account.cutOffDate}
                onChange={(e) => updateAccount("cutOffDate", e.target.value)}
              />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
           
            <div className="ml-auto text-sm text-gray-600">
              {overdueText && <>⏰ Overdue: {overdueText}</>}
            </div>
          </div>

          {/* Save / Load / Delete */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={handleSaveRecord}
              className="bg-blue-600 text-white px-3 py-2 rounded"
            >
              💾 Save Record
            </button>
            <button
              onClick={handleDeleteRecord}
              className="bg-red-600 text-white px-3 py-2 rounded"
            >
              🗑️ Delete Record
            </button>
          
          </div>
        </div>

        {/* --- REST OF YOUR COMPONENT (Charges + Preview) --- */}
        {/* Keep your existing Charges and Preview section code here */}
        <div className="mt-6 bg-white p-5 rounded shadow space-y-4">
          <h4 className="font-semibold text-green-800">Edit Charges & Options</h4>

          {charges.map((it, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                className="flex-1 border p-2 rounded text-sm"
                value={it.name}
                onChange={(e) => updateCharge(idx, "name", e.target.value)}
                placeholder="Charge name"
              />
              <input
                className="w-32 border p-2 rounded text-right text-sm"
                value={it.amount}
                onChange={(e) => updateCharge(idx, "amount", e.target.value)}
                placeholder="0.00"
              />
              {it.fixed ? (
  <span className="text-gray-400 text-lg">✕</span>
) : (
  <button
    className="text-red-600 text-lg"
    onClick={() => removeCharge(idx)}
  >
    ✕
  </button>
)}
            </div>
          ))}

          <button
            onClick={addCharge}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
          >
            ➕ Add Charge
          </button>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div>
              <label className="text-sm">Total Payments Made</label>
              <input
                className="w-full border p-2 rounded"
                value={totalPaid}
                onChange={(e) => setTotalPaid(e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div className="flex items-end">
              <label className="mr-3 text-sm">Mark as Fully Paid</label>
              <input
                type="checkbox"
                checked={fullyPaid}
                onChange={() => setFullyPaid((v) => !v)}
              />
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setShowPreview((p) => !p)}
              className="bg-gray-700 text-white px-4 py-2 rounded"
            >
              {showPreview ? "Hide Preview" : "Show Preview"}
            </button>
            <button
  onClick={async () => {
    // Set preview to true first
    if (!showPreview) {
      setShowPreview(true);

      // Wait for React to render the preview
      await new Promise((resolve) => setTimeout(resolve, 300));
    }

    // Then export the PDF
    handleExportPDF();
  }}
  className="bg-indigo-600 text-white px-4 py-2 rounded"
>
  📄 Generate PDF
</button>
          </div>
        </div>

        {/* --- PREVIEW SECTION --- */}
        {showPreview && (
          <div
            id="pdf-container"
            ref={printRef}
            className="bg-white p-10 mt-6 text-[11px] leading-relaxed font-[Times_New_Roman]"
            style={{ width: "210mm", minHeight: "297mm", color: "#000" }}
          >
            {/* Header */}
            <div className="text-center">
              <img src={logo} alt="YCFC logo" style={{ width: 70, height: 70, margin: "0 auto" }} />
              <h1 className="text-[14px] font-bold mt-2">Yusay Credit & Finance Corporation</h1>
              <div>Since 1960</div>
              <div className="mt-1 text-[10px] tracking-wide">
                REAL ESTATE LOANS • CHATTEL MORTGAGE • PENSION LOANS
              </div>
            </div>

            <h2 className="text-center mt-6 text-[12px] font-bold underline">
              STATEMENT OF ACCOUNT
            </h2>
            <p className="text-center text-[10px] mt-1 italic">
              As of{" "}
              {account.cutOffDate
                ? new Date(account.cutOffDate).toLocaleDateString()
                : new Date().toLocaleDateString()}
            </p>

            {/* Account Info */}
            <div className="mt-6 grid grid-cols-2 gap-x-8">
              <div>
                <p><b>Account Name</b>: {account.accountName}</p>
                <p><b>Address</b>: {account.address}</p>
                <p><b>Promissory Note No.</b>: {account.promissoryNo}</p>
                <p><b>Original Loan Amount</b>: {formatPeso(account.originalLoan)}</p>
                <p><b>Outstanding Principal</b>: {formatPeso(account.outstandingPrincipal)}</p>
               
                <p><b>Number of Months to Extend</b>: {account.numberMonthsToExtend}</p>
                <p><b>Maturity Date</b>: {account.maturityDate || "-"}</p>
                <p><b>Cut-Off Date</b>: {account.cutOffDate || "-"}</p>
                <p><b>Rate Under</b>: {account.rateUnder}</p>
              </div>
            </div>

            {/* Outstanding Balance */}
            <div className="mt-6">
              <b>OUTSTANDING BALANCE</b>
              <div className="flex justify-between mt-1">
                <span></span>
                <span>{formatPeso(account.outstandingPrincipal)}</span>
              </div>
            </div>

            {/* PDI */}
            <div className="mt-4 ml-40">
              <div className="flex justify-between">
                <span>Past Due Interest: ( {overdueText || "—"} )</span>
                <span>{formatPeso(pdi || 0)}</span>
              </div>
              <div className="flex justify-between font-bold mt-1">
                <span>TOTAL PDI</span>
                <span>{formatPeso(pdi || 0)}</span>
              </div>
            </div>

            {/* Extra Charges */}
            <div className="mt-6 ml-40">
              <b>Add:</b>
              <div className="mt-1 space-y-0.5">
                {charges.map((it, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>{it.name}</span>
                    <span>{formatPeso(it.amount)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between font-bold border-t mt-1 pt-1">
                <span>Total Charges</span>
                <span>{formatPeso(extrasTotal)}</span>
              </div>
            </div>

            {/* Totals */}
            <div className="mt-6 border-t pt-2">
              <div className="flex justify-between font-bold text-[12px]">
                <span>Total Due</span>
                <span>{formatPeso(grandTotal)}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Less: Total Payments Made</span>
                <span>{formatPeso(paid)}</span>
              </div>
              <div className="flex justify-between font-bold border-t mt-2 pt-2 text-[12px] text-red-700">
                <span>Total Due:</span>
                <span>{formatPeso(totalDue)}</span>
              </div>
            </div>

            {fullyPaid && (
              <div className="mt-3 text-[10px]">
                Add {formatPeso(600)} for Release of Mortgage / Certificate of Redemption
              </div>
            )}

            {/* Signatures */}
            <div className="grid grid-cols-3 text-center mt-12">
              <div>
                <p>Prepared by:</p>
                <div className="mt-12 border-t border-black inline-block px-2">
                  HAZEL JOYCE C. GALVE
                </div>
                <p className="text-[9px]">Bookkeeper 2</p>
              </div>
              <div>
                <p>Verified by:</p>
                <div className="mt-12 border-t border-black inline-block px-2">
                  ROI C. VILLOTE
                </div>
                <p className="text-[9px]">Bookkeeper 1</p>
              </div>
              <div>
                <p>Noted by:</p>
                <div className="mt-12 border-t border-black inline-block px-2">
                  EARL LAURIECE S. BUTLAY
                </div>
                <p className="text-[9px]">Branch Head</p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-[9px] text-gray-600">
              Printed: {new Date().toLocaleString()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
