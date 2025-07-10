# SauceDemo Playwright Testing Framework

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

```
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
```

## 🛠️ การติดตั้งและเริ่มต้น

### 1. ติดตั้ง Dependencies
```bash
npm install
```

### 2. ติดตั้ง Playwright Browsers
```bash
npx playwright install
```

### 3. รันทดสอบ
```bash
# รันทดสอบทั้งหมด
npm test

# รันทดสอบแบบมี UI
npm run test:ui

# รันทดสอบแบบ Debug
npm run test:debug

# รันทดสอบแบบเห็นเบราว์เซอร์
npm run test:headed
```

## 📊 การดูรายงาน

### รายงาน HTML
```bash
npm run test:report
```

## 🎯 การเริ่มต้นใช้งาน

1. Clone หรือสร้างโปรเจกต์ใหม่
2. รัน `npm install` เพื่อติดตั้ง dependencies
3. รัน `npx playwright install` เพื่อติดตั้ง browsers
4. รัน `npm test` เพื่อทดสอบ
5. รัน `npm run test:report` เพื่อดูรายงาน

## 📚 เอกสารเพิ่มเติม

- [Playwright Documentation](https://playwright.dev/)
- [SauceDemo Website](https://www.saucedemo.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)


## 📚 playwright
- รัน test ทั้งหมด:
  ```sh
  npx playwright test
  ```
- รัน test แบบ UI interactive:
  ```sh
  npx playwright test --ui
  ```
- รัน test เฉพาะไฟล์:
  ```sh
  npx playwright test tests/login.spec.js
  npx playwright test tests/api.spec.js   
  npx playwright test tests/shopping.spec.js   