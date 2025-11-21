import React from "react";

export default function HomePage() {
  return (
    <main className="p-6 max-w-4xl mx-auto">
      {/* Title Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Upload Your Dataset</h1>
        <p className="text-gray-600">Instant AI-Powered Quality Analysis</p>
      </div>

      {/* Upload Box */}
      <div className="border-2 border-dashed border-purple-300 rounded-xl p-10 text-center bg-purple-50">
        <p className="text-purple-500 mb-4">📤 Drag & Drop File Here</p>
        <p className="text-gray-500 mb-3">or</p>

        <button className="px-4 py-2 rounded-md bg-purple-600 text-white">
          Choose File
        </button>

        <p className="mt-4 text-gray-500 text-sm">
          Supported: CSV • JSON • Excel
        </p>
      </div>

      {/* Recent Analyses */}
      <div className="mt-10 p-4 border rounded-lg bg-yellow-50">
        <h2 className="font-semibold text-lg mb-3">Recent Analyses:</h2>

        <div className="space-y-2 text-sm">
          <p>📄 <b>sales_data.csv</b> — Score: 85 (Good) · Analyzed: 2 hours ago</p>
          <p>📄 <b>users.json</b> — Score: 72 (Good) · Analyzed: 1 day ago</p>
        </div>

        <hr className="my-4" />

        <p className="text-sm text-gray-700">
          <b>Quick Tips:</b><br />
          • Ensure column headers are in the first row
        </p>
      </div>
    </main>
  );
}
