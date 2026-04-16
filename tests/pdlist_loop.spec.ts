import {test , Page, expect} from '@playwright/test';

// test('test for loop check list product', async ({ page }: { page: Page }) =>{
//     await page.goto('https://www.saucedemo.com/');
//     await expect(page).toHaveTitle('Swag Labs');
//     await page.getByRole('textbox', {name:'Username'}).fill('standard_user');
//     await page.getByRole('textbox', {name:'Password'}).fill('secret_sauce');
//     await page.getByRole('button', {name:'Login'}).click();
//   //  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
//   //  await expect(page).toHaveTitle('Swag Labs');

// });


async function loginToSauceDemo(page: Page) {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');
}

async function verifyProductsLoaded(page: Page) {
  await loginToSauceDemo(page);
  
  // รอ product items โหลด (Sauce Demo มี 6 รายการ)
  const products = page.locator('.inventory_item');
  await expect(products).toHaveCount(6, { timeout: 10000 });
  
  // ตรวจสอบว่าแต่ละ product มี title และ price
  for (let i = 0; i < 6; i++) {
    const product = products.nth(i);
    const title = await product.locator('.inventory_item_name').innerText();
    const price = await product.locator('.inventory_item_price').innerText();
    
    expect(title).not.toBe('');
    expect(price).toMatch(/^\$/); // price format เช่น $29.99
  }
}

test('Verify Sauce Demo product list loads correctly', async ({ page }) => {
  await verifyProductsLoaded(page);
});