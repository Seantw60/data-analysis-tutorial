/**
 * DataTypes.ts
 * Centralized TypeScript interfaces used across the app.
 * Matches the structure of:
 * - fileProcessing.ts
 * - dataAnalysis.ts
 * - qualityMetrics.ts
 * - aiIntegration.ts
 */

export interface ParsedFile {
  rows: any[];            // raw row objects
  columns: string[];      // column names
}

/**
 * Dataset passed into the analysis engine
 */
export interface Dataset {
  rows: any[];
  columns: string[];
}

/**
 * Column-level stats used on:
 * - Data Preview Page
 * - Detailed Insights Page
 */
export interface ColumnStats {
  column: string;
  type: string;
  nulls: number;
  unique: number;
  outliers: number;
}

/**
 * Metrics returned by qualityMetrics.ts
 */
export interface QualityMetrics {
  completeness: number;   // %
  uniqueness: number;     // %
  consistency: number;    // %
  outliers: number;       // %
  overallScore: number;   // weighted %
}

/**
 * Full analysis output passed to Analysis Results Page
 */
export interface FullAnalysisResult {
  fileName: string;
  dataset: Dataset;
  columns: ColumnStats[];
  quality: QualityMetrics;
  issues: string[];       // simple list for AI + UI
}

/**
 * AI Insights structure returned from aiIntegration.ts
 */
export interface AISection {
  title: string;
  items: string[];
}
