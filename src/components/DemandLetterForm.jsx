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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const amountInWords = numberToWords(form.amountFigure) + " Pesos Only";
    onGenerate({ ...form, amountInWords });
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
          <option>1st Demand Letter</option>
          <option>2nd Demand Letter</option>
          <option>Partial Payment Letter</option>
          <option>Legal Demand Letter (YCFC)</option>
          <option>Final Reminder</option>
          <option>Final Notice</option>
        </select>
      </div>

      {/* Responsive grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.keys(form)
          .filter((key) => key !== "letterType")
          .map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium capitalize mb-1">
                {key.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type={key === "amountFigure" ? "number" : "text"}
                name={key}
                value={form[key]}
                onChange={handleChange}
                required
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
