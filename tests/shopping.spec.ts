import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { testUsers, testProducts } from '../utils/testData';

test.describe('1 -Shopping Cart Functionality', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }: { page: Page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    // Login before each test
    await loginPage.goto();
    const user = testUsers.validUsers[0];
    await loginPage.login(user.username, user.password);
    await expect(inventoryPage.isInventoryPageDisplayed()).toBeTruthy();
  });

  test('1.1 -should display all inventory items', async ({ page }: { page: Page }) => {
    const itemsCount = await inventoryPage.getInventoryItemsCount();
    expect(itemsCount).toBeGreaterThan(0);
  });

  test('1.2 - should add item to cart', async ({ page }: { page: Page }) => {
    await inventoryPage.addFirstItemToCart();
    const cartBadgeCount = await inventoryPage.getCartBadgeCount();
    expect(cartBadgeCount).toBe('1');
  });

  test('1.3 - should add multiple items to cart', async ({ page }: { page: Page }) => {
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.addItemToCartByName('sauce-labs-bike-light');
    const cartBadgeCount = await inventoryPage.getCartBadgeCount();
    expect(cartBadgeCount).toBe('2');
  });

  test('1.4 -should view cart with added items', async ({ page }: { page: Page }) => {
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.goToCart();
    await expect(cartPage.isCartPageDisplayed()).toBeTruthy();
    const cartItemsCount = await cartPage.getCartItemsCount();
    expect(cartItemsCount).toBe(1);
  });

  test('1.5 should remove item from cart', async ({ page }: { page: Page }) => {
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.goToCart();
    await cartPage.removeFirstItem();
    const cartItemsCount = await cartPage.getCartItemsCount();
    expect(cartItemsCount).toBe(0);
  });

  test('1.6 -should continue shopping from cart', async ({ page }: { page: Page }) => {
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.goToCart();
    await cartPage.continueShopping();
    await expect(inventoryPage.isInventoryPageDisplayed()).toBeTruthy();
  });

  test('1.7 - should proceed to checkout', async ({ page }: { page: Page }) => {
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/checkout-step-one/);
  });
});
