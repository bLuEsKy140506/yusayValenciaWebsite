// api/calculate-pdi.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { grossAmount, maturityDate, paymentDate } = req.body;

    if (!grossAmount || !maturityDate || !paymentDate) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const mDate = new Date(maturityDate);
    const pDate = new Date(paymentDate);

    const daysDiff = Math.max(0, (pDate - mDate) / (1000 * 60 * 60 * 24));
    const rate = 0.05; // 5%
    const multiplier = 12 / 365;

    const pdi = grossAmount * multiplier * rate * daysDiff;

    return res.status(200).json({ pdi });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Server error", details: err.message });
  }
}
