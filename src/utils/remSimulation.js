
import { computeREM } from "./remCompute";

export function findREMByMonthly(targetMonthly, months) {
  let best = null;

  for (let gross = 10; gross <= 5_000_000; gross += 10_000) {
    const sim = computeREM({ gross, months });
    const diff = Math.abs(sim.monthlyAmortization - targetMonthly);

    if (!best || diff < best.diff) {
      best = { ...sim, diff };
    }

    if (diff < 50) break; // ₱50 tolerance
  }

  return best;
}

export function findREMByNet(targetNet, months) {
  let best = null;

  for (
    let gross = targetNet;
    gross <= targetNet * 1.5;
    gross += 1_000
  ) {
    const sim = computeREM({ gross, months });
    const diff = Math.abs(sim.netProceeds - targetNet);

    if (!best || diff < best.diff) {
      best = { ...sim, diff };
    }

    if (diff < 100) break; // ₱100 tolerance
  }

  return best;
}
