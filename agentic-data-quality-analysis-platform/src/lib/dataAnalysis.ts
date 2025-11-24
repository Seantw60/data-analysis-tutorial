import { calculateQualityMetrics } from "@/src/lib/qualityMetrics";

/** TYPES */
export interface ColumnStat {
  type: string;
  nulls: number;
  unique: number;
  outliers: number;
}

export interface AnalysisResult {
  columns: string[];
  rows: any[];
  stats: Record<string, ColumnStat>;
  issues: string[];
  qualityScore: number;
  metrics: {
    completeness: number;
    consistency: number;
    accuracy: number;
  };
}

/** Detect simple outliers using z-score */
function detectOutliers(values: number[]): number {
  if (values.length < 3) return 0;

  const mean =
    values.reduce((a, b) => a + b, 0) / values.length;

  const sd = Math.sqrt(
    values.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) /
      values.length
  );

  return values.filter((v) => Math.abs(v - mean) > 2.5 * sd).length;
}

/** Infer basic data type of a column */
function inferType(value: any): string {
  if (value === null || value === undefined || value === "") return "null";
  if (!isNaN(Number(value))) return "number";
  if (String(value).includes("@")) return "email";
  return "string";
}

/** MAIN ANALYSIS FUNCTION */
export function analyzeDataset(rows: any[]): AnalysisResult {
  if (!rows || rows.length === 0) {
    return {
      columns: [],
      rows: [],
      stats: {},
      issues: ["Empty dataset"],
      qualityScore: 0,
      metrics: {
        completeness: 0,
        consistency: 0,
        accuracy: 0,
      },
    };
  }

  const columns = Object.keys(rows[0]);
  const stats: Record<string, ColumnStat> = {};
  const issues: string[] = [];

  for (const col of columns) {
    const values = rows.map((r) => r[col]);

    const nulls = values.filter(
      (v) => v === null || v === undefined || v === ""
    ).length;

    const inferredTypes = values
      .filter((v) => v !== null && v !== undefined && v !== "")
      .map((v) => inferType(v));

    const dominantType =
      inferredTypes.length === 0
        ? "unknown"
        : mostCommon(inferredTypes);

    const unique = new Set(
      values.filter((v) => v !== "" && v !== null && v !== undefined)
    ).size;

    const numericValues = values
      .map((v) => Number(v))
      .filter((v) => !isNaN(v));

    const outliers =
      dominantType === "number" ? detectOutliers(numericValues) : 0;

    stats[col] = {
      type: dominantType,
      nulls,
      unique,
      outliers,
    };

    if (nulls > 0) {
      issues.push(`${col} has ${nulls} missing values`);
    }
    if (outliers > 0) {
      issues.push(`${col} has ${outliers} outliers`);
    }
  }

  // Quality metrics from another module
  const metrics = calculateQualityMetrics(rows, stats);

  const qualityScore = Math.round(
    (metrics.completeness +
      metrics.consistency +
      metrics.accuracy) /
      3
  );

  return {
    columns,
    rows,
    stats,
    issues,
    qualityScore,
    metrics,
  };
}

/** Helper — get most common type */
function mostCommon(arr: string[]): string {
  const counts: Record<string, number> = {};
  arr.forEach((val) => (counts[val] = (counts[val] || 0) + 1));
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}
 