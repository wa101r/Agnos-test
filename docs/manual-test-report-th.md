# Agnos AI Dashboard Manual Testing Report

## 1. ข้อมูลทั่วไป

- ชื่อผู้ทดสอบ: `................................`
- วันที่ทดสอบ: `................................`
- Environment: `dev`
- Dashboard URL: `https://dev.app.agnoshealth.com/ai_dashboard`
- Sign Up URL: `https://dev.app.agnoshealth.com/ai dashboard/agnos/sign up`
- Public App URL: `https://dev.app.agnoshealth.com`
- Test Account:
  - Username: `test@gmail.com`
  - Password: `12345`

## 2. วัตถุประสงค์

เอกสารนี้ใช้สำหรับบันทึกผลการทดสอบแบบ Manual Testing ของระบบ Agnos AI Dashboard ตาม Test Case ที่ออกแบบไว้ โดยระบุผลการทดสอบของแต่ละกรณีเป็น `Pass`, `Fail`, หรือ `Blocked` พร้อมหมายเหตุและหลักฐานประกอบ

## 3. สถานะที่ใช้ในรายงาน

- `Pass` = ผลลัพธ์ตรงตามที่คาดหวัง
- `Fail` = ผลลัพธ์ไม่ตรงตามที่คาดหวัง
- `Blocked` = ไม่สามารถทดสอบต่อได้เนื่องจากติดปัญหา เช่น environment, data, permission
- `Not Run` = ยังไม่ได้ทดสอบ

## 4. Manual Test Execution Result

| Test Case ID | Scenario | Expected Result | Manual Status | Auto Test Result | Actual Result / Notes | Evidence |
| --- | --- | --- | --- | --- | --- | --- |
| TC-REG-001 | สมัครสมาชิกด้วยข้อมูลถูกต้อง | ระบบสร้างบัญชีใหม่สำเร็จ | Not Run | N/A |  |  |
| TC-REG-002 | สมัครสมาชิกด้วยอีเมลที่ถูกใช้งานแล้ว | ระบบแจ้งว่าอีเมลถูกใช้งานแล้ว | Not Run | N/A |  |  |
| TC-REG-003 | สมัครสมาชิกโดยไม่กรอกข้อมูลบังคับ | ระบบแสดง validation message | Not Run | N/A |  |  |
| TC-LOG-001 | เข้าสู่ระบบด้วยข้อมูลถูกต้อง | ผู้ใช้เข้าสู่ Dashboard ได้สำเร็จ | Not Run | Pass |  |  |
| TC-LOG-002 | เข้าสู่ระบบด้วยรหัสผ่านไม่ถูกต้อง | ระบบแจ้งข้อผิดพลาดและไม่ให้เข้าใช้งาน | Not Run | N/A |  |  |
| TC-LOG-003 | ออกจากระบบหลัง login สำเร็จ | ระบบออกจากระบบและกลับหน้า Login | Not Run | Pass |  |  |
| TC-NAV-001 | เปิดหน้า Diagnosis List | ระบบแสดงหน้ารายการเคสถูกต้อง | Not Run | Pass |  |  |
| TC-NAV-002 | สลับแท็บ Open | ระบบแสดงรายการเคสสถานะ Open | Not Run | Pass |  |  |
| TC-NAV-003 | สลับแท็บ In progress | ระบบแสดงรายการเคสสถานะ In progress | Not Run | Pass |  |  |
| TC-NAV-004 | สลับแท็บ Completed | ระบบแสดงรายการเคสสถานะ Completed | Not Run | Pass |  |  |
| TC-NAV-005 | สลับแท็บ All | ระบบแสดงรายการเคสทั้งหมด | Not Run | Pass |  |  |
| TC-SRH-001 | ค้นหาข้อมูลด้วยคำค้นที่มีอยู่จริง | ระบบแสดงผลลัพธ์ตรงกับคำค้น | Not Run | Pass |  |  |
| TC-SRH-002 | ค้นหาด้วยคำค้นที่ไม่มีข้อมูล | ระบบแสดงผลลัพธ์ว่างหรือไม่พบข้อมูล | Not Run | N/A |  |  |
| TC-FLT-001 | กรองข้อมูลตาม Triage: Self care | ระบบแสดงเฉพาะเคส Self care | Not Run | N/A |  |  |
| TC-FLT-002 | กรองข้อมูลตาม Triage: Seek Medical | ระบบแสดงเฉพาะเคส Seek Medical | Not Run | N/A |  |  |
| TC-FLT-003 | กรองข้อมูลตาม Triage: Urgent | ระบบแสดงเฉพาะเคส Urgent | Not Run | N/A |  |  |
| TC-FLT-004 | กรองข้อมูลตาม Triage: Emergency | ระบบแสดงเฉพาะเคส Emergency | Not Run | N/A |  |  |
| TC-FLT-005 | กรองข้อมูลตามวันที่ด้วย Today | ระบบอัปเดตผลลัพธ์ตามวันที่ที่เลือก | Not Run | Pass |  |  |
| TC-FLT-006 | กรองข้อมูลตามวันที่ด้วย This week | ระบบอัปเดตผลลัพธ์ตามช่วงวันที่ที่เลือก | Not Run | N/A |  |  |
| TC-FLT-007 | กรองข้อมูลตาม Channel | ระบบอัปเดตผลลัพธ์ตาม channel ที่เลือก | Not Run | Pass |  |  |
| TC-FLT-008 | กรองข้อมูลแบบผสม | ระบบแสดงผลลัพธ์ตามทุกเงื่อนไข | Not Run | N/A |  |  |
| TC-DWN-001 | ดาวน์โหลดข้อมูลจาก Dashboard | ระบบดาวน์โหลดสำเร็จและแสดงข้อความยืนยัน | Not Run | Pass |  |  |
| TC-DWN-002 | ดาวน์โหลดข้อมูลหลังกรองผลลัพธ์ | ระบบดาวน์โหลดตามผลลัพธ์ที่กรองแล้ว | Not Run | N/A |  |  |

