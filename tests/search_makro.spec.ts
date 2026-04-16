import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.locator('body').click();
  await page.goto('https://www.makro.pro/');
  await expect(page.getByRole('dialog').locator('div').first()).toBeVisible();
  await expect(page.getByRole('button', { name: 'close' })).toBeVisible();
  await page.getByRole('button', { name: 'close' }).click();
  await expect(page.getByRole('heading', { name: 'คุกกี้ (cookies)' })).toBeVisible();
  await page.getByRole('button', { name: 'ยอมรับคุกกี้ทั้งหมด' }).click();
  await expect(page.getByText('น้ํามัน')).toBeVisible();
  await page.locator('[data-test-id="search_input"]').click();
  // await page.getByText('ค้นหาเป๊ปซี่ค้นหาเลย์ค้นหาสติงค์ค้นหาทีพลัสค้นหาลิปตันค้นหาขนมค้นหาน้ํามันค้นหาไ').click();
  await page.getByRole('textbox', { name: 'ค้นหาสินค้า' }).fill('pepsi');
  await page.getByRole('textbox', { name: 'ค้นหาสินค้า' }).press('Enter');
 // await page.goto('https://www.makro.pro/c/search?q=pepsi');
  await expect(page.getByRole('heading', { name: 'ผลการค้นหา "pepsi"' })).toBeVisible();
  await expect(page.locator('a').filter({ hasText: 'ซื้อ 1000฿ รับส่วนลด 10฿ +4เป๊ปซี่ เครื่องดื่มน้ําอัดลม 545 มล. x 24' })).toBeVisible();
  await page.locator('[data-test-id="gid://shopify/Product/6761214378179_btn_add_to_basket"]').click();
  await page.getByTestId('form-title').click();
  await expect(page.locator('section')).toMatchAriaSnapshot(`
    - text: ยินดีต้อนรับ!
    - paragraph: เข้าสู่ระบบเพื่อเริ่มช้อปได้เลย / สมัครสมาชิก แม็คโคร
    - img
    - paragraph: สำหรับการสมัคร กรุณาใช้เบอร์โทรศัพท์เท่านั้น
    `);
});