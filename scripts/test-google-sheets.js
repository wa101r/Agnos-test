const {
  createSheetsClient,
  ensureSheetExists,
  readServiceAccountEmail,
  requireEnv
} = require("./google-sheets-client");

async function main() {
  const spreadsheetId = requireEnv("GOOGLE_SHEETS_SPREADSHEET_ID");
  const tabName = process.env.GOOGLE_SHEETS_TAB_NAME || "Test Results";
  const sheets = await createSheetsClient();

  await ensureSheetExists(sheets, spreadsheetId, tabName);

  const values = [
    ["Connection Status", "Timestamp", "Service Account"],
    ["CONNECTED", new Date().toISOString(), readServiceAccountEmail()]
  ];

  await sheets.spreadsheets.values.clear({
    spreadsheetId,
    range: `${tabName}!A:C`
  });

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${tabName}!A1`,
    valueInputOption: "RAW",
    requestBody: {
      values
    }
  });

  console.log(`Connected to spreadsheet ${spreadsheetId}`);
  console.log(`Wrote connection test rows to tab "${tabName}"`);
  console.log(`Share your Google Sheet with: ${readServiceAccountEmail()}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
