import { useState } from "react";
import { CheckCircle, Lock, X } from "lucide-react";

const ApplyNow = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    loanType: "",
    amount: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/mrbyqwdj", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", phone: "", loanType: "", amount: "" });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Error submitting the form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="apply-now" className="relative bg-gray-50 py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left: Form */}
        <div className="bg-white shadow-lg rounded-2xl p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Fast & Secure Online Application
          </h2>
          <p className="text-gray-600 mb-6">
            Complete the form in just 3 minutes. No hidden fees. No hassle.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#226C3B]"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#226C3B]"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#226C3B]"
            />

            <select
              name="loanType"
              value={formData.loanType}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#226C3B]"
            >
              <option value="">Select Loan Type</option>
              <option value="pension">SSS/GSIS Pension Loan</option>
              <option value="real-estate">Real Estate Mortgage Loan</option>
            </select>

            <input
              type="number"
              name="amount"
              placeholder="Desired Loan Amount"
              value={formData.amount}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#226C3B]"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#226C3B] hover:bg-green-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </form>

          <div className="flex items-center mt-4 text-gray-500 text-sm">
            <Lock size={16} className="mr-2" />
            Your information is 100% secure and private.
          </div>
        </div>

        {/* Right: Trust & Benefits */}
        <div className="space-y-6 text-center md:text-left">
          <h3 className="text-2xl font-bold text-gray-900">
            Why Apply With Us?
          </h3>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-center gap-2 justify-center md:justify-start">
              <CheckCircle className="text-green-600" size={20} />
              <span>Low interest rates for SSS/GSIS Pension & Real Estate Loans</span>
            </li>
            <li className="flex items-center gap-2 justify-center md:justify-start">
              <CheckCircle className="text-green-600" size={20} />
              <span>Quick approval process — get results fast</span>
            </li>
            <li className="flex items-center gap-2 justify-center md:justify-start">
              <CheckCircle className="text-green-600" size={20} />
              <span>Trusted lender since 2004</span>
            </li>
            <li className="flex items-center gap-2 justify-center md:justify-start">
              <CheckCircle className="text-green-600" size={20} />
              <span>Secure & private application</span>
            </li>
          </ul>
          <div className="bg-[#226C3B] text-white rounded-xl p-8 shadow-lg">
            <h4 className="text-3xl font-extrabold">20+</h4>
            <p className="text-lg">Years of Trusted Service</p>
            <p className="mt-2 text-sm">Valencia Branch since 2004</p>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {isSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full relative text-center">
            <button
              onClick={() => setIsSuccess(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
            <CheckCircle className="text-green-600 mx-auto mb-4" size={48} />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Application Submitted!
            </h3>
            <p className="text-gray-600 mb-6">
              Thank you for applying. Our team will review your application and contact you shortly.
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="bg-[#226C3B] hover:bg-green-800 text-white font-semibold py-2 px-6 rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ApplyNow;
