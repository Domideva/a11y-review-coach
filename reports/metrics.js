window.A11Y_METRICS = {
  lighthouse: {
    before: { index: 90, book: 83, contact: 93 },
    after:  { index: 96, book: 100, contact: 100 }
  },
  detection: {
    seeded: 20,
    detected: 19,
    missed: [
      {
        id: "seeded-05",
        page: "index.html",
        element: ".hero p { color: #a8a8b3 }",
        wcag: "1.4.3",
        severity: "High",
        description: "Hero paragraph text colour #a8a8b3 on background #0f3460 has ~2.8:1 contrast ratio, below the 4.5:1 AA minimum."
      }
    ],
    extraFindings: 7
  },
  fixes: {
    total: 29,
    fixed: 28,
    open: 1
  },
  time: {
    bobMinutes: 20,
    manualEstimateMinutes: 354,
    note: "bobMinutes covers T4 parallel review (10 min) plus T5 fixes (~10 min, not separately clocked in time-log.md). manualEstimateMinutes is an ESTIMATE: the sum of effortMinutes across all 29 findings in findings.js, representing projected developer time to find and fix each issue without tool assistance."
  }
};
