# A11y Review Coach — Plan

## 1. Problem

Accessibility issues slip through code review because most reviewers are not accessibility experts.
They are found late by real users or formal audits rather than during development.
Fixing them late causes costly rework and excludes users from the product.

---

## 2. Folder Structure

```
.bob/skills/a11y-review/
  SKILL.md                   # skill entry-point, instructions for the review workflow
  wcag-checklist.md          # WCAG 2.2 AA checks ordered by category
  severity-guide.md          # rules for High / Medium / Low severity assignment
  report-template.md         # prose template used when writing findings

.github/
  pull_request_template.md   # PR checklist that references the a11y skill

sample-app/
  index.html                 # landing page — contains seeded issues
  book.html                  # booking flow page — contains seeded issues
  contact.html               # contact form page — contains seeded issues
  styles.css                 # shared styles (contrast, focus, motion issues)
  app.js                     # vanilla JS (keyboard trap, ARIA misuse issues)

sample-app-before/           # frozen snapshot of original sample-app (copied by hand before fixes)

ground-truth/
  seeded-issues.md           # authoritative list of all 20 seeded issues with page, element, WCAG ref

reports/
  A11Y_REVIEW.md             # human-readable findings report (markdown)
  findings.js                # machine-readable findings — sets window.A11Y_FINDINGS (see §4)
  FIX_LOG.md                 # log of every fix applied with before/after code snippets
  IMPACT.md                  # narrative impact analysis (detection rate, severity breakdown)
  metrics.js                 # lighthouse + detection stats — sets window.A11Y_METRICS (see §4)

metrics/
  lighthouse-scores.md       # Lighthouse accessibility scores filled in by hand
  time-log.md                # time spent filled in by hand

dashboard/
  index.html                 # interactive results dashboard (reads findings.js + metrics.js)

docs/
  A11Y_PR_CHECKLIST.md       # reusable PR checklist doc

bob_sessions/                # task summary screenshots (added by hand during demo)

index.html                   # GitHub Pages landing / redirect to dashboard
README.md
PLAN.md
.bobignore
.nojekyll
```

---

## 3. Build Tasks

### T2 — Reusable a11y-review Skill

**Goal:** A Bob skill that any project can invoke to run a structured WCAG 2.2 AA review.

**Files touched:**
`.bob/skills/a11y-review/SKILL.md`, `wcag-checklist.md`, `severity-guide.md`, `report-template.md`

**Done when:**
- [ ] SKILL.md describes the review workflow end-to-end (discover → classify → fix → report)
- [ ] wcag-checklist.md covers all 10 categories with testable criteria
- [ ] severity-guide.md maps WCAG level + user impact to High / Medium / Low
- [ ] report-template.md renders one finding entry matching the `findings.js` schema

---

### T3 — Sample Static Site with 20 Seeded Issues + Ground-Truth File

**Goal:** A realistic three-page static site that contains exactly 20 known accessibility issues across all severity levels and WCAG categories, plus an authoritative ground-truth record.

**Files touched:**
`sample-app/index.html`, `book.html`, `contact.html`, `styles.css`, `app.js`,
`ground-truth/seeded-issues.md`

**Done when:**
- [ ] Site has at least 20 distinct seeded issues spread across all 10 categories
- [ ] Issues span High, Medium and Low severity and both WCAG levels A and AA
- [ ] ground-truth/seeded-issues.md lists every issue with id, page, element, WCAG ref, severity
- [ ] All three pages load without JavaScript errors; layout is coherent

---

### T4 — Parallel Review with Subagents, Merged into Reports

**Goal:** Use the a11y-review skill with one subagent per page to produce a merged findings report.

**Files touched:**
`reports/A11Y_REVIEW.md`, `reports/findings.js`

**Done when:**
- [ ] Each page (index, book, contact) reviewed independently
- [ ] All findings deduplicated and merged into a single `window.A11Y_FINDINGS` object
- [ ] A11Y_REVIEW.md contains a human-readable summary with per-page sections
- [ ] findings.js validates against the schema in §4

---

### T5 — Fix All High and Medium Findings, Log the Fixes

**Goal:** Remediate every High and Medium finding in sample-app and record each change.

