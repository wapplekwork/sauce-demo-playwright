import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.makro.pro/');
  await expect(page.locator('#c-inr')).toBeVisible();
  await expect(page.locator('#c-ttl')).toContainText('คุกกี้ (cookies)');
  await expect(page.getByRole('dialog', { name: 'คุกกี้ (cookies)' })).toBeVisible();
  await page.getByRole('button', { name: 'ยอมรับคุกกี้ทั้งหมด' }).click();
});