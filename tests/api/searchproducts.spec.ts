import {test, expect} from '@playwright/test';

test.describe('Search Product API', () => {

    test('TCPr03 - Search Product Successfully', async ({request}) => {
        const response = await request.post('https://automationexercise.com/api/searchProduct', {
            form: {
                search_product: 'shirt'
            }
        });

        expect(response.status()).toBe(200);

        //parse body to jSON
        const responseBody = await response.json();

        // asserts response code & Structure
        expect(responseBody.responseCode).toBe(200);
        expect (Array.isArray(responseBody.products)).toBe(true);
        expect(responseBody.products.length).toBeGreaterThan(0);

        //validate that returned products actually match the search term
        const firstProduct = responseBody.products[0];
        expect(firstProduct).toHaveProperty('id');
        expect(firstProduct).toHaveProperty('name');
        expect(firstProduct.name.toLowerCase()).toContain('shirt');
    });

    test('TCPr04 - Search Product without parameter (Negative Test)', async ({request}) => {
        const response = await request.post('https://automationexercise.com/api/searchProduct');
        const responseBody = await response.json();

        //automation Exercise API returns response code 400 for missing search parameter
        expect(response.status()).toBe(400);
        expect(responseBody.responseCode).toBe(400);
        expect(responseBody.message).toBe('Bad request, search_product parameter is missing in POST request.');
        });

});
