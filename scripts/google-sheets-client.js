const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");
require("dotenv").config();

function requireEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function resolveCredentialPath() {
  const credentialPath = requireEnv("GOOGLE_APPLICATION_CREDENTIALS");
  return path.resolve(credentialPath);
}

function readServiceAccountEmail() {
  const credentialPath = resolveCredentialPath();
  const raw = fs.readFileSync(credentialPath, "utf8");
  const json = JSON.parse(raw);

  return json.client_email;
}

async function createSheetsClient() {
  const credentialPath = resolveCredentialPath();
  const auth = new google.auth.GoogleAuth({
    keyFile: credentialPath,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  });

  const client = await auth.getClient();
  return google.sheets({ version: "v4", auth: client });
}

async function ensureSheetExists(sheets, spreadsheetId, title) {
  const metadata = await sheets.spreadsheets.get({ spreadsheetId });
  const existing = metadata.data.sheets?.find((sheet) => sheet.properties?.title === title);

  if (existing) {
    return;
  }

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [
        {
          addSheet: {
            properties: {
              title
            }
          }
        }
      ]
    }
  });
}

module.exports = {
  createSheetsClient,
  ensureSheetExists,
  readServiceAccountEmail,
  requireEnv
};
