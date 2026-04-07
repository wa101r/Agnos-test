# Agnos AI Dashboard Assignment Final Report

## 1. ข้อมูลทั่วไป

- Assignment: Software Tester Assignment
- System Under Test: Agnos AI Dashboard
- Environment: `dev`
- Dashboard URL: `https://dev.app.agnoshealth.com/ai_dashboard`
- Public App URL: `https://dev.app.agnoshealth.com`
- Test Account:
  - Username: `test@gmail.com`
  - Password: `12345`

## 2. วัตถุประสงค์ของงาน

เอกสารนี้จัดทำขึ้นเพื่อสรุปผลการดำเนินงานตาม assignment ตำแหน่ง Software Tester โดยครอบคลุมหัวข้อหลักดังต่อไปนี้

- การออกแบบ Test Case
- การทดสอบแบบ Manual Testing
- การพัฒนา Automated Testing ด้วย Playwright
- การจัดทำ Test Report
- การจัดเตรียมโครงสร้างงานให้สามารถนำผลการทดสอบไปบันทึกลง Google Sheet ได้

## 3. ขอบเขตที่ครอบคลุม

ระบบที่ทำการออกแบบและทดสอบครอบคลุม flow หลักของ AI Dashboard ดังนี้

- User registration
- User login / logout
- Navigate through different tabs/pages
- Search for a record
- Filter records by triage, date, and channel
- Download records

## 4. Test Case Design

ได้ออกแบบ Test Case ทั้งสำหรับ Manual Testing และแนวทาง Automated Testing ตามขอบเขตของ assignment โดยจัดทำเอกสารไว้ดังนี้

- [test-plan-th.md](d:/1JOB/Agnos%20test/docs/test-plan-th.md)
- [test-plan.md](d:/1JOB/Agnos%20test/docs/test-plan.md)

### 4.1 Manual Test Coverage

มีการออกแบบ Test Case ครอบคลุม:

- การสมัครสมาชิกด้วยข้อมูลถูกต้อง / ไม่ถูกต้อง
- การเข้าสู่ระบบด้วยข้อมูลถูกต้อง / ไม่ถูกต้อง
- การออกจากระบบ
- การตรวจสอบหน้าและแท็บหลักของ Dashboard
- การค้นหา record
- การกรองข้อมูลตาม triage, date, channel และการกรองแบบผสม
- การดาวน์โหลดข้อมูล

### 4.2 Automation Coverage Plan

มีการเลือก flow ที่เหมาะสมกับการทำ regression test ด้วย Playwright โดยเน้น scenario ที่มีความสำคัญและมีความเสถียรในการทำซ้ำ เช่น

- Login
- Logout
- Dashboard main controls
- Status tabs navigation
- Search
- Date filter
- Channel filter
- Download confirmation flow

## 5. Manual Testing

ได้จัดเตรียมเอกสารสำหรับบันทึกผล Manual Testing ไว้ดังนี้

- [manual-test-report-th.md](d:/1JOB/Agnos%20test/docs/manual-test-report-th.md)
- [manual-test-report.md](d:/1JOB/Agnos%20test/docs/manual-test-report.md)
- [bug-report-template.md](d:/1JOB/Agnos%20test/docs/bug-report-template.md)

เอกสารดังกล่าวรองรับการบันทึก:

- สถานะ Pass / Fail / Blocked / Not Run
- Actual Result
- Notes
- Evidence
- Defect Summary

หมายเหตุ:
- ในรอบการจัดทำโปรเจกต์นี้ ได้เตรียม template และโครงสร้างเอกสารสำหรับ Manual Testing ครบถ้วน
- ผู้ทดสอบสามารถนำเอกสารไปใช้ในการบันทึกผลจากการทดสอบจริงบน environment ได้ทันที

## 6. Automated Testing

Automated Testing ถูกพัฒนาด้วย `Playwright` โดยมีโครงสร้างโปรเจกต์สำหรับรัน test, ดู browser, ดู report, และ sync ผลการทดสอบเข้า Google Sheet ได้

ไฟล์ที่เกี่ยวข้อง:

- [playwright.config.ts](d:/1JOB/Agnos%20test/playwright.config.ts)
- [auth-login.spec.ts](d:/1JOB/Agnos%20test/tests/auth-login.spec.ts)
- [dashboard-smoke.spec.ts](d:/1JOB/Agnos%20test/tests/dashboard-smoke.spec.ts)
- [LoginPage.ts](d:/1JOB/Agnos%20test/src/pages/LoginPage.ts)
- [DashboardPage.ts](d:/1JOB/Agnos%20test/src/pages/DashboardPage.ts)

### 6.1 Automated Test Cases ที่พัฒนาแล้ว

