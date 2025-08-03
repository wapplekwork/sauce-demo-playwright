import { test, expect } from '@playwright/test';
/*-----------
// test search products
test.describe('Search Products', () => {
  test('should search for products and add to cart', async ({ page }) => {
    await page.goto('https://automationexercise.com/products');
    
    // Search for a product
    await page.getByRole('textbox', { name: 'Search Product' }).click();
    await page.getByRole('textbox', { name: 'Search Product' }).fill('tshirt');
    await page.locator('button[type="submit"]').click();

    // Click on the first product in the search results
    await page.locator('.overlay-content > .btn').first().click();
    
    // Continue shopping
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    
    // View cart
    await page.locator('a[href="/view_cart"]').click();

    // Proceed to checkout
    await page.getByText('Proceed To Checkout').click();
    
  
  });
});

--*/