import { useState, useEffect } from "react";
import { HandCoins, Home } from "lucide-react";
import { createPortal } from "react-dom";
import PensionBookmark from "./bookmarks/PensionBookmark";
import REMBookmark from "./bookmarks/REMBookmark";
import ReferralBookmark from "./bookmarks/ReferralBookmark";
import { HashLink } from "react-router-hash-link";

const ServicesSection = ({ id }) => {
  const [language, setLanguage] = useState("en");
  const [openPension, setOpenPension] = useState(false);
  const [openREM, setOpenREM] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);

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
        "Avail of our low-interest loans with flexible terms of up to 5 years. Our add-on interest structure ensures affordable monthly payments, supporting your goals with peace of mind.",
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

  // ✅ Ensure only one bookmark modal opens at a time
  const handleOpenPension = () => {
    setOpenREM(false);
    setOpenPension(true);
  };

  const handleOpenREM = () => {
    setOpenPension(false);
    setOpenREM(true);
  };

  return (
  
    <section id={id} className="py-20 relative overflow-hidden bg-gradient-to-b from-gray-50 to-emerald-50/40">
      <div className="absolute -top-20 left-1/4 h-56 w-56 rounded-full bg-emerald-200/50 blur-3xl" />
      <div className="absolute -bottom-20 right-1/4 h-56 w-56 rounded-full bg-green-300/40 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10">
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
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                language === code
                  ? "bg-green-700 text-white border-green-700 shadow-md"
                  : "bg-white text-gray-700 border-gray-200 hover:border-green-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* 🏦 Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">{t.title}</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Choose the loan option that matches your goals and compute your estimated payments instantly.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Pension Loan */}
          <div className="relative bg-white/90 backdrop-blur p-8 rounded-3xl shadow-lg hover:shadow-2xl transition flex flex-col justify-between overflow-hidden border border-green-100">
            <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-green-100" />
            <div className="relative z-10">
              <div className="flex justify-center md:justify-start items-center gap-4 mb-6">
                <HandCoins className="w-14 h-14 text-green-700" />
                <h3 className="text-2xl font-bold text-gray-900">{t.pensionTitle}</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">{t.pensionDesc}</p>
            </div>
            <div className="mt-6 flex justify-center md:justify-start relative z-10">
              <HashLink smooth  to="/calculator-forclient"
                state={{ activeTab: "PL", plTab: "new" }}
                className="px-6 py-3 bg-green-700 text-white font-semibold rounded-xl shadow-lg transition hover:bg-green-800 hover:-translate-y-0.5"
              >
                {t.calcBtn}
              </HashLink>
            </div>
          </div>

          {/* Real Estate Loan */}
          <div className="relative bg-white/90 backdrop-blur p-8 rounded-3xl shadow-lg hover:shadow-2xl transition flex flex-col justify-between overflow-hidden border border-green-100">
            <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-green-100" />
            <div className="relative z-10">
              <div className="flex justify-center md:justify-start items-center gap-4 mb-6">
                <Home className="w-14 h-14 text-green-700" />
                <h3 className="text-2xl font-bold text-gray-900">{t.realEstateTitle}</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">{t.realEstateDesc}</p>
            </div>
            <div className="mt-6 flex justify-center md:justify-start relative z-10">
              <HashLink
                smooth
                to="/calculator-forclient"
                state={{ activeTab: "REM", remTab: "new" }}
                className="px-6 py-3 bg-green-700 text-white font-semibold rounded-xl shadow-lg transition hover:bg-green-800 hover:-translate-y-0.5"
              >
                {t.calcBtn}
              </HashLink>
            </div>
          </div>
        </div>
      </div>

      {/* 🪟 Pop-up Modals */}
      <PensionBookmark isOpen={openPension} onClose={() => setOpenPension(false)} />
      <REMBookmark isOpen={openREM} onClose={() => setOpenREM(false)} />

      {/* ✅ Floating Bookmarks (only when in view) */}
      {showBookmarks &&
        createPortal(
          <>
            <div className="fixed bottom-2 left-4 z-[9999] bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-green-200 w-[180px] md:w-[200px] animate-fadeIn transform scale-75 md:scale-100 origin-bottom-left">
              <h4 className="text-green-800 font-bold mb-3 text-center text-sm md:text-base">📋 Requirements</h4>
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleOpenPension}
                  className="px-4 py-2 bg-green-700 text-white rounded-full shadow-md hover:bg-green-800 transition text-xs md:text-sm"
                >
                  Pension Loan
                </button>
                <button
                  onClick={handleOpenREM}
                  className="px-4 py-2 bg-green-700 text-white rounded-full shadow-md hover:bg-green-800 transition text-xs md:text-sm"
                >
                  Real Estate Loan
                </button>
              </div>
            </div>

            <div className="fixed bottom-0 right-4 z-[9999] animate-fadeIn transform scale-80 md:scale-100 origin-bottom-right">
              <ReferralBookmark />
            </div>
          </>,
          document.body
        )}
    </section>
  );
};

export default ServicesSection;
