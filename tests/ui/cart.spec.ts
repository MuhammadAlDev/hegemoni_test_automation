import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Cart Page', () => {

  test('CART-002 - Add product to cart', async ({ page }) => {

    const productsPage = new ProductsPage(page);
    await productsPage.open();

    await productsPage.addProduct('Blue Top');

    await productsPage.viewCart();

    await expect(page).toHaveURL(/\/view_cart(?:[/?#]|$)/);
    const productRow = page.locator('tbody tr').filter({ hasText: 'Blue Top' });
    await expect(productRow).toBeVisible();

  });

});