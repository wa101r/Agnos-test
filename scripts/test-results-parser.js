const fs = require("fs");
const path = require("path");
const { XMLParser } = require("fast-xml-parser");

function toArray(value) {
  if (!value) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}

function parseJUnitXml(xmlPath = path.resolve("test-results", "junit.xml")) {
  if (!fs.existsSync(xmlPath)) {
    throw new Error(`JUnit report not found at ${xmlPath}. Run Playwright first.`);
  }

  const xml = fs.readFileSync(xmlPath, "utf8");
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: ""
  });
  const parsed = parser.parse(xml);
  const suites = toArray(parsed.testsuites?.testsuite || parsed.testsuite);

  const testCases = [];
  for (const suite of suites) {
    const suiteName = suite.name || "Unnamed Suite";
    const testcases = toArray(suite.testcase);

    for (const testcase of testcases) {
      const failure = testcase.failure || testcase.error || null;
      testCases.push({
        suiteName,
        testName: testcase.name || "",
        status: failure ? "FAIL" : "PASS",
        durationSeconds: testcase.time || "",
        failureMessage: failure?.message || ""
      });
    }
  }

  return testCases;
}

module.exports = {
  parseJUnitXml
};