## 5. Summary Result

| Result Type | Count |
| --- | --- |
| Pass | 0 |
| Fail | 0 |
| Blocked | 0 |
| Not Run | 23 |

## 5.1 Automated Test Summary

| Auto Result Type | Count |
| --- | --- |
| Pass | 10 |
| Fail | 0 |
| N/A | 13 |

## 6. Defect Summary

| Bug ID | Title | Severity | Status | Related Test Case | Evidence |
| --- | --- | --- | --- | --- | --- |
| BUG-001 | ระบุเมื่อพบ defect |  | Open |  |  |

## 7. หลักฐานที่ควรแนบ

- Screenshot สำหรับทุกเคสที่ `Fail`
- Video screen recording ถ้าปัญหาเกิดเป็นลำดับขั้นตอนหรือเกิดยาก
- HTML report / test result เพิ่มเติม ถ้ามีส่วนที่เกี่ยวข้อง

## 8. หมายเหตุสำหรับการทดสอบจริง

- ก่อนเริ่มทดสอบ search/filter/download ควรเตรียม record สำหรับใช้ทดสอบให้พร้อม
- หากข้อมูลใน environment เปลี่ยนตลอด ควรบันทึกข้อมูลที่ใช้ทดสอบ เช่น Record ID, วันที่, channel, triage
- หากพบ defect ควรอ้างอิง Test Case ID ให้ชัดเจนเพื่อเชื่อมกับเอกสาร Test Case Design

## 9. ตัวอย่างการกรอกผล

ตัวอย่าง:

| Test Case ID | Scenario | Expected Result | Manual Status | Auto Test Result | Actual Result / Notes | Evidence |
| --- | --- | --- | --- | --- | --- | --- |
| TC-LOG-001 | เข้าสู่ระบบด้วยข้อมูลถูกต้อง | ผู้ใช้เข้าสู่ Dashboard ได้สำเร็จ | Pass | Pass | สามารถ login และเห็นหน้า Diagnosis List ได้ตามคาด | screenshot_login_pass.png |
| TC-LOG-002 | เข้าสู่ระบบด้วยรหัสผ่านไม่ถูกต้อง | ระบบแจ้งข้อผิดพลาดและไม่ให้เข้าใช้งาน | Fail | N/A | ระบบไม่แสดงข้อความ error แม้กรอกรหัสผ่านผิด | screenshot_login_fail.png |
