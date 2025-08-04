import { test, Page, expect } from "@playwright/test";

test.describe('Login Test', () => {
    test('login with correct username and password', async ({ page }: { page: Page }) => {
        // ไปที่หน้าเว็บ
        await page.goto('https://www.lotuss.com/th');
        // รอคอยให้หน้าเว็บโหลดเสร็จ
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveTitle(/Lotus's/);
        await page.getByRole('link', { name: "Lotus’s | โลตัส" }).waitFor({ state: 'visible', timeout: 30000 });
   
        // ตรวจสอบว่ามีโลโก้และปุ่มเปลี่ยนภาษา
        await expect(page.getByRole('button', { name: "EN" })).toBeVisible();
        await expect(page.getByRole('button', { name: "TH" })).toBeVisible();

        // Click on the login button
        await page.getByText('เข้าสู่ระบบ', { exact: true }).click();

        // Fill in the username and password
        await page.locator('input[name="mobile-number"]').fill('0826452999');
        await page.locator('input[type="password"]').fill('@Recit1485');
        await page.locator('button[id="login"]').click();
    });
});
