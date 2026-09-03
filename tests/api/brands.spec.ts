import {test, expect} from '@playwright/test';

test.describe('Brands API', () => {

    test('TCPr02 - Get all brands', async ({request}) => {
        const response = await request.post('https://automationexercise.com/api/brandsList');

        expect(response.status()).toBe(200);
    });
});