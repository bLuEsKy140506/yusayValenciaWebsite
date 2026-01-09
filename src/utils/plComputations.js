// STRAIGHT NEW LOAN
export function computeNewLoan(monthly, months) {
  const gross = monthly * months;

  const interest = gross * months * 0.01;
  const serviceFee = 400;
  const rfpl = (gross / 1000) * 2.5 * months;
  const atmCharges = months * 15;
  const itFee = gross <= 100000 ? 50 : 0.0005 * gross;
  const notarial = 200;

  const totalDeductions =
    interest +
    serviceFee +
    rfpl +
    atmCharges +
    itFee +
    notarial;

  return {
    gross,
    netProceeds: gross - totalDeductions,
  };
}

// EXTENSION (PLExtensionCalculator logic)
export function computeExtension(monthly, remaining, extended) {
  const gross = monthly * extended;

  const interest =
    gross * (0.01 * (remaining + extended));
  const serviceFee = 200;
  const cfPayable =
    (gross / 1000) * 2.5 * (remaining + extended);
  const itFee = gross <= 100000 ? 50 : 50 * Math.ceil(gross / 100000);
  const atmCharges = 15 * extended;
  const notarial = 200;

  const totalDeductions =
    interest +
    serviceFee +
    cfPayable +
    itFee +
    atmCharges +
    notarial;

  return {
    gross,
    netProceeds: gross - totalDeductions,
  };
}
