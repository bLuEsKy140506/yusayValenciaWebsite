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
    <div className="mt-6 overflow-x-auto">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">
        Pension Loan vs REM Loan Comparison with the same month
      </h3>

      <table className="min-w-full border text-sm text-center">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">Scenario</th>
            <th className="border px-3 py-2">Gross</th>
            <th className="border px-3 py-2">Monthly</th>
            <th className="border px-3 py-2">Total Deductions</th>
            <th className="border px-3 py-2">Net Proceeds</th>
          </tr>
        </thead>
        <tbody>
          {/* Pension Reference */}
          <tr className="bg-green-50 font-semibold">
            <td className="border px-3 py-2">
              Pension Loan (Reference)
            </td>
            <td className="border px-3 py-2">{peso(gross)}</td>
            <td className="border px-3 py-2">{peso(monthly)}</td>
            <td className="border px-3 py-2">{peso(deduction)}</td>
            <td className="border px-3 py-2">
              {peso(netProceeds)}
            </td>
          </tr>

          {/* REM – Same Monthly */}
          <tr>
            <td className="border px-3 py-2">
              REM – Same Monthly
            </td>
            <td className="border px-3 py-2">
              {peso(remSameMonthly.gross)}
            </td>
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

          {/* REM – Same Gross */}
          <tr>
            <td className="border px-3 py-2">
              REM – Same Gross
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

          {/* REM – Same Net */}
          <tr>
            <td className="border px-3 py-2">
              REM – Same Net
            </td>
            <td className="border px-3 py-2">
              {peso(remSameNet.gross)}
            </td>
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
  );
}
