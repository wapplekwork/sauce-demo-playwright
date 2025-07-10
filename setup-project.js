#!/usr/bin/env node

/**
 * Setup Script สำหรับสร้างโปรเจกต์ SauceDemo Playwright Testing
 * รันคำสั่ง: node setup-project.js
 */

const fs = require('fs');
const path = require('path');

// สร้างโฟลเดอร์
const createDirectory = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ Created directory: ${dirPath}`);
  }
};

// สร้างไฟล์
const createFile = (filePath, content) => {
  const dir = path.dirname(filePath);
  createDirectory(dir);
  fs.writeFileSync(filePath, content);
  console.log(`✅ Created file: ${filePath}`);
};

// สร้างโครงสร้างโปรเจกต์
const setupProject = () => {
  console.log('🚀 Setting up SauceDemo Playwright Testing Project...\n');

  // package.json
  const packageJson = `{
  "name": "saucedemo-playwright-testing",
  "version": "1.0.0",
  "description": "Automated testing for SauceDemo website using Playwright",
  "main": "index.js",
  "scripts": {
    "test": "playwright test",
    "test:ui": "playwright test --ui",
    "test:debug": "playwright test --debug",
    "test:headed": "playwright test --headed",
    "test:report": "playwright show-report",
    "test:install": "playwright install"
  },
  "keywords": ["playwright", "testing", "automation", "saucedemo"],
  "author": "Your Name",
  "license": "MIT",
  "devDependencies": {
    "@playwright/test": "^1.40.0",
    "@types/node": "^20.0.0"
  },
  "dependencies": {
    "dotenv": "^16.3.1"
  }
}`;

  // playwright.config.js
  const playwrightConfig = `// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['junit', { outputFile: 'test-results/results.xml' }],
    ['json', { outputFile: 'test-results/results.json' }]
  ],
  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  webServer: {
    command: 'npm run start',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});`;

  // pages/LoginPage.js
  const loginPageJs = `// pages/LoginPage.js
class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.loginLogo = page.locator('.login_logo');
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  async isLoginPageDisplayed() {
    return await this.loginLogo.isVisible();
  }
}

