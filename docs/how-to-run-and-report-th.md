# วิธีรันและเก็บ Report สำหรับส่งงาน

## 1. ติดตั้งก่อนใช้งาน

```bash
npm install
npx playwright install chromium
```

## 2. รันแบบดู browser จริง

ถ้าต้องการเห็น flow ตอนทดสอบ:

```bash
npm run test:headed
```

ถ้าต้องการรันเฉพาะเคส login:

```bash
npm run test:login
```

## 3. รันแบบคลิกดูง่าย

Playwright UI Mode จะเปิดหน้าจอให้เลือกเทส, rerun, และดูผลย้อนหลังได้ง่าย:

```bash
npm run test:ui
```

เหมาะเวลาจะเดโมหรือไล่ดู flow ทีละเคส

## 4. รันแบบ debug ทีละ step

```bash
npm run test:debug
```

ใช้ตอนต้องการดูว่า test ค้างหรือพังที่ step ไหน

## 5. เปิด report หลังรันเสร็จ

```bash
npm run test:report
```

จะเปิด HTML report ของ Playwright ซึ่งใช้แนบผลการทดสอบหรือแคปหน้าจอประกอบการส่งงานได้

## 6. ไฟล์ผลลัพธ์ที่ควรใช้ส่งงาน

- HTML report: โฟลเดอร์ `playwright-report/`
- Screenshot/Video/Trace: โฟลเดอร์ `test-results/`
- JUnit XML: `test-results/junit.xml`
- Manual report: `docs/manual-test-report.md`
- Bug report: `docs/bug-report-template.md`

## 7. แนวทางส่งงาน

- ใช้ `docs/test-plan.md` เป็นเอกสารออกแบบ test case
- ใช้ `docs/manual-test-report.md` กรอกผล Pass/Fail จาก manual test
- ถ้าเจอบัค ให้แยกเขียนตาม `docs/bug-report-template.md`
- ใช้ Playwright HTML report เป็นหลักฐานของ automated test
- แนบ screenshot/video ของเคส fail จาก `test-results/`

## 8. การเชื่อม Secret บน GitHub

ถ้าจะส่งงานผ่าน Private GitHub repository และอยากให้รันอัตโนมัติบน GitHub Actions:

1. ไปที่ `Settings > Secrets and variables > Actions`
2. สร้าง Secrets เหล่านี้
   - `BASE_URL`
   - `AGNOS_USERNAME`
   - `AGNOS_PASSWORD`
3. ใช้ workflow ที่เตรียมไว้ใน `.github/workflows/playwright.yml`

ค่าที่แนะนำ:

```env
BASE_URL=https://dev.app.agnoshealth.com
AGNOS_USERNAME=test@gmail.com
AGNOS_PASSWORD=12345
```

ถ้ารันในเครื่อง local ให้ใส่ค่าเดียวกันไว้ในไฟล์ `.env`
