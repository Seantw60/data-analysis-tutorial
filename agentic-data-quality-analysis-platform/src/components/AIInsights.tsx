"use client";

import React from "react";

interface AIInsightItem {
  title: string;
  items: string[];
}

interface AIInsightsProps {
  loading?: boolean;
  error?: string | null;
  insights?: AIInsightItem[];
}

export default function AIInsights({
  loading = false,
  error = null,
  insights = [],
}: AIInsightsProps) {
  return (
    <div className="mt-8 p-4 bg-yellow-50 border rounded-md">
      <h3 className="font-semibold text-lg mb-4">AI-Powered Insights:</h3>

      {/* Loading State */}
      {loading && (
        <div className="text-sm text-gray-600 animate-pulse">
          Generating insights...
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-sm text-red-600">
          ⚠️ Error loading AI insights: {error}
        </div>
      )}

      {/* Insights Display */}
      {!loading && !error && insights.length > 0 && (
        <div className="space-y-4 text-sm">
          {insights.map((section, index) => (
            <div key={index}>
              <p className="font-semibold">{section.title}</p>
              {section.items.map((line, i) => (
                <p key={i}>• {line}</p>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && insights.length === 0 && (
        <p className="text-sm text-gray-600">No insights available.</p>
      )}
    </div>
  );
}
