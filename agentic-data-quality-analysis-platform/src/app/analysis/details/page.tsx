import React from "react";

export default function DetailedInsightsPage() {
  return (
    <main className="p-6 max-w-4xl mx-auto">

      {/* Name Column */}
      <div className="mb-6 border rounded-md bg-yellow-100 p-4">
        <p className="font-semibold">▼ Column: Name (Text) — 2 Issues Found</p>
        <hr className="my-3" />

        <pre className="text-sm">
Type: Text (String)
Missing Values: 2 out of 100 (2%)
Unique Values: 98
Duplicates: 0

Suggested Fixes:
1. Fill missing with “Unknown”
2. Standardize to Title Case
        </pre>
      </div>

      {/* Age Column */}
      <div className="mb-6 border rounded-md bg-red-100 p-4">
        <p className="font-semibold">▼ Column: Age (Integer) — 6 Issues Found</p>
        <hr className="my-3" />

        <pre className="text-sm">
Type: Integer (Numeric)
Missing Values: 5
Unique Values: 45
Outliers: 1 (Age 150)
Range: 15–80 (expected 18–100)

Suggested Fixes:
1. Remove or correct outlier
2. Fill missing values with mean (53)
        </pre>
      </div>

      {/* Email - No Issues */}
      <div className="mb-6 border rounded-md bg-green-100 p-4">
        <p className="font-semibold">▶ Column: Email (Text) — No Issues ✓</p>
      </div>

      {/* City - No Issues */}
      <div className="mb-6 border rounded-md bg-blue-100 p-4">
        <p className="font-semibold">▶ Column: City (Text) — No Issues ✓</p>
      </div>

    </main>
  );
}
