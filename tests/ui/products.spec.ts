import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';

test('PROD-006 - Search product', async ({ page }) => {

    const productsPage = new ProductsPage(page);

    await productsPage.open();

    await productsPage.searchProduct('Blue Top');

});

