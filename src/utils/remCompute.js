const fireInsuranceTable = [
  { max: 1000000, premium: 1527.0 },
  { max: 1500000, premium: 2290.5 },
  { max: 2000000, premium: 3054.0 },
  { max: 2500000, premium: 3817.5 },
  { max: 3000000, premium: 4581.0 },
  { max: 3500000, premium: 5344.5 },
  { max: 4000000, premium: 6108.0 },
  { max: 4500000, premium: 6871.5 },
  { max: 5000000, premium: 7635.0 },
  { max: 5500000, premium: 8398.5 },
  { max: 6000000, premium: 9162.0 },
  { max: 6500000, premium: 9925.5 },
  { max: 7000000, premium: 10689.0 },
  { max: 7500000, premium: 11452.5 },
  { max: 8000000, premium: 12216.0 },
  { max: 8500000, premium: 12979.5 },
  { max: 9000000, premium: 13743.0 },
  { max: 9500000, premium: 14506.5 },
  { max: 10000000, premium: 15270.0 },
];
// interest logic
export const getMonthlyInterestRate = (months) => {
  if (months >= 4 && months <= 6) return 0.015;
  if (months === 7) return 0.0136;
  if (months === 8) return 0.0125;
  if (months === 9) return 0.0117;
  if (months === 10) return 0.011;
  if (months === 11) return 0.0105;
  if (months >= 12 && months <= 60) return 0.01;
  return 0;
};

export function computeREM({
  gross,
  months,
  includeFireInsurance = false,
}) {
  const rate = getMonthlyInterestRate(months);

  const ciFee = 1500;
  const rodFee = gross * 0.03;
  const processingFee = gross * 0.0075;
  const itFee = Math.max(50, gross * 0.0007);
  const pnNotary = 200;

  let fireInsurance = 0;
  if (includeFireInsurance) {
    const row = fireInsuranceTable.find((r) => gross <= r.max);
    fireInsurance = row
      ? row.premium
      : fireInsuranceTable.at(-1).premium;
  }

  const totalDeductions =
    ciFee +
    rodFee +
    processingFee +
    itFee +
    pnNotary +
    fireInsurance;

  const netProceeds = gross - totalDeductions;

  const principal = gross / months;
  const interest = gross * rate;
  const fireAmort = includeFireInsurance ? fireInsurance / months : 0;

  const monthlyAmortization = principal + interest + fireAmort;

  return {
    gross,
    months,
    monthlyAmortization,
    totalDeductions,
    netProceeds,
  };
}
