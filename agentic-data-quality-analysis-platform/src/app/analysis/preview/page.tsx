import React from "react";

export default function DataPreviewPage() {
  return (
    <main className="p-6 max-w-4xl mx-auto">

      {/* File Info */}
      <div className="p-4 rounded-md bg-blue-100 mb-6">
        <p className="font-semibold">File: sales_data.csv (100 rows × 5 columns)</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <p className="mb-1">Analyzing...</p>
        <div className="w-full h-4 bg-gray-200 rounded-md overflow-hidden">
          <div className="h-full w-3/4 bg-blue-500"></div>
        </div>
        <p className="text-right text-sm mt-1">75%</p>
      </div>

      {/* Data Preview Table */}
      <div className="p-4 border rounded-md bg-white mb-6">
        <h3 className="font-semibold mb-3">Data Preview (First 100 rows):</h3>
        <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
| ID | Name     | Email         | Age | City |
|----|----------|---------------|-----|------|
| 1  | John Doe | john@email.com| 32  | NYC  |
| 2  | Jane S   | jane@gmail.com| 28  | LA   |
| 3  | Bob J    | bob@email.com | 45  | Boston |
...
        </pre>
      </div>

      {/* Column Stats */}
      <div className="p-4 border rounded-md bg-gray-50 mb-6">
        <h3 className="font-semibold mb-3">Column Statistics:</h3>
        <pre className="text-sm">
• ID: Integer, 100 unique, 0 missing
• Name: Text, 98 unique, 2 missing
• Email: Text, 99 unique, 1 missing
• Age: Integer, 45 unique, 1 outlier
• City: Text, 0 missing
        </pre>
      </div>

      {/* Initial Quality Overview */}
      <div className="p-4 rounded-md bg-yellow-50 border">
        <h3 className="font-semibold mb-2">Initial Quality Overview</h3>
        <pre className="text-sm">
Schema detected: 5 columns identified
Data types inferred: 2 text, 2 int, 1 email
Null values found: 7 total across 2 columns
Potential issues: 1 outlier detected in “Age”
        </pre>

        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
          Continue to Full Analysis →
        </button>
      </div>

    </main>
  );
}
