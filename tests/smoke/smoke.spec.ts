import { test, expect } from '@playwright/test';
import { generateUser } from '../utils/testDataUser';

test.describe('SMOKE TEST - Automation Exercise', () => {

  test(
    'SM01 - Verify homepage is accessible',
    {
      tag: '@smoke',
    },
    async ({ page }) => {

      await page.goto('/');

      await expect(page).toHaveURL('https://automationexercise.com/');

      await expect(
        page.getByText('Automation').first()
      ).toBeVisible();
    }
  );


  test(
    'SM02 - User can register and login',
    {
      tag: '@smoke',
    },
    async ({ page, request }) => {

      const user = generateUser();

      // Navigate to Login
      await page.goto('/login');

      await expect(
        page.getByText('New User Signup!')
      ).toBeVisible();

      // Registration
      await page.locator('[data-qa="signup-name"]')
        .fill(user.name);

      await page.locator('[data-qa="signup-email"]')
        .fill(user.email);

      await page.locator('[data-qa="signup-button"]')
        .click();

      await expect(
        page.getByText('Enter Account Information')
      ).toBeVisible();

      // Account information
      await page.locator('#id_gender1').check();

      await page.locator('#password')
        .fill(user.password);

      await page.locator('#days')
        .selectOption('10');

      await page.locator('#months')
        .selectOption('5');

      await page.locator('#years')
        .selectOption('1995');

      await page.locator('#newsletter')
        .check();

      await page.locator('#optin')
        .check();

      await page.locator('#first_name')
        .fill(user.firstName);

      await page.locator('#last_name')
        .fill(user.lastName);

      await page.locator('#company')
        .fill(user.company);

      await page.locator('#address1')
        .fill(user.address);

      await page.locator('#address2')
        .fill(user.address2);

      await page.locator('#country')
        .selectOption({ label: user.country });

      await page.locator('#state')
        .fill(user.state);

      await page.locator('#city')
        .fill(user.city);

      await page.locator('#zipcode')
        .fill(user.zipcode);

      await page.locator('#mobile_number')
        .fill(user.mobileNumber);

      await page.locator('[data-qa="create-account"]')
        .click();

      // Verify account created
      await expect(
        page.getByText('Account Created!')
      ).toBeVisible();

      await page.getByText('Continue').click();

      await expect(
        page.getByText(`Logged in as ${user.name}`)
      ).toBeVisible();

      // Logout
      await page.getByText('Logout').click();

      // Login again
      await page.goto('/login');

      await page.locator('[data-qa="login-email"]')
        .fill(user.email);

      await page.locator('[data-qa="login-password"]')
        .fill(user.password);

      await page.locator('[data-qa="login-button"]')
        .click();

      await expect(
        page.getByText(`Logged in as ${user.name}`)
      ).toBeVisible();

      // Cleanup account using API
      await request.delete('/api/deleteAccount', {
        form: {
          email: user.email,
          password: user.password,
        },
      });
    }
  );


  test(
    'SM03 - Verify products page',
    {
      tag: '@smoke',
    },
    async ({ page }) => {

      await page.goto('/products');

      await expect(
        page.getByText('All Products')
      ).toBeVisible();

      const products = page.locator('.features_items .product-image-wrapper');

      await expect(products.first()).toBeVisible();

      expect(await products.count()).toBeGreaterThan(0);
    }
  );


  test(
    'SM04 - Search for a product',
    {
      tag: '@smoke',
    },
    async ({ page }) => {

      await page.goto('/products');

      await expect(
        page.getByText('All Products')
      ).toBeVisible();

      await page.locator('#search_product')
        .fill('Blue Top');

      await page.locator('#submit_search')
        .click();

      await expect(
        page.getByText('Searched Products')
      ).toBeVisible();

      await expect(
        page.getByText('Blue Top').first()
      ).toBeVisible();
    }
  );


  test(
    'SM05 - Add product to cart',
    {
      tag: '@smoke',
    },
    async ({ page }) => {

      await page.goto('/products');

      const firstProduct =
        page.locator('.productinfo').first();

      await firstProduct
        .getByText('Add to cart')
        .click();

      await expect(
        page.getByText('Added!')
      ).toBeVisible();

      await page.getByText('View Cart').click();

      await expect(
        page.getByText('Shopping Cart')
      ).toBeVisible();

      const cartItems =
        page.locator('#cart_info_table tbody tr');

      await expect(cartItems.first()).toBeVisible();
    }
  );


  test(
    'SM06 - Verify checkout flow',
    {
      tag: '@smoke',
    },
    async ({ page, request }) => {

      const user = generateUser();

      // Create account through API
      const createResponse =
        await request.post('/api/createAccount', {
          form: {
            name: user.name,
            email: user.email,
            password: user.password,
            title: 'Mr',
            birth_date: '10',
            birth_month: '5',
            birth_year: '1995',
            firstname: user.firstName,
            lastname: user.lastName,
            company: user.company,
            address1: user.address,
            address2: user.address2,
            country: user.country,
            zipcode: user.zipcode,
            state: user.state,
            city: user.city,
            mobile_number: user.mobileNumber,
          },
        });

      expect(createResponse.status()).toBe(200);

      // Login UI
      await page.goto('/login');

      await page.locator('[data-qa="login-email"]')
        .fill(user.email);

      await page.locator('[data-qa="login-password"]')
        .fill(user.password);

      await page.locator('[data-qa="login-button"]')
        .click();

      await expect(
        page.getByText(`Logged in as ${user.name}`)
      ).toBeVisible();

      // Add product
      await page.goto('/products');

      await page.locator('.productinfo')
        .first()
        .getByText('Add to cart')
        .click();

      await page.getByText('View Cart').click();

      await page.getByText('Proceed To Checkout')
        .click();

      await expect(
        page.getByText('Address Details')
      ).toBeVisible();

      await expect(
        page.getByText('Review Your Order')
      ).toBeVisible();

      // Cleanup
      await request.delete('/api/deleteAccount', {
        form: {
          email: user.email,
          password: user.password,
        },
      });
    }
  );

});