import React from "react";
import { X } from "lucide-react";

const REMBookmark = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-1/4 left-6 sm:left-12 md:left-20 bg-white p-6 rounded-xl shadow-2xl w-80 z-30 border border-green-200 animate-fadeIn">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-green-800">
          REM Loan Requirements
        </h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-red-500 transition"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>

      {/* Content */}
      <ul className="text-sm text-gray-700 list-disc pl-4 space-y-1">
        <li>Owner’s Duplicate Copy of Title</li>
        <li>Certified True Copy of Title</li>
        <li>Lot Plan with Vicinity Map</li>
        <li>Tax Declaration & Receipts</li>
        <li>Land Tax Clearance</li>
        <li>Pictures of Property (2 outside, 2 inside)</li>
        <li>2 Valid IDs (Applicant & Co-Maker)</li>
        <li>1 2x2 ID Picture (Applicant & Co-Maker)</li>
        <li>TIN (Applicant)</li>
        <li>CAR (Certificate Authorizing Registration)</li>
      </ul>
    </div>
  );
};

export default REMBookmark;
