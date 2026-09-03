import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async verifyProduct(productName: string) {
    const product = this.page
      .locator('#cart_info_table tbody tr')
      .filter({ hasText: productName });

    await expect(product).toBeVisible();
  }

  async verifyProductPrice(
    productName: string,
    expectedPrice: string
  ) {
    const product = this.page
      .locator('#cart_info_table tbody tr')
      .filter({ hasText: productName });

    await expect(product.locator('.cart_price')).toContainText(
      expectedPrice
    );
  }

  async removeProduct(productName: string) {
    const product = this.page
      .locator('#cart_info_table tbody tr')
      .filter({ hasText: productName });

    await product.locator('.cart_quantity_delete').click();
  }
}