import {
  computeNewLoan,
  computeExtension,
} from "../../utils/plComputations";

export default function PLComparisonTable({ monthly = 5000 }) {
  const rows = [12, 13, 14, 15, 16, 17, 18];

  const straight24 = computeNewLoan(monthly, 24);
  const straight30 = computeNewLoan(monthly, 30);

  const peso = (n) =>
    `₱${Math.abs(n).toLocaleString("en-PH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const diffStyle = (n) =>
    n >= 0 ? "text-green-700 font-bold" : "text-red-700 font-bold";

  const Section = ({ target }) => {
    const straight =
      target === 24 ? straight24.netProceeds : straight30.netProceeds;

    return (
      <div>
        <h3 className="font-bold text-lg mb-3">
          Total months -- {target} Months with {peso(monthly)} monthly
        </h3>

        {/* ================= DESKTOP TABLE ================= */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border border-black text-xs text-center">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">Term</th>
                <th className="border p-2">New Loan</th>
                <th className="border p-2">Extension</th>
                <th className="border p-2">Total</th>
                <th className="border p-2">Straight</th>
                <th className="border p-2">Diff</th>
                <th className="border p-2">Actual Diff</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((n) => {
                const remaining = n - 1;

                const newLoan = computeNewLoan(monthly, n);
                const ext = computeExtension(
                  monthly,
                  remaining,
                  target - remaining
                );

                const total =
                  newLoan.netProceeds + ext.netProceeds;
                const diff = total - straight;
                const actualDiff = diff - monthly;

                return (
                  <tr key={`${target}-${n}`}>
                    <td className="border p-2 font-semibold">{n}</td>
                    <td className="border p-2">{peso(newLoan.netProceeds)}</td>
                    <td className="border p-2 text-green-700">
                      {peso(ext.netProceeds)}
                      <div className="text-[10px] text-gray-500">
                        ({remaining}+{target - remaining})
                      </div>
                    </td>
                    <td className="border p-2 font-bold text-blue-800">
                      {peso(total)}
                    </td>
                    <td className="border p-2">{peso(straight)}</td>
                    <td className={`border p-2 ${diffStyle(diff)}`}>
                      {peso(diff)}
                    </td>
                    <td className={`border p-2 ${diffStyle(actualDiff)}`}>
                      {peso(actualDiff)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ================= MOBILE CARDS ================= */}
        <div className="md:hidden space-y-3">
          {rows.map((n) => {
            const remaining = n - 1;

            const newLoan = computeNewLoan(monthly, n);
            const ext = computeExtension(
              monthly,
              remaining,
              target - remaining
            );

            const total = newLoan.netProceeds + ext.netProceeds;
            const diff = total - straight;
            const actualDiff = diff - monthly;

            return (
              <div
                key={`m-${target}-${n}`}
                className="border rounded-lg p-3 shadow-sm bg-white"
              >
                <div className="font-bold text-sm mb-2">
                  {n} months as starting loan
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>New Loan</div>
                  <div className="text-right">{peso(newLoan.netProceeds)}</div>

                  <div>Extension</div>
                  <div className="text-right text-green-700">
                    {peso(ext.netProceeds)}
                  </div>

                  <div>Total</div>
                  <div className="text-right font-bold text-blue-800">
                    {peso(total)}
                  </div>

                  <div>Straight</div>
                  <div className="text-right">{peso(straight)}</div>

                  <div>Diff (Straight and Extended)</div>
                  <div className={`text-right ${diffStyle(diff)}`}>
                    {peso(diff)}
                  </div>

                  <div>Actual Diff</div>
                  <div className={`text-right ${diffStyle(actualDiff)}`}>
                    {peso(actualDiff)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 mt-6">
      <Section target={24} />
      <Section target={30} />
    </div>
  );
}