Automated test ที่รันได้ในปัจจุบันประกอบด้วย:

1. Login ด้วยข้อมูลถูกต้อง
2. ตรวจสอบการแสดงผล Dashboard controls หลัก
3. ตรวจสอบการสลับแท็บ Open / In progress / Completed / All
4. ตรวจสอบการค้นหา record แล้วผลลัพธ์เปลี่ยน
5. ตรวจสอบการ logout
6. ตรวจสอบ date preset filter
7. ตรวจสอบ channel filter
8. ตรวจสอบ download flow พร้อม confirmation

### 6.2 ผลการรัน Automated Test

ผลการรันล่าสุด:

- Total automated test cases: `8`
- Passed: `8`
- Failed: `0`

คำสั่งที่ใช้รัน:

```bash
npm run test
```

หรือถ้าต้องการเปิด browser ระหว่างรัน:

```bash
npm run test:headed
```

## 7. Test Reporting

ระบบรายงานผลการทดสอบที่เตรียมไว้ในโปรเจกต์นี้ประกอบด้วย 3 ส่วน

### 7.1 Playwright HTML Report

ใช้ดูผลการรัน test, screenshot, video, และ trace

- โฟลเดอร์: `playwright-report/`

เปิดดูได้ด้วย:

```bash
npm run test:report
```

### 7.2 JUnit Result

ใช้สำหรับ export ผลลัพธ์ test ไปใช้งานต่อ เช่น sync เข้าระบบรายงาน

- ไฟล์: `test-results/junit.xml`

### 7.3 Google Sheets Reporting

ได้เชื่อมผลการรันทดสอบจาก Playwright ไปยัง Google Sheet เรียบร้อยแล้ว โดยใช้ service account และ script สำหรับ sync ผล test

ไฟล์และ script ที่เกี่ยวข้อง:

- [google-sheets-client.js](d:/1JOB/Agnos%20test/scripts/google-sheets-client.js)
- [test-google-sheets.js](d:/1JOB/Agnos%20test/scripts/test-google-sheets.js)
- [sync-playwright-results-to-sheets.js](d:/1JOB/Agnos%20test/scripts/sync-playwright-results-to-sheets.js)

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

ในส่วนของ automation project ได้คำนึงถึงความสามารถในการดูแลรักษาและการขยายต่อ โดยมีแนวทางดังนี้

- แยก page object สำหรับ login และ dashboard
- ใช้ locator ที่อิงกับ DOM จริงของระบบ
- แยก script สำหรับ Google Sheets integration ออกจาก test logic
- จัดทำ command guide ภาษาไทยสำหรับใช้งานโปรเจกต์

เอกสารคู่มือที่เกี่ยวข้อง:

- [commands-guide-th.md](d:/1JOB/Agnos%20test/docs/commands-guide-th.md)
- [how-to-run-and-report-th.md](d:/1JOB/Agnos%20test/docs/how-to-run-and-report-th.md)

## 9. ข้อจำกัดและข้อสังเกต

- ข้อมูลใน environment `dev` อาจมีการเปลี่ยนแปลงได้ตลอดเวลา จึงอาจส่งผลต่อ search, filter, และ download บางกรณี
- การทดสอบบางส่วนที่พึ่งพา test data เฉพาะ ควรสร้าง record ใหม่ก่อนเพื่อให้ตรวจสอบผลลัพธ์ได้ชัดเจน
- Manual testing ยังต้องอาศัยการบันทึกผลจริงเพิ่มเติมจากผู้ทดสอบ หากต้องการใช้เป็นหลักฐานส่งงานฉบับสมบูรณ์
- ส่วน AI report ถูกเตรียมโครงสร้างไว้แล้ว แต่ยังไม่ได้เปิดใช้งานจริงในรอบนี้ เนื่องจากยังไม่ได้เชื่อม OpenAI API key

## 10. สรุปผลการดำเนินงาน

จาก assignment นี้ ได้ดำเนินการจัดเตรียมงานครบตามหัวข้อสำคัญ ได้แก่

- ออกแบบ Test Case ครอบคลุมขอบเขตที่กำหนด
- จัดทำเอกสาร Manual Testing พร้อม template สำหรับบันทึกผลและ defect
- พัฒนา Automated Testing ด้วย Playwright
- รัน automated test ผ่านสำเร็จ
- จัดเตรียมระบบ reporting ทั้ง HTML report, JUnit result, และ Google Sheets sync

โปรเจกต์ในสถานะปัจจุบันสามารถใช้เป็นชุดส่งงานได้ทันที และสามารถขยายต่อสำหรับ regression testing หรือ reporting automation ได้ในขั้นถัดไป
