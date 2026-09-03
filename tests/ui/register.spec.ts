import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';

test.describe('Register', () => {
  test('TC01 - Register with valid credentials', async ({ page }) => {
    await page.goto('https://automationexercise.com/');
    await page.getByText('Signup / Login').click();
    await expect(page.getByText('New User Signup!')).toBeVisible();

    const registerPage = new RegisterPage(page);

    await registerPage.register('Alfiyan D', 'alfiyandzz@example.com');

    await registerPage.selectTitleGender('Mr');
    await registerPage.fillPersonalInformation('Password123', '1', 'January', '1990');
    await registerPage.fillAddressInformation(
      'John', 
      'Doe', 
      'Example Company', 
      '123 Main St', 
      'United States', 
      'California', 
      'Los Angeles', 
      '90001', 
      '+1234567890'
    );

await expect (registerPage.accountCreatedTitle).toBeVisible();
  });
});
