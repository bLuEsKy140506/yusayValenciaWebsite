import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/api/calculate-pdi", (req, res) => {
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

    res.status(200).json({ pdi });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

const PORT = 5173; // or 5000 if 5173 is used by Vite
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
