import { test, expect } from '@playwright/test';
import { generateUser } from '../utils/testDataUser';


test.describe('REGRESSION TEST - Automation Exercise', () => {


  test(
    'REG01 - Login with invalid credentials',
    {
      tag: '@regression',
    },
    async ({ page }) => {

      await page.goto('/login');

      await page.locator('[data-qa="login-email"]')
        .fill('invalid@example.com');

      await page.locator('[data-qa="login-password"]')
        .fill('WrongPassword123');

      await page.locator('[data-qa="login-button"]')
        .click();

      await expect(
        page.getByText(
          'Your email or password is incorrect!'
        )
      ).toBeVisible();
    }
  );


  test(
    'REG02 - Register new user',
    {
      tag: '@regression',
    },
    async ({ page, request }) => {

      const user = generateUser();

      await page.goto('/login');

      await page.locator('[data-qa="signup-name"]')
        .fill(user.name);

      await page.locator('[data-qa="signup-email"]')
        .fill(user.email);

      await page.locator('[data-qa="signup-button"]')
        .click();

      await expect(
        page.getByText('Enter Account Information')
      ).toBeVisible();

      await page.locator('#id_gender1').check();

      await page.locator('#password')
        .fill(user.password);

      await page.locator('#days')
        .selectOption('10');

      await page.locator('#months')
        .selectOption('5');

      await page.locator('#years')
        .selectOption('1995');

      await page.locator('#first_name')
        .fill(user.firstName);

      await page.locator('#last_name')
        .fill(user.lastName);

      await page.locator('#company')
        .fill(user.company);

      await page.locator('#address1')
        .fill(user.address);

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

      await expect(
        page.getByText('Account Created!')
      ).toBeVisible();

      await page.getByText('Continue').click();

      await expect(
        page.getByText(`Logged in as ${user.name}`)
      ).toBeVisible();

      // Cleanup
      await page.getByText('Delete Account').click();

      await expect(
        page.getByText('Account Deleted!')
      ).toBeVisible();
    }
  );


  test(
    'REG03 - Verify product details',
    {
      tag: '@regression',
    },
    async ({ page }) => {

      await page.goto('/products');

      await page
        .locator('a[href="/product_details/1"]')
        .click();

      await expect(
        page.getByText('Blue Top')
      ).toBeVisible();

      await expect(
        page.getByText(/Category:/)
      ).toBeVisible();

      await expect(
        page.getByText(/Rs\./)
      ).toBeVisible();

      await expect(
        page.getByText(/Availability:/)
      ).toBeVisible();

      await expect(
        page.getByText(/Condition:/)
      ).toBeVisible();

      await expect(
        page.getByText(/Brand:/)
      ).toBeVisible();
    }
  );


  test(
    'REG04 - Search product and verify results',
    {
      tag: '@regression',
    },
    async ({ page }) => {

      await page.goto('/products');

      await page.locator('#search_product')
        .fill('Top');

      await page.locator('#submit_search')
        .click();

      await expect(
        page.getByText('Searched Products')
      ).toBeVisible();

      const products =
        page.locator('.features_items .product-image-wrapper');

      expect(await products.count())
        .toBeGreaterThan(0);
    }
  );


  test(
    'REG05 - Add multiple products to cart',
    {
      tag: '@regression',
    },
    async ({ page }) => {

      await page.goto('/products');

      const products =
        page.locator('.productinfo');

      await products.nth(0)
        .getByText('Add to cart')
        .click();

      await page.getByText('Continue Shopping')
        .click();

      await products.nth(1)
        .getByText('Add to cart')
        .click();

      await page.getByText('View Cart')
        .click();

      const cartRows =
        page.locator('#cart_info_table tbody tr');

      expect(await cartRows.count())
        .toBeGreaterThanOrEqual(2);
    }
  );


  test(
    'REG06 - Remove product from cart',
    {
      tag: '@regression',
    },
    async ({ page }) => {

      await page.goto('/products');

      await page.locator('.productinfo')
        .first()
        .getByText('Add to cart')
        .click();

      await page.getByText('View Cart')
        .click();

      const cartRows =
        page.locator('#cart_info_table tbody tr');

      await expect(cartRows.first())
        .toBeVisible();

      await cartRows.first()
        .locator('.cart_quantity_delete')
        .click();

      await expect(
        page.getByText('Cart is empty!')
      ).toBeVisible();
    }
  );


  test(
    'REG07 - Verify subscription on homepage',
    {
      tag: '@regression',
    },
    async ({ page }) => {

      await page.goto('/');

      await page.locator('footer')
        .scrollIntoViewIfNeeded();

      await expect(
        page.getByText('Subscription')
      ).toBeVisible();

      await page.locator('#susbscribe_email')
        .fill(`subscription_${Date.now()}@example.com`);

      await page.locator('#subscribe')
        .click();

      await expect(
        page.getByText(
          'You have been successfully subscribed!'
        )
      ).toBeVisible();
    }
  );


  test(
    'REG08 - Verify product categories',
    {
      tag: '@regression',
    },
    async ({ page }) => {

      await page.goto('/');

      await expect(
        page.getByText('Category')
      ).toBeVisible();

      const categories = page.locator('.category-products');

      await categories.locator('a[href="#Women"]')
        .click();

      const womenDressCategory =
        categories.locator('a[href="/category_products/1"]');

      await expect(womenDressCategory)
        .toBeVisible();

      await womenDressCategory
        .click();

      await expect(
        page.getByText(/WOMEN - DRESS PRODUCTS/i)
      ).toBeVisible();
    }
  );


  test(
    'REG09 - Add product review',
    {
      tag: '@regression',
    },
    async ({ page }) => {

      await page.goto('/products');

      await page
        .locator('a[href="/product_details/1"]')
        .click();

      await expect(
        page.getByText('Write Your Review')
      ).toBeVisible();

      await page.locator('#name')
        .fill('Playwright Tester');

      await page.locator('#email')
        .fill(`review_${Date.now()}@example.com`);

      await page.locator('#review')
        .fill(
          'This is an automated product review.'
        );

      await page.getByRole('button', {
        name: 'Submit'
      }).click();

      await expect(
        page.getByText(
          'Thank you for your review.'
        )
      ).toBeVisible();
    }
  );


  test(
    'REG10 - Verify cart product quantity',
    {
      tag: '@regression',
    },
    async ({ page }) => {

      await page.goto('/product_details/1');

      await page.locator('#quantity')
        .fill('4');

      await page.getByText('Add to cart')
        .click();

      await page.getByText('View Cart')
        .click();

      const quantity =
        page.locator('.cart_quantity button');

      await expect(quantity)
        .toHaveText('4');
    }
  );


  test(
    'REG11 - Verify brands',
    {
      tag: '@regression',
    },
    async ({ page }) => {

      await page.goto('/products');

      await expect(
        page.getByText('Brands')
      ).toBeVisible();

      await page.locator('a[href="/brand_products/Polo"]')
        .click();

      await expect(
        page.getByText('BRAND - POLO PRODUCTS', { exact: true })
      ).toBeVisible();
    }
  );


  test(
    'REG12 - Verify subscription on cart',
    {
      tag: '@regression',
    },
    async ({ page }) => {

      await page.goto('/view_cart');

      await page.locator('footer')
        .scrollIntoViewIfNeeded();

      await expect(
        page.getByText('Subscription')
      ).toBeVisible();

      await page.locator('#susbscribe_email')
        .fill(`cart_${Date.now()}@example.com`);

      await page.locator('#subscribe')
        .click();

      await expect(
        page.getByText(
          'You have been successfully subscribed!'
        )
      ).toBeVisible();
    }
  );

});