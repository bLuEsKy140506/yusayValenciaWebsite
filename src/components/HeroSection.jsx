import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const trustIndicators = ["Fast approvals", "1% monthly interest", "Flexible payment terms"];

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative flex items-center px-4 sm:px-6 md:px-12 lg:px-20 py-16 md:py-24 lg:py-28 min-h-[90vh] md:min-h-screen bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/bg-interior.webp')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/80 to-green-100/70" />

      {/* Background blur effects (hidden on small devices for performance) */}
      <div className="hidden md:block absolute -top-24 -left-20 h-64 w-64 rounded-full bg-green-300/30 blur-3xl" />
      <div className="hidden md:block absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between w-full gap-8 md:gap-12 lg:gap-16 max-w-7xl mx-auto [@media(max-height:750px)]:gap-5">
        
        {/* Left Content */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-5 md:space-y-8 px-2 sm:px-4">

          {/* <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs sm:text-sm font-semibold text-green-800 shadow-sm ring-1 ring-green-200">
            Valencia City's trusted lender since 2004
          </p> */}

          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            Fast & Affordable Loans in <span className="text-[#226C3B]">Valencia City</span>
          </h1>

          <p className="text-gray-700 text-sm sm:text-base md:text-xl leading-relaxed max-w-md md:max-w-xl mx-auto md:mx-0">
  We provides trusted lending solutions for
  <span className="font-semibold text-[#226C3B]"> SSS/GSIS pensioners</span> and
  <span className="font-semibold text-[#226C3B]"> real estate owners</span>,
  helping clients access financing quickly and responsibly.
</p>

          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center md:justify-start mt-1.5 mb-2">
            {trustIndicators.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs sm:text-sm font-semibold text-green-800 shadow-sm ring-1 ring-green-200"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 justify-center md:justify-start pt-2">

            <ScrollLink
              to="apply-now"
              smooth={true}
              duration={600}
              offset={-80}
              className="cursor-pointer bg-[#226C3B] hover:bg-green-800 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-0.5 text-center"
            >
              Apply Now
            </ScrollLink>

            <Link
              to="/calculator-forclient"
              className="border-2 border-[#226C3B] bg-white/80 text-[#226C3B] hover:bg-green-50 font-semibold py-3 px-8 rounded-xl shadow-sm hover:shadow-md transition-transform transform hover:-translate-y-0.5 text-center"
            >
              Loan Calculator
            </Link>

          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">

          <div className="rounded-3xl shadow-2xl text-center p-2 sm:p-8 md:p-14 lg:p-16 w-full max-w-sm sm:max-w-md md:max-w-lg bg-gradient-to-b from-[#2c7a47] to-[#1d5b31] text-white ring-1 ring-white/30 backdrop-blur-sm">

            <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold">
              60+
            </h2>

            <p className="text-base sm:text-lg md:text-2xl font-medium">
              Years of Trusted Service
            </p>

            <div className="mt-3 border-t border-green-300/60 pt-4 space-y-1">
              <p className="text-sm sm:text-base">Established 1960</p>
              <p className="text-sm sm:text-base">Valencia Branch since 2004</p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;