# Agnos AI Dashboard Test Case Design

## 1. ข้อมูลทั่วไป

- Project: Agnos AI Dashboard
- ประเภทเอกสาร: Test Case Design
- วัตถุประสงค์: ออกแบบ Test Plan สำหรับการทดสอบระบบ AI Dashboard ทั้งแบบ Manual Testing และ Automated Testing ตามขอบเขตที่ได้รับมอบหมาย
- Environment: `dev`
- Dashboard URL: `https://dev.app.agnoshealth.com/ai_dashboard`
- Sign Up URL: `https://dev.app.agnoshealth.com/ai dashboard/agnos/sign up`
- Public App URL สำหรับสร้าง Record: `https://dev.app.agnoshealth.com`
- Test Account:
  - Username: `test@gmail.com`
  - Password: `12345`

## 2. ขอบเขตการทดสอบ

เอกสารนี้ครอบคลุมการออกแบบ Test Case สำหรับฟังก์ชันหลักของ AI Dashboard ดังนี้

- การสมัครสมาชิก (User registration)
- การเข้าสู่ระบบและออกจากระบบ (User login/logout)
- การคลิกเปลี่ยนไปยังหน้า/แท็บต่างๆ บนเว็บไซต์ (Navigate through different tabs/pages)
- การค้นหาข้อมูลประวัติผู้ป่วย (Search for a record)
- การกรองข้อมูลตามระดับความรุนแรง (Triages), วันที่ หรือช่องทาง (Filter records)
- การดาวน์โหลดข้อมูล (Download records)

## 3. แนวทางการทดสอบ

### 3.1 Manual Testing

ใช้สำหรับตรวจสอบความถูกต้องของ flow หลัก, validation, ข้อความแจ้งเตือน, การแสดงผลบนหน้าจอ, และพฤติกรรมที่ต้องอาศัยการสังเกตจากผู้ทดสอบโดยตรง

### 3.2 Automated Testing

ใช้สำหรับครอบคลุม regression ของ flow ที่สำคัญและเกิดการใช้งานบ่อย โดยเลือกเฉพาะเคสที่มีความเสถียรและเหมาะกับการทำซ้ำด้วย Playwright

## 4. Preconditions

- ผู้ทดสอบสามารถเข้าถึง environment `dev` ได้
- Test account สามารถใช้งานได้ปกติ
- มีอย่างน้อย 1 patient record สำหรับใช้ทดสอบ search/filter/download
- หากจำเป็นต้องทดสอบ search/filter ด้วยข้อมูลเฉพาะ ต้องสร้าง record ใหม่ผ่าน Public App ก่อนเริ่มทดสอบ

## 5. Manual Test Cases

