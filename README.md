##  sauce-demo-playwright

## 📊 Test Reports
- 🔗 **Allure Report**: [View Latest Report](https://wapplekwork.github.io/sauce-demo-playwright/)
- 📈 **Test History**: [View in GitHub Actions](https://github.com/wapplekwork/sauce-demo-playwright/actions)

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

---

## 📊 Allure Report Setup & Usage

### Prerequisites
- Java Runtime Environment (JRE) 8 หรือสูงกว่า
- ตรวจสอบ JAVA_HOME environment variable ให้ถูกต้อง

### 🔧 การติดตั้ง Allure Report

#### 1. ติดตั้ง allure-playwright package
```bash
npm install -D allure-playwright --legacy-peer-deps
```

#### 2. ติดตั้ง Allure Command Line Tool (Global)
```bash
npm install -g allure-commandline
```

#### 3. ตั้งค่า JAVA_HOME (หาก Error)
```powershell
# ตรวจสอบ Java version
java -version

# ตั้งค่า JAVA_HOME สำหรับ PowerShell session
$env:JAVA_HOME = "C:\Program Files (x86)\Java\jre1.8.0_461"

# หรือตั้งค่าถาวรใน System Environment Variables
[Environment]::SetEnvironmentVariable("JAVA_HOME", "C:\Program Files (x86)\Java\jre1.8.0_461", "Machine")
```

### 🚀 วิธีการใช้งาน Allure Report

#### รัน Tests พร้อมสร้าง Allure Results
```bash
# รัน all tests พร้อม allure reporter
npx playwright test

# รันเฉพาะ test file
npx playwright test tests/login.spec.ts
npx playwright test tests/shopping.spec.ts
```

#### สร้างและเปิด Allure Report
```bash
# สร้าง report จาก allure-results
npx allure generate ./allure-results --clean

# เปิด report ใน browser
npx allure open allure-report

# หรือรวมคำสั่งเดียว
npx allure generate ./allure-results --clean && npx allure open allure-report
```

#### คำสั่งรวม (One-liner)
```bash
# รัน tests → สร้าง report → เปิดใน browser
npx playwright test && npx allure generate ./allure-results --clean && npx allure open allure-report

# รันเฉพาะ login test พร้อม generate report
npx playwright test tests && npx allure generate ./allure-results --clean && npx allure open allure-report
npx playwright test tests/login.spec.ts && npx allure generate ./allure-results --clean && npx allure open allure-report
```

### 📦 NPM Scripts (เพิ่มแล้วใน package.json)

#### Allure Commands
```bash
# สร้าง allure report
npm run allure:generate

# เปิด allure report
npm run allure:open

# serve allure report (alternative)
npm run allure:serve

# ล้างข้อมูล allure เก่า
npm run allure:clear

# รัน all tests + generate + open report
npm run test:allure

# รัน login tests + generate + open report  
npm run test:login:allure
```

### 🧹 การจัดการ Reports

#### ล้างข้อมูล Reports เก่า
```bash
# ลบ allure-results และ allure-report
Remove-Item -Recurse -Force ./allure-results, ./allure-report -ErrorAction SilentlyContinue

# หรือใช้ rm ใน PowerShell
rm -rf ./allure-results ./allure-report
```

#### ล้าง + รัน Tests ใหม่
```bash
# ล้างข้อมูลเก่า → รัน tests → สร้าง report
Remove-Item -Recurse -Force ./allure-results, ./allure-report -ErrorAction SilentlyContinue; 
npx playwright test; 
npx allure generate ./allure-results --clean; 
npx allure open allure-report
```

### 📁 โครงสร้างไฟล์ Allure

```
project/
├── allure-results/          # Raw test results (JSON files)
│   ├── xxx-result.json      # Individual test results
│   └── xxx-attachment.txt   # Test attachments
├── allure-report/           # Generated HTML report
│   ├── index.html          # Main report page
│   ├── data/               # Report data
│   └── assets/             # Static files
└── playwright.config.ts    # Allure reporter configuration
```

### ⚙️ Advanced Configuration

#### Allure Reporter Options (playwright.config.ts)
```typescript
reporter: [
  ['html'],
  ['allure-playwright', {
    detail: true,                    // รายละเอียดครบถ้วน
    outputFolder: 'allure-results',  // โฟลเดอร์ output
    suiteTitle: false,              // ไม่แสดง suite title
    categories: [                   // กำหนด error categories
      {
        name: "Broken tests",
        matchedStatuses: ["broken"]
      }
    ]
  }]
]
```

### 🔍 Troubleshooting

#### ปัญหาที่พบบ่อย:
1. **JAVA_HOME Error**: ตั้งค่า JAVA_HOME ให้ถูกต้อง
2. **Module Not Found**: ติดตั้ง allure-playwright package
3. **Permission Error**: รัน PowerShell as Administrator
4. **Port Already in Use**: ปิด browser tab เก่าก่อนเปิดใหม่

#### Useful Commands:
```bash
# ตรวจสอบ allure version
npx allure --version

# ดูไฟล์ใน allure-results
dir ./allure-results

# ตรวจสอบ port ที่ allure ใช้
netstat -ano | findstr :PORT_NUMBER
```



[![Playwright Tests](https://github.com/wapplekwork/sauce-demo-playwright/actions/workflows/playwright.yml/badge.svg)](https://github.com/wapplekwork/sauce-demo-playwright/actions/workflows/playwright.yml)



