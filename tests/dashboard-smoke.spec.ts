import { expect, test } from "@playwright/test";
import { DashboardPage } from "../src/pages/DashboardPage";
import { LoginPage } from "../src/pages/LoginPage";

const username = process.env.AGNOS_USERNAME || "test@gmail.com";
const password = process.env.AGNOS_PASSWORD || "12345";

async function loginToDashboard(loginPage: LoginPage): Promise<void> {
  await loginPage.goto();
  await loginPage.assertLoginPageVisible();
  await loginPage.login(username, password);
  await loginPage.assertAuthenticated();
}

test.describe("AI Dashboard smoke flows", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginToDashboard(loginPage);
  });

  test("dashboard shows main controls after login", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await dashboardPage.assertVisible();
  });

  test("status tabs can be opened and keep the dashboard summary visible", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await dashboardPage.openStatusTab("Open");
    const openCount = await dashboardPage.getTotalCases();

    await dashboardPage.openStatusTab("In progress");
    const inProgressCount = await dashboardPage.getTotalCases();

    await dashboardPage.openStatusTab("Completed");
    const completedCount = await dashboardPage.getTotalCases();

    await dashboardPage.openStatusTab("All");
    const allCount = await dashboardPage.getTotalCases();

    expect(openCount).toBeGreaterThanOrEqual(0);
    expect(inProgressCount).toBeGreaterThanOrEqual(0);
    expect(completedCount).toBeGreaterThanOrEqual(0);
    expect(allCount).toBeGreaterThanOrEqual(0);
    await expect(dashboardPage.totalCases).toBeVisible();
  });

  test("search input updates the list view", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const listBefore = await page.locator("body").innerText();

    await dashboardPage.search("Guest");
    await page.waitForTimeout(1000);

    const listAfter = await page.locator("body").innerText();

    expect(listBefore).not.toBe(listAfter);
  });

  test("user can log out from the dashboard", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await dashboardPage.logout();

    await expect(page).toHaveURL(/ai_dashboard\/login/i);
    await expect(page.locator("#Email")).toBeVisible();
    await expect(page.locator("#password")).toBeVisible();
  });

  test("date preset filter updates dashboard results", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const before = await page.locator("body").innerText();

    await dashboardPage.applyDatePreset("Today");
    await page.waitForTimeout(1000);

    const after = await page.locator("body").innerText();

    expect(after).toContain("Today");
    expect(after).toContain("Total cases : 0");
    expect(before).not.toBe(after);
  });

  test("channel filter updates dashboard results", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const before = await page.locator("body").innerText();

    await dashboardPage.applyChannelFilter("Vimut hospital");
    await page.waitForTimeout(1000);

    const after = await page.locator("body").innerText();

    expect(after).toContain("Vimut hospital");
    expect(before).not.toBe(after);
  });

  test("download flow shows success feedback after confirmation", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await dashboardPage.confirmDownload();

    await expect(page.getByText("Download CSV file successfully", { exact: true })).toBeVisible();
  });
});
