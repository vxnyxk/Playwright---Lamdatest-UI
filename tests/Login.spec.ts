import { test, expect } from '@playwright/test';

test('Login Function', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');
  await page.locator("#username").fill("tomsmith");
  await page.locator("#password").fill("SuperSecretPassword!");
  await page.getByRole("button", { name: "Login" }).click();
});

