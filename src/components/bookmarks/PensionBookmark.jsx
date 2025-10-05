import React from "react";
import { X } from "lucide-react"; // For modern icon, included with Vite + lucide-react

const PensionBookmark = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-1/4 left-20 bg-white p-6 rounded-xl shadow-2xl w-80 z-30 border border-green-200 animate-fadeIn">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-green-800">
          Pension Loan Requirements
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
        <li>SSS/GSIS ID Number</li>
        <li>DDR Print / SSS Certification</li>
        <li>Voucher / Retirement Notice from SSS/GSIS</li>
        <li>Bank Statement of ATM</li>
        <li>ATM Card and Photocopy</li>
        <li>2 Valid IDs</li>
        <li>One (1) 2x2 ID Picture</li>
        <li>Marriage Contract (Authenticated)</li>
        <li>Birth Certificate (if with dependents)</li>
        <li>Cedula / Barangay Clearance</li>
        <li>Proof of Billing (Electric/Water)</li>
      </ul>
    </div>
  );
};

export default PensionBookmark;
