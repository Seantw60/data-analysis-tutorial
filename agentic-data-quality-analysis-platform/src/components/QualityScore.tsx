"use client";

import React from "react";

interface Metric {
  label: string;
  value: number; // percentage
  note: string;  // small gray subtitle
}

interface QualityScoreProps {
  score: number;
  metrics: Metric[];
}

export default function QualityScore({ score, metrics }: QualityScoreProps) {
  return (
    <div className="flex items-start gap-6">
      
      {/* Big Score Box */}
      <div className="w-28 h-28 bg-orange-400 text-white flex items-center justify-center text-4xl font-bold rounded-xl">
        {score}
      </div>

      {/* Metrics List */}
      <div className="flex-1 bg-gray-50 p-4 border rounded-md">
        <h2 className="font-semibold text-lg mb-3">Quality Metrics:</h2>

        <div className="space-y-4 text-sm">
          {metrics.map((m, i) => (
            <div key={i}>
              <p>{m.label}: {m.value}%</p>

              <div className="h-3 bg-gray-200 rounded">
                <div
                  style={{ width: `${m.value}%` }}
                  className="h-full bg-blue-400 rounded"
                ></div>
              </div>

              <span className="text-gray-600 text-xs">{m.note}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
