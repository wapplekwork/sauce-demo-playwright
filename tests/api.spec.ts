import { test, expect, APIRequestContext, APIResponse } from '@playwright/test';

test.describe('1 - API Testing', () => {
  test('1.1 - should check website accessibility', async ({ request }: { request: APIRequestContext }) => {
    const response: APIResponse = await request.get('https://www.saucedemo.com');
    expect(response.status()).toBe(200);
  });

  test('1.2 - should verify response headers', async ({ request }: { request: APIRequestContext }) => {
    const response: APIResponse = await request.get('https://www.saucedemo.com');
    expect(response.headers()['content-type']).toContain('text/html');
    expect(response.headers()['server']).toBeTruthy();
  });

  test('1.3 -should handle non-existent endpoints', async ({ request }: { request: APIRequestContext }) => {
    const response: APIResponse = await request.get('https://www.saucedemo.com/non-existent-page');
    expect(response.status()).toBe(404);
  });

  test('1.4 - should test response time', async ({ request }: { request: APIRequestContext }) => {
    const startTime = Date.now();
    const response: APIResponse = await request.get('https://www.saucedemo.com');
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    expect(response.status()).toBe(200);
    expect(responseTime).toBeLessThan(5000); // Should respond within 5 seconds
    console.log(`Response time: ${responseTime}ms`);
  });

  test('1.5 -should verify page content', async ({ request }: { request: APIRequestContext }) => {
    const response: APIResponse = await request.get('https://www.saucedemo.com');
    const body: string = await response.text();
    expect(body).toContain('Swag Labs');
    // expect(body).toContain('Username');
    // expect(body).toContain('Password');
  });
 
});

test.describe('2 - Mock API Testing', () => {
  test('2.1 - should mock API response', async ({ page }) => {
    await page.route('**/api/products', async (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({ message: 'Mocked API response' }),
      });
    });
    // You can add navigation or API call here to test the mocked route
    // await page.goto('https://www.saucedemo.com');
  });

  test('2.2 -Mock login API should return correct structure', async ({ request }) => {
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
      data: {
        "title": "abc",
        "body": "test"
      },
    });
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body).toHaveProperty('title', 'abc');
  });

  // test fetch API data and validate structure
  test('2.3 -should fetch and validate API data structure', async ({ request }: { request: APIRequestContext }) => {
    const response: APIResponse = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('userId');
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('title');
    expect(data).toHaveProperty('body');
  });

  // test put API data and validate response
  test('2.4 -should update API data and validate response', async ({ request }: { request: APIRequestContext }) => {
    const response: APIResponse = await request.put('https://jsonplaceholder.typicode.com/posts/1', {
      data: {
        "id": 1,
        "title": "abc",
        "body": "test"
      },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('title', 'abc');
    expect(body).toHaveProperty('body', 'test');
  });

});
