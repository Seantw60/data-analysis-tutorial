"use client";

import React from "react";

interface DataPreviewProps {
  data: any[]; // array of row objects
  columns: string[];
  stats: {
    [key: string]: {
      type: string;
      nulls: number;
    };
  };
  qualityScore: number;
}

export default function DataPreview({
  data,
  columns,
  stats,
  qualityScore,
}: DataPreviewProps) {
  return (
    <div className="p-6 max-w-6xl mx-auto">

      {/* Top Section */}
      <div className="flex items-start gap-6">

        {/* Quality Score Box */}
        <div className="w-28 h-28 bg-orange-400 text-white flex items-center justify-center text-4xl font-bold rounded-xl">
          {qualityScore}
        </div>

        {/* Column Statistics */}
        <div className="flex-1 bg-gray-50 p-4 border rounded-md">
          <h2 className="font-semibold text-lg mb-3">Column Statistics</h2>

          <div className="grid grid-cols-2 gap-3 text-sm">
            {columns.map((col) => (
              <div key={col} className="p-2 border rounded bg-white">
                <p className="font-semibold">{col}</p>
                <p className="text-gray-600 text-xs">Type: {stats[col]?.type}</p>
                <p className="text-gray-600 text-xs">
                  Nulls: {stats[col]?.nulls}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="mt-8 bg-white border rounded-md p-4 overflow-auto">
        <h3 className="font-semibold mb-4">Dataset Preview (First 100 Rows)</h3>

        <table className="w-full text-sm border">
          <thead>
            <tr className="bg-gray-100 text-left">
              {columns.map((col) => (
                <th key={col} className="p-2 border font-semibold">
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.slice(0, 100).map((row, i) => (
              <tr key={i} className="border-b">
                {columns.map((col) => (
                  <td key={col} className="p-2 border text-xs">
                    {String(row[col] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {data.length > 100 && (
          <p className="text-gray-500 text-xs mt-2">
            Showing first 100 of {data.length} rows.
          </p>
        )}
      </div>
    </div>
  );
}
