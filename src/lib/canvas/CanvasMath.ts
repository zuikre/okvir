// High-Precision Canvas Coordinates & Statistical Diagnostics Engine
// Grounded in Distill.pub, TensorFlow Playground, and Observable HQ standards

export interface Margins {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface DomainBounds {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}

export interface DataPoint {
  x: number;
  y: number;
  id?: string;
  cluster?: number;
}

export interface PointDiagnostics {
  yHat: number;
  residual: number;
  leverage: number;        // h_ii (hat matrix diagonal)
  cooksDistance: number;   // D_i
  isHighLeverage: boolean; // h_ii > 4/n
  isInfluential: boolean;  // D_i > 4/n
}

export interface OLSSummary {
  n: number;
  slope: number;
  intercept: number;
  r2: number;
  rss: number;
  tss: number;
  mse: number;
  xMean: number;
  yMean: number;
  diagnostics: PointDiagnostics[];
}

export class CanvasCoordinateTransformer {
  constructor(
    public bounds: DomainBounds,
    public margins: Margins = { top: 24, right: 24, bottom: 24, left: 24 }
  ) {}

  public getPlotDimensions(width: number, height: number) {
    const plotW = Math.max(1, width - this.margins.left - this.margins.right);
    const plotH = Math.max(1, height - this.margins.top - this.margins.bottom);
    return { plotW, plotH };
  }

  public dataToScreen(x: number, y: number, width: number, height: number) {
    const { plotW, plotH } = this.getPlotDimensions(width, height);
    const ux = (x - this.bounds.xMin) / (this.bounds.xMax - this.bounds.xMin);
    const uy = (y - this.bounds.yMin) / (this.bounds.yMax - this.bounds.yMin);

    return {
      px: this.margins.left + ux * plotW,
      py: this.margins.top + (1 - uy) * plotH,
    };
  }

  public screenToData(px: number, py: number, width: number, height: number, clamp = true) {
    const { plotW, plotH } = this.getPlotDimensions(width, height);
    let ux = (px - this.margins.left) / plotW;
    let uy = 1 - (py - this.margins.top) / plotH;

    if (clamp) {
      ux = Math.max(0, Math.min(1, ux));
      uy = Math.max(0, Math.min(1, uy));
    }

    return {
      x: Number((this.bounds.xMin + ux * (this.bounds.xMax - this.bounds.xMin)).toFixed(2)),
      y: Number((this.bounds.yMin + uy * (this.bounds.yMax - this.bounds.yMin)).toFixed(2)),
    };
  }
}

// Compute full OLS with leverage, Cook's distance, and diagnostics
export function computeFullOLS(points: DataPoint[]): OLSSummary | null {
  const n = points.length;
  if (n < 3) return null;

  let sumX = 0;
  let sumY = 0;
  for (let i = 0; i < n; i++) {
    sumX += points[i].x;
    sumY += points[i].y;
  }
  const xMean = sumX / n;
  const yMean = sumY / n;

  let sxx = 0;
  let syy = 0;
  let sxy = 0;
  for (let i = 0; i < n; i++) {
    const dx = points[i].x - xMean;
    const dy = points[i].y - yMean;
    sxx += dx * dx;
    syy += dy * dy;
    sxy += dx * dy;
  }

  if (Math.abs(sxx) < 1e-9) return null;

  const slope = sxy / sxx;
  const intercept = yMean - slope * xMean;

  let rss = 0;
  const residuals = new Float64Array(n);
  const yHats = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    const yHat = slope * points[i].x + intercept;
    const res = points[i].y - yHat;
    yHats[i] = yHat;
    residuals[i] = res;
    rss += res * res;
  }

  const tss = syy;
  const r2 = tss > 1e-9 ? Math.max(0, 1 - rss / tss) : 1;
  const mse = n > 2 ? rss / (n - 2) : 0;

  const leverageThreshold = 4 / n;
  const cooksThreshold = 4 / n;

  const diagnostics: PointDiagnostics[] = points.map((p, i) => {
    const dx = p.x - xMean;
    const hii = 1 / n + (dx * dx) / sxx;
    const res = residuals[i];

    let d_i = 0;
    const denom = (1 - hii) * (1 - hii);
    if (mse > 1e-9 && denom > 1e-9) {
      d_i = ((res * res) / (2 * mse)) * (hii / denom);
    }

    return {
      yHat: yHats[i],
      residual: res,
      leverage: hii,
      cooksDistance: d_i,
      isHighLeverage: hii > leverageThreshold,
      isInfluential: d_i > cooksThreshold,
    };
  });

