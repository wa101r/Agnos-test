# Agnos AI Dashboard Assignment Final Report

## 1. ข้อมูลทั่วไป

- Assignment: Software Tester Assignment
- System Under Test: Agnos AI Dashboard
- Environment: `dev`
- Dashboard URL: `https://dev.app.agnoshealth.com/ai_dashboard`
- Public App URL: `https://dev.app.agnoshealth.com`
- Test Account:
  - Username: `provided_test_email`
  - Password: `provided_test_password`

## 2. วัตถุประสงค์ของงาน

เอกสารนี้ใช้สรุปผลการดำเนินงานตาม assignment ตำแหน่ง Software Tester โดยครอบคลุมการออกแบบ test case, การทดสอบแบบ manual, การพัฒนา automated test ด้วย Playwright และการจัดทำรายงานผลการทดสอบ

## 3. ขอบเขตที่ครอบคลุม

ขอบเขตของการออกแบบและทดสอบครอบคลุมฟังก์ชันหลักของ AI Dashboard ดังนี้

- User registration
- User login / logout
- Navigate through different tabs/pages
- Search for a record
- Filter records by triage, date, and channel
- Download records

## 4. Test Case Design

ได้จัดทำเอกสาร Test Case Design สำหรับทั้ง Manual Testing และแนวทาง Automated Testing ไว้ดังนี้

- [test-plan-th.md](./test-plan-th.md)
- [test-plan.md](./test-plan.md)

เอกสารดังกล่าวครอบคลุม scenario ตามโจทย์ ได้แก่ registration, login/logout, navigation, search, filter และ download

## 5. Manual Testing

ผล Manual Testing ถูกบันทึกไว้ใน Google Sheet และ template เอกสารดังนี้

- [manual-test-report-th.md](./manual-test-report-th.md)
- [manual-test-report.md](./manual-test-report.md)
- [bug-report-template.md](./bug-report-template.md)

### 5.1 สรุปผล Manual Testing

- Total manual test cases: `23`
- Passed: `22`
- Failed: `1`
- Blocked: `0`
- Not Run: `0`

### 5.2 Defects Found

จากการทดสอบพบ defect อย่างน้อย 2 รายการที่ถูกบันทึกใน defect summary

- `BUG-001`: ข้อมูลไม่แสดงผลเมื่อสลับแท็บ เนื่องจากระบบไม่รีเซ็ตเลขหน้า (Pagination) กลับไปที่หน้า 1
- `BUG-002`: ระบบอนุญาตให้สมัครสมาชิกด้วยอีเมลที่ถูกใช้งานแล้ว

## 6. Automated Testing

Automated Testing ถูกพัฒนาด้วย `Playwright` โดยมีโครงสร้าง project สำหรับรัน test, ดู report และ sync ผลขึ้น Google Sheet

ไฟล์ที่เกี่ยวข้อง:

- [playwright.config.ts](../playwright.config.ts)
- [auth-login.spec.ts](../tests/auth-login.spec.ts)
- [dashboard-smoke.spec.ts](../tests/dashboard-smoke.spec.ts)
- [LoginPage.ts](../src/pages/LoginPage.ts)
- [DashboardPage.ts](../src/pages/DashboardPage.ts)

### 6.1 Automated Test Cases ที่พัฒนาแล้ว

Automated test ที่รันได้ในปัจจุบันประกอบด้วย 8 test executions หลัก:

1. Login ด้วยข้อมูลถูกต้อง
2. ตรวจสอบการแสดงผล dashboard controls หลัก
3. ตรวจสอบการสลับแท็บสถานะ
4. ตรวจสอบการค้นหา record
5. ตรวจสอบการ logout
6. ตรวจสอบ date preset filter
7. ตรวจสอบ channel filter
8. ตรวจสอบ download flow พร้อม confirmation

### 6.2 ผลการรัน Automated Test

- Total automated test executions: `8`
- Passed: `8`
- Failed: `0`

คำสั่งที่ใช้รัน:

```bash
npm run test
```

หรือหากต้องการเปิด browser ระหว่างรัน:

```bash
npm run test:headed
```

## 7. Test Reporting

ระบบ reporting ที่จัดเตรียมไว้ในโปรเจกต์นี้ประกอบด้วย 3 ส่วน

### 7.1 Playwright HTML Report

- โฟลเดอร์: `playwright-report/`
- ใช้สำหรับดูผลการรัน test, screenshot, video และ trace

### 7.2 JUnit Result

- ไฟล์: `test-results/junit.xml`
- ใช้เป็น input สำหรับ sync ผลการทดสอบเข้า Google Sheet

### 7.3 Google Sheets Reporting

ได้เชื่อมผลการทดสอบจาก Playwright ไปยัง Google Sheet แล้ว โดยใช้ service account และ script สำหรับ sync ผล test

ไฟล์ที่เกี่ยวข้อง:

- [google-sheets-client.js](../scripts/google-sheets-client.js)
- [test-google-sheets.js](../scripts/test-google-sheets.js)
- [sync-playwright-results-to-sheets.js](../scripts/sync-playwright-results-to-sheets.js)

คำสั่งที่ใช้:

```bash
npm run sheets:test
npm run sheets:sync
```

หรือรัน test แล้ว sync ต่อทันที:

```bash
npm run test:sync
```

หรือเปิด browser แล้ว sync ต่อทันที:

```bash
npm run test:headed:sync
```

## 8. Code Quality and Best Practices

แนวทางที่ใช้ใน automation project:

- แยก page object สำหรับ login และ dashboard
- ใช้ locator ที่อิงกับ DOM จริงของระบบ
- แยก script ของ Google Sheets integration ออกจาก test logic
- จัดทำเอกสารคู่มือคำสั่งและการรันงาน

เอกสารที่เกี่ยวข้อง:

- [commands-guide-th.md](./commands-guide-th.md)
- [how-to-run-and-report-th.md](./how-to-run-and-report-th.md)

## 9. ข้อจำกัดและข้อสังเกต

- ข้อมูลใน environment `dev` อาจมีการเปลี่ยนแปลงตลอดเวลา จึงอาจส่งผลต่อ search, filter และ download ในบางรอบการทดสอบ
- บางกรณีที่ต้องอาศัย test data เฉพาะ ควรสร้าง record ใหม่ก่อนทดสอบเพื่อให้ตรวจสอบผลลัพธ์ได้ชัดเจน
- รายงานฉบับนี้เน้นผลการทดสอบจริงที่ถูกบันทึกไว้ใน Google Sheet เป็นหลัก

## 10. สรุปผลการดำเนินงาน

จาก assignment นี้ ได้ดำเนินการครบตามหัวข้อหลัก ได้แก่

- ออกแบบ Test Case ครอบคลุมขอบเขตที่กำหนด
- ดำเนินการ Manual Testing และบันทึกผลจริง
- พัฒนา Automated Testing ด้วย Playwright
- รัน automated test ผ่านสำเร็จ
- จัดทำระบบ reporting ทั้ง HTML report, JUnit result และ Google Sheets sync
- จัดทำ defect summary สำหรับปัญหาที่พบระหว่างการทดสอบ

โปรเจกต์ในสถานะปัจจุบันสามารถใช้เป็นชุดส่งงานได้ทันที ทั้งในส่วนของ Google Sheet report และ GitHub repository ที่ประกอบด้วย test scripts, README และเอกสารประกอบ
