import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative flex flex-col md:flex-row items-center justify-center px-6 md:px-12 lg:px-20 py-20 md:py-24 lg:py-28 min-h-screen bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url('/bg-interior.jpg')` }}
    >
      {/* Light Overlay */}
      <div className="absolute inset-0 bg-white/60"></div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between w-full gap-10 md:gap-12 lg:gap-16 max-w-7xl mx-auto">
        {/* Left Content */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-6 md:space-y-8 px-2 sm:px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            Fast & Affordable Loans in{" "}
            <span className="text-[#226C3B]">Valencia City</span>
          </h1>

          <p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed max-w-lg mx-auto md:mx-0">
            Trusted since{" "}
            <span className="font-semibold text-[#226C3B]">2004</span>. Enjoy
            quick approvals, flexible terms, and low interest rates for{" "}
            <span className="font-medium">SSS/GSIS Pension</span> and{" "}
            <span className="font-medium">Real Estate Mortgage</span> loans.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-2">
            <ScrollLink
              to="apply-now"
              smooth={true}
              duration={600}
              offset={-80}
              className="cursor-pointer bg-[#226C3B] hover:bg-green-800 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 text-center"
            >
              Apply Now
            </ScrollLink>

            <Link
              to="/calculator-forclient"
              className="border-2 border-[#226C3B] text-[#226C3B] hover:bg-green-50 font-semibold py-3 px-8 rounded-lg shadow-sm hover:shadow-md transition-transform transform hover:scale-105 text-center"
            >
              Loan Calculator
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div
            className="text-white rounded-2xl shadow-lg text-center p-10 sm:p-12 md:p-14 lg:p-16 w-full max-w-sm sm:max-w-md md:max-w-lg"
            style={{ backgroundColor: "#226C3B" }}
          >
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold">
              60+
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl font-medium">
              Years of Trusted Service
            </p>

            <div className="mt-6 border-t border-green-300 pt-4">
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
