import { Locator, Page } from '@playwright/test';

export class ProductsPage {

  readonly addToCartButton: Locator;

  constructor(private page: Page) {
    this.addToCartButton = page.locator('.btn btn-default add-to-cart');
  }

  async open() {
    await this.page.goto('/products', { waitUntil: 'domcontentloaded' });
  }

  async addProduct(productName: string) {
    const product = this.page
      .locator('.product-image-wrapper')
      .filter({ hasText: productName });

    //await product.hover();
    await product.getByText('Add to cart').first().click();
  }

  async viewCart() {
    await this.page.getByText('View Cart').click();
  }
}