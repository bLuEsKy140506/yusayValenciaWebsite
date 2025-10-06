import { useState, useEffect } from "react";
import { HandCoins, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import PensionBookmark from "./bookmarks/PensionBookmark";
import REMBookmark from "./bookmarks/REMBookmark";
import ReferralBookmark from "./bookmarks/ReferralBookmark";

const ServicesSection = ({ id }) => {
  const [language, setLanguage] = useState("en");
  const [openPension, setOpenPension] = useState(false);
  const [openREM, setOpenREM] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);

  // ✅ Detect when Services section is visible (desktop + mobile)
  useEffect(() => {
    const section = document.getElementById(id);
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowBookmarks(entry.isIntersecting),
      { threshold: 0.2 }
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
    tl: {
      title: "Aming mga Serbisyo sa Pautang",
      pensionTitle: "SSS/GSIS Pension Loan",
      pensionDesc:
        "Nag-aalok kami ng pautang para sa mga pensioner ng SSS at GSIS — kasama ang mga retirado, survivorship, ITF, at disability pension. Mababa lang ang interes na 1% bawat buwan. Sa aming Extension Program, maaari kang mangutang nang proporsyonal sa mga buwang nabayaran mo nang walang overlap sa mga hulog.",
      realEstateTitle: "Real Estate Mortgage Loan",
      realEstateDesc:
        "Makakuha ng pondo gamit ang iyong titulo ng lupa bilang kolateral. May mababang interes at flexible na hulugan hanggang 5 taon upang matulungan kang mapanatili ang iyong katatagan sa pananalapi.",
      calcBtn: "Kalkulahin",
    },
    bis: {
      title: "Among mga Serbisyo sa Utang",
      pensionTitle: "SSS/GSIS Pension Loan",
      pensionDesc:
        "Naghatag kami ug loan para sa mga pensionado sa SSS ug GSIS — apil ang retiree, survivorship, ITF, ug disability pension. Gamay ra nga interes nga 1% matag bulan. Pinaagi sa among Extension Program, makautang ka base sa nabayran nga bulan nga walay overlap sa hulog.",
      realEstateTitle: "Real Estate Mortgage Loan",
      realEstateDesc:
        "Makakuha ug pondo gamit ang imong titulo sa yuta isip kolateral. Naa’y ubos nga interes ug flexible nga bayranan hangtod 5 ka tuig aron masiguro ang imong kalig-on sa pinansya.",
      calcBtn: "Kuwentaha",
    },
    ilo: {
      title: "Amó nga mga Serbisyo sa Hulam",
      pensionTitle: "SSS/GSIS Pension Loan",
      pensionDesc:
        "Nagahatag kami sang hulam para sa mga pensionado sang SSS kag GSIS — lakip ang retirado, survivorship, ITF, kag disability pension. May mababa nga interes nga 1% kada bulan. Pinaagi sa Extension Program, mahimo ka maghulam base sa mga bulan nga nabayaran mo nga wala overlap.",
      realEstateTitle: "Real Estate Mortgage Loan",
      realEstateDesc:
        "Mahimo ka makakuha sang pondo gamit ang imo titulo sang duta bilang kolateral. May mababa nga interes kag flexible nga hulugan tubtob 5 ka tuig para sa imo pinansyal nga kalig-on.",
      calcBtn: "Kuwentaha",
    },
  };

  const t = translations[language] || translations.en;

  return (
    <section id={id} className="py-20 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        {/* 🌐 Language Selector */}
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

        {/* 🏦 Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-12">
          {t.title}
        </h2>

        {/* 🧾 Loan Cards */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Pension Loan */}
          <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition flex flex-col justify-between overflow-hidden">
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
                className="px-6 py-3 bg-green-700 text-white font-semibold rounded-lg shadow-lg transition hover:bg-green-800"
              >
                {t.calcBtn}
              </Link>
            </div>
          </div>

          {/* Real Estate Loan */}
          <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition flex flex-col justify-between overflow-hidden">
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
                className="px-6 py-3 bg-green-700 text-white font-semibold rounded-lg shadow-lg transition hover:bg-green-800"
              >
                {t.calcBtn}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 🪟 Pop-up Modals */}
      <PensionBookmark
        isOpen={openPension}
        onClose={() => setOpenPension(false)}
      />
      <REMBookmark isOpen={openREM} onClose={() => setOpenREM(false)} />

      {/* ✅ Floating Bookmarks (only when in view) */}
      {showBookmarks &&
        createPortal(
          <>
            {/* 📋 Requirements Floating Box */}
            <div className="fixed bottom-6 left-4 z-[9999] bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-green-200 w-[180px] md:w-[200px] animate-fadeIn">
              <h4 className="text-green-800 font-bold mb-3 text-center">
                📋 Requirements
              </h4>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setOpenPension(true)}
                  className="px-4 py-2 bg-green-700 text-white rounded-full shadow-md hover:bg-green-800 transition text-sm"
                >
                  Pension Loan
                </button>
                <button
                  onClick={() => setOpenREM(true)}
                  className="px-4 py-2 bg-green-700 text-white rounded-full shadow-md hover:bg-green-800 transition text-sm"
                >
                  Real Estate Loan
                </button>
              </div>
            </div>

            {/* 🤝 Referral Bookmark */}
            <div className="fixed bottom-6 right-4 z-[9999] animate-fadeIn">
              <ReferralBookmark />
            </div>
          </>,
          document.body
        )}
    </section>
  );
};

export default ServicesSection;
