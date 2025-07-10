// pages/LoginPage.js
class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.loginLogo = page.locator('.login_logo');
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  async isLoginPageDisplayed() {
    return await this.loginLogo.isVisible();
  }
}

// pages/InventoryPage.js
class InventoryPage {
  constructor(page) {
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

// pages/CartPage.js
class CartPage {
  constructor(page) {
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

module.exports = { LoginPage, InventoryPage, CartPage };