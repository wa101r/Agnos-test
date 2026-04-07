const OpenAI = require("openai");
require("dotenv").config();

const {
  createSheetsClient,
  ensureSheetExists,
  requireEnv
} = require("./google-sheets-client");
const { parseJUnitXml } = require("./test-results-parser");

function buildPrompt(testCases) {
  const passCount = testCases.filter((test) => test.status === "PASS").length;
  const failCount = testCases.filter((test) => test.status === "FAIL").length;
  const lines = testCases.map(
    (test, index) =>
      `${index + 1}. [${test.status}] ${test.suiteName} -> ${test.testName} (duration: ${test.durationSeconds}s)${
        test.failureMessage ? ` | failure: ${test.failureMessage}` : ""
      }`
  );

  return `
You are writing a concise software testing report in Thai.

Use this execution data:
- Total test cases: ${testCases.length}
- Passed: ${passCount}
- Failed: ${failCount}

Detailed results:
${lines.join("\n")}

Write a professional Thai report with these sections:
1. Summary
2. Scope covered
3. Execution result overview
4. Defects / concerns found
5. Next actions

If there are no failed tests, explicitly state that no failures were found in this automated execution and mention residual risks briefly.
Keep it concise and practical.
  `.trim();
}

async function main() {
  const apiKey = requireEnv("OPENAI_API_KEY");
  const model = process.env.OPENAI_MODEL || "gpt-5-mini";
  const spreadsheetId = requireEnv("GOOGLE_SHEETS_SPREADSHEET_ID");
  const summaryTabName = process.env.GOOGLE_SHEETS_SUMMARY_TAB_NAME || "AI Summary";
  const testCases = parseJUnitXml();

  const client = new OpenAI({ apiKey });
  const prompt = buildPrompt(testCases);

  const response = await client.responses.create({
    model,
    input: prompt
  });

  const reportText = response.output_text?.trim();
  if (!reportText) {
    throw new Error("OpenAI did not return report text.");
  }

  const sheets = await createSheetsClient();
  await ensureSheetExists(sheets, spreadsheetId, summaryTabName);

  const values = [
    ["Generated At", new Date().toISOString()],
    ["Model", model],
    ["Report"],
    [reportText]
  ];

  await sheets.spreadsheets.values.clear({
    spreadsheetId,
    range: `${summaryTabName}!A:D`
  });

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${summaryTabName}!A1`,
    valueInputOption: "RAW",
    requestBody: {
      values
    }
  });

  console.log(`AI report written to "${summaryTabName}"`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