**Files touched:**
`sample-app/` (edited files as needed), `reports/FIX_LOG.md`,
`reports/findings.js` (status updated to "Fixed")

**Done when:**
- [ ] Every High and Medium finding has `status: "Fixed"` in findings.js
- [ ] FIX_LOG.md contains a before/after code snippet for each fix
- [ ] sample-app still loads and functions correctly after all fixes
- [ ] Low findings are logged as Open with a `fixSummary` explaining the trade-off

---

### T6 — Impact Analysis

**Goal:** Quantify the value delivered: detection rate vs ground truth, Lighthouse score deltas, and time saved.

**Files touched:**
`reports/IMPACT.md`, `reports/metrics.js`,
`metrics/lighthouse-scores.md` (filled by hand), `metrics/time-log.md` (filled by hand)

**Done when:**
- [ ] metrics.js sets `window.A11Y_METRICS` matching the schema in §4
- [ ] IMPACT.md states detection rate, missed issues, extra findings, and score deltas
- [ ] Lighthouse before/after scores are recorded (filled in by hand after running audits)
- [ ] Time comparison between Bob-assisted and estimated manual review is documented

---

### T7 — Accessible Results Dashboard + Landing Page

**Goal:** A single-file HTML dashboard that visualises findings and metrics; a root landing page.

**Files touched:**
`dashboard/index.html`, `index.html`

**Done when:**
- [ ] Dashboard loads findings.js and metrics.js from relative paths (no fetch / CDN)
- [ ] Dashboard shows: severity breakdown, category breakdown, detection rate, Lighthouse delta
- [ ] Dashboard is itself WCAG 2.2 AA compliant (passes its own review)
- [ ] root index.html redirects or links to dashboard
- [ ] Everything works when served from GitHub Pages

---

### T8 — PR Checklist, PR Template, and README

**Goal:** Package the workflow as a reusable artefact for any team's PR process.

**Files touched:**
`docs/A11Y_PR_CHECKLIST.md`, `.github/pull_request_template.md`, `README.md`, `.bobignore`, `.nojekyll`

**Done when:**
- [ ] A11Y_PR_CHECKLIST.md is a standalone checklist any reviewer can paste into a PR
- [ ] PR template includes the a11y checklist section and references the skill
- [ ] README explains the project, folder layout, how to run the skill, and how to read the dashboard
- [ ] .bobignore excludes sample-app-before/ and bob_sessions/ from skill context
- [ ] .nojekyll present so GitHub Pages serves files with leading underscores

---

## 4. Data Contracts

### `reports/findings.js`
Sets `window.A11Y_FINDINGS`:
```
{ project, standard: "WCAG 2.2 AA", generatedAt,
  findings: [ { id, pages, file, line, element, wcag, level, category, severity,
                affects, problem, fix, fixCode, effortMinutes, status, fixSummary } ] }
```
`category` ∈ Images | Forms | Keyboard & Focus | Color & Contrast | Structure |
Links & Buttons | ARIA & Dynamic | Motion | Mobile & Zoom | Page
`severity` ∈ High | Medium | Low — `status` ∈ Open | Fixed

### `reports/metrics.js`
Sets `window.A11Y_METRICS`:
```
{ lighthouse: { before: { index, book, contact }, after: { index, book, contact } },
  detection: { seeded, detected, missed: [], extraFindings },
  fixes: { total, fixed, open },
  time: { bobMinutes, manualEstimateMinutes, note } }
```

---

## 5. Constraints

- Plain HTML, CSS, and vanilla JavaScript only — no build tools, npm packages, CDNs, or remote images
- Everything must work when hosted on GitHub Pages (static files, relative paths)
- No personal data of any kind

---

## Summary

This plan delivers a fully self-contained, GitHub Pages–hosted prototype that demonstrates Bob automating WCAG 2.2 AA accessibility review end-to-end.
A reusable skill (T2) drives parallel page reviews (T4) against a seeded sample site (T3).
Every High and Medium finding is fixed and logged (T5).
Ground-truth comparison, Lighthouse deltas, and time savings are captured as structured data (T6).
A vanilla-JS dashboard visualises the impact (T7) and a PR template packages the workflow for reuse (T8).
All artefacts are plain static files — zero dependencies, zero build steps, zero personal data.






