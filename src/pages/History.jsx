import React from "react";

const historyData = [
  {
    year: "Early 1960s",
    title: "Humble Beginnings",
    description:
      "Founded by Mr. Felix Garcia Yusay as Yusay Commercial, the business began by selling imported used clothing before expanding into lending services.",
  },
  {
    year: "1984",
    title: "Formal Lending Institution",
    description:
      "With growing demand for lending services, the company amended its Articles of Incorporation and became Yusay Credit and Lending Corporation.",
  },
  {
    year: "1990s",
    title: "Pension Loan Services",
    description:
      "YCFC introduced Pension Loans tailored to retirees and pensioners, reinforcing its commitment to personalized financial solutions.",
  },
  {
    year: "1992",
    title: "First Expansion",
    description:
      "On April 26, 1992, YCFC expanded to Roxas City, Capiz—marking the start of its nationwide growth.",
  },
  {
    year: "2004",
    title: "YCFC Today",
    description:
      "Approved by the SEC on June 14, 2004, the company became Yusay Credit and Finance Corporation, known for fast and personalized service.",
  },
  {
    year: "Present",
    title: "Nationwide Presence",
    description:
      "With 14 branches and 8 satellite offices nationwide, YCFC continues to grow while staying true to its mission.",
  },
];

export default function History() {
  return (
    <section className="bg-[#0f3d2e] py-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#d4af37]">
            Our History
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-white/80 text-base sm:text-lg">
            A legacy built on trust, growth, and fast personalized financial
            service.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
         <div className="absolute left-5 sm:left-1/2 top-0 h-full w-0.5 bg-[#d4af37]/60 sm:-translate-x-1/2" />

          
          <div className="space-y-14">
            {historyData.map((item, index) => (
              <div
                key={index}
                className={`relative flex flex-col sm:flex-row ${
                  index % 2 === 0
                    ? "sm:justify-start"
                    : "sm:justify-end"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 sm:left-1/2 w-4 h-4 bg-[#d4af37] rounded-full -translate-x-1/2 mt-2 ring-4 ring-[#f5edd3]" />

                {/* Card */}
                <div
                  className={`bg-white rounded-2xl shadow-lg 
p-5 sm:p-6 
w-[calc(100%-4rem)] sm:w-[45%]
ml-6 sm:ml-0
border border-[#d4af37]/30 ${
  index % 2 === 0
    ? "sm:mr-auto sm:pr-12"
    : "sm:ml-auto sm:pl-12"
}`}
                >
                  <span className="text-sm font-semibold text-[#0f3d2e] uppercase tracking-wide">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-semibold text-[#0f3d2e] mt-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 mt-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Tagline */}
        <div className="text-center mt-20">
          <p className="text-[#d4af37] font-semibold text-lg">
            “Fast and Personalized Service”
          </p>
        </div>
      </div>
      <div className="bg-[#0f3d2e] py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <h2 className="text-3xl sm:text-4xl font-bold text-[#d4af37]">
          YCFC Service and Foundation
        </h2>
        <p className="mt-3 text-white/80 text-base sm:text-lg">
          Discover how YCFC serves its community — mission, service, and heart.
        </p>

        {/* Video Container */}
        <div className="relative mt-8 w-full" style={{ paddingTop: "56.25%" }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-xl shadow-xl"
            src="https://www.youtube.com/embed/9SfYFn-vVOo"
            title="YCFC Service and Foundation"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Optional Subtext */}
        <p className="mt-6 text-white/70 text-base sm:text-lg">
          Learn more about the foundation and the community impact of YCFC.
        </p>
      </div>
    </div>
    </section>
    
  );
}
