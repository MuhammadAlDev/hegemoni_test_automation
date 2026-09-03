import {test, expect} from '@playwright/test';

test.describe('Products API', () => {
    test('TC01 - Get all products', async ({request}) => {
        const response = await request.get('https://automationexercise.com/api/productsList');

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body).toHaveProperty('products');

        expect(Array.isArray(body.products)).toBeTruthy();
    });
});