| Test Case ID | Scenario | Preconditions | Test Steps | Expected Result | Test Type |
| --- | --- | --- | --- | --- | --- |
| TC-REG-001 | สมัครสมาชิกด้วยข้อมูลถูกต้อง | ผู้ใช้ยังไม่มีบัญชีในระบบ | 1. เปิดหน้า Sign Up 2. กรอกข้อมูลครบถ้วน 3. กดสมัครสมาชิก | ระบบสร้างบัญชีใหม่สำเร็จและแสดงผลลัพธ์ที่ถูกต้อง | Manual |
| TC-REG-002 | สมัครสมาชิกด้วยอีเมลที่ถูกใช้งานแล้ว | มีบัญชีเดิมอยู่ในระบบ | 1. เปิดหน้า Sign Up 2. กรอกอีเมลเดิม 3. กดสมัครสมาชิก | ระบบแสดงข้อความแจ้งเตือนว่าอีเมลถูกใช้งานแล้ว | Manual |
| TC-REG-003 | สมัครสมาชิกโดยไม่กรอกข้อมูลบังคับ | ผู้ใช้อยู่ในหน้า Sign Up | 1. เปิดหน้า Sign Up 2. เว้นช่องบังคับว่าง 3. กดสมัครสมาชิก | ระบบไม่อนุญาตให้สมัครและแสดง validation message | Manual |
| TC-LOG-001 | เข้าสู่ระบบด้วยข้อมูลถูกต้อง | มีบัญชีผู้ใช้ในระบบ | 1. เปิดหน้า Login 2. กรอกอีเมลและรหัสผ่านที่ถูกต้อง 3. กด Sign in | ผู้ใช้เข้าสู่ Dashboard ได้สำเร็จ | Manual / Automate |
| TC-LOG-002 | เข้าสู่ระบบด้วยรหัสผ่านไม่ถูกต้อง | มีบัญชีผู้ใช้ในระบบ | 1. เปิดหน้า Login 2. กรอกอีเมลถูกต้องและรหัสผ่านผิด 3. กด Sign in | ระบบไม่อนุญาตให้เข้าใช้งานและแสดงข้อความผิดพลาด | Manual |
| TC-LOG-003 | ออกจากระบบหลัง login สำเร็จ | ผู้ใช้ login อยู่ในระบบ | 1. กด Log Out | ระบบออกจากระบบและกลับไปหน้า Login | Manual / Automate |
| TC-NAV-001 | เปิดหน้า/แท็บ Diagnosis List | ผู้ใช้ login สำเร็จ | 1. เข้าสู่ระบบ 2. ตรวจสอบหน้า Diagnosis List | ระบบแสดงหน้ารายการเคสได้ถูกต้อง | Manual / Automate |
| TC-NAV-002 | สลับแท็บ Open | ผู้ใช้ login สำเร็จ และมีข้อมูลในระบบ | 1. เข้าสู่ Dashboard 2. คลิกแท็บ Open | ระบบแสดงรายการเฉพาะเคสสถานะ Open | Manual / Automate |
| TC-NAV-003 | สลับแท็บ In progress | ผู้ใช้ login สำเร็จ และมีข้อมูลในระบบ | 1. เข้าสู่ Dashboard 2. คลิกแท็บ In progress | ระบบแสดงรายการเฉพาะเคสสถานะ In progress | Manual / Automate |
| TC-NAV-004 | สลับแท็บ Completed | ผู้ใช้ login สำเร็จ และมีข้อมูลในระบบ | 1. เข้าสู่ Dashboard 2. คลิกแท็บ Completed | ระบบแสดงรายการเฉพาะเคสสถานะ Completed | Manual / Automate |
| TC-NAV-005 | สลับแท็บ All | ผู้ใช้ login สำเร็จ และมีข้อมูลในระบบ | 1. เข้าสู่ Dashboard 2. คลิกแท็บ All | ระบบแสดงรายการเคสทั้งหมด | Manual / Automate |
| TC-SRH-001 | ค้นหาข้อมูลด้วยคำค้นที่มีอยู่จริง | มี record ในระบบ | 1. เข้าสู่ Dashboard 2. กรอกชื่อผู้ป่วย / Record ID / ข้อมูลที่ค้นหาได้ 3. กด Search | ระบบแสดงผลลัพธ์ที่ตรงกับคำค้น | Manual / Automate |
| TC-SRH-002 | ค้นหาด้วยคำค้นที่ไม่มีข้อมูล | มี record ในระบบ | 1. กรอกคำค้นที่ไม่มีอยู่จริง 2. กด Search | ระบบแสดงผลลัพธ์ว่างหรือข้อความว่าไม่พบข้อมูล | Manual |
| TC-FLT-001 | กรองข้อมูลตาม Triage: Self care | มีข้อมูลหลายระดับความรุนแรง | 1. เข้าสู่ Dashboard 2. เลือก Self care | ระบบแสดงเฉพาะเคสระดับ Self care | Manual |
| TC-FLT-002 | กรองข้อมูลตาม Triage: Seek Medical | มีข้อมูลหลายระดับความรุนแรง | 1. เลือก Seek Medical | ระบบแสดงเฉพาะเคสระดับ Seek Medical | Manual |
| TC-FLT-003 | กรองข้อมูลตาม Triage: Urgent | มีข้อมูลหลายระดับความรุนแรง | 1. เลือก Urgent | ระบบแสดงเฉพาะเคสระดับ Urgent | Manual |
| TC-FLT-004 | กรองข้อมูลตาม Triage: Emergency | มีข้อมูลหลายระดับความรุนแรง | 1. เลือก Emergency | ระบบแสดงเฉพาะเคสระดับ Emergency | Manual |
| TC-FLT-005 | กรองข้อมูลตามวันที่ด้วย preset Today | มีข้อมูลในระบบ | 1. คลิก Select date 2. เลือก Today | ระบบอัปเดตผลลัพธ์ตามวันที่ที่เลือก | Manual / Automate |
| TC-FLT-006 | กรองข้อมูลตามวันที่ด้วย preset This week | มีข้อมูลในระบบ | 1. คลิก Select date 2. เลือก This week | ระบบอัปเดตผลลัพธ์ตามช่วงวันที่ที่เลือก | Manual |
| TC-FLT-007 | กรองข้อมูลตามช่องทาง (Channel) | มีข้อมูลจากหลาย channel | 1. คลิก Channel 2. เลือก channel ที่ต้องการ | ระบบอัปเดตผลลัพธ์ตาม channel ที่เลือก | Manual / Automate |
| TC-FLT-008 | กรองข้อมูลแบบผสม (Triage + Date + Channel) | มีข้อมูลเพียงพอในระบบ | 1. เลือก triage 2. เลือก date 3. เลือก channel | ระบบแสดงผลลัพธ์ตามทุกเงื่อนไขที่กำหนด | Manual |
| TC-DWN-001 | ดาวน์โหลดข้อมูลจาก Dashboard | ผู้ใช้ login สำเร็จ และมีข้อมูลในระบบ | 1. กดปุ่ม Download 2. ยืนยันการดาวน์โหลด | ระบบดำเนินการดาวน์โหลดสำเร็จและแสดงข้อความยืนยัน | Manual / Automate |
| TC-DWN-002 | ดาวน์โหลดข้อมูลหลังกรองผลลัพธ์ | มีการใช้ filter หรือ search ก่อนดาวน์โหลด | 1. ค้นหาหรือกรองข้อมูล 2. กด Download 3. ยืนยัน | ระบบดาวน์โหลดข้อมูลตามผลลัพธ์ปัจจุบันได้ถูกต้อง | Manual |