  return { n, slope, intercept, r2, rss, tss, mse, xMean, yMean, diagnostics };
}

// Compute Leave-One-Out counterfactual parameters for ghost line
export function computeLeaveOneOutOLS(
  points: DataPoint[],
  excludeIdx: number
): { slope: number; intercept: number } | null {
  const filtered = points.filter((_, idx) => idx !== excludeIdx);
  const res = computeFullOLS(filtered);
  if (!res) return null;
  return { slope: res.slope, intercept: res.intercept };
}

// Presets
export const OLS_PRESETS = {
  standard: [
    { x: 2.0, y: 3.8 }, { x: 3.0, y: 4.5 }, { x: 3.5, y: 5.2 }, { x: 4.0, y: 4.2 },
    { x: 4.8, y: 5.8 }, { x: 5.2, y: 5.0 }, { x: 6.0, y: 6.5 }, { x: 6.5, y: 5.9 },
    { x: 7.0, y: 7.1 }, { x: 7.8, y: 6.8 }, { x: 8.2, y: 7.4 }, { x: 9.0, y: 8.2 },
    { x: 9.5, y: 7.6 }, { x: 10.0, y: 8.5 }, { x: 10.5, y: 9.1 }, { x: 11.2, y: 8.4 },
    { x: 12.0, y: 9.5 }, { x: 12.8, y: 10.1 }, { x: 13.5, y: 9.6 }, { x: 14.0, y: 10.8 },
    { x: 14.8, y: 10.2 }, { x: 15.5, y: 11.5 }, { x: 16.0, y: 11.0 }, { x: 16.8, y: 12.1 },
    { x: 17.5, y: 12.4 },
  ],
  highLeverage: [
    { x: 3.0, y: 3.5 }, { x: 3.5, y: 4.0 }, { x: 4.0, y: 3.8 }, { x: 4.5, y: 4.5 },
    { x: 5.0, y: 4.8 }, { x: 5.5, y: 5.0 }, { x: 6.0, y: 5.4 }, { x: 6.5, y: 5.8 },
    { x: 7.0, y: 6.1 }, { x: 7.5, y: 6.4 }, { x: 8.0, y: 6.9 }, { x: 8.5, y: 7.2 },
    // Extreme high leverage point on far right pulling line down
    { x: 18.5, y: 2.2, id: 'outlier' },
  ],
  simpsonsParadox: [
    // Subgroup 1: Young cohort (Internal slope negative, located top-left)
    { x: 2.5, y: 12.0, cluster: 0 }, { x: 3.2, y: 11.2, cluster: 0 }, { x: 4.0, y: 10.5, cluster: 0 }, { x: 4.8, y: 9.6, cluster: 0 }, { x: 5.5, y: 8.8, cluster: 0 },
    // Subgroup 2: Middle cohort (Internal slope negative, located center)
    { x: 7.5, y: 9.0, cluster: 1 }, { x: 8.2, y: 8.1, cluster: 1 }, { x: 9.0, y: 7.4, cluster: 1 }, { x: 9.8, y: 6.6, cluster: 1 }, { x: 10.5, y: 5.8, cluster: 1 },
    // Subgroup 3: Senior cohort (Internal slope negative, located bottom-right)
    { x: 12.5, y: 6.0, cluster: 2 }, { x: 13.2, y: 5.2, cluster: 2 }, { x: 14.0, y: 4.5, cluster: 2 }, { x: 14.8, y: 3.7, cluster: 2 }, { x: 15.5, y: 2.9, cluster: 2 },
  ],
  heteroscedastic: [
    { x: 2.0, y: 4.0 }, { x: 2.5, y: 4.2 }, { x: 3.0, y: 4.6 }, { x: 3.5, y: 4.9 },
    { x: 5.0, y: 4.2 }, { x: 5.0, y: 6.8 }, { x: 7.0, y: 3.8 }, { x: 7.0, y: 8.2 },
    { x: 10.0, y: 2.5 }, { x: 10.0, y: 10.5 }, { x: 13.0, y: 1.5 }, { x: 13.0, y: 12.8 },
    { x: 16.0, y: 0.8 }, { x: 16.0, y: 14.2 },
  ],
};
