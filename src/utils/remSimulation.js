
import { computeREM } from "./remCompute";

export function findREMByNet(targetNet, months) {
  let best = null;

  const startGross = Math.max(50_000, targetNet);
  const maxGross = targetNet * 2; // wider search

  for (let gross = startGross; gross <= maxGross; gross += 10_000) {
    const sim = computeREM({ gross, months });
    const diff = Math.abs(sim.netProceeds - targetNet);

    if (!best || diff < best.diff) {
      best = { ...sim, diff };
    }

    if (diff < 100) break;
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
