import React, { useState } from "react";
import PensionBookmark from "../components/bookmarks/PensionBookmark";
import REMBookmark from "../components/bookmarks/REMBookmark";

const AppointmentPage = () => {
  const [activeBookmark, setActiveBookmark] = useState(null);

  const handleToggle = (type) => {
    setActiveBookmark(activeBookmark === type ? null : type);
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 pt-24 pb-16 px-6">
      {/* ✅ Header Section */}
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

      {/* ✅ Fixed Floating Box with Label and Buttons */}
      <div className="fixed bottom-4 left-4 z-50">
        <div className="bg-white/80 backdrop-blur-md border border-green-300 shadow-lg rounded-xl p-4">
          <h3 className="text-green-800 font-semibold text-sm mb-3 text-center">
            Requirements
          </h3>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleToggle("pl")}
              className={`bg-green-600 text-white font-semibold text-sm px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition ${
                activeBookmark === "pl" ? "bg-green-800" : ""
              }`}
            >
              PL
            </button>
            <button
              onClick={() => handleToggle("rem")}
              className={`bg-green-600 text-white font-semibold text-sm px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition ${
                activeBookmark === "rem" ? "bg-green-800" : ""
              }`}
            >
              REM
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Pop-up Panels (Positioned Above the Floating Box) */}
      <div className="fixed bottom-32 left-6 z-50">
        <PensionBookmark
          isOpen={activeBookmark === "pl"}
          onClose={() => setActiveBookmark(null)}
        />
        <REMBookmark
          isOpen={activeBookmark === "rem"}
          onClose={() => setActiveBookmark(null)}
        />
      </div>

      {/* ✅ Main Appointment Form */}
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-10 relative z-10">
        <h1 className="text-3xl font-bold text-green-700 mb-4 text-center">
          Schedule an Appointment
        </h1>

        <form
          action="https://formspree.io/f/mzzjgnlz"
          method="POST"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            required
            className="p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          />
          <input
            type="text"
            name="location"
            placeholder="Property / Residence Location"
            required
            className="p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          />
          <textarea
            name="message"
            rows="4"
            placeholder="Additional Notes"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none md:col-span-2"
          ></textarea>

          <div className="md:col-span-2 flex flex-col items-center">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-medium shadow-md transition"
            >
              Submit Appointment
            </button>
            <p className="text-sm text-gray-600 mt-2">
              Please review the <strong>important notes</strong> before
              submitting.
            </p>
          </div>
        </form>

        {/* ✅ Important Notes */}
        <div className="bg-green-50 border-l-4 border-green-600 p-5 rounded-lg mt-8">
          <h2 className="text-lg font-semibold text-green-700 mb-2">
            Important Notes:
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Pensioners must be 74 years old and below.</li>
            <li>
              Applicants should preferably be permanent residents within
              Bukidnon.
            </li>
            <li>
              For Real Estate Mortgage (REM) — we do not accept CLOA titles,
              agricultural lands over 3 hectares, Emancipation patents, NHA, or
              DAR-CARP properties.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AppointmentPage;
