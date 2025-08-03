import { Page, Locator } from '@playwright/test';

export class CartPage {
  page: Page;
  cartList: Locator;
  cartItems: Locator;
  checkoutButton: Locator;
  continueShoppingButton: Locator;
  removeButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartList = page.locator('[data-test="cart-list"]');
    this.cartItems = page.locator('[data-test="item-quantity"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.removeButtons = page.locator('[data-test*="remove"]');
  }

  async isCartPageDisplayed() {
    return await this.cartList.isVisible();
  }

  async getCartItemsCount() {
    return await this.cartItems.count();
  }

  async removeFirstItem() {
    await this.removeButtons.first().click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }
}

module.exports = { CartPage };