/**
 * fileProcessing.ts
 * - Handles CSV + JSON only
 * - No Excel parsing
 * - Normalizes all outputs to: { rows: [], columns: [] }
 */

export interface ParsedFile {
  rows: any[];
  columns: string[];
}

// -----------------------------
// CSV PARSER
// -----------------------------
function parseCSV(text: string): ParsedFile {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length === 0) {
    return { rows: [], columns: [] };
  }

  const columns = lines[0].split(",").map(col => col.trim());
  const rows = lines.slice(1).map(line => {
    const values = line.split(",");
    const row: any = {};

    columns.forEach((col, i) => {
      row[col] = values[i] ?? "";
    });

    return row;
  });

  return { rows, columns };
}

// -----------------------------
// JSON PARSER
// -----------------------------
function parseJSON(text: string): ParsedFile {
  try {
    const data = JSON.parse(text);

    if (!Array.isArray(data)) {
      throw new Error("JSON root must be an array of objects.");
    }

    const columns = data.length ? Object.keys(data[0]) : [];
    return { rows: data, columns };
  } catch (err) {
    console.error("JSON parsing failed:", err);
    return { rows: [], columns: [] };
  }
}

// -----------------------------
// MAIN HANDLER
// -----------------------------
export async function processFile(file: File): Promise<ParsedFile> {
  const extension = file.name.split(".").pop()?.toLowerCase();
  const text = await file.text();

  switch (extension) {
    case "csv":
      return parseCSV(text);

    case "json":
      return parseJSON(text);

    default:
      throw new Error("Unsupported file type. Please upload CSV or JSON only.");
  }
}
