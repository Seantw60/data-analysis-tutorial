import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export interface AISection {
  title: string;
  items: string[];
}

interface InsightRequest {
  columns: string[]; // column names
  stats: {
    [key: string]: {
      type: string;
      nulls: number;
      unique?: number;
      outliers?: number;
    };
  };
  qualityScore: number;
  issues: string[]; // list of detected issues
}

export async function generateInsights(data: InsightRequest): Promise<AISection[]> {
  const prompt = `
You are a data quality assistant. Generate short, clear insights for business users.

Dataset Information:
- Columns: ${data.columns.join(", ")}
- Quality Score: ${data.qualityScore}

Column Stats:
${Object.entries(data.stats)
  .map(
    ([col, s]) =>
      `• ${col}: type=${s.type}, nulls=${s.nulls}, unique=${s.unique ?? "?"}, outliers=${s.outliers ?? 0}`
  )
  .join("\n")}

Detected Issues:
${data.issues.length ? data.issues.map(i => `• ${i}`).join("\n") : "No major issues"}

Provide insights in this JSON structure:
[
  {
    "title": "1. Issue Title Here",
    "items": ["bullet point", "bullet point"]
  }
]
`;

  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    temperature: 0,
    response_format: { type: "json_object" },
    messages: [{ role: "user", content: prompt }],
  });

  try {
    // The assistant responds with an object containing a property like: { insights: [...] }
    const parsed = JSON.parse(response.choices[0].message.content || "{}");

    if (Array.isArray(parsed.insights)) {
      return parsed.insights;
    }

    // If model returns array directly
    if (Array.isArray(parsed)) {
      return parsed;
    }

    return [];
  } catch (err) {
    console.error("AI parsing error:", err);
    return [];
  }
}
