import { useState } from "react";
import properties from "../../data/properties";
import { X, CheckCircle } from "lucide-react";

const InquiryBookmark = ({ selectedProperty = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    property: selectedProperty || "",
    message: "",
  });

  // 🏡 Generate property options dynamically
  const propertyOptions = ["Select All", ...properties.map((p) => p.title)];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("https://formspree.io/f/xanpdnlq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // ✅ Success behavior
        setStatus("success");
        setIsOpen(false); // Close form modal
        setIsSuccess(true); // Show success modal

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          property: selectedProperty || "",
          message: "",
        });

        // Auto-close success modal after 3s
        setTimeout(() => setIsSuccess(false), 3000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Submission failed:", err);
      setStatus("error");
    }
  };

  return (
    <>
      {/* 🌿 Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-green-700 hover:bg-green-800 text-white py-3 px-5 rounded-r-full shadow-lg font-semibold z-[9999]"
      >
        💬 I’m Interested
      </button>

      {/* 🪟 Inquiry Form Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-[10000]"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-xl p-6 w-full max-w-md relative shadow-2xl border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ❌ Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
            >
              <X size={22} />
            </button>

            <h2 className="text-lg font-bold text-gray-800 mb-4">
              {selectedProperty
                ? "Inquire About This Property"
                : "Property Inquiry"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-2.5"
              />

              <input
                type="email"
                name="email"
                placeholder="[optional] Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-lg p-2.5"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Your Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded-lg p-2.5"
              />

              {/* 🏠 Property Selection */}
              <select
                name="property"
                value={formData.property}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-2.5 bg-white"
              >
                <option value="">Select Property</option>
                {propertyOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full border rounded-lg p-2.5 h-20"
              />

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2.5 rounded-lg font-semibold hover:bg-green-700 transition"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Submitting..." : "Send Inquiry"}
              </button>

              {status === "error" && (
                <p className="text-red-500 text-sm text-center mt-2">
                  ❌ Something went wrong. Try again.
                </p>
              )}
            </form>
          </div>
        </div>
      )}

      {/* ✅ Success Modal */}
      {isSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10001]">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full relative text-center">
            <button
              onClick={() => setIsSuccess(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
            <CheckCircle className="text-green-600 mx-auto mb-4" size={48} />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Inquiry Submitted!
            </h3>
            <p className="text-gray-600 mb-6">
              Thank you for your interest! Our team will contact you shortly
              regarding your inquiry.
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-6 rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default InquiryBookmark;
