import { test, expect } from '@playwright/test';

test.describe('Verify Login API', () => {

  const user = {
    name: `QA User ${Date.now()}`,
    email: `qa_${Date.now()}@example.com`,
    password: 'Password123!'
  };

  test('TC01 - Verify login with valid credentials', async ({ request }) => {

    // 1. Create account
    const createResponse = await request.post('/api/createAccount', {
      form: {
        name: user.name,
        email: user.email,
        password: user.password,
        title: 'Mr',
        birth_date: '10',
        birth_month: '10',
        birth_year: '1995',
        firstname: 'QA',
        lastname: 'Tester',
        company: 'QA Company',
        address1: 'Test Address',
        address2: '',
        country: 'Canada',
        zipcode: '12345',
        state: 'Test State',
        city: 'Test City',
        mobile_number: '1234567890'
      }
    });

    expect(createResponse.status()).toBe(200);

    const createBody = await createResponse.json();

    console.log('Create Account:', createBody);

    // 2. Verify login
    const loginResponse = await request.post('/api/verifyLogin', {
      form: {
        email: user.email,
        password: user.password
      }
    });

    expect(loginResponse.status()).toBe(200);

    const loginBody = await loginResponse.json();

    console.log('Verify Login:', loginBody);

    expect(loginBody.responseCode).toBe(200);
    expect(loginBody.message).toBe('User exists!');

    // 3. Cleanup - delete account
    const deleteResponse = await request.delete('/api/deleteAccount', {
      form: {
        email: user.email,
        password: user.password
      }
    });

    expect(deleteResponse.status()).toBe(200);
  });

});