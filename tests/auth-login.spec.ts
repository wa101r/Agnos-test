import { test } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";

const username = process.env.AGNOS_USERNAME || "test@gmail.com";
const password = process.env.AGNOS_PASSWORD || "12345";

test.describe("AI Dashboard authentication", () => {
  test("registered user can log in to dashboard", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.assertLoginPageVisible();
    await loginPage.login(username, password);
    await loginPage.assertAuthenticated();
  });
});
