import { test, expect } from '@playwright/test';

test.describe('API Regression', () => {

  test(
    'API01 - Get all products',
    {
      tag: '@api',
    },
    async ({ request }) => {

      const response =
        await request.get('/api/productsList');

      expect(response.status()).toBe(200);

      const body = await response.json();

      expect(body).toHaveProperty('products');

      expect(
        Array.isArray(body.products)
      ).toBeTruthy();

      expect(
        body.products.length
      ).toBeGreaterThan(0);
    }
  );


  test(
    'API02 - Get all brands',
    {
      tag: '@api',
    },
    async ({ request }) => {

      const response =
        await request.get('/api/brandsList');

      expect(response.status()).toBe(200);

      const body = await response.json();

      expect(body).toHaveProperty('brands');

      expect(
        Array.isArray(body.brands)
      ).toBeTruthy();
    }
  );


  test(
    'API03 - Search product',
    {
      tag: '@api',
    },
    async ({ request }) => {

      const response =
        await request.post(
          '/api/searchProduct',
          {
            form: {
              search_product: 'top',
            },
          }
        );

      expect(response.status()).toBe(200);

      const body = await response.json();

      expect(body).toHaveProperty('products');

      expect(
        body.products.length
      ).toBeGreaterThan(0);
    }
  );


  test(
    'API04 - Search product without parameter',
    {
      tag: '@api',
    },
    async ({ request }) => {

      const response =
        await request.post(
          '/api/searchProduct'
        );

      expect(response.status()).toBe(200);

      const body = await response.json();

      expect(body.message).toContain(
        'search_product parameter is missing'
      );
    }
  );


  test(
    'API05 - POST products list should not be allowed',
    {
      tag: '@api',
    },
    async ({ request }) => {

      const response =
        await request.post(
          '/api/productsList'
        );

      expect(response.status()).toBe(200);
    }
  );


  test(
    'API06 - Invalid login',
    {
      tag: '@api',
    },
    async ({ request }) => {

      const response =
        await request.post(
          '/api/verifyLogin',
          {
            form: {
              email: 'invalid@example.com',
              password: 'WrongPassword123',
            },
          }
        );

      expect(response.status()).toBe(200);

      const body = await response.json();

      expect(body.message)
        .toBe('User not found!');
    }
  );

});