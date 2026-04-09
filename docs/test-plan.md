# Agnos AI Dashboard Test Plan

## 1. Objective

Validate key AI Dashboard workflows for functional correctness, usability, and data handling:

- User registration
- User login/logout
- Navigation across tabs/pages
- Search patient records
- Filter records by triage, date, and channel
- Download records

## 2. Scope

### In scope

- Core dashboard web flows
- Positive and negative functional scenarios
- UI behavior relevant to main business flows
- Basic data verification after record creation

### Out of scope

- Performance testing
- Security penetration testing
- API-level validation unless exposed through UI behavior
- Cross-browser coverage beyond the first automation baseline

## 3. Test Environment

- Environment: `dev`
- Dashboard URL: `https://dev.app.agnoshealth.com/ai_dashboard`
- Sign up URL: `https://dev.app.agnoshealth.com/ai dashboard/agnos/sign up`
- Record creation URL: `https://dev.app.agnoshealth.com`
- Test account:
  - Username: `provided_test_email`
  - Password: `provided_test_password`

## 4. Entry / Exit Criteria

### Entry criteria

- Test environment is reachable
- Test user credentials are valid
- Tester can create at least one patient record from the public app

### Exit criteria

- All planned critical test cases executed
- Pass/fail recorded for each case
- Defects documented with evidence

## 5. Risks

- Dev environment instability may cause false failures
- Existing seeded data may affect search/filter assertions
- Ambiguous UI labels may require locator adjustment in automation

## 6. Manual Test Cases

| ID | Scenario | Type | Preconditions | Steps | Expected Result |
| --- | --- | --- | --- | --- | --- |
| TC-REG-001 | Register with valid data | Positive | User is on sign up page | Fill all required fields with valid data and submit | Account is created successfully |
| TC-REG-002 | Register with existing email | Negative | Existing account available | Submit sign up form with already used email | Validation error is shown |
| TC-REG-003 | Register with missing mandatory fields | Negative | User is on sign up page | Leave required fields blank and submit | Inline validation is shown, no account created |
| TC-LOG-001 | Login with valid credentials | Positive | User account exists | Enter valid email/password and submit | User lands on dashboard |
| TC-LOG-002 | Login with invalid password | Negative | User account exists | Enter valid email and invalid password | Error message is shown |
| TC-LOG-003 | Logout from dashboard | Positive | User is logged in | Click logout | Session ends and user returns to login page |
| TC-NAV-001 | Open each main tab/page | Positive | User is logged in | Click each visible navigation item | Each destination page loads correctly |
| TC-SRH-001 | Search existing patient record | Positive | At least one record exists | Search by known patient name/identifier | Matching record is displayed |
| TC-SRH-002 | Search with unmatched keyword | Negative | User is on records page | Search random non-existing text | No result state is shown |
| TC-FLT-001 | Filter by triage level | Positive | Records exist with multiple triage levels | Apply one triage filter | List updates to matching records only |
| TC-FLT-002 | Filter by date range | Positive | Records exist on different dates | Apply date filter | List shows records within selected range |
| TC-FLT-003 | Filter by channel | Positive | Records exist across channels | Apply channel filter | List updates to matching channel only |
| TC-FLT-004 | Combine filters | Positive | Diverse data exists | Apply triage + date + channel filters | Records satisfy all selected conditions |
| TC-DWN-001 | Download filtered records | Positive | Filter or search results are present | Click download/export action | File downloads successfully |
| TC-DWN-002 | Download without matching records | Negative | No records returned | Trigger download | System handles request gracefully |

## 7. Suggested Automation Coverage

Prioritize stable, high-value regression scenarios:

| ID | Scenario | Priority | Why automate |
| --- | --- | --- | --- |
| AT-LOG-001 | Login with valid credentials | High | Frequent smoke test and gateway flow |
| AT-LOG-002 | Login with invalid credentials | High | Important validation path |
| AT-NAV-001 | Navigate to records page after login | High | Core dashboard access verification |
| AT-SRH-001 | Search known patient record | Medium | Stable when controlled data exists |
| AT-FLT-001 | Filter by triage | Medium | Valuable regression if locator/data are stable |
| AT-DWN-001 | Download records | Medium | Useful, but often environment-dependent |

## 8. Test Data

- Existing user: `provided_test_email / provided_test_password`
- Create at least one new patient record from public app before running search/filter/download scenarios
- Recommended record fields to control:
  - Unique patient name
  - Triage level
  - Submission date
  - Submission channel

## 9. Deliverables

- Completed manual execution report
- Bug report(s) with screenshots/video
- Playwright project with at least one automated test
- Final summary report
