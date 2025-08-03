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
