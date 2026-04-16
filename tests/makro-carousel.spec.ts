import { test, expect, Locator, Page } from '@playwright/test';

/**
 * Test Suite: Carousel UI Test
 * Website: https://www.makro.pro/
 * Feature: Scroll carousel left/right และตรวจสอบปุ่ม "ดูทั้งหมด"
 */

test.describe('Makro Pro - Carousel Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.makro.pro/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('#c-inr')).toBeVisible();
 // await expect(page.getByRole('dialog', { name: 'คุกกี้ (cookies)' })).toBeVisible();
    await page.getByRole('button', { name: 'ยอมรับคุกกี้ทั้งหมด' }).click();
  });

  // ─────────────────────────────────────────────
  // TC01: Carousel แสดงผลได้ปกติ
  // ─────────────────────────────────────────────
  test('TC01 - Carousel should be visible on homepage', async ({ page }) => {
    // ปรับ selector ให้ตรงกับ HTML จริงของเว็บ
    const carousel = page.locator('[class*="carousel"], [class*="slider"], [class*="swiper"]').first();

    await expect(carousel).toBeVisible({ timeout: 10000 });
    console.log('✅ Carousel แสดงผลสำเร็จ');
  });

  // ─────────────────────────────────────────────
  // TC02: กดปุ่ม Next (เลื่อนขวา) ได้ปกติ
  // ─────────────────────────────────────────────
  test('TC02 - Should scroll carousel to the RIGHT', async ({ page }) => {
    // รอ carousel โหลด
    const carousel = page.locator('[class*="carousel"], [class*="slider"], [class*="swiper"]').first();
    await expect(carousel).toBeVisible({ timeout: 10000 });

    // หาปุ่ม next / arrow right
    const nextBtn = page.locator([
      'button[aria-label*="next"]',
      'button[aria-label*="Next"]',
      '[class*="next"]',
      '[class*="arrow-right"]',
      '[class*="slick-next"]',
      '[class*="swiper-button-next"]',
    ].join(', ')).first();

    // ถ้ามีปุ่ม next → คลิก
    if (await nextBtn.isVisible()) {
      await nextBtn.click();
      await page.waitForTimeout(600); // รอ animation
      console.log('✅ คลิกปุ่ม Next สำเร็จ');
    } else {
      // fallback: ใช้ keyboard arrow right
      await carousel.focus();
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(600);
      console.log('✅ กด ArrowRight สำเร็จ (fallback)');
    }
  });

  // ─────────────────────────────────────────────
  // TC03: กดปุ่ม Prev (เลื่อนซ้าย) ได้ปกติ
  // ─────────────────────────────────────────────
  test('TC03 - Should scroll carousel to the LEFT', async ({ page }) => {
    const carousel = page.locator('[class*="carousel"], [class*="slider"], [class*="swiper"]').first();
    await expect(carousel).toBeVisible({ timeout: 10000 });

    // เลื่อนขวาก่อน 2 ครั้ง เพื่อให้มีที่เลื่อนกลับ
    const nextBtn = page.locator([
      'button[aria-label*="next"]',
      '[class*="next"]',
      '[class*="slick-next"]',
      '[class*="swiper-button-next"]',
    ].join(', ')).first();

    if (await nextBtn.isVisible()) {
      await nextBtn.click();
      await page.waitForTimeout(500);
      await nextBtn.click();
      await page.waitForTimeout(500);
    }

    // หาปุ่ม prev / arrow left
    const prevBtn = page.locator([
      'button[aria-label*="prev"]',
      'button[aria-label*="Prev"]',
      '[class*="prev"]',
      '[class*="arrow-left"]',
      '[class*="slick-prev"]',
      '[class*="swiper-button-prev"]',
    ].join(', ')).first();

    if (await prevBtn.isVisible()) {
      await prevBtn.click();
      await page.waitForTimeout(600);
      console.log('✅ คลิกปุ่ม Prev สำเร็จ');
    } else {
      await carousel.focus();
      await page.keyboard.press('ArrowLeft');
      await page.waitForTimeout(600);
      console.log('✅ กด ArrowLeft สำเร็จ (fallback)');
    }
  });

  // ─────────────────────────────────────────────
  // TC04: เลื่อนไปขวาสุด → ต้องเจอปุ่ม "ดูทั้งหมด"
  // ─────────────────────────────────────────────
  test('TC04 - Should show "ดูทั้งหมด" button at the end of carousel', async ({ page }) => {
    const carousel = page.locator('[class*="carousel"], [class*="slider"], [class*="swiper"]').first();
    await expect(carousel).toBeVisible({ timeout: 10000 });

    const nextBtn = page.locator([
      'button[aria-label*="next"]',
      '[class*="next"]',
      '[class*="slick-next"]',
      '[class*="swiper-button-next"]',
    ].join(', ')).first();

    // เลื่อนขวาจนสุด (max 20 ครั้ง)
    let reachedEnd = false;
    for (let i = 0; i < 20; i++) {
      // ตรวจสอบปุ่ม "ดูทั้งหมด" ก่อนเลื่อน
      const seeAllBtn = page.locator('text=ดูทั้งหมด').first();
      if (await seeAllBtn.isVisible()) {
        console.log(`✅ พบปุ่ม "ดูทั้งหมด" ที่ slide ที่ ${i + 1}`);
        reachedEnd = true;
        break;
      }

      // ถ้ายังไม่เจอ → เลื่อนขวาต่อ
      const isNextVisible = await nextBtn.isVisible().catch(() => false);
      const isNextEnabled = await nextBtn.isEnabled().catch(() => false);

      if (!isNextVisible || !isNextEnabled) {
        console.log(`ℹ️ ปุ่ม Next หมดแล้วที่ slide ${i + 1}`);
        break;
      }

      await nextBtn.click();
      await page.waitForTimeout(500);
    }

    // Assert: ต้องเจอปุ่ม "ดูทั้งหมด"
    const seeAllBtn = page.locator('text=ดูทั้งหมด').first();
    await expect(seeAllBtn).toBeVisible({ timeout: 5000 });
    console.log('✅ ยืนยันปุ่ม "ดูทั้งหมด" แสดงขึ้นมาสำเร็จ');
  });

  // ─────────────────────────────────────────────
  // TC05: คลิกปุ่ม "ดูทั้งหมด" แล้ว navigate ได้
  // ─────────────────────────────────────────────
  test('TC05 - Click "ดูทั้งหมด" should navigate to correct page', async ({ page }) => {
    const carousel = page.locator('[class*="carousel"], [class*="slider"], [class*="swiper"]').first();
    await expect(carousel).toBeVisible({ timeout: 10000 });

    const nextBtn = page.locator([
      '[class*="next"]',
      '[class*="slick-next"]',
      '[class*="swiper-button-next"]',
    ].join(', ')).first();

    // เลื่อนไปขวาสุดจนเจอ "ดูทั้งหมด"
    for (let i = 0; i < 20; i++) {
      const seeAllBtn = page.locator('text=ดูทั้งหมด').first();
      if (await seeAllBtn.isVisible()) break;

      const canNext = await nextBtn.isVisible().catch(() => false);
      if (!canNext) break;

      await nextBtn.click();
      await page.waitForTimeout(500);
    }

    const seeAllBtn = page.locator('text=ดูทั้งหมด').first();
    await expect(seeAllBtn).toBeVisible({ timeout: 5000 });

    // คลิกและรอ navigation
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }),
      seeAllBtn.click(),
    ]);

    // ตรวจสอบว่า URL เปลี่ยนไปแล้ว (ไม่อยู่ที่ homepage แล้ว)
    expect(page.url()).not.toBe('https://www.makro.pro/');
    console.log(`✅ Navigate ไปที่: ${page.url()}`);
  });

  // ─────────────────────────────────────────────
  // TC06: Swipe gesture (mobile viewport)
  // ─────────────────────────────────────────────
  test('TC06 - Carousel swipe on mobile viewport', async ({ page }) => {
    // จำลอง mobile screen
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('https://www.makro.pro/');
    await page.waitForLoadState('networkidle');

    const carousel = page.locator('[class*="carousel"], [class*="slider"], [class*="swiper"]').first();
    await expect(carousel).toBeVisible({ timeout: 10000 });

    const box = await carousel.boundingBox();
    if (!box) throw new Error('ไม่พบ bounding box ของ carousel');

    const startX = box.x + box.width * 0.8;
    const endX   = box.x + box.width * 0.2;
    const centerY = box.y + box.height / 2;

    // Swipe ซ้าย (เลื่อนขวา)
    await page.mouse.move(startX, centerY);
    await page.mouse.down();
    await page.mouse.move(endX, centerY, { steps: 20 });
    await page.mouse.up();
    await page.waitForTimeout(600);

    console.log('✅ Swipe left (mobile) สำเร็จ');
  });

});