## 6. Automated Test Coverage Plan

เนื่องจาก assignment ระบุให้ทำ automated test อย่างน้อย 1 เคส เอกสารนี้จึงระบุ automation candidate ที่เหมาะสมสำหรับ regression และสามารถขยายต่อได้

| Automation ID | Scenario | Priority | Reason for Automation |
| --- | --- | --- | --- |
| AT-LOG-001 | Login ด้วยข้อมูลถูกต้อง | High | เป็น flow หลักของระบบและเป็น gateway ของทุกการทดสอบ |
| AT-LOG-002 | Logout หลัง login สำเร็จ | High | เป็น flow สำคัญที่ต้องใช้งานบ่อย |
| AT-NAV-001 | ตรวจสอบการแสดงผล Dashboard controls หลัก | High | ใช้เป็น smoke test เพื่อตรวจว่าหน้าหลักโหลดได้ครบ |
| AT-NAV-002 | สลับแท็บ Open / In progress / Completed / All | High | เป็นฟังก์ชันใช้งานหลักของหน้า Dashboard |
| AT-SRH-001 | Search แล้วผลลัพธ์เปลี่ยนตามคำค้น | High | เป็น feature หลักและมีความเหมาะสมต่อการทำ regression |
| AT-FLT-001 | Filter ตามวันที่ด้วย preset Today | Medium | เป็น preset ที่มีพฤติกรรมชัดเจนและตรวจสอบได้ง่าย |
| AT-FLT-002 | Filter ตาม Channel | Medium | เป็น flow ใช้งานจริงของผู้ใช้ใน Dashboard |
| AT-DWN-001 | Download flow พร้อมยืนยันการดาวน์โหลด | Medium | เหมาะสำหรับตรวจ regression ของ flow export ข้อมูล |

## 7. Test Data

- Username: `test@gmail.com`
- Password: `12345`
- ข้อมูล record ที่ใช้ทดสอบ:
  - ควรมีอย่างน้อย 1 record สำหรับ search
  - ควรมีหลาย record ที่มี triage ต่างกัน
  - ควรมีหลาย record ในช่วงวันที่ต่างกัน
  - ควรมีหลาย channel สำหรับทดสอบ filter channel

## 8. Expected Deliverables

- Test Case Design เอกสารนี้
- Manual Test Report พร้อมผล Pass/Fail
- Bug Report พร้อมหลักฐาน screenshot หรือ video สำหรับเคสที่พบปัญหา
- Automated Test Project ด้วย Playwright
- Test execution report และหลักฐานผลการทดสอบ

## 9. หมายเหตุ

- ในการทดสอบจริง ควรบันทึกหลักฐานหน้าจอสำหรับทุกเคสที่ไม่ผ่าน
- สำหรับ automation ควรเลือกเคสที่มีความเสถียรและไม่ผูกกับข้อมูลที่เปลี่ยนแปลงบ่อยเกินไป
- หาก environment มีข้อมูลเปลี่ยนตลอดเวลา ควรสร้าง test data ใหม่ก่อนทดสอบ search/filter/download เพื่อให้ผลลัพธ์ตรวจสอบได้ชัดเจน
