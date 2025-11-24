"use client";

import React from "react";

export default function DataVisualizations() {
  return (
    <div className="mt-8 p-4 border rounded-md bg-white">
      <h3 className="font-semibold mb-3">Data Visualizations:</h3>
      <p className="text-sm text-gray-500">Placeholder chart boxes (no logic yet):</p>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="border h-32 rounded bg-gray-100"></div>
        <div className="border h-32 rounded bg-gray-100"></div>
        <div className="border h-32 rounded bg-gray-100"></div>
      </div>
    </div>
  );
}
