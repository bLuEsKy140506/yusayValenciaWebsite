import React from "react";
import {
  Eye,            // Vision
  Target,         // Mission
  ShieldCheck,    // Honesty
  Award,          // Excellence
  HeartHandshake, // Loyalty
  Briefcase       // Professionalism
} from "lucide-react";

const AboutUs = () => {
  return (
    <div className="px-6 md:px-16 py-16 space-y-20">
      {/* Top Section: Vision & Mission + Core Values */}
      <section className="grid md:grid-cols-2 gap-12 max-w-7xl mx-auto items-start">
        {/* Vision & Mission */}
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold mb-6 text-center md:text-left">
            <Eye className="w-6 h-6 text-blue-600" /> Our Vision
          </h2>
          <p className="text-base text-gray-700 mb-10 text-center md:text-left leading-relaxed">
            To be a major player in the Lending & Financing industry by providing
            an extensive range of credit facilities nationwide.
          </p>

          <h2 className="flex items-center gap-2 text-2xl font-bold mb-6 text-center md:text-left">
            <Target className="w-6 h-6 text-green-600" /> Our Mission
          </h2>
          <ul className="list-decimal list-inside text-gray-700 space-y-2 text-base leading-relaxed">
            <li>To extend "fast and personalized" lending services.</li>
            <li>To prioritize and understand the clients’ needs.</li>
            <li>
              To offer competitive rates and flexible terms for Real Estate,
              Pension Loans, or Businessman’s Creditline.
            </li>
            <li>
              To uphold "teamwork and unity" among YCFC employees to achieve
              common goals and foster growth.
            </li>
            <li>To fulfill its social and civic responsibility in the community.</li>
            <li>
              To continually acknowledge and recognize staff contributions.
            </li>
            <li>To expand YCFC’s network nationwide.</li>
            <li>To continuously innovate and adopt new services.</li>
          </ul>
        </div>

        {/* Core Values */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
            Core Values
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-50 rounded-xl shadow flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-lg">Honesty</h3>
              </div>
              <p className="text-gray-600 text-sm">
                In dealing with clients and in performing duties.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl shadow flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-yellow-600" />
                <h3 className="font-semibold text-lg">Excellence</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Through consistent delivery of fast and personalized services.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl shadow flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <HeartHandshake className="w-5 h-5 text-red-600" />
                <h3 className="font-semibold text-lg">Loyalty</h3>
              </div>
              <p className="text-gray-600 text-sm">
                To the company and the vision it seeks to achieve.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl shadow flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-lg">Professionalism</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Shown through work ethics and conduct towards co-workers,
                partners, and clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Section: Team + Map */}
      <section className="grid md:grid-cols-2 gap-12 max-w-7xl mx-auto items-start">
        {/* Team */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
            Our Team
          </h2>
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="flex flex-col items-center text-center">
              <img
                src="/images/earl.jpg"
                alt="Earl Lauriece S. Butlay"
                className="w-28 h-28 rounded-full object-cover shadow"
              />
              <h3 className="mt-4 font-semibold text-base">Earl Lauriece S. Butlay</h3>
              <p className="text-gray-600 text-sm">Branch OIC</p>
            </div>
            {/* Add more staff here */}
          </div>
        </div>

        {/* Map */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
            Find Us
          </h2>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d246.9937108638777!2d125.09103146627044!3d7.905580425364019!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32ff197d005371db%3A0xc66449328acb4088!2sYusay%20Credit%20and%20Finance%20Corporation!5e0!3m2!1sen!2sph!4v1759309731783!5m2!1sen!2sph"
              width="100%"
              height="380"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
