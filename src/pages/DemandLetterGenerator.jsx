import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logo from "../assets/logo2.png";
import DemandLetterForm from "../components/DemandLetterForm";
import { numberToWords } from "../utils/numberToWords";

const formatFullDate = (date) =>
  date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

// ✅ Letter Templates
const getLetterContent = (type, data, todayStr, formattedAmount) => {
  switch (type) {
    case "1st Demand Letter":
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
        </>
      );

    case "2nd Demand Letter":
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
         
        </>
      );

    case "Partial Payment Letter":
      return (
        <>
          <p>
            This is to acknowledge your partial payment under{" "}
            <strong>REM PN NO. {data.remPn}</strong>. However, a remaining
            balance of <strong>{data.amountInWords}</strong> (
            <strong>₱{formattedAmount}</strong>) is still due. We encourage you
            to settle the remaining amount to update your account.
          </p>
        </>
      );

    case "Legal Demand Letter (YCFC)":
      return (
        <>
          <p>
            Despite repeated reminders, your account under{" "}
            <strong>REM PN NO. {data.remPn}</strong> remains unpaid. YCFC is now
            constrained to endorse your account for legal action should payment
            not be made within seven (7) days. As of{" "}
            <strong>{todayStr}</strong>, your outstanding balance is{" "}
            <strong>{data.amountInWords}</strong> (
            <strong>₱{formattedAmount}</strong>).
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
  const formattedAmount = parseFloat(data.amountFigure || 0).toLocaleString();

  const letterBody = getLetterContent(
    data.letterType,
    data,
    todayStr,
    formattedAmount
  );

  return (
    <div ref={ref} className="letter-a4" style={{ paddingTop: "20px" }}>
      {/* Header */}
      {/* Centered Header Logo */} <div className="letter-header"> <img src={logo} alt="YCFC Logo" style={{ width: 90, height: 90, objectFit: "contain" }} /> </div>
      {/* Date */}
      <div style={{ fontSize: 14, marginBottom: 10 }}>{todayStr}</div>
      <br />
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
          margin: "20px 0",
        }}
      >
        {data.letterType.toUpperCase()}
      </div>

      {/* Dynamic Body */}
      <div className="letter-body" style={{ fontSize: 14 }}>
        <p>
          Dear Mr/Ms. <strong>{data.lastName}</strong>,
        </p>

        <br />
        <p><strong>Greetings!</strong></p>
        <br />

        {letterBody}

        <br />
        <p>
          Please treat this matter with urgency. Thank you for your attention.
        </p>
        <br />
        <br />
        <p>Very truly yours,</p>
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
    const pdf = new jsPDF("p", "mm", "a4");
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
