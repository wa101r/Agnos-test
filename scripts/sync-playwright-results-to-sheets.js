const {
  createSheetsClient,
  ensureSheetExists,
  requireEnv
} = require("./google-sheets-client");
const { parseJUnitXml } = require("./test-results-parser");

async function main() {
  const spreadsheetId = requireEnv("GOOGLE_SHEETS_SPREADSHEET_ID");
  const tabName = process.env.GOOGLE_SHEETS_TAB_NAME || "Test Results";

  const sheets = await createSheetsClient();
  await ensureSheetExists(sheets, spreadsheetId, tabName);

  const rows = parseJUnitXml().map((row) => [
    row.suiteName,
    row.testName,
    row.status,
    row.durationSeconds,
    row.failureMessage,
    new Date().toISOString()
  ]);
  const header = [["Suite", "Test Case", "Status", "Duration (s)", "Failure Message", "Synced At"]];
  const values = header.concat(rows);

  await sheets.spreadsheets.values.clear({
    spreadsheetId,
    range: `${tabName}!A:F`
  });

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${tabName}!A1`,
    valueInputOption: "RAW",
    requestBody: {
      values
    }
  });

  console.log(`Synced ${rows.length} Playwright results to "${tabName}"`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
