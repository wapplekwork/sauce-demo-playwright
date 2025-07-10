// tests/api.spec.js
const { test, expect } = require('@playwright/test');

test.describe('API Testing', () => {
  
  test('should check website accessibility', async ({ request }) => {
    const response = await request.get('https://www.saucedemo.com');
    expect(response.status()).toBe(200);
  });

  test('should verify response headers', async ({ request }) => {
    const response = await request.get('https://www.saucedemo.com');
    
    expect(response.headers()['content-type']).toContain('text/html');
    expect(response.headers()['server']).toBeTruthy();
  });

  test('should handle non-existent endpoints', async ({ request }) => {
    const response = await request.get('https://www.saucedemo.com/non-existent-page');
    
    // Should return 404 for non-existent pages
    expect(response.status()).toBe(404);
  });

  // test('should verify static assets load correctly', async ({ request }) => {
  //   // Test if CSS loads correctly
  //   const cssResponse = await request.get('https://www.saucedemo.com/static/media/swag.woff2');
  //   expect(cssResponse.status()).toBe(200);
  //   expect(cssResponse.headers()['content-type']).toContain('font/woff2');
  // });

  test('should test response time', async ({ request }) => {
    const startTime = Date.now();
    const response = await request.get('https://www.saucedemo.com');
    const endTime = Date.now();
    
    const responseTime = endTime - startTime;
    
    expect(response.status()).toBe(200);
    expect(responseTime).toBeLessThan(5000); // Should respond within 5 seconds
    
    console.log(`Response time: ${responseTime}ms`);
  });

  test('should verify page content', async ({ request }) => {
    const response = await request.get('https://www.saucedemo.com');
    const body = await response.text();
    
    expect(body).toContain('Swag Labs');
    // expect(body).toContain('Username');
    // expect(body).toContain('Password');
  });
});