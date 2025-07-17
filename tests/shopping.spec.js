const { test, expect } = require('@playwright/test');
const { LoginPage} = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { testUsers, testProducts } = require('../utils/testData');

test.describe('Shopping Cart Functionality', () => {
  let loginPage;
  let inventoryPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    
    // Login before each test
    await loginPage.goto();
    const user = testUsers.validUsers[0];
    await loginPage.login(user.username, user.password);
    await expect(inventoryPage.isInventoryPageDisplayed()).toBeTruthy();
  });

  test('should display all inventory items', async ({ page }) => {
    const itemsCount = await inventoryPage.getInventoryItemsCount();
    expect(itemsCount).toBeGreaterThan(0);
  });

  test('should add item to cart', async ({ page }) => {
    await inventoryPage.addFirstItemToCart();
    
    const cartBadgeCount = await inventoryPage.getCartBadgeCount();
    expect(cartBadgeCount).toBe('1');
  });

  test('should add multiple items to cart', async ({ page }) => {
    // Add first item
    await inventoryPage.addFirstItemToCart();
    
    // Add specific item by name
    await inventoryPage.addItemToCartByName('sauce-labs-bike-light');
    
    const cartBadgeCount = await inventoryPage.getCartBadgeCount();
    expect(cartBadgeCount).toBe('2');
  });

  test('should view cart with added items', async ({ page }) => {
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.goToCart();
    
    await expect(cartPage.isCartPageDisplayed()).toBeTruthy();

     const cartItemsCount = await cartPage.getCartItemsCount();
    expect(cartItemsCount).toBe(1);
  });

  test('should remove item from cart', async ({ page }) => {
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.goToCart();
    
    await cartPage.removeFirstItem();
    
    
    const cartItemsCount = await cartPage.getCartItemsCount();
    expect(cartItemsCount).toBe(0);
  });

  test('should continue shopping from cart', async ({ page }) => {
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.goToCart();
    
    await cartPage.continueShopping();
    
    await expect(inventoryPage.isInventoryPageDisplayed()).toBeTruthy();
  });

  test('should proceed to checkout', async ({ page }) => {
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.goToCart();
    
    await cartPage.proceedToCheckout();
    
    // Should be on checkout page
    await expect(page).toHaveURL(/checkout-step-one/);
  });
});