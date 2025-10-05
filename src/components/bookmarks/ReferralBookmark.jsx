import { useState } from "react";
import { Info } from "lucide-react";

const ReferralBookmark = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open ? (
        <div className="relative bg-green-700 text-white p-4 rounded-2xl shadow-2xl w-[280px]">
          <button
            onClick={() => setOpen(false)}
            className="absolute -top-2 -right-2 bg-white text-green-700 rounded-full p-1 w-6 h-6 flex items-center justify-center shadow"
          >
            ✕
          </button>
          <div className="flex items-start gap-3">
            <Info className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-lg font-bold mb-1">No Collateral?</h4>
              <p className="text-sm leading-relaxed">
                You can still earn through referrals:
                <br />
                <strong>Pension Loan:</strong> ₱500 (below ₱50k), ₱1,000
                (₱50k–₱99,999), ₱1,500 (₱100k+)
                <br />
                <strong>Real Estate Loan:</strong> 1% of gross - less 10% tax
                <br />
                You may also loan through <strong>SPA</strong> if your property
                isn’t yet transferred under your name.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="bg-green-700 hover:bg-green-800 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition-all"
        >
          No Collateral?
        </button>
      )}
    </div>
  );
};

export default ReferralBookmark;
