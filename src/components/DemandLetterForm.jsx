import React, { useState } from "react";
import { numberToWords } from "../utils/numberToWords";

const DemandLetterForm = ({ onGenerate }) => {
const [form, setForm] = useState({
  letterType: "1st Demand Letter",
  firstName: "",
  middleInitial: "",
  lastName: "",
  streetName: "",
  barangayName: "",
  municipalityName: "",
  provinceName: "",
  zipcode: "",
  remPn: "",
  lastMonthlyDue: "",
  amountFigure: "",
  paymentLastPaidOn: "",      // Partial Payment only
  dateGranted: "",            // Legal Demand only
  originalAmountLoan: "",     // Legal Demand only
  originalMaturityDate: "",   // Legal Demand only
});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (form.letterType === "Legal Demand Letter (YCFC)") {
      const amountInWords = numberToWords(form.amountFigure) + " Pesos Only";
    const amountInWordsOriginal = numberToWords(form.originalAmountLoan) + " Pesos Only";
    onGenerate({ ...form, amountInWords, amountInWordsOriginal });
  
} else {
 const amountInWords = numberToWords(form.amountFigure) + " Pesos Only";
  onGenerate({ ...form, amountInWords});

}

    
  };

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

      {/* Responsive grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
     {Object.keys(form)
  .filter((key) => {
    // Always exclude the selector itself
    if (key === "letterType") return false;

    // Partial Payment Letter → show all + paymentLastPaidOn only
    if (form.letterType === "Partial Payment Reminder") {
      return (
        key !== "dateGranted" &&
        key !== "originalAmountLoan" &&
        key !== "originalMaturityDate"
      );
    }

    // Legal Demand Letter (YCFC) → hide lastMonthlyDue, show 3 new fields
    if (form.letterType === "Legal Demand") {
      return (
        key !== "paymentLastPaidOn" && // hide partial payment field
        (key === "dateGranted" ||
          key === "originalAmountLoan" ||
          key === "originalMaturityDate" ||
          (key !== "lastMonthlyDue" &&
            !["dateGranted", "originalAmountLoan", "originalMaturityDate"].includes(key)))
      );
    }

    // Other letter types → hide all conditional fields
    return (
      key !== "paymentLastPaidOn" &&
      key !== "dateGranted" &&
      key !== "originalAmountLoan" &&
      key !== "originalMaturityDate"
    );
  })
  .map((key) => (
    <div key={key}>
      <label className="block text-sm font-medium capitalize mb-1">
        {key.replace(/([A-Z])/g, " $1")}
      </label>
      <input
        type={
          key === "amountFigure"
            ? "number"
            : key === "paymentLastPaidOn" ||
              key === "dateGranted" ||
              key === "originalMaturityDate"
            ? "date"
            : key === "originalAmountLoan"
            ? "number"
            : "text"
        }
        name={key}
        value={form[key]}
        onChange={handleChange}
        required={
          (key === "paymentLastPaidOn" &&
            form.letterType === "Partial Payment Letter") ||
          ((key === "dateGranted" ||
            key === "originalAmountLoan" ||
            key === "originalMaturityDate") &&
            form.letterType === "Legal Demand Letter (YCFC)") ||
          (key !== "paymentLastPaidOn" &&
            key !== "dateGranted" &&
            key !== "originalAmountLoan" &&
            key !== "originalMaturityDate")
        }
        className="border w-full p-2 rounded-md focus:outline-green-600"
      />
    </div>
  ))}


      </div>

      <button
        type="submit"
        className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg w-full mt-4"
      >
        Generate Letter
      </button>
    </form>
  );
};

export default DemandLetterForm;
