# Agnos AI Dashboard Manual Testing Report

## 1. ข้อมูลทั่วไป

- ชื่อผู้ทดสอบ: `................................`
- วันที่ทดสอบ: `................................`
- Environment: `dev`
- Dashboard URL: `https://dev.app.agnoshealth.com/ai_dashboard`
- Sign Up URL: `https://dev.app.agnoshealth.com/ai dashboard/agnos/sign up`
- Public App URL: `https://dev.app.agnoshealth.com`
- Test Account:
  - Username: `provided_test_email`
  - Password: `provided_test_password`

## 2. วัตถุประสงค์

เอกสารนี้ใช้สำหรับสรุปผลการทดสอบแบบ Manual Testing ของระบบ Agnos AI Dashboard ตาม test cases ที่ออกแบบไว้ โดยบันทึกผลการทดสอบจริง, หมายเหตุ, หลักฐานประกอบ และเชื่อมโยงกับ defect ที่พบระหว่างการทดสอบ

## 3. ความหมายของสถานะ

- `Pass` = ผลลัพธ์ที่เกิดขึ้นจริงตรงตามที่คาดหวัง
- `Fail` = ผลลัพธ์ที่เกิดขึ้นจริงไม่ตรงตามที่คาดหวัง
- `Blocked` = ไม่สามารถทดสอบต่อได้เนื่องจากมีข้อจำกัดของ environment, data หรือ permission
- `Not Run` = ยังไม่ได้ทดสอบ

## 4. Manual Test Execution Result

| Test Case ID | Scenario | Expected Result | Manual Status | Auto Test Result | Actual Result / Notes | Evidence |
| --- | --- | --- | --- | --- | --- | --- |
| TC-REG-001 | สมัครสมาชิกด้วยข้อมูลถูกต้อง | ระบบสร้างบัญชีใหม่สำเร็จ | Pass | N/A | สมัครสมาชิกสำเร็จและระบบ redirect ไปหน้า Login |  |
| TC-REG-002 | สมัครสมาชิกด้วยอีเมลที่ถูกใช้งานแล้ว | ระบบแจ้งว่าอีเมลถูกใช้งานแล้ว | Fail | N/A | ระบบยังอนุญาตให้สมัครด้วยอีเมลที่ถูกใช้งานแล้วได้ และไม่แสดงข้อความแจ้งเตือนตามที่คาดหวัง อ้างอิง BUG-002 | แนบ screenshot / video ของเคส fail |
| TC-REG-003 | สมัครสมาชิกโดยไม่กรอกข้อมูลบังคับ | ระบบแสดง validation message | Pass | N/A | ไม่สามารถกด confirm ได้เมื่อกรอกข้อมูลไม่ครบ |  |
| TC-LOG-001 | เข้าสู่ระบบด้วยข้อมูลถูกต้อง | ผู้ใช้เข้าสู่ Dashboard ได้สำเร็จ | Pass | Pass | เข้าสู่ระบบสำเร็จและแสดงหน้า Dashboard |  |
| TC-LOG-002 | เข้าสู่ระบบด้วยรหัสผ่านไม่ถูกต้อง | ระบบแจ้งข้อผิดพลาดและไม่ให้เข้าใช้งาน | Pass | N/A | ไม่สามารถเข้าสู่ระบบได้เมื่อใช้รหัสผ่านไม่ถูกต้อง |  |
| TC-LOG-003 | ออกจากระบบหลัง login สำเร็จ | ระบบออกจากระบบและกลับหน้า Login | Pass | Pass | กด Log Out แล้วระบบกลับไปหน้า Login |  |
| TC-NAV-001 | เปิดหน้า Diagnosis List | ระบบแสดงหน้ารายการเคสถูกต้อง | Pass | Pass | ระบบแสดงหน้า Diagnosis List ได้ถูกต้อง |  |
| TC-NAV-002 | สลับแท็บ Open | ระบบแสดงรายการเคสสถานะ Open | Pass | Pass | เมื่อคลิกแท็บ Open ระบบแสดงรายการเคสสถานะ Open |  |
| TC-NAV-003 | สลับแท็บ In progress | ระบบแสดงรายการเคสสถานะ In progress | Pass | Pass | เมื่อคลิกแท็บ In progress ระบบแสดงรายการเคสสถานะ In progress |  |
| TC-NAV-004 | สลับแท็บ Completed | ระบบแสดงรายการเคสสถานะ Completed | Pass | Pass | เมื่อคลิกแท็บ Completed ระบบแสดงรายการเคสสถานะ Completed |  |
| TC-NAV-005 | สลับแท็บ All | ระบบแสดงรายการเคสทั้งหมด | Pass | Pass | เมื่อคลิกแท็บ All ระบบแสดงรายการเคสทั้งหมด |  |
| TC-SRH-001 | ค้นหาข้อมูลด้วยคำค้นที่มีอยู่จริง | ระบบแสดงผลลัพธ์ตรงกับคำค้น | Pass | Pass | ระบบแสดงผลลัพธ์ตรงกับคำค้นที่มีอยู่จริง |  |
| TC-SRH-002 | ค้นหาด้วยคำค้นที่ไม่มีข้อมูล | ระบบแสดงผลลัพธ์ว่างหรือไม่พบข้อมูล | Pass | N/A | ระบบแสดงผลลัพธ์ว่างเมื่อค้นหาด้วยคำที่ไม่มีข้อมูล |  |
| TC-FLT-001 | กรองข้อมูลตาม Triage: Self care | ระบบแสดงเฉพาะเคส Self care | Pass | N/A | ระบบแสดงเฉพาะเคสในกลุ่ม Self care |  |
| TC-FLT-002 | กรองข้อมูลตาม Triage: Seek Medical | ระบบแสดงเฉพาะเคส Seek Medical | Pass | N/A | ระบบแสดงเฉพาะเคสในกลุ่ม Seek Medical |  |
| TC-FLT-003 | กรองข้อมูลตาม Triage: Urgent | ระบบแสดงเฉพาะเคส Urgent | Pass | N/A | ระบบแสดงเฉพาะเคสในกลุ่ม Urgent |  |
| TC-FLT-004 | กรองข้อมูลตาม Triage: Emergency | ระบบแสดงเฉพาะเคส Emergency | Pass | N/A | ระบบแสดงเฉพาะเคสในกลุ่ม Emergency |  |
| TC-FLT-005 | กรองข้อมูลตามวันที่ด้วย Today | ระบบอัปเดตผลลัพธ์ตามวันที่ที่เลือก | Pass | Pass | เมื่อเลือก Today ระบบอัปเดตรายการตามวันที่ที่เลือก |  |
| TC-FLT-006 | กรองข้อมูลตามวันที่ด้วย This week | ระบบอัปเดตผลลัพธ์ตามช่วงวันที่ที่เลือก | Pass | N/A | เมื่อเลือก This week ระบบอัปเดตรายการตามช่วงวันที่ที่เลือก |  |
| TC-FLT-007 | กรองข้อมูลตาม Channel | ระบบอัปเดตผลลัพธ์ตาม channel ที่เลือก | Pass | Pass | เมื่อเลือก Channel ระบบอัปเดตรายการตามช่องทางที่เลือก |  |
| TC-FLT-008 | กรองข้อมูลแบบผสม | ระบบแสดงผลลัพธ์ตามทุกเงื่อนไข | Pass | N/A | ระบบอัปเดตรายการตามเงื่อนไขการกรองที่เลือกไว้ |  |
| TC-DWN-001 | ดาวน์โหลดข้อมูลจาก Dashboard | ระบบดาวน์โหลดสำเร็จและแสดงข้อความยืนยัน | Pass | Pass | กด Download แล้วยืนยัน ระบบแสดงข้อความดาวน์โหลดสำเร็จ |  |
| TC-DWN-002 | ดาวน์โหลดข้อมูลหลังกรองผลลัพธ์ | ระบบดาวน์โหลดตามผลลัพธ์ที่กรองแล้ว | Pass | N/A | ระบบดาวน์โหลดข้อมูลตามผลลัพธ์ที่ถูกกรองไว้ |  |

