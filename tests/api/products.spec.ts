import {test, expect} from '@playwright/test';

test.describe('Products API', () => {
    test('TCPr01 - Get all products', async ({request}) => {
        const response = await request.get('https://automationexercise.com/api/productsList');

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body).toHaveProperty('products');

        expect(Array.isArray(body.products)).toBeTruthy();

        const product = body.products[0];

        expect(product).toHaveProperty('id');
        expect(product).toHaveProperty('name');
        expect(product).toHaveProperty('price');
        expect(product).toHaveProperty('brand');
        expect(product).toHaveProperty('category');
    });

    test('TCPr02 - Get all brands', async ({request}) => {
        const response = await request.post('https://automationexercise.com/api/brandsList');

        expect(response.status()).toBe(200);
    });
});