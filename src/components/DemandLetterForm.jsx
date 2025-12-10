import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logo from "../assets/logo2.png";
import legalHeader from "../assets/legalHeader.png";
import { numberToWords } from "../utils/numberToWords";
import { supabase } from "../supabaseClient";

// ---- Local Storage Helpers ----
const saveToLocalStorage = (pn, data) => {
  if (!pn) return;

  const filtered = {};
  allowedFields.forEach((key) => {
    if (data[key] !== undefined) filtered[key] = data[key];
  });

  localStorage.setItem(`demand_letter_${pn}`, JSON.stringify(filtered));
};


const loadFromLocalStorage = (pn) => {
  if (!pn) return null;

  const saved = localStorage.getItem(`demand_letter_${pn}`);
  if (!saved) return null;

  const parsed = JSON.parse(saved);

  // ensure we return only allowed fields
  const filtered = {};
  allowedFields.forEach((key) => {
    if (parsed[key] !== undefined) filtered[key] = parsed[key];
  });

  return filtered;
};


const allowedFields = [
  
  "letterType",
  "remPn",
    "firstName",
    "middleInitial",
    "lastName",
    "streetName",
    "barangayName",
    "municipalityName",
    "provinceName",
    "zipcode",
    "lastMonthlyDue",
    "amountFigure",
    "paymentLastPaidOn",
    "dateGranted",
    "originalAmountLoan",
    "originalMaturityDate",
    // added fields for final reminder & final notice dynamic data:
    "firstReminderDate",
    "secondReminderDate",
    // [{ title: "", description: "" }, ...]
  // add more only if they are user inputs
];



const saveToDatabase = async (formData) => {
  
  const payload = {
    letter_type: formData.letterType,
    first_name: formData.firstName,
    middle_initial: formData.middleInitial,
    last_name: formData.lastName,
    rem_pn: formData.remPn,
    street_name: formData.streetName,
    barangay_name: formData.barangayName,
    municipality_name: formData.municipalityName,
    province_name: formData.provinceName,
    zipcode: formData.zipcode,

    amount: formData.amountFigure ?? null,
    amount_in_words: formData.amountInWords ?? null,

    last_monthly_due: formData.lastMonthlyDue || null,
    last_payment_on: formData.lastPaymentOn || null,
    date_granted: formData.dateGranted || null,
    maturity_date: formData.maturityDate || null,

    original_amount: formData.originalAmountLoan || null,
    original_amount_words: formData.amountInWordsOriginal || null,

    first_notice: formData.firstNoticeDate || null,
    second_notice: formData.secondNoticeDate || null,

title_name_1: formData.collaterals?.[0]?.title || "N/A",
title_name_2: formData.collaterals?.[1]?.title || "N/A",
title_name_3: formData.collaterals?.[2]?.title || "N/A",

title_description_1: formData.collaterals?.[0]?.description || "N/A",
title_description_2: formData.collaterals?.[1]?.description || "N/A",
title_description_3: formData.collaterals?.[2]?.description || "N/A",

  };

  const { error } = await supabase
    .from("demand_letters")
    .insert(payload);

  if (error) {
    console.error("Supabase Insert Error:", error);
  }
};




