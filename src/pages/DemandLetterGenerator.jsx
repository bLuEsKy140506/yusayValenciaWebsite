import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logo from "../assets/logo2.png";
import DemandLetterForm from "../components/DemandLetterForm";
import { numberToWords } from "../utils/numberToWords";

const formatFullDate = (date) => {
  if (!date) return ""; // if empty or undefined
  const validDate = new Date(date); // convert string → Date object
  if (isNaN(validDate.getTime())) return ""; // handle invalid date
  return validDate.toLocaleDateString("en-US", {
    // weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};


// ✅ Letter Templates
const getLetterContent = (type, data, todayStr, lastPaymentOn, dateGranted, originalMaturityDate, formattedAmount, formattedAmountOrig) => {
  switch (type) {
    case "1st Reminder":
      return (
        <>
          <p>
    Our records indicate that your account with us under{" "}
    <strong>REM PN NO. {data.remPn}</strong> has matured on{" "}
    <strong>{data.lastMonthlyDue}</strong>. We hope this was just an oversight
    on your part and that you will be able to pay the same within three (3) days
    from receipt hereof. As of today <strong>{todayStr}</strong>, your current
    overdue balance is <strong>{data.amountInWords}</strong> (
    <strong>₱{formattedAmount}</strong>) exclusive of penalties and past due
    interest.
  </p>
  <br />
        <p>
          Please treat this matter with urgency. Thank you for your attention.
        </p>
        <br />
        <br />
        <p>Very truly yours,</p>
        </>
      );

    case "2nd Reminder":
      return (
        <>
        <p>
            A review of our records indicates that your REM loan with <strong>PN No. {data.remPn}</strong> with us had matured on {data.lastMonthlyDue}. Your credit reputation is a valuable asset. We want you to keep it that way because of the advantages it gives you.  As of today, <strong>{todayStr}</strong> your total overdue balance is <strong>{data.amountInWords}</strong> (<strong>₱{formattedAmount}</strong>) exclusive of interest and penalties. Please allow us to remind you of the 3% penalty charge to be imposed on your overdue account. 
        </p>
        <br />
       <div className="letter-body">
  <p>
    Furthermore, restoring your account to good standing before referral to
    legal action shall allow you to enjoy the following advantages:
  </p>

  <ul className="advantages-list" style={{ marginLeft: "1.25rem", lineHeight: 1.6 }}>
    <li>👉Save on accumulating penalty charges.</li>
    <li>👉Avoid tarnishing your credit reputation and our trust in you.</li>
    <li>👉Avoid extraordinary charges that may be imposed if your account is referred
      to our attorney for collection.
    </li>
  </ul>

</div>
      <p>
          Thank you for your prompt attention regarding the matter. 
        </p>
        <br />
        <br />
        <p>Very truly yours,</p>
        </>
         
       
      );

    case "Partial Payment Reminder":
      return (
        <>
          <p>
            Thank you for your payment last {lastPaymentOn}, however said payment was not sufficient to lodge your account to current account status as you still have an overdue balance in the amount of <strong>₱{formattedAmount}</strong>  exclusive of past due interest and other charges. Kindly be reminded that your maturity date is on <strong>{data.lastMonthlyDue}</strong> under Promissory Note REM-{data.remPn}. There will be a 5% penalty if you are unable to fully pay the loan on time.
          </p>
          <br />
          <p>
            However, we would appreciate it very much if you could update your account in the soonest possible time to avoid inconvenience on your part. Please heed this advice. Thank you for your prompt attention to this matter. 
          </p>
          <p>We look forward to hearing from you. Thank you very much and God Bless.</p>
          <br />
          <p>Very truly yours,</p>
        </>
      );

    case "Legal Demand":
      return (
        <>
          <p>
           YUSAY CREDIT & FINANCE CORPORATION, which we represent as counsel had referred to us your obligation for collection.
          </p>
          <br />
          <p>
          According to the records of our client, you obtained a loan under Promissory Note No. REM-{data.remPn} in the amount of  <strong>{data.amountInWordsOriginal}</strong> (<strong>₱{formattedAmountOrig}</strong>) which was granted on <strong>{dateGranted}</strong> and had matured <strong>{originalMaturityDate}</strong>.
          </p>
          <br />
          <p>As of {todayStr} your total outstanding balance is (₱<strong>{formattedAmount}</strong>) exclusive of past due interest, penalties and other charges imposed on delayed account.</p>
          <br />
          <p>To maintain your good name and credit history, kindly pay your account as above-stated within <strong>SEVEN (7) working days</strong> from receipt of this demand otherwise, we shall be left with no recourse but to institute adversarial proceedings against you to enforce our client’s interest.</p>
          <br/>
          <p>Thank you for giving this matter your preferential attention.</p>
          <br />
          <br />
          <p>Very truly yours,</p>
          <br />
          <p>TANCINCO LAW OFFICE<br />Counsel for YCFC<br />
          <br />By:<br /><br />ATTY. CECILIO CHITO R. TANCINCO<br />At my instance:<br />
</p>
        </>
      );

    case "Final Reminder":
      return (
        <>
          <p>
            This is your final reminder regarding your overdue account under{" "}
            <strong>REM PN NO. {data.remPn}</strong>. Please settle the amount
            of <strong>{data.amountInWords}</strong> (
            <strong>₱{formattedAmount}</strong>) within three (3) days to avoid
            legal consequences.
          </p>
        </>
      );

    case "Final Notice":
      return (
        <>
          <p>
            This serves as your final notice prior to legal endorsement. Your
            account under <strong>REM PN NO. {data.remPn}</strong> remains
            unpaid with a total balance of <strong>{data.amountInWords}</strong>{" "}
            (<strong>₱{formattedAmount}</strong>). Immediate payment is required
            to prevent legal proceedings.
          </p>
        </>
      );

    default:
      return null;
  }
};

const LetterPreview = React.forwardRef(({ data }, ref) => {
  if (!data) return null;

  const today = new Date();
  const todayStr = formatFullDate(today);
 const lastPaymentOn = data.paymentLastPaidOn ? formatFullDate(data.paymentLastPaidOn) : "x";
 const dateGranted = data.dateGranted ? formatFullDate(data.dateGranted) : "x";
 const originalMaturityDate = data.originalMaturityDate? formatFullDate(data.originalMaturityDate) : "x";

  const formattedAmount = `${parseFloat(data.amountFigure || 0).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const formattedAmountOrig = `${parseFloat(data.originalAmountLoan || 0).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;


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
      {/* Header */}
      {/* Centered Header Logo */} {/* Header */}
<div className="letter-header">
  {data.letterType === "Legal Demand" ? (
    // ✅ Use legal header when letter type is Legal Demand
    <img
      src={legalHeader}
      alt="Tancino Law Office Header"
      style={{ width: "100%", height: "auto", objectFit: "contain" }}
    />
  ) : (
    // ✅ Default YCFC logo
    <img
      src={logo}
      alt="YCFC Logo"
      style={{ width: 90, height: 90, objectFit: "contain" }}
    />
  )}
</div>

      {/* Date */}
      <div style={{ fontSize: 14, marginBottom: 10 }}>{todayStr}</div>
      <br />
     

      {/* Address */}
      <div style={{ fontSize: 14, lineHeight: 1.5 }}>
        Ms/Mr <strong>{data.firstName} {data.middleInitial}. {data.lastName}</strong>
        <br />
        <strong>{data.streetName}</strong> <strong>{data.barangayName}</strong>
        <br />
        <strong>{data.municipalityName}</strong>, <strong>{data.provinceName}</strong>
        <br />
        {data.zipcode}
        
      </div>

      {/* Title */}
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

      {/* Dynamic Body */}
      <div className="letter-body" style={{ fontSize: 14 }}>
        <br />
        <p>
          Dear Mr/Ms. <strong>{data.lastName}</strong>,
        </p>

        <br />
        <p><strong>Greetings!</strong></p>
        <br />

        {letterBody}

        
        <br />
        <p style={{ fontWeight: "bold" }}>EARL LAURIECE S. BUTLAY</p>
        <p>Branch Manager</p>

       
      </div>

      {/* Footer */}
      
<div className="letter-footer">
  <div>
    N.B.: Total Outstanding balance as of <em>{data.lastMonthlyDue}</em> in the amount of{" "}
    <strong>Php {formattedAmount}</strong> exclusive of past due interest and other charges
    under PN# REM <strong>{data.remPn}</strong> remains unpaid. Please disregard this note
    if payment has been made. <em>Thank you!</em>
  </div>

  <div className="letter-note">
    <div>YUSAY ARCADE, ARANETA STREET, BACOLOD CITY, PHILIPPINES 6100</div>
    <div>(034) 435-2846 * 434-6797 * 707-0177</div>
    <div>info@ycfc.com.ph | www.ycfc.com.ph</div>
  </div>
</div>
    
    
     </div>
    
  );
});

export default function DemandLetterPDFGenerator() {
  const [formData, setFormData] = useState(null);
  const previewRef = useRef();

  const handleGenerate = (form) => {
    const amountInWords =
      numberToWords(parseInt(form.amountFigure || 0)) + " Pesos Only";
    setFormData({ ...form, amountInWords });
  };

  const exportToPdf = async () => {
    const element = previewRef.current;
    const canvas = await html2canvas(element, {
      scale: 1.5,
      useCORS: true,
      backgroundColor: "#ffffff",
    });
    const imgData = canvas.toDataURL("image/jpeg", 0.6);
    const pdf = new jsPDF("p", "mm", [215.9, 330.2]);
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgHeight = (canvas.height * pageWidth) / canvas.width;

    pdf.addImage(imgData, "JPEG", 0, 0, pageWidth, imgHeight);
    pdf.setFontSize(9);
    pdf.text(`Page 1 of 1`, pageWidth - 25, pageHeight - 10);

    const today = new Date().toISOString().split("T")[0];
    pdf.save(`${formData.letterType.replace(/\s+/g, "_")}_${formData.lastName}_${today}.pdf`);
  };

  return (
    <div style={{ maxWidth: 1000, margin: "32px auto", paddingTop: "80px" }}>
      {!formData ? (
        <DemandLetterForm onGenerate={handleGenerate} />
      ) : (
        <>
          <div style={{ marginBottom: 16 }}>
            <button
              onClick={() => setFormData(null)}
              style={{ padding: "8px 14px", marginRight: 8 }}
            >
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
