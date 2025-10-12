import React, { useState } from "react";

const PDICalculator = () => {
  const [formData, setFormData] = useState({
    grossAmount: "",
    maturityDate: "",
    paymentDate: "",
  });
  const [pdi, setPdi] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPdi(null);

    try {
      const response = await fetch("http://localhost:5173/api/calculate-pdi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setPdi(data.pdi);
      } else {
        alert(data.error || "Error computing PDI");
      }
    } catch (err) {
      alert(`Server error. Check your connection. ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-green-700 mb-6 text-center">
          PDI Calculator (REM - Not LL, Lumpsum)
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            name="grossAmount"
            placeholder="Gross Amount"
            value={formData.grossAmount}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
          <input
            type="date"
            name="maturityDate"
            placeholder="Date of Maturity"
            value={formData.maturityDate}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
          <input
            type="date"
            name="paymentDate"
            placeholder="Date Wanted to Pay"
            value={formData.paymentDate}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-medium"
          >
            {loading ? "Calculating..." : "Compute PDI"}
          </button>
        </form>

        {pdi !== null && (
          <div className="mt-6 text-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Computed PDI:
            </h2>
            <p className="text-2xl font-bold text-green-700">
              ₱ {pdi.toFixed(2)}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PDICalculator;

//   const response = await fetch("/api/calculate-pdi", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(formData),
//   });
