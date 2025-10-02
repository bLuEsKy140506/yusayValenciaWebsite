import { useState } from "react";
import { HandCoins, Home } from "lucide-react";
import { Link } from "react-router-dom";

const ServicesSection = ({id}) => {
  const [language, setLanguage] = useState("en");
  const [hovered, setHovered] = useState(null);

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
        "Nag-aalok kami ng pautang para sa mga pensionado ng SSS at GSIS — kabilang ang retiree, survivorship, ITF, at disability. Mas mababang interes na 1% bawat buwan. May Extension Program din kung saan makakautang ka batay sa bilang ng buwang nabayaran, nang walang doble-dobleng bayad — upang makatulong sa dagdag na puhunan.",
      realEstateTitle: "Real Estate Mortgage Loan",
      realEstateDesc:
        "Kumuha ng pondo gamit ang iyong titulo ng lupa bilang kolateral. Nag-aalok kami ng mababang interes at flexible na hulugan hanggang 5 taon. Ang aming hybrid na advance at add-on interest ay ginagawang mas abot-kaya at madali ang pagbabayad.",
      calcBtn: "Kalkulahin",
    },
    bis: {
      title: "Among Serbisyo sa Utang",
      pensionTitle: "SSS/GSIS Pension Loan",
      pensionDesc:
        "Nagahatag kami og pautang para sa mga pensionado sa SSS ug GSIS — lakip ang retiree, survivorship, ITF, ug disability. Ubos nga interes nga 1% matag bulan. Aduna puy Extension Program diin makapahulam ka base sa bulan nga nabayran, nga walay doble nga bayad — aron makakuha og kwarta samtang nagapaningkamot nga mabalik ang kapital.",
      realEstateTitle: "Real Estate Mortgage Loan",
      realEstateDesc:
        "Makakuha og financing gamit ang titulo sa yuta isip kolateral. Naghatag kami og ubos nga interes ug flexible nga terms hangtod 5 ka tuig. Ang hybrid nga advance ug add-on interest nagapamenos sa bayad ug nagahatag ug kasaligan nga pamaagi sa pagpanginabuhi.",
      calcBtn: "Kwenta",
    },
    ilo: {
      title: "Amó nga Serbisyo sa Utang",
      pensionTitle: "SSS/GSIS Pension Loan",
      pensionDesc:
        "Nagahatag kami sang loan para sa mga pensionado sang SSS kag GSIS — lakip ang retiree, survivorship, ITF, kag disability. Nubo lang nga interes nga 1% kada bulan. May Extension Program man nga nagahatag sang utang base sa bulan nga nabayran, nga wala overlap sang bayad — agud makakuha pa sang kwarta samtang ginabalik ang kapital.",
      realEstateTitle: "Real Estate Mortgage Loan",
      realEstateDesc:
        "Makakuha sang pondo gamit ang titulo sang duta bilang kolateral. Nagahatag kami sang nubo nga interes kag flexible nga terms tubtob 5 ka tuig. Ang hybrid nga advance kag add-on interest nagapabuhin sang bayad kag nagahatag kasiguraduhan sa pinansyal.",
      calcBtn: "Kwenta",
    },
  };

  const t = translations[language];

  return (
    <section id={id} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        {/* Language Toggle */}
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
          <div
            className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition flex flex-col justify-between group overflow-hidden"
            onMouseEnter={() => setHovered("PL")}
            onMouseLeave={() => setHovered(null)}
          >
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

            {/* Button */}
            <div className="mt-6 flex justify-center md:justify-start relative z-10">
              <Link
                to="/calculator"
                state={{ activeTab: "PL", plTab: "new" }}
                className="px-6 py-3 bg-green-700 text-white font-semibold rounded-lg shadow-lg transition group-hover:bg-green-800"
              >
                {t.calcBtn}
              </Link>
            </div>

            {/* Overlay triggered only when hovering button */}
            {hovered === "PL" && (
              <div className="absolute inset-0 bg-green-700 bg-opacity-20 opacity-0 hover:opacity-100 transition duration-500 pointer-events-none"></div>
            )}
          </div>

          {/* Real Estate Loan */}
          <div
            className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition flex flex-col justify-between group overflow-hidden"
            onMouseEnter={() => setHovered("REM")}
            onMouseLeave={() => setHovered(null)}
          >
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

            {/* Button */}
            <div className="mt-6 flex justify-center md:justify-start relative z-10">
              <Link
                to="/calculator"
                state={{ activeTab: "REM", remTab: "new" }}
                className="px-6 py-3 bg-green-700 text-white font-semibold rounded-lg shadow-lg transition group-hover:bg-green-800"
              >
                {t.calcBtn}
              </Link>
            </div>

            {/* Overlay triggered only when hovering button */}
            {hovered === "REM" && (
              <div className="absolute inset-0 bg-green-700 bg-opacity-20 opacity-0 hover:opacity-100 transition duration-500 pointer-events-none"></div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