const formatFullDate = (date) => {
  if (!date) return "";
  const validDate = new Date(date);
  if (isNaN(validDate.getTime())) return "";
  return validDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

// -------- DemandLetterForm --------
const DemandLetterForm = ({ form, setForm, onGenerate }) => {

  // Auto-load when REM PN changes
const handlePnChangeLoad = (pn) => {
  const existing = loadFromLocalStorage(pn);
  if (existing) {
    setForm((prev) => ({
      ...prev,
      ...existing,   // overwrite with saved data
    }));
  }
};


const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "remPn") {
    handlePnChangeLoad(value); // ⬅ NEW
  }

  setForm((prev) => ({ ...prev, [name]: value }));
};


  // --- Dynamic collateral (Final Notice) ---
  const handleCollateralChange = (index, field, value) => {
    const updated = (form.collaterals || []).map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setForm((prev) => ({ ...prev, collaterals: updated }));
  };

  const addCollateral = () => {
    setForm((prev) => ({
      ...prev,
      collaterals: [...(prev.collaterals || []), { title: "", description: "" }],
    }));
  };

  const removeCollateral = (index) => {
    const updated = (form.collaterals || []).filter((_, i) => i !== index);
    setForm((prev) => ({ ...prev, collaterals: updated }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(form); // Let parent handle amountInWords logic
  };

  // --- Determine visible fields dynamically ---
  const visibleFields = Object.keys(form).filter((key) => {
    if (key === "letterType" || key === "collaterals") return false;

    // default behavior for most letter types: show all except conditional ones
    const defaultShow = ![
      "paymentLastPaidOn",
      "dateGranted",
      "originalAmountLoan",
      "originalMaturityDate",
      "firstReminderDate",
      "secondReminderDate",
    ].includes(key);

    switch (form.letterType) {
      case "Partial Payment Reminder":
        return (
          key !== "dateGranted" &&
          key !== "originalAmountLoan" &&
          key !== "originalMaturityDate" &&
          key !== "firstReminderDate" &&
          key !== "secondReminderDate"
        );
      case "Legal Demand":
        return (
          key !== "firstReminderDate" &&
          key !== "secondReminderDate" && key !== "paymentLastPaidOn" && 
          (key === "dateGranted" ||
            key === "originalAmountLoan" ||
            key === "originalMaturityDate" ||
            (key !== "lastMonthlyDue" &&
              !["dateGranted", "originalAmountLoan", "originalMaturityDate"].includes(key)))
        );
      case "Final Reminder":
        // same as default (1st Reminder) but explicitly include the two reminder dates
        return (
          defaultShow ||
          key === "firstReminderDate" ||
          key === "secondReminderDate"
        );
      case "Final Notice":
        return (
          key !== "paymentLastPaidOn" &&
          key !== "dateGranted" &&
          key !== "originalAmountLoan" &&
          key !== "originalMaturityDate" &&
          key !== "firstReminderDate" &&
          key !== "secondReminderDate"
        );
      default:
        return defaultShow;
    }
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-lg space-y-3"
    >
      <h2 className="text-center text-xl font-semibold mb-4 text-green-700">
        Demand Letter Generator
      </h2>

      {/* Letter Type Selector */}
      <div>
        <label className="block text-sm font-medium mb-1">Letter Type</label>
        <select
          name="letterType"
          value={form.letterType}
          onChange={handleChange}
          className="border w-full p-2 rounded-md focus:outline-green-600"
        >
          <option>1st Reminder</option>
          <option>2nd Reminder</option>
          <option>Partial Payment Reminder</option>
          <option>Legal Demand</option>
          <option>Final Reminder</option>
          <option>Final Notice</option>
        </select>
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleFields.map((key) => (
          <div key={key}>
            <label className="block text-sm font-medium capitalize mb-1">
              {key.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type={
                key === "amountFigure" || key === "originalAmountLoan"
                  ? "number"
                  : [
                      "paymentLastPaidOn",
                      "dateGranted",
                      "originalMaturityDate",
                      "lastMonthlyDue",
                      "firstReminderDate",
                      "secondReminderDate",
                    ].includes(key)
                  ? "date"
                  : "text"
              }
              name={key}
              value={form[key]}
              onChange={handleChange}
              required
              className="border w-full p-2 rounded-md focus:outline-green-600"
            />
          </div>
        ))}
      </div>

      {/* Dynamic Collateral Fields for Final Notice */}
      {form.letterType === "Final Notice" && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-green-700">
            Collateral Information
          </h3>
          {(form.collaterals || []).map((collateral, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2 border p-3 rounded-md"
            >
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={collateral.title}
                  onChange={(e) =>
                    handleCollateralChange(index, "title", e.target.value)
                  }
                  className="border w-full p-2 rounded-md focus:outline-green-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
               <textarea
  value={collateral.description}
  onChange={(e) =>
    handleCollateralChange(index, "description", e.target.value)
  }
  className="border w-full p-2 rounded-md focus:outline-green-600"
  rows={3}
/>
              </div>
              <div className="col-span-full text-right">
                <button
                  type="button"
                  onClick={() => removeCollateral(index)}
                  className="text-red-600 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addCollateral}
            className="bg-green-700 text-white px-3 py-1 rounded-md mt-2"
          >
            + Add Collateral
          </button>
        </div>
      )}

      <button
        type="submit"
        className="bg-green-700 border-2 border-solid border-green-500 hover:bg-green-800 text-gray-100 px-4 py-2 rounded-lg w-full mt-4"
      >
        Generate Letter
      </button>
    </form>
  );
};

// -------- Letter Templates --------
const getLetterContent = (
  type,
  data,
  todayStr,
  lastPaymentOn,
  dateGranted,
  originalMaturityDate,
  formattedAmount,
  formattedAmountOrig
) => {
  switch (type) {
    
    case "1st Reminder":
      console.log(data.amountInWords);
      return (
        <>
          <p>
            Our records indicate that your account with us under{" "}
            <strong>REM PN NO. {data.remPn}</strong> has matured on{" "}
            <strong>{formatFullDate(data.lastMonthlyDue)}</strong>. We hope this was just an
            oversight on your part and that you will be able to pay the same
            within three (3) days from receipt hereof. As of{" "}
            <strong>{todayStr}</strong>, your current overdue balance is{" "}
            <strong>{data.amountInWords}</strong> (
            <strong>₱{formattedAmount}</strong>) exclusive of penalties and past
            due interest.
          </p>
          <br />
          <p>
            Please treat this matter with urgency. Thank you for your attention.
          </p>
          <br />
          <div className="page-break" style={{ pageBreakBefore: "always" }}></div>

          <p>Very truly yours,</p>
        </>
      );

    case "2nd Reminder":
      return (
        <>
          <p>
            A review of our records indicates that your REM loan with{" "}
            <strong>PN No. {data.remPn}</strong> had matured on{" "}
            {data.lastMonthlyDue}. Your credit reputation is a valuable asset.
            We want you to keep it that way. As of <strong>{todayStr}</strong>,
            your overdue balance is <strong>{data.amountInWords}</strong> (
            <strong>₱{formattedAmount}</strong>) exclusive of interest and
            penalties.
          </p>
          <br />
          <ul style={{ marginLeft: "1.25rem", lineHeight: 1.6 }}>
            <li>👉 Save on accumulating penalty charges.</li>
            <li>👉 Avoid tarnishing your credit reputation.</li>
            <li>
              👉 Avoid extraordinary charges if referred to our attorney for
              collection.
            </li>
          </ul>
          <br />
          <p>Thank you for your prompt attention.</p>
          <br></br>
          <br />
          <p>Very truly yours,</p>
        </>
      );

    case "Partial Payment Reminder":
      return (
        <>
          <p>
            Thank you for your payment last {lastPaymentOn}, however, said
            payment was not sufficient to lodge your account to current status
            as you still have an overdue balance of{" "}
            <strong>₱{formattedAmount}</strong>. Kindly be reminded that your
            maturity date is on <strong>{formatFullDate(data.lastMonthlyDue)}</strong> under PN
            REM-{data.remPn}. There will be a 5% penalty if you are unable to
            fully pay the loan on time.
          </p>
          <br />
          <p>
            Please update your account soon to avoid inconvenience. Thank you
            for your attention.
          </p>
          <br />
          <br />
          <p>Very truly yours,</p>
        </>
      );

    case "Legal Demand":
      return (
        <>
          <p>
            YUSAY CREDIT & FINANCE CORPORATION, which we represent as counsel,
            has referred to us your obligation for collection.
          </p>
          <br />
          <p>
            According to our client’s records, you obtained a loan under PN No.
            REM-{data.remPn} in the amount of{" "}
            <strong>{data.amountInWordsOriginal}</strong> (
            <strong>₱{formattedAmountOrig}</strong>), granted on{" "}
            <strong>{dateGranted}</strong> and matured on{" "}
            <strong>{originalMaturityDate}</strong>.
          </p>
          <br />
          <p>
            As of {todayStr}, your outstanding balance is ₱
            <strong>{formattedAmount}</strong>, exclusive of penalties and other
            charges.
          </p>
          <br />
          <p>
            Kindly pay your account within seven (7) working days from receipt
            of this demand, otherwise legal action will be taken.
          </p>
           <br />
          <p>Very truly yours,</p>
          <br />
          <p>TANCINCO LAW OFFICE<br />Counsel for YCFC</p>
          <br />
          <p>
            By: <br />
            <strong>ATTY. CECILIO CHITO R. TANCINCO</strong>
          </p>
          <br />
          <p>At my instance:</p>
        </>
      );

    case "Final Reminder":
      {
        const firstRem = data.firstReminderDate ? formatFullDate(data.firstReminderDate) : "";
        const secondRem = data.secondReminderDate ? formatFullDate(data.secondReminderDate) : "";
        const both = [firstRem, secondRem].filter(Boolean).join(" | ");

        return (
          <>
            <p>
             Our records indicate that we have sent you two (2) previous reminders dated <strong>{firstRem}</strong> and <strong>{secondRem}</strong>, reminding you of your unpaid obligation, wherein as of this date amounted to <strong>{data.amountInWords} (₱{formattedAmount})</strong>.
            </p>
            <br />
            <p>
              This is a final reminder for you to pay your account within seven (7) days from receipt hereto, to avoid referral to our legal counsel for the appropriate legal actions. 
            </p>
            <br />
            <p>Your preferential action regarding the matter would be most appreciated. Thank you very much.</p>
            <br />
            <br />
            <p>Very truly yours,</p>
          </>
        );
      }

    case "Final Notice":
      return (
        <>
          <p>
            Please take notice that since the conditions of that certain Real Estate Mortgage executed by you, as Mortgagor, in favor of  Yusay Credit & Finance Corporation, Valencia City, as Mortgagee,  as  security  for  the  payment  of  REM  LOAN  had  been  violated since  {formatFullDate(data.lastMonthlyDue)} by your failure to make payment of the Principal and interests, the undersigned will cause the foreclosure of the property thereby mortgage, to wit:
          </p>

          {/* If collaterals exist (non-empty), output them as numbered list */}
          {data.collaterals &&
            data.collaterals.filter(c => (c.title && c.title.trim()) || (c.description && c.description.trim())).length > 0 && (
              <>
                <br />
               
                <ol style={{ marginLeft: "1.25rem", lineHeight: 1.6, }}>
                  {data.collaterals
                    .filter(c => (c.title && c.title.trim()) || (c.description && c.description.trim()))
                    .map((c, i) => (
                      <li key={i} style={{ marginBottom: 6, textAlign: "center" } }>
                        <strong>{c.title && c.title.trim() ? c.title : `Collateral ${i + 1}`}</strong>
                        <br />
                        {c.description && c.description.trim() ? <p>${c.description}</p> : ""}
                      </li>
                    ))}
                </ol>
              </>
            )}

          
         
        </>
      );

    default:
      return null;
  }
};

// -------- LetterPreview --------
const LetterPreview = React.forwardRef(({ data }, ref) => {
  if (!data) return null;

  const today = new Date();
  const todayStr = formatFullDate(today);
  const lastPaymentOn = data.paymentLastPaidOn
    ? formatFullDate(data.paymentLastPaidOn)
    : "";
  const dateGranted = data.dateGranted ? formatFullDate(data.dateGranted) : "";
  const originalMaturityDate = data.originalMaturityDate
    ? formatFullDate(data.originalMaturityDate)
    : "";

  const formattedAmount = parseFloat(data.amountFigure || 0).toLocaleString(
    "en-PH",
    { minimumFractionDigits: 2, maximumFractionDigits: 2 }
  );
  const formattedAmountOrig = parseFloat(
    data.originalAmountLoan || 0
  ).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const letterBody = getLetterContent(
    data.letterType,
    data,
    todayStr,
    lastPaymentOn,
    dateGranted,
    originalMaturityDate,
    formattedAmount,
    formattedAmountOrig
  );

  return (
    <div ref={ref} className="letter-a4" style={{ paddingTop: "40px" }}>
      <div className="letter-header">
        {data.letterType === "Legal Demand" ? (
          <img
            src={legalHeader}
            alt="Tancinco Law Header"
            style={{ width: "40%", height: "auto" }}
          />
        ) : (
          <img src={logo} alt="YCFC Logo" style={{ width: 90, height: 90 }} />
        )}
      </div>

      <div style={{ fontSize: 14, marginBottom: 10 }}>{todayStr}</div>
      <br />

      <div style={{ fontSize: 14, lineHeight: 1.5 }}>
        Ms/Mr <strong>{data.firstName} {data.middleInitial}. {data.lastName}</strong>
        <br />
        <strong>{data.streetName}</strong> <strong>{data.barangayName}</strong>
        <br />
        <strong>{data.municipalityName}</strong>, <strong>{data.provinceName}</strong>
        <br />
        {data.zipcode}
      </div>

      <div
        className="reminder-title"
        style={{
          textAlign: "center",
          fontWeight: "bold",
          textDecoration: "underline",
          margin: "10px 0",
        }}
      >
        {data.letterType.toUpperCase()}
      </div>

      <div className="letter-body" style={{ fontSize: 14 }}>
        <br />
         {data.letterType === "Final Notice" ? <p><strong>PN# REM-{data.remPn}</strong></p> : ""}
         <br />
        <p>
          Dear Mr/Ms. <strong>{data.lastName}</strong>,
        </p>
        <br />
        {(data.letterType === "Legal Demand" || data.letterType === "Final Notice") ?  "" : <p><strong>Greetings!</strong></p>}
       
        <br />
        {letterBody}
        <br />
         {data.letterType === "Final Notice" ?  
         <div>
          <p>Then to be sold by the Sheriff of  Malaybalay City, Bukidnon, at Public Auction to the highest bidder, for cash, on the day and at the hour to be fixed by the Sheriff, and at such place that may be designated by him, the exact day, hour and place of the sale you shall be notified later by  the  Sheriff,  to  satisfy  our claim which as of {formatFullDate(data.lastMonthlyDue)} amounted to (₱{formattedAmount}) exclusive of interests, costs, Attorney`s fees and expenses of foreclosure and sale.</p>
          <br />
          <br />
          <div className="w-full font-serif text-[12px] leading-tight">
            {/* Right-aligned attorney info block */}
  <div className="block text-right mb-8 leading-snug">
    <div className="font-semibold">ATTY. CECILIO CHITO R. TANCINCO</div>
    <div>Counsel for Petitioner</div>
  </div>

  {/* Left paragraph block */}
  <div className="block text-left mb-8 whitespace-pre-line">
    I <u>hereby certify</u> that{"\n"}
    Copies hereof have been sent{"\n"}
    <u>To the</u> addressee by Special{"\n"}
    Delivery-Registered Mail at his/{"\n"}
    Her Above address on _______________, 2025
  </div>

 
  
  {/* Extra blank space at the bottom */}
  <div className="h-8"></div>
</div>


         </div>
          : <div>
            <p style={{ fontWeight: "bold" }}>EARL LAURIECE S. BUTLAY</p>
        <p>Branch Manager</p>
            
            </div>}


        
      </div>

      <div className="letter-footer">
        <div>
          N.B.: Total Outstanding balance as of <em>{data.lastMonthlyDue}</em>{" "}
          in the amount of <strong>Php {formattedAmount}</strong> under PN# REM{" "}
          <strong>{data.remPn}</strong> remains unpaid. Please disregard this
          note if payment has been made. <em>Thank you!</em>
        </div>
        <div className="letter-note">
          <div>YUSAY ARCADE, ARANETA STREET, BACOLOD CITY</div>
          <div>(034) 435-2846 * 434-6797 * 707-0177</div>
          <div>info@ycfc.com.ph | www.ycfc.com.ph</div>
        </div>
      </div>
    </div>
  );
});

// -------- Main Component --------
export default function DemandLetterPDFGenerator() {
  const [formData, setFormData] = useState(null);
  const previewRef = useRef();

  const [form, setForm] = useState({
    letterType: "1st Reminder",
    remPn: "",
    firstName: "",
    middleInitial: "",
    lastName: "",
    streetName: "",
    barangayName: "",
    municipalityName: "",
    provinceName: "",
    zipcode: "",
    lastMonthlyDue: "",
    amountFigure: "",
    paymentLastPaidOn: "",
    dateGranted: "",
    originalAmountLoan: "",
    originalMaturityDate: "",
    // added fields for final reminder & final notice dynamic data:
    firstReminderDate: "",
    secondReminderDate: "",
    collaterals: [], // [{ title: "", description: "" }, ...]
  });

 const handleGenerate = (f) => {
  const parsedAmount = parseFloat(f.amountFigure || 0);
  const parsedOriginal = parseFloat(f.originalAmountLoan || 0);

  const amountInWords = numberToWords(parsedAmount) + " Pesos ";
  const amountInWordsOriginal =
    numberToWords(parsedOriginal) + " Pesos Only";

  const filteredCollaterals = (f.collaterals || []).filter(
    (c) =>
      (c.title && c.title.trim()) ||
      (c.description && c.description.trim())
  );

  const finalData =
    f.letterType === "Legal Demand"
      ? {
          ...f,
          amountInWords,
          amountInWordsOriginal,
          collaterals: filteredCollaterals,
        }
      : {
          ...f,
          amountInWords,
          collaterals: filteredCollaterals,
        };

  setFormData(finalData);

// Save to Supabase
saveToDatabase(finalData);

// Save to LocalStorage
saveToLocalStorage(finalData.remPn, finalData);
};

const exportToPdf = async () => {
  const element = previewRef.current;
  const pdf = new jsPDF("p", "mm", [215.9, 330.2]); // Legal size (8.5" x 13")
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Render the HTML letter to a high-resolution canvas
  const canvas = await html2canvas(element, {
    scale: 2.5,
    useCORS: true,
    backgroundColor: "#ffffff",
    scrollY: -window.scrollY,
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight,
  });

  const imgData = canvas.toDataURL("image/jpeg", 1.0);
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let position = 0;
  let heightLeft = imgHeight;

  // Add first page
  pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  // Continue adding pages until all content fits
  while (heightLeft > 0) {
    position -= pageHeight;
    pdf.addPage();
    pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  // Add page numbering (footer)
  const totalPages = pdf.internal.getNumberOfPages();
  pdf.setFontSize(9);
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.text(`Page ${i} of ${totalPages}`, pageWidth - 30, pageHeight - 10);
  }

  // Save the file
  const today = new Date().toISOString().split("T")[0];
  pdf.save(
    `${formData.letterType.replace(/\s+/g, "_")}_${formData.lastName}_${today}.pdf`
  );
};



  return (
    <div style={{ maxWidth: 1000, margin: "32px auto", paddingTop: "80px" }}>
      {!formData ? (
        <DemandLetterForm form={form} setForm={setForm} onGenerate={handleGenerate} />
      ) : (
        <>
          <div style={{ marginBottom: 16 }}>
            <button onClick={() => setFormData(null)} style={{ padding: "8px 14px", marginRight: 8 }}>
              Edit Inputs
            </button>
            <button
              onClick={exportToPdf}
              style={{
                background: "#0b3d2e",
                color: "#fff",
                border: "none",
                padding: "8px 14px",
              }}
            >
              Export PDF
            </button>
          </div>

          <div style={{ border: "1px solid #ccc", display: "inline-block" }}>
            <LetterPreview ref={previewRef} data={formData} />
          </div>
        </>
      )}
    </div>
  );
}
