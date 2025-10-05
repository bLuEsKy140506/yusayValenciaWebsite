import { Link } from "react-router-dom";
import backgroundImage from "../assets/bg-interior.jpg"; // adjust path as needed
import { Link as ScrollLink } from "react-scroll";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative flex items-center justify-center px-6 md:px-16 min-h-screen overflow-hidden pt-24 md:pt-28"
    >
      {/* Background Image */}
      <div className="absolute inset-0 -z-20">
        <img
          src={backgroundImage}
          alt="Background Interior"
          className="w-full h-full object-cover"
        />
        {/* Light Overlay */}
        <div className="absolute inset-0 bg-white/70"></div>
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between w-full gap-12">
        {/* Left Content */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-8">
          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Fast & Affordable Loans in{" "}
            <span className="text-[#226C3B]">Valencia City</span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-lg mx-auto md:mx-0">
            Trusted since{" "}
            <span className="font-semibold text-[#226C3B]">2004</span>. Enjoy
            quick approvals, flexible terms, and low interest rates for{" "}
            <span className="font-medium">SSS/GSIS Pension</span> and{" "}
            <span className="font-medium">Real Estate Mortgage</span> loans.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-2">
            <ScrollLink
              to="apply-now"
              smooth={true}
              duration={600}
              offset={-80} // adjust if header overlaps
              className="cursor-pointer bg-[#226C3B] hover:bg-green-800 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
            >
              Apply Now
            </ScrollLink>
            <Link
              to="/calculator"
              className="border-2 border-[#226C3B] text-[#226C3B] hover:bg-green-50 font-semibold py-3 px-8 rounded-lg shadow-sm hover:shadow-md transition-transform transform hover:scale-105"
            >
              Loan Calculator
            </Link>
          </div>
        </div>

        {/* Right Badge Section */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div
            className="text-white rounded-2xl shadow-lg text-center p-12 md:p-16"
            style={{ backgroundColor: "#226C3B" }}
          >
            <h2 className="text-6xl md:text-7xl font-extrabold">60+</h2>
            <p className="text-xl md:text-2xl font-medium">
              Years of Trusted Service
            </p>
            <div className="mt-6 border-t border-green-300 pt-4">
              <p className="text-sm md:text-base">Established 1960</p>
              <p className="text-sm md:text-base">Valencia Branch since 2004</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
