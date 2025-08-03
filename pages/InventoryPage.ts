import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  page: Page;
  inventoryContainer: Locator;
  inventoryItems: Locator
  addToCartButtons: Locator;
  shoppingCartBadge: Locator;
  shoppingCartLink: Locator;
  menuButton: Locator;
  logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryContainer = page.locator('[data-test="inventory-container"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.addToCartButtons = page.locator('[data-test*="add-to-cart"]');
    this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
  }

  async isInventoryPageDisplayed() {
    return await this.inventoryContainer.isVisible();
  }

  async getInventoryItemsCount() {
    return await this.inventoryItems.count();
  }

  async addFirstItemToCart() {
    await this.addToCartButtons.first().click();
  }

  async addItemToCartByName(itemName) {
    const item = this.page.locator(`[data-test="add-to-cart-${itemName.toLowerCase().replace(/ /g, '-')}"]`);
    await item.click();
  }

  async getCartBadgeCount() {
    return await this.shoppingCartBadge.textContent();
  }

  async goToCart() {
    await this.shoppingCartLink.click();
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}

module.exports = { InventoryPage };