## 5. Summary Result

| Result Type | Count |
| --- | --- |
| Pass | 22 |
| Fail | 1 |
| Blocked | 0 |
| Not Run | 0 |

## 5.1 Automated Test Summary

| Auto Result Type | Count |
| --- | --- |
| Pass | 11 |
| Fail | 0 |
| N/A | 12 |

## 6. Defect Summary

| Bug ID | Title | Severity | Status | Related Test Case | Evidence |
| --- | --- | --- | --- | --- | --- |
| BUG-001 | ข้อมูลไม่แสดงผลเมื่อสลับแท็บ เนื่องจากระบบไม่รีเซ็ตเลขหน้า (Pagination) กลับไปที่หน้า 1 | Medium | Open | Navigation / Tab switch | แนบลิงก์หลักฐาน |
| BUG-002 | ระบบอนุญาตให้สมัครสมาชิกด้วยอีเมลที่ถูกใช้งานแล้ว | Medium | Open | TC-REG-002 | แนบ screenshot / video ของเคส fail |

## 7. หลักฐานที่ควรแนบ

- Screenshot สำหรับทุกเคสที่ `Fail`
- Video screen recording หากปัญหาเกิดตามลำดับขั้นตอนหรือเกิดซ้ำยาก
- ลิงก์หรือ path ของหลักฐานควรอ้างอิงกับ Bug ID ให้ชัดเจน

## 8. หมายเหตุ

- ประเด็นที่อยู่นอกขอบเขตของ test case เดิมไม่ถูกใช้เป็นเกณฑ์ตัดสิน Pass/Fail ของเคสนั้นโดยตรง
- ผลในคอลัมน์ `Auto Test Result` ใช้เพื่อแสดงว่าเคสใดมี automated coverage แล้ว ไม่ได้แทนผล manual execution
- รายการ defect ควรสอดคล้องกับเคสที่ fail และมีหลักฐานรองรับ
