import { expect, Locator, Page } from "@playwright/test";

export class DashboardPage {
  readonly totalCases: Locator;
  readonly searchInput: Locator;
  readonly channelFilterButton: Locator;
  readonly downloadButton: Locator;

  constructor(private readonly page: Page) {
    this.totalCases = page.getByText(/Total cases\s*:/i);
    this.searchInput = page.locator('input[placeholder*="Patient name"]').first();
    this.channelFilterButton = page.locator("button").filter({ hasText: /^Channel$|^All$|^Agnos application$|^Vimut hospital$|^Vimut telemed$|^Siam smile$/ }).first();
    this.downloadButton = page.locator("button").filter({ hasText: /^Download$/ }).first();
  }

  async assertVisible(): Promise<void> {
    await expect(this.page).toHaveURL(/ai_dashboard\/?$/i);
    await expect(this.page.getByText("Diagnosis List", { exact: true }).first()).toBeVisible();
    await expect(this.page.getByText("Log Out", { exact: true })).toBeVisible();
    await expect(this.downloadButton).toBeVisible();
    await expect(this.page.getByText("Open", { exact: true })).toBeVisible();
    await expect(this.page.getByText("In progress", { exact: true })).toBeVisible();
    await expect(this.page.getByText("Completed", { exact: true })).toBeVisible();
    await expect(this.page.getByText("All", { exact: true })).toBeVisible();
    await expect(this.searchInput).toBeVisible();
    await expect(this.totalCases).toBeVisible();
  }

  async openStatusTab(name: "Open" | "In progress" | "Completed" | "All"): Promise<void> {
    await this.page.getByText(name, { exact: true }).click();
    await expect(this.totalCases).toBeVisible();
  }

  async getTotalCases(): Promise<number> {
    const text = await this.totalCases.textContent();
    const match = text?.match(/(\d+)/);

    if (!match) {
      throw new Error(`Unable to parse total cases from text: ${text}`);
    }

    return Number(match[1]);
  }

  async search(keyword: string): Promise<void> {
    await this.searchInput.fill(keyword);
    await this.page.getByRole("button", { name: /^Search$/i }).click();
  }

  async applyDatePreset(preset: "Today" | "This week" | "This month" | "This year" | "Last week" | "Last 14 days" | "Last month" | "Last 60 days" | "Last 90 days" | "Last year"): Promise<void> {
    await this.page.getByText("Select date", { exact: true }).first().click();
    await this.page.getByText(preset, { exact: true }).click();
    await expect(this.totalCases).toBeVisible();
  }

  async applyChannelFilter(channel: "All" | "Agnos application" | "Vimut hospital" | "Vimut telemed" | "Siam smile"): Promise<void> {
    await this.page.locator("button").filter({ hasText: /^Channel$|^All$|^Agnos application$|^Vimut hospital$|^Vimut telemed$|^Siam smile$/ }).first().click();
    await this.page.getByText(channel, { exact: true }).click();
    await expect(this.totalCases).toBeVisible();
  }

  async confirmDownload(): Promise<void> {
    await this.downloadButton.click();
    await expect(this.page.getByText("ยินยันการดาวน์โหลด", { exact: true })).toBeVisible();
    await this.page.getByText("ยืนยัน", { exact: true }).click();
  }

  async logout(): Promise<void> {
    await this.page.getByText("Log Out", { exact: true }).click();
  }
}
