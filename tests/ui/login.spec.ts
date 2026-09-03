import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login', () => {
  test('TC01 - Login with valid credentials', async ({ page }) => {
    await page.goto('https://automationexercise.com/');
    
    await page.getByText('Signup / Login').click();

    await expect(page.getByText('Login to your account')).toBeVisible();

    const loginPage = new LoginPage(page);

    await expect (loginPage.loginTitle).toBeVisible();
    await loginPage.login(
        'test@example.com', 
        'Password123'
    );
  });
});