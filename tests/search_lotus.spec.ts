import { test, expect } from '@playwright/test';

let url: string = 'https://www.lotuss.com/th';
let product: string = 'น้ำสิงห์';

test('test', async ({ page }) => {
  const context = await page.context();
  await context.grantPermissions(['geolocation']);
  await context.setGeolocation({ latitude: 13.7563, longitude: 100.5018 }); // Bangkok

  await page.goto(url);
  await page.getByRole('button', { name: 'ยอมรับคุกกี้ทั้งหมด' }).click();
  await page.getByRole('combobox', { name: 'ค้นหาใน Lotus\'s' }).click();

  await page.getByRole('combobox', { name: 'ค้นหาใน Lotus\'s' }).fill(product);
  await page.getByRole('combobox', { name: 'ค้นหาใน Lotus\'s' }).press('Enter');
  await page.getByRole('img', { name: 'close' }).click();  // click close cookie
  if (await page.locator('#product-card-cart-button-2').isVisible()) {
    await page.locator('#product-card-cart-button-2').click();
  }
  await page.locator('#cart-button').first().click();
  await expect(page.getByText('เลือกวิธีการรับสินค้า')).toBeVisible();
  await page.getByText('ส่งวันถัดไป').click();
  await expect(page.getByText('จัดส่งที่')).toBeVisible();
  await page.getByRole('textbox', { name: 'ค้นหาที่อยู่' }).click();
  await page.getByRole('textbox', { name: 'ค้นหาที่อยู่' }).fill('11000');
  await page.locator('div').filter({ hasText: /11000อำเภอเมืองนนทบุรี นนทบุรี$/ }).nth(1).click();
  await page.getByRole('button', { name: 'เลือกจุดรับนี้' }).click();
  await expect(page.getByText('กรุณาตรวจสอบที่อยู่ของคุณให้ตรงกับตำแหน่งที่ปักหมุด หากไม่ตรงกรุณาคลิกที่แผนที่เ')).toBeVisible();
  await page.getByRole('textbox', { name: 'บ้านเลขที่/หมู่/ซอย/ถนน' }).click();
  await page.getByRole('textbox', { name: 'บ้านเลขที่/หมู่/ซอย/ถนน' }).fill('28/1084');
  await page.getByRole('textbox', { name: 'แขวง/ตำบล' }).click();
  await page.getByRole('textbox', { name: 'แขวง/ตำบล' }).fill('k\'ditlv');
  await page.getByRole('button', { name: 'ยืนยัน' }).click();
  await page.getByRole('img', { name: 'cart-icon' }).click({ button: 'right' });
  await expect(page.getByRole('img', { name: 'cart-icon' })).toBeVisible();

});

