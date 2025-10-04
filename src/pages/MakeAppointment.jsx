// src/pages/AppointmentPage.jsx
import React, { useState } from "react";

const AppointmentPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeBookmark, setActiveBookmark] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    await fetch("https://formspree.io/f/mzzjgnlz", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });

    form.reset();
    setShowModal(true);
  };

  return (
    <div className="relative bg-gray-50 min-h-screen pt-24 pb-16 px-6">
      {/* Left Floating Bookmarks */}
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 mb-3">
          We Bring Our Service to You — Fast, Personal, and Hassle-Free
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed">
          At{" "}
          <strong className="text-green-800">
            Yusay Credit & Finance Corporation – Valencia Branch
          </strong>
          , we value your time. Our team can visit your residence or property to
          verify requirements and evaluate qualified titles — saving you an
          extra trip to our office. Please review the requirements and ensure
          you have the necessary documents before requesting a visit.
        </p>
      </div>
      <div className="fixed top-1/3 left-2 flex flex-col gap-2 z-20">
        <button
          onClick={() =>
            setActiveBookmark(activeBookmark === "pl" ? null : "pl")
          }
          className="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-r-lg shadow-md transition-all duration-200"
        >
          PL Requirements
        </button>
        <button
          onClick={() =>
            setActiveBookmark(activeBookmark === "rem" ? null : "rem")
          }
          className="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-r-lg shadow-md transition-all duration-200"
        >
          REM Requirements
        </button>
      </div>

      {/* Bookmark Panels */}
      {activeBookmark === "pl" && (
        <div className="fixed top-1/4 left-20 bg-white p-6 rounded-xl shadow-2xl w-80 z-30 border border-green-200">
          <h2 className="text-lg font-semibold text-green-800 mb-3">
            Pension Loan Requirements
          </h2>
          <ul className="text-sm text-gray-700 list-disc pl-4 space-y-1">
            <li>SSS/GSIS ID Number</li>
            <li>DDR Print / SSS Certification</li>
            <li>Voucher / Retirement Notice from SSS/GSIS</li>
            <li>Bank Statement of ATM</li>
            <li>ATM Card and Photocopy</li>
            <li>2 Valid IDs</li>
            <li>One (1) 2x2 ID Picture</li>
            <li>Marriage Contract (Authenticated)</li>
            <li>Birth Certificate (if with dependents)</li>
            <li>Cedula / Barangay Clearance</li>
            <li>Proof of Billing (Electric/Water)</li>
          </ul>
        </div>
      )}

      {activeBookmark === "rem" && (
        <div className="fixed top-1/4 left-20 bg-white p-6 rounded-xl shadow-2xl w-80 z-30 border border-green-200">
          <h2 className="text-lg font-semibold text-green-800 mb-3">
            REM Loan Requirements
          </h2>
          <ul className="text-sm text-gray-700 list-disc pl-4 space-y-1">
            <li>Owner’s Duplicate Copy of Title</li>
            <li>Certified True Copy of Title</li>
            <li>Lot Plan with Vicinity Map</li>
            <li>Tax Declaration & Receipts</li>
            <li>Land Tax Clearance</li>
            <li>2 Valid IDs (Applicant & Co-Maker)</li>
            <li>1 2x2 ID Picture (Applicant & Co-Maker)</li>
            <li>TIN (Applicant)</li>
            <li>
              CAR (Certificate Authorizing Registration) for Land title issued
              on 2007 onward
            </li>
          </ul>
        </div>
      )}

      {/* Appointment Section */}
      <section className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-10 mb-10">
        <h1 className="text-3xl font-bold text-green-800 mb-4 text-center">
          Schedule an Appointment
        </h1>
        <p className="text-gray-700 mb-8 text-center">
          We value your time and convenience. Our team will personally visit
          your residence or property for evaluation — saving you a trip to our
          office. Please ensure that you have the necessary loan requirements or
          qualified documents ready.
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
          />
          <input
            type="text"
            name="phone"
            placeholder="Contact Number"
            required
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
          />
          <input
            type="text"
            name="address"
            placeholder="Complete Address"
            required
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
          />
          <textarea
            name="message"
            rows="4"
            placeholder="Additional Message or Notes"
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none md:col-span-2"
          ></textarea>

          <div className="md:col-span-2 flex flex-col items-center gap-3">
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300"
            >
              Submit Appointment
            </button>
            <p className="text-sm text-gray-600 text-center">
              📌 Please read the <b>Important Notes</b> below before submitting.
            </p>
          </div>
        </form>
      </section>

      {/* Important Notes */}
      <section className="max-w-4xl mx-auto bg-green-50 border border-green-200 rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-green-800 mb-4">
          Important Notes
        </h2>
        <ul className="list-disc text-gray-700 pl-6 space-y-2">
          <li>
            <b>For Pensioners:</b> We only accept applicants aged 74 years old
            and below, preferably with a permanent residence within Bukidnon.
          </li>
          <li>
            <b>For REM Loan Applicants:</b> We do not accept CLOA titles,
            agricultural lands exceeding 3 hectares, Emancipation Patents, NHA,
            or DAR-CARP properties, or titles under the name of deceased
            persons.
          </li>
        </ul>
      </section>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
            <h2 className="text-2xl font-bold text-green-700 mb-4">
              Submission Successful!
            </h2>
            <p className="text-gray-700 mb-6">
              Thank you for your appointment request. Our team will contact you
              as soon as possible.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-6 rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentPage;
