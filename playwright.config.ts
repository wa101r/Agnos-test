import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  retries: 1,
  timeout: 30_000,
  outputDir: "test-results",
  expect: {
    timeout: 10_000
  },
  reporter: [
    ["html", { open: "never" }],
    ["junit", { outputFile: "test-results/junit.xml" }],
    ["list"]
  ],
  use: {
    baseURL: process.env.BASE_URL || "https://dev.app.agnoshealth.com",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure"
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"]
      }
    }
  ]
});
