import { test, expect } from '@playwright/test';
import { loginData } from '../fixtures/testData';
import { LoginPage } from '../pages/LoginPage';

for (const data of loginData) {
  test(`TC Login ${loginData.indexOf(data) + 1} - ${data.scenario}`, async ({ page }) => {
    await page.goto('https://automationexercise.com/');

    await page.getByText('Signup / Login').click();

    await expect(page.getByText('Login to your account')).toBeVisible();

    const loginPage = new LoginPage(page);

    await expect(loginPage.loginTitle).toBeVisible();

    await loginPage.login(data.email, data.password);
  });
}