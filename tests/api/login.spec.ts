import { test, expect } from '@playwright/test';

test.describe('Verify Login API', () => {

  test('TC01 - Verify login with valid credentials', async ({ request }) => {

    const response = await request.post('/api/verifyLogin', {
      form: {
        email: 'alfiyandzz@example.com',
        password: 'Password123'

      }
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.responseCode).toBe(200);
    expect(responseBody.message).toBe('User exists!');
  });

});