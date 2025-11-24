import AIInsights from "@/src/components/AIInsights";

export default function ResultsPage() {
  return (
    <main className="p-6 max-w-5xl mx-auto">

      {/* Score Box */}
      <div className="flex items-start gap-6">
        <div className="w-28 h-28 bg-orange-400 text-white flex items-center justify-center text-4xl font-bold rounded-xl">
          85
        </div>

        {/* Quality Metrics */}
        <div className="flex-1 bg-gray-50 p-4 border rounded-md">
          <h2 className="font-semibold text-lg mb-3">Quality Metrics:</h2>

          <div className="space-y-4 text-sm">
            <div>
              <p>Completeness: 95%</p>
              <div className="h-3 bg-gray-200 rounded">
                <div className="h-full w-[95%] bg-blue-400 rounded"></div>
              </div>
              <span className="text-gray-600 text-xs">7 missing values across 2 columns</span>
            </div>

            <div>
              <p>Consistency: 80%</p>
              <div className="h-3 bg-gray-200 rounded">
                <div className="h-full w-[80%] bg-blue-400 rounded"></div>
              </div>
              <span className="text-gray-600 text-xs">Format variations in “Email” field</span>
            </div>

            <div>
              <p>Accuracy: 92%</p>
              <div className="h-3 bg-gray-200 rounded">
                <div className="h-full w-[92%] bg-blue-400 rounded"></div>
              </div>
              <span className="text-gray-600 text-xs">1 outlier detected in “Age”</span>
            </div>
          </div>
        </div>
      </div>

      {/* Data Visualizations Box */}
      <div className="mt-8 p-4 border rounded-md bg-white">
        <h3 className="font-semibold mb-3">Data Visualizations:</h3>
        <p className="text-sm text-gray-500">Placeholder chart boxes (no logic yet):</p>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="border h-32 rounded bg-gray-100"></div>
          <div className="border h-32 rounded bg-gray-100"></div>
          <div className="border h-32 rounded bg-gray-100"></div>
        </div>
      </div>

      {/* AI Insights Component */}
      <AIInsights
        loading={false}
        insights={[
          {
            title: "1. Address Missing Values (High Priority)",
            items: ["2 missing in “Name”", "5 missing in “Age”"],
          },
          {
            title: "2. Standardize Email Format (Medium Priority)",
            items: [
              "Some emails use uppercase, others lowercase",
              "Suggested SQL: UPDATE table SET email = LOWER(email);",
            ],
          },
        ]}
      />

    </main>
  );
}