// pages/InventoryPage.js
class InventoryPage {
  constructor(page) {
    this.page = page;
    this.inventoryContainer = page.locator('[data-test="inventory-container"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.addToCartButtons = page.locator('[data-test*="add-to-cart"]');
    this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
  }

  async isInventoryPageDisplayed() {
    return await this.inventoryContainer.isVisible();
  }

  async getInventoryItemsCount() {
    return await this.inventoryItems.count();
  }

  async addFirstItemToCart() {
    await this.addToCartButtons.first().click();
  }

  async addItemToCartByName(itemName) {
    const item = this.page.locator(\`[data-test="add-to-cart-\${itemName.toLowerCase().replace(/ /g, '-')}"]\`);
    await item.click();
  }

  async getCartBadgeCount() {
    return await this.shoppingCartBadge.textContent();
  }

  async goToCart() {
    await this.shoppingCartLink.click();
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}

// pages/CartPage.js
class CartPage {
  constructor(page) {
    this.page = page;
    this.cartList = page.locator('[data-test="cart-list"]');
    this.cartItems = page.locator('[data-test="cart-item"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.removeButtons = page.locator('[data-test*="remove"]');
  }

  async isCartPageDisplayed() {
    return await this.cartList.isVisible();
  }

  async getCartItemsCount() {
    return await this.cartItems.count();
  }

  async removeFirstItem() {
    await this.removeButtons.first().click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }
}

module.exports = { LoginPage, InventoryPage, CartPage };`;

  // utils/testData.js
  const testDataJs = `// utils/testData.js
const testUsers = {
  validUsers: [
    {
      username: 'standard_user',
      password: 'secret_sauce',
      description: 'Standard user with full access'
    },
    {
      username: 'performance_glitch_user',
      password: 'secret_sauce',
      description: 'User with performance issues'
    },
    {
      username: 'problem_user',
      password: 'secret_sauce',
      description: 'User with product issues'
    }
  ],
  lockedUser: {
    username: 'locked_out_user',
    password: 'secret_sauce',
    description: 'Locked out user'
  },
  invalidUsers: [
    {
      username: 'invalid_user',
      password: 'secret_sauce',
      description: 'Invalid username'
    },
    {
      username: 'standard_user',
      password: 'wrong_password',
      description: 'Invalid password'
    },
    {
      username: '',
      password: 'secret_sauce',
      description: 'Empty username'
    },
    {
      username: 'standard_user',
      password: '',
      description: 'Empty password'
    }
  ]
};

const testProducts = [
  {
    name: 'Sauce Labs Backpack',
    price: '$29.99',
    id: 'sauce-labs-backpack'
  },
  {
    name: 'Sauce Labs Bike Light',
    price: '$9.99',
    id: 'sauce-labs-bike-light'
  },
  {
    name: 'Sauce Labs Bolt T-Shirt',
    price: '$15.99',
    id: 'sauce-labs-bolt-t-shirt'
  }
];

const checkoutData = {
  validCustomer: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345'
  },
  invalidCustomer: {
    firstName: '',
    lastName: '',
    postalCode: ''
  }
};

module.exports = {
  testUsers,
  testProducts,
  checkoutData
};`;

  // tests/login.spec.js
  const loginTestJs = `// tests/login.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage, InventoryPage } = require('../pages/LoginPage');
const { testUsers } = require('../utils/testData');

test.describe('Login Functionality', () => {
  let loginPage;
  let inventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
  });

  test('should display login page correctly', async ({ page }) => {
    await expect(page).toHaveTitle(/Swag Labs/);
    await expect(loginPage.isLoginPageDisplayed()).toBeTruthy();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    const user = testUsers.validUsers[0];
    await loginPage.login(user.username, user.password);
    
    await expect(inventoryPage.isInventoryPageDisplayed()).toBeTruthy();
    await expect(page).toHaveURL(/inventory/);
  });

  test('should show error for locked out user', async ({ page }) => {
    const user = testUsers.lockedUser;
    await loginPage.login(user.username, user.password);
    
    const errorMessage = await loginPage.getErrorMessage();
    await expect(errorMessage).toContain('Sorry, this user has been locked out');
  });

  test.describe('Invalid Login Attempts', () => {
    testUsers.invalidUsers.forEach((user, index) => {
      test(\`should show error for \${user.description}\`, async ({ page }) => {
        await loginPage.login(user.username, user.password);
        
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toBeTruthy();
        expect(errorMessage.length).toBeGreaterThan(0);
      });
    });
  });

  test('should logout successfully', async ({ page }) => {
    const user = testUsers.validUsers[0];
    await loginPage.login(user.username, user.password);
    
    await expect(inventoryPage.isInventoryPageDisplayed()).toBeTruthy();
    
    await inventoryPage.logout();
    await expect(loginPage.isLoginPageDisplayed()).toBeTruthy();
  });
});`;

  // tests/shopping.spec.js
  const shoppingTestJs = `// tests/shopping.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage, InventoryPage, CartPage } = require('../pages/LoginPage');
const { testUsers, testProducts } = require('../utils/testData');

test.describe('Shopping Cart Functionality', () => {
  let loginPage;
  let inventoryPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    
    // Login before each test
    await loginPage.goto();
    const user = testUsers.validUsers[0];
    await loginPage.login(user.username, user.password);
    await expect(inventoryPage.isInventoryPageDisplayed()).toBeTruthy();
  });

  test('should display all inventory items', async ({ page }) => {
    const itemsCount = await inventoryPage.getInventoryItemsCount();
    expect(itemsCount).toBeGreaterThan(0);
  });

  test('should add item to cart', async ({ page }) => {
    await inventoryPage.addFirstItemToCart();
    
    const cartBadgeCount = await inventoryPage.getCartBadgeCount();
    expect(cartBadgeCount).toBe('1');
  });

  test('should add multiple items to cart', async ({ page }) => {
    // Add first item
    await inventoryPage.addFirstItemToCart();
    
    // Add specific item by name
    await inventoryPage.addItemToCartByName('sauce-labs-bike-light');
    
    const cartBadgeCount = await inventoryPage.getCartBadgeCount();
    expect(cartBadgeCount).toBe('2');
  });

  test('should view cart with added items', async ({ page }) => {
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.goToCart();
    
    await expect(cartPage.isCartPageDisplayed()).toBeTruthy();
    
    const cartItemsCount = await cartPage.getCartItemsCount();
    expect(cartItemsCount).toBe(1);
  });

  test('should remove item from cart', async ({ page }) => {
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.goToCart();
    
    await cartPage.removeFirstItem();
    
    const cartItemsCount = await cartPage.getCartItemsCount();
    expect(cartItemsCount).toBe(0);
  });

  test('should continue shopping from cart', async ({ page }) => {
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.goToCart();
    
    await cartPage.continueShopping();
    
    await expect(inventoryPage.isInventoryPageDisplayed()).toBeTruthy();
  });

  test('should proceed to checkout', async ({ page }) => {
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.goToCart();
    
    await cartPage.proceedToCheckout();
    
    // Should be on checkout page
    await expect(page).toHaveURL(/checkout-step-one/);
  });
});`;

  // tests/api.spec.js
  const apiTestJs = `// tests/api.spec.js
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

  test('should verify static assets load correctly', async ({ request }) => {
    // Test if CSS loads correctly
    const cssResponse = await request.get('https://www.saucedemo.com/static/css/main.css');
    expect(cssResponse.status()).toBe(200);
    expect(cssResponse.headers()['content-type']).toContain('text/css');
  });

  test('should test response time', async ({ request }) => {
    const startTime = Date.now();
    const response = await request.get('https://www.saucedemo.com');
    const endTime = Date.now();
    
    const responseTime = endTime - startTime;
    
    expect(response.status()).toBe(200);
    expect(responseTime).toBeLessThan(5000); // Should respond within 5 seconds
    
    console.log(\`Response time: \${responseTime}ms\`);
  });

  test('should verify page content', async ({ request }) => {
    const response = await request.get('https://www.saucedemo.com');
    const body = await response.text();
    
    expect(body).toContain('Swag Labs');
    expect(body).toContain('Username');
    expect(body).toContain('Password');
  });
});`;

  // .github/workflows/playwright.yml
  const githubActionsYml = `name: Playwright Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
  schedule:
    # Run tests daily at 6 AM UTC
    - cron: '0 6 * * *'

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18.x, 20.x]
        
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js \${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: \${{ matrix.node-version }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
    
    - name: Run Playwright tests
      run: npm run test
      env:
        CI: true
    
    - name: Upload test results
      uses: actions/upload-artifact@v4
      if: always()
      with:
        name: playwright-report-\${{ matrix.node-version }}
        path: |
          playwright-report/
          test-results/
        retention-days: 30
    
    - name: Upload test videos
      uses: actions/upload-artifact@v4
      if: failure()
      with:
        name: playwright-videos-\${{ matrix.node-version }}
        path: test-results/
        retention-days: 7

  deploy-report:
    needs: test
    runs-on: ubuntu-latest
    if: always()
    steps:
    - name: Download artifacts
      uses: actions/download-artifact@v4
      with:
        name: playwright-report-20.x
        path: playwright-report
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: \${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./playwright-report
        destination_dir: test-reports/\${{ github.run_number }}`;

  // README.md
  const readmeMd = `# SauceDemo Playwright Testing Framework

โปรเจกต์นี้เป็นเฟรมเวิร์คสำหรับทดสอบเว็บไซต์ SauceDemo อัตโนมัติ โดยใช้ Playwright และ GitHub Actions

## 🚀 คุณสมบัติ

- ✅ การทดสอบ UI แบบ End-to-End
- ✅ การทดสอบ API พื้นฐาน
- ✅ Page Object Model Design Pattern
- ✅ การทดสอบข้ามเบราว์เซอร์ (Chrome, Firefox, Safari)
- ✅ การทดสอบบน Mobile
- ✅ CI/CD ด้วย GitHub Actions
- ✅ รายงานผลการทดสอบ HTML
- ✅ การบันทึกวิดีโอเมื่อทดสอบล้มเหลว
- ✅ การทดสอบแบบ Parallel

## 📁 โครงสร้างโปรเจกต์

\`\`\`
├── .github/
│   └── workflows/
│       └── playwright.yml          # GitHub Actions CI/CD
├── pages/
│   └── LoginPage.js               # Page Object Models
├── tests/
│   ├── login.spec.js              # ทดสอบการล็อกอิน
│   ├── shopping.spec.js           # ทดสอบการช็อปปิ้ง
│   └── api.spec.js                # ทดสอบ API
├── utils/
│   └── testData.js                # ข้อมูลทดสอบ
├── playwright.config.js           # การตั้งค่า Playwright
├── package.json                   # Dependencies
└── README.md                      # คู่มือนี้
\`\`\`

## 🛠️ การติดตั้งและเริ่มต้น

### 1. ติดตั้ง Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. ติดตั้ง Playwright Browsers
\`\`\`bash
npx playwright install
\`\`\`

### 3. รันทดสอบ
\`\`\`bash
# รันทดสอบทั้งหมด
npm test

# รันทดสอบแบบมี UI
npm run test:ui

# รันทดสอบแบบ Debug
npm run test:debug

# รันทดสอบแบบเห็นเบราว์เซอร์
npm run test:headed
\`\`\`

## 📊 การดูรายงาน

### รายงาน HTML
\`\`\`bash
npm run test:report
\`\`\`

## 🎯 การเริ่มต้นใช้งาน

1. Clone หรือสร้างโปรเจกต์ใหม่
2. รัน \`npm install\` เพื่อติดตั้ง dependencies
3. รัน \`npx playwright install\` เพื่อติดตั้ง browsers
4. รัน \`npm test\` เพื่อทดสอบ
5. รัน \`npm run test:report\` เพื่อดูรายงาน

## 📚 เอกสารเพิ่มเติม

- [Playwright Documentation](https://playwright.dev/)
- [SauceDemo Website](https://www.saucedemo.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
`;

  // .env.example
  const envExample = `# Environment Variables
BASE_URL=https://www.saucedemo.com
CI=false
HEADLESS=true
BROWSER=chromium
TIMEOUT=30000
`;

  // .gitignore
  const gitignore = `# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Testing
/test-results/
/playwright-report/
/playwright/.cache/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# Logs
logs
*.log
`;

  // สร้างไฟล์ทั้งหมด
  createFile('package.json', packageJson);
  createFile('playwright.config.js', playwrightConfig);
  createFile('pages/LoginPage.js', loginPageJs);
  createFile('utils/testData.js', testDataJs);
  createFile('tests/login.spec.js', loginTestJs);
  createFile('tests/shopping.spec.js', shoppingTestJs);
  createFile('tests/api.spec.js', apiTestJs);
  createFile('.github/workflows/playwright.yml', githubActionsYml);
  createFile('README.md', readmeMd);
  createFile('.env.example', envExample);
  createFile('.gitignore', gitignore);

  console.log('\n🎉 Project setup completed successfully!');
  console.log('\n📝 Next steps:');
  console.log('1. Run: npm install');
  console.log('2. Run: npx playwright install');
  console.log('3. Run: npm test');
  console.log('4. Run: npm run test:report');
  console.log('\n🔗 Useful commands:');
  console.log('- npm run test:ui     (Run with UI)');
  console.log('- npm run test:debug  (Debug mode)');
  console.log('- npm run test:headed (See browser)');
};

// รัน setup
setupProject();