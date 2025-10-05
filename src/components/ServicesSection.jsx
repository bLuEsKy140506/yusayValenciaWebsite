import { useState, useEffect } from "react";
import { HandCoins, Home } from "lucide-react";
import { Link } from "react-router-dom";
import PensionBookmark from "./bookmarks/PensionBookmark";
import REMBookmark from "./bookmarks/REMBookmark";
import ReferralBookmark from "./bookmarks/ReferralBookmark";

const ServicesSection = ({ id }) => {
  const [language, setLanguage] = useState("en");

  const [showBookmarks, setShowBookmarks] = useState(false);

  // control bookmark popup open states
  const [openPension, setOpenPension] = useState(false);
  const [openREM, setOpenREM] = useState(false);

  // Detect when section is visible on scroll
  useEffect(() => {
    const section = document.getElementById(id);
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowBookmarks(entry.isIntersecting),
      { threshold: 0.4 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [id]);

  const translations = {
    en: {
      title: "Our Loan Services",
      pensionTitle: "SSS/GSIS Pension Loan",
      pensionDesc:
        "We provide loans for SSS and GSIS pensioners — including retirees, survivorship, ITF, and disability pensions. Enjoy a low interest of only 1% per month. With our Extension Program, you can borrow proportionate to the months you’ve paid without overlapping payments — giving pensioners access to funds while rebuilding their capital.",
      realEstateTitle: "Real Estate Mortgage Loan",
      realEstateDesc:
        "Get financing with your land title as collateral. We offer low interest rates with flexible repayment terms of up to 5 years. Our hybrid of advance and add-on interest keeps payments affordable and manageable — ensuring financial stability and growth.",
      calcBtn: "Calculate",
    },
  };

  const t = translations[language];

  return (
    <section id={id} className="py-20 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {[
            { code: "en", label: "English" },
            { code: "tl", label: "Tagalog" },
            { code: "bis", label: "Bisaya" },
            { code: "ilo", label: "Ilonggo" },
          ].map(({ code, label }) => (
            <button
              key={code}
              onClick={() => setLanguage(code)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                language === code
                  ? "bg-green-700 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-12">
          {t.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Pension Loan */}
          <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition flex flex-col justify-between group overflow-hidden">
            <div>
              <div className="flex justify-center md:justify-start items-center gap-4 mb-6">
                <HandCoins className="w-14 h-14 text-green-700" />
                <h3 className="text-2xl font-bold text-gray-900">
                  {t.pensionTitle}
                </h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                {t.pensionDesc}
              </p>
            </div>
            <div className="mt-6 flex justify-center md:justify-start relative z-10">
              <Link
                to="/calculator"
                state={{ activeTab: "PL", plTab: "new" }}
                className="px-6 py-3 bg-green-700 text-white font-semibold rounded-lg shadow-lg transition group-hover:bg-green-800"
              >
                {t.calcBtn}
              </Link>
            </div>
          </div>

          {/* Real Estate Loan */}
          <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition flex flex-col justify-between group overflow-hidden">
            <div>
              <div className="flex justify-center md:justify-start items-center gap-4 mb-6">
                <Home className="w-14 h-14 text-green-700" />
                <h3 className="text-2xl font-bold text-gray-900">
                  {t.realEstateTitle}
                </h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                {t.realEstateDesc}
              </p>
            </div>
            <div className="mt-6 flex justify-center md:justify-start relative z-10">
              <Link
                to="/calculator"
                state={{ activeTab: "REM", remTab: "new" }}
                className="px-6 py-3 bg-green-700 text-white font-semibold rounded-lg shadow-lg transition group-hover:bg-green-800"
              >
                {t.calcBtn}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Show bookmarks only when section is visible */}
      {showBookmarks && (
        <>
          {/* Left floating buttons */}
          <div className="fixed bottom-4 left-4 flex flex-col gap-2 z-[9999]">
            <button
              onClick={() => setOpenPension(true)}
              className="px-4 py-2 bg-green-700 text-white rounded-full shadow-lg hover:bg-green-800 transition"
            >
              Pension Requirements
            </button>
            <button
              onClick={() => setOpenREM(true)}
              className="px-4 py-2 bg-green-700 text-white rounded-full shadow-lg hover:bg-green-800 transition"
            >
              REM Requirements
            </button>
          </div>

          {/* Right floating referral bookmark */}
          <div className="fixed bottom-4 right-4 z-[9999]">
            <ReferralBookmark />
          </div>
        </>
      )}

      {/* ✅ Pop-up bookmark windows */}
      <PensionBookmark
        isOpen={openPension}
        onClose={() => setOpenPension(false)}
      />
      <REMBookmark isOpen={openREM} onClose={() => setOpenREM(false)} />
    </section>
  );
};

export default ServicesSection;
