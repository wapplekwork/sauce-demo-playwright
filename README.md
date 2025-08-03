# sauce-demo-playwright
sauce-demo-playwright

# Install playwright
- npm install
- npm init playwright@latest

# Run all tests
npx playwright test

# Run เฉพาะ user flows
npx playwright test user-flows

# Run แบบ headed (เห็น browser)
npx playwright test user-flows --headed

# Run แบบ debug
npx playwright test user-flows --debug

# Run แบบ debug
- npm run report

# Running the Example Test in UI Mode
- npx playwright test --ui
- npx playwright test tests/login.spec.ts
- npx playwright test tests/shopping.spec.ts


# HTML Test Reports
npx playwright show-report

# วิธีติดตั้งและตั้งค่า Allure Report สำหรับ Playwright project 
1. ติดตั้ง dependencies ที่จำเป็น:
- npm install -D allure-playwright
2. ติดตั้ง Allure Command Line Tool:
- npm install -g allure-commandline

3. วิธีการใช้งาน Allure Report:
- npm run test:report

 รันเฉพาะ test file และสร้าง report:
- npx playwright test tests/login.spec.ts && npx allure generate allure-results --clean && npx allure open allure-report

 ล้าง report เก่า 
 - npm run allure:clear