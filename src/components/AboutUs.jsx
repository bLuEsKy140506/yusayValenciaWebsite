import React from "react";
import TeamAndMap from "./TeamAndMap";

import {
  Eye,
  Target,
  ShieldCheck,
  Award,
  HeartHandshake,
  Briefcase
} from "lucide-react";

const AboutUs = ({ id }) => {
  return (
    <div id={id} className="px-6 md:px-16 py-16 space-y-20 scroll-mt-18">
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
          <h2 className="text-3xl font-extrabold mb-2 text-center md:text-left tracking-tight">
            HELP
          </h2>
          <p className="text-gray-500 mb-8 text-center md:text-left text-sm uppercase tracking-wide">
            is Our Core Values
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-2xl shadow-md border hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
                <h3 className="font-semibold text-lg">Honesty</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                In dealing with clients and in performing duties.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-md border hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-3">
                <Award className="w-6 h-6 text-yellow-500" />
                <h3 className="font-semibold text-lg">Excellence</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Through consistent delivery of fast and personalized services.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-md border hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-3">
                <HeartHandshake className="w-6 h-6 text-red-500" />
                <h3 className="font-semibold text-lg">Loyalty</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                To the company and the vision it seeks to achieve.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-md border hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-3">
                <Briefcase className="w-6 h-6 text-purple-600" />
                <h3 className="font-semibold text-lg">Professionalism</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Shown through work ethics and conduct towards co-workers,
                partners, and clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Section: Team + Map */}
     
        <TeamAndMap />
     
    </div>
  );
};

export default AboutUs;
