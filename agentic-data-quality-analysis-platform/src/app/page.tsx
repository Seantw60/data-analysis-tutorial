"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FileUpload from "@/src/components/FileUpload";
import { processFile } from "@/src/lib/fileProcessing";
import { analyzeDataset } from "@/src/lib/dataAnalysis";

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Path from conversation history (local file). Per instructions, include it as the sample file URL.
  const sampleFilePath = "/mnt/data/screen1.png";

  async function handleFileSelect(file: File) {
    setError(null);
    setLoading(true);

    try {
      // Parse uploaded file (CSV or JSON)
      const parsed = await processFile(file); // { rows, columns }

      // Run analysis on parsed rows
      const analysis = analyzeDataset(parsed.rows);

      // Persist analysis in sessionStorage so preview/results pages can read it
      // (Using sessionStorage to avoid changing route structure or adding backend)
      const payload = {
        fileName: file.name,
        parsed,
        analysis,
      };
      sessionStorage.setItem("dq_analysis", JSON.stringify(payload));

      // Navigate to preview page (static route)
      router.push("/analysis/preview");
    } catch (err: any) {
      console.error("Upload / analysis error:", err);
      setError(err?.message || "An unexpected error occurred while processing the file.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-6 max-w-4xl mx-auto">
      {/* Title Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Upload Your Dataset</h1>
        <p className="text-gray-600">Instant AI-Powered Quality Analysis</p>
      </div>

      {/* Upload Box (uses your FileUpload component) */}
      <div>
        <FileUpload onFileSelect={handleFileSelect} />
        {loading && (
          <div className="mt-3 text-sm text-gray-600">Processing file… please wait.</div>
        )}
        {error && (
          <div className="mt-3 text-sm text-red-600">⚠️ {error}</div>
        )}
      </div>

      {/* Supported formats */}
      <div className="mt-4 text-gray-500 text-sm">
        Supported: <strong>CSV</strong> • <strong>JSON</strong>
      </div>

      {/* Recent Analyses */}
      <div className="mt-10 p-4 border rounded-lg bg-yellow-50">
        <h2 className="font-semibold text-lg mb-3">Recent Analyses:</h2>

        <div className="space-y-2 text-sm">
          <p>
            📄 <b>sales_data.csv</b> — Score: 85 (Good) · Analyzed: 2 hours ago
          </p>
          <p>
            📄 <b>users.json</b> — Score: 72 (Good) · Analyzed: 1 day ago
          </p>
        </div>

        <hr className="my-4" />

        <p className="text-sm text-gray-700">
          <b>Quick Tips:</b><br />
          • Ensure column headers are in the first row
        </p>

        {/* Sample dataset file path (local) per instruction */}
        <div className="mt-4 text-xs text-gray-500">
          <strong>Sample dataset file (local path):</strong>{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">{sampleFilePath}</code>
        </div>
      </div>
    </main>
  );
}
