# คู่มือคำสั่งที่ใช้ในโปรเจกต์

ไฟล์นี้สรุปคำสั่งหลักที่ใช้กับโปรเจกต์ Playwright + Google Sheets สำหรับ assignment นี้

## 1. ติดตั้งครั้งแรก

ใช้ตอนเริ่มต้นโปรเจกต์หรือหลังดึงโค้ดจาก GitHub มาใหม่

```bash
npm install
```

หน้าที่:
- ติดตั้ง dependency ของโปรเจกต์

ถ้ายังไม่มี browser ของ Playwright:

```bash
npx playwright install chromium
```

หน้าที่:
- ติดตั้ง browser ที่ Playwright ใช้รัน test

## 2. รัน test

```bash
npm run test
```

หน้าที่:
- รัน automated test ทั้งหมด
- สร้างผลลัพธ์ไว้ใน `test-results/`
- สร้าง HTML report

## 3. รัน test แล้ว sync เข้า Google Sheet เลย

```bash
npm run test:sync
```

หน้าที่:
- รัน Playwright test
- อ่านผลจาก `test-results/junit.xml`
- ส่งผลไปยัง Google Sheet แท็บ `Test Results`

อันนี้เป็นคำสั่งหลักที่แนะนำให้ใช้บ่อยที่สุด

## 4. รันแบบเห็น browser

```bash
npm run test:headed
```

หน้าที่:
- รัน test แบบเปิด browser ให้เห็น
- เหมาะสำหรับดู flow การทำงาน

ถ้าต้องการเปิด browser แล้วส่งผลเข้า Google Sheet ต่อทันที:

```bash
npm run test:headed:sync
```

หน้าที่:
- เปิด browser ให้เห็นตอนรัน test
- เมื่อรันจบแล้ว จะ sync ผลเข้า Google Sheet อัตโนมัติ

## 5. รันเฉพาะเคส login

```bash
npm run test:login
```

หน้าที่:
- รันเฉพาะ test login
- ใช้ตอนต้องการเช็กเร็วๆ ว่าระบบ login ยังปกติ

## 6. เปิด Playwright UI

```bash
npm run test:ui
```

หน้าที่:
- เปิด UI ของ Playwright
- ใช้เลือก test, rerun test, และดูผลได้ง่าย

## 7. Debug ทีละ step

```bash
npm run test:debug
```

หน้าที่:
- รัน test แบบ debug
- ใช้ตอนต้องการดูว่า test พังตรงไหน

## 8. เปิด report หลังรันเสร็จ

```bash
npm run test:report
```

หน้าที่:
- เปิด HTML report ของ Playwright

## 9. ทดสอบการเชื่อม Google Sheet

```bash
npm run sheets:test
```

หน้าที่:
- เช็กว่า service account เขียนลง Google Sheet ได้หรือไม่
- ใช้ตรวจการเชื่อมครั้งแรก

## 10. ส่งผล test เข้า Google Sheet อย่างเดียว

```bash
npm run sheets:sync
```

หน้าที่:
- อ่านผลจาก `test-results/junit.xml`
- อัปเดตข้อมูลใน Google Sheet แท็บ `Test Results`

ใช้เมื่อ:
- คุณรัน test ไปแล้ว
- แต่ต้องการ sync ผลเข้า sheet ใหม่อีกรอบ

## 11. ไฟล์สำคัญที่ควรรู้

- `.env`
  - เก็บค่า config เช่น URL, username, password, spreadsheet id

- `test-results/junit.xml`
  - ไฟล์ผลลัพธ์ที่ script ใช้ส่งเข้า Google Sheet

- `playwright-report/`
  - HTML report ของ Playwright

- `docs/test-plan.md`
  - เอกสาร test case

- `docs/manual-test-report.md`
  - เอกสาร manual test report

## 12. ลำดับใช้งานที่แนะนำ

ถ้าจะใช้งานปกติ:

```bash
npm run test:sync
```

ถ้าจะดู browser ด้วยก่อน:

```bash
npm run test:headed
npm run sheets:sync
```

ถ้าจะเช็กการเชื่อมชีต:

```bash
npm run sheets:test
```

## 13. ถ้าเจอปัญหา

### รัน `test:sync` ไม่ได้

ให้เช็กว่าใน `package.json` มี script นี้อยู่แล้ว

### ข้อมูลไม่ขึ้น Google Sheet

ให้เช็ก:
- แชร์ชีตให้ service account แล้วหรือยัง
- `GOOGLE_SHEETS_SPREADSHEET_ID` ใน `.env` ถูกหรือไม่
- มีไฟล์ `test-results/junit.xml` หรือไม่

### test รันไม่ผ่าน

ให้ลอง:

```bash
npm run test:headed
```

หรือ

```bash
npm run test:debug
```

เพื่อดูว่า test พังตรง step ไหน
