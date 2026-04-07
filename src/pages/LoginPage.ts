import { expect, Page } from "@playwright/test";

export class LoginPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto("/ai_dashboard/login");
  }

  async login(email: string, password: string): Promise<void> {
    await this.page.locator("#Email").fill(email);
    await this.page.locator("#password").fill(password);
    await this.page.getByRole("button", { name: /log ?in|sign ?in/i }).click();
  }

  async assertLoginPageVisible(): Promise<void> {
    await expect(this.page).toHaveURL(/ai_dashboard\/login/i);
    await expect(this.page.locator("#Email")).toBeVisible();
    await expect(this.page.locator("#password")).toBeVisible();
  }

  async assertAuthenticated(): Promise<void> {
    await expect(this.page).not.toHaveURL(/login|sign[\s_-]?in/i);
  }
}
