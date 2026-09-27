# Impact Analysis — Riverside Community Library A11y Review

Bob detected 19 of 20 seeded issues (95 % detection rate), fixed 28 of 29 total findings, and
raised the average Lighthouse accessibility score by +10 points across all three pages.

---

## 1. Detection Rate

| Metric | Count |
|---|---|
| Seeded issues (ground truth) | 20 |
| Detected by Bob | 19 |
| Missed | 1 |
| Detection rate | **95 %** |

**Missed issue:**
- **#5 — Contrast failure** (`index.html`): `.hero p { color: #a8a8b3 }` on `#0f3460` background
  (~2.8:1 ratio, fails WCAG 1.4.3 Contrast Minimum AA). Bob flagged structural and keyboard issues
  on the hero section but did not call out this specific text-colour contrast failure.

**Extra valid findings Bob surfaced (not in the seeded set):** 7

| Finding | Page | Issue |
|---|---|---|
| A11Y-011 | book.html | Confirmation dialog has no `aria-labelledby` or `aria-label` |
| A11Y-013 | book.html | No live region / `alertdialog` role for booking confirmation |
| A11Y-019 | index.html | Three simultaneous `<h1>` elements in carousel slides |
| A11Y-020 | book.html | Required fields have no visible required indicator |
| A11Y-021 | book.html | Modal close button labelled only with Unicode ✕ symbol |
| A11Y-026 | contact.html | FAQ panels missing `id` and `aria-controls` association |
| A11Y-029 | index.html | Event cards use `<div>` instead of `<ul>`/`<li>` (Low, Open) |

---

## 2. Fix Status

| Metric | Count |
|---|---|
| Total findings | 29 |
| Fixed (High + Medium + Low) | 28 |
| Open (deferred Low) | 1 |
| Fix rate | **97 %** |

The one open finding (A11Y-029 — event cards not in a semantic list) is Low severity; the fix
requires multi-line structural changes across repeated card elements and was deferred.

---

## 3. Lighthouse Accessibility Scores

| Page | Before | After | Change |
|---|---|---|---|
| index.html | 90 | 96 | **+6** |
| book.html | 83 | 100 | **+17** |
| contact.html | 93 | 100 | **+7** |
| **Average** | **89** | **99** | **+10** |

Scores measured with Chrome DevTools Lighthouse (Accessibility category, Mobile preset) via
raw.githack.com. "Before" pages served from `sample-app-before/`; "After" from `sample-app/`.

---

## 4. Time Comparison

| | Minutes |
|---|---|
| Bob — review (T4, parallel subagents) | 10 |
| Bob — fixes (T5, not separately clocked) | ~10 |
| **Bob total (review + fix)** | **~20** |
| Manual effort estimate (sum of `effortMinutes` in findings.js) | **354** |

> **The manual effort figure (354 min ≈ 6 hours) is an estimate** derived from the
> `effortMinutes` field on each finding in `findings.js`. It represents the projected time a
> developer would spend locating, diagnosing, and fixing each issue manually without tool
> assistance. Bob completed the equivalent work in approximately 20 minutes — roughly an
> **18× reduction** in review and fix time.

---

## Summary

- **95 % detection** of seeded issues with only 1 miss (a contrast failure).
- **7 bonus findings** beyond the seeded set, all valid WCAG violations.
- **28 / 29 findings fixed**; the one open item is Low severity.
- Lighthouse scores rose from an average of 89 to 99 (+10 pts).
- Estimated time saving: ~334 minutes versus manual review and remediation.
