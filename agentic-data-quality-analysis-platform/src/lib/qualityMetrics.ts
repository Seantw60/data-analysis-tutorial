/**
 * qualityMetrics.ts
 * Core scoring algorithms for data quality.
 *
 * Input: { rows: any[], columns: string[] }
 * Output: { completeness, uniqueness, consistency, outliers, overallScore }
 */

export interface Dataset {
  rows: any[];
  columns: string[];
}

export interface QualityMetrics {
  completeness: number;
  uniqueness: number;
  consistency: number;
  outliers: number;
  overallScore: number;
}

// -----------------------------------------
// COMPLETENESS
// -----------------------------------------
// % of non-null values across entire dataset
function calculateCompleteness(data: Dataset): number {
  const totalCells = data.rows.length * data.columns.length;
  if (totalCells === 0) return 0;

  let missing = 0;

  for (const row of data.rows) {
    for (const col of data.columns) {
      const value = row[col];

      if (
        value === null ||
        value === undefined ||
        value === "" ||
        (typeof value === "string" && value.trim() === "")
      ) {
        missing++;
      }
    }
  }

  return Math.round(((totalCells - missing) / totalCells) * 100);
}

// -----------------------------------------
// UNIQUENESS
// -----------------------------------------
// Mean % of uniqueness across all columns
function calculateUniqueness(data: Dataset): number {
  if (data.columns.length === 0) return 0;

  const scores: number[] = [];

  for (const col of data.columns) {
    const values = data.rows.map(r => r[col]);
    const uniqueCount = new Set(values).size;
    const score = (uniqueCount / values.length) * 100;
    scores.push(score);
  }

  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  return Math.round(avg);
}

// -----------------------------------------
// CONSISTENCY
// -----------------------------------------
// Checks type-stability inside columns
function calculateConsistency(data: Dataset): number {
  if (data.columns.length === 0) return 0;

  let validCount = 0;
  let totalChecks = 0;

  for (const col of data.columns) {
    const values = data.rows.map(r => r[col]).filter(v => v !== null && v !== undefined);

    if (values.length === 0) continue;

    const firstType = typeof values[0];

    for (const v of values) {
      totalChecks++;
      if (typeof v === firstType) {
        validCount++;
      }
    }
  }

  if (totalChecks === 0) return 0;

  return Math.round((validCount / totalChecks) * 100);
}

// -----------------------------------------
// OUTLIERS (simple numeric z-score > 3)
// -----------------------------------------
function calculateOutlierScore(data: Dataset): number {
  let numericColumns = [];

  // Find numeric columns
  for (const col of data.columns) {
    const nums = data.rows
      .map(r => Number(r[col]))
      .filter(n => !isNaN(n));

    if (nums.length > 0) numericColumns.push({ col, nums });
  }

  if (numericColumns.length === 0) return 100; // No numeric columns → no outliers

  let totalValues = 0;
  let outlierCount = 0;

  for (const entry of numericColumns) {
    const { nums } = entry;

    const mean = nums.reduce((a, b) => a + b, 0) / nums.length;
    const variance =
      nums.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / nums.length;
    const std = Math.sqrt(variance);

    for (const n of nums) {
      totalValues++;
      if (std > 0 && Math.abs(n - mean) / std > 3) {
        outlierCount++;
      }
    }
  }

  const safeTotal = totalValues || 1;

  // Outlier score is reverse: fewer outliers = higher score
  const score = 100 - (outlierCount / safeTotal) * 100;
  return Math.max(0, Math.round(score));
}

// -----------------------------------------
// OVERALL SCORE (weighted mean)
// -----------------------------------------
function computeOverallScore(metrics: {
  completeness: number;
  uniqueness: number;
  consistency: number;
  outliers: number;
}): number {
  const { completeness, uniqueness, consistency, outliers } = metrics;

  const score =
    completeness * 0.35 +
    consistency * 0.30 +
    uniqueness * 0.20 +
    outliers * 0.15;

  return Math.round(score);
}

// -----------------------------------------
// PUBLIC API
// -----------------------------------------
export function calculateQualityMetrics(data: Dataset): QualityMetrics {
  const completeness = calculateCompleteness(data);
  const uniqueness = calculateUniqueness(data);
  const consistency = calculateConsistency(data);
  const outliers = calculateOutlierScore(data);

  return {
    completeness,
    uniqueness,
    consistency,
    outliers,
    overallScore: computeOverallScore({
      completeness,
      uniqueness,
      consistency,
      outliers,
    }),
  };
}
