import { computeREM } from "../../utils/remCompute";
import {
    findREMByMonthly, findREMByNet
} from '../../utils/remSimulation';


const peso = (n) =>
  `₱${Number(n).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export default function PensionVsREMComparison({ pensionResult }) {
  if (!pensionResult) return null;

  const { gross, netProceeds, monthly, months, deduction } = pensionResult;

  const remSameMonthly = findREMByMonthly(monthly, months);
  const remSameGross = computeREM({ gross, months });
  const remSameNet = findREMByNet(netProceeds, months);

  if (!remSameMonthly || !remSameGross || !remSameNet) {
  return (
    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-300 rounded">
      Unable to generate REM comparison for the given Pension Loan values.
    </div>
  );
}



return (
  <div className="mt-6">
    <h3 className="text-base sm:text-lg font-semibold mb-3 text-gray-800">
      Pension Loan vs REM Loan Comparison
    </h3>

    {/* ================= MOBILE VIEW (CARDS) ================= */}
    <div className="space-y-4 sm:hidden">
      {[
        {
          title: "Pension Loan (Reference)",
          highlight: true,
          data: {
            Gross: gross,
            Monthly: monthly,
            "Total Deductions": deduction,
            "Net Proceeds": netProceeds,
          },
        },
        {
          title: "Same Monthly with Pension Loan",
          data: {
            Gross: remSameMonthly.gross,
            Monthly: remSameMonthly.monthlyAmortization,
            "Total Deductions": remSameMonthly.totalDeductions,
            "Net Proceeds": remSameMonthly.netProceeds,
          },
        },
        {
          title: "Same Gross of the Pension Loan",
          data: {
            Gross: remSameGross.gross,
            Monthly: remSameGross.monthlyAmortization,
            "Total Deductions": remSameGross.totalDeductions,
            "Net Proceeds": remSameGross.netProceeds,
          },
        },
        {
          title: "Same Net of the Pension Loan",
          data: {
            Gross: remSameNet.gross,
            Monthly: remSameNet.monthlyAmortization,
            "Total Deductions": remSameNet.totalDeductions,
            "Net Proceeds": remSameNet.netProceeds,
          },
        },
      ].map((item, idx) => (
        <div
          key={idx}
          className={`rounded-lg border p-4 shadow-sm ${
            item.highlight ? "bg-green-50 border-green-300" : "bg-white"
          }`}
        >
          <h4 className="font-semibold text-gray-800 mb-3">
            {item.title}
          </h4>

          <div className="space-y-2 text-sm">
            {Object.entries(item.data).map(([label, value]) => (
              <div key={label} className="flex justify-between">
                <span className="text-gray-500">{label}</span>
                <span className="font-medium text-gray-800">
                  {peso(value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>

    {/* ================= DESKTOP VIEW (TABLE) ================= */}
    <div className="hidden sm:block overflow-x-auto rounded border">
      <table className="min-w-[720px] w-full text-sm text-center border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2 sticky left-0 bg-gray-100 z-10">
              Scenario
            </th>
            <th className="border px-3 py-2">Gross</th>
            <th className="border px-3 py-2">Monthly</th>
            <th className="border px-3 py-2">Total Deductions</th>
            <th className="border px-3 py-2">Net Proceeds</th>
          </tr>
        </thead>

        <tbody>
          <tr className="bg-green-50 font-semibold">
            <td className="border px-3 py-2 sticky left-0 bg-green-50 z-10">
              Pension Loan (Reference)
            </td>
            <td className="border px-3 py-2">{peso(gross)}</td>
            <td className="border px-3 py-2">{peso(monthly)}</td>
            <td className="border px-3 py-2">{peso(deduction)}</td>
            <td className="border px-3 py-2">{peso(netProceeds)}</td>
          </tr>

          <tr>
            <td className="border px-3 py-2 sticky left-0 bg-white">
              Same monthly with Pension Loan
            </td>
            <td className="border px-3 py-2">{peso(remSameMonthly.gross)}</td>
            <td className="border px-3 py-2 bg-green-100">
              {peso(remSameMonthly.monthlyAmortization)}
            </td>
            <td className="border px-3 py-2">
              {peso(remSameMonthly.totalDeductions)}
            </td>
            <td className="border px-3 py-2">
              {peso(remSameMonthly.netProceeds)}
            </td>
          </tr>

          <tr>
            <td className="border px-3 py-2 sticky left-0 bg-white">
              Same Gross with Pension Loan
            </td>
            <td className="border px-3 py-2 bg-green-100">
              {peso(remSameGross.gross)}
            </td>
            <td className="border px-3 py-2">
              {peso(remSameGross.monthlyAmortization)}
            </td>
            <td className="border px-3 py-2">
              {peso(remSameGross.totalDeductions)}
            </td>
            <td className="border px-3 py-2">
              {peso(remSameGross.netProceeds)}
            </td>
          </tr>

          <tr>
            <td className="border px-3 py-2 sticky left-0 bg-white">
              Same Net with Pension Loan
            </td>
            <td className="border px-3 py-2">{peso(remSameNet.gross)}</td>
            <td className="border px-3 py-2">
              {peso(remSameNet.monthlyAmortization)}
            </td>
            <td className="border px-3 py-2">
              {peso(remSameNet.totalDeductions)}
            </td>
            <td className="border px-3 py-2 bg-green-100">
              {peso(remSameNet.netProceeds)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);
}