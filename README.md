# A11y Review Coach

**Automate WCAG 2.2 AA accessibility review and fix in minutes, not hours.**

---

## The Problem

Accessibility issues slip through code review because most developers aren't accessibility experts.
They surface late — during audits or from real users — making fixes expensive and excluding people from products.

---

## The Solution

This project shows how IBM Bob's skill, parallel subagent, and agent capabilities can drive an
end-to-end accessibility workflow:

| Step | What happens |
|------|-------------|
| **Skill** | The `a11y-review` skill encodes a structured WCAG 2.2 AA review workflow (discover → classify → fix → report). Any project can copy it. |
| **Parallel subagents** | Bob spawns one subagent per page simultaneously, reviewing `index.html`, `book.html`, and `contact.html` in parallel, then merges the results. |
| **Fixes** | Bob applies targeted code fixes for every High and Medium finding, logging before/after snippets. |
| **Dashboard** | A static HTML dashboard reads `findings.js` and `metrics.js` to visualise severity, categories, detection rate, and Lighthouse score deltas. |

---

## Live Demo

| Page | URL |
|------|-----|
| Landing | <https://Domideva.github.io/a11y-review-coach/> |
| Dashboard | <https://Domideva.github.io/a11y-review-coach/dashboard/> |
| Sample app (before fixes) | <https://Domideva.github.io/a11y-review-coach/sample-app-before/> |
| Sample app (after fixes) | <https://Domideva.github.io/a11y-review-coach/sample-app/> |

---

## Results

Against a 20-issue seeded sample site:

- **95 % detection rate** — 19 of 20 seeded issues found; 1 missed (a specific contrast failure)
- **7 bonus findings** — valid WCAG violations beyond the seeded set
- **28 / 29 findings fixed** (97 % fix rate); the one open item is Low severity
- **Lighthouse score: 89 → 99** (+10 pts average across three pages)
- **~18× time reduction** — ~20 min with Bob vs. ~354 min estimated manual effort

See [`reports/IMPACT.md`](reports/IMPACT.md) for the full breakdown.

---

## Use It on Your Own Project

1. **Copy the skill** — copy `.bob/skills/a11y-review/` into your repository.
2. **Open the project in Bob** — open your repo in IBM Bob (Agent mode).
3. **Run the review** — ask: *"Review the src folder with the a11y-review skill."*
4. **Ask for fixes** — ask: *"Fix all High and Medium findings and log the changes."*

---

## How IBM Bob Was Used

Task session screenshots are in [`bob_sessions/`](bob_sessions/).

| Task | Description | Mode | Bob Features |
|------|-------------|------|--------------|
| T1 | Project planning and folder design | Plan | Plan mode, structured task breakdown |
| T2 | Build the reusable `a11y-review` skill | Agent | Skill authoring, `SKILL.md` entry-point |
| T3 | Create 20-issue seeded sample site | Agent | Agent mode, multi-file code generation |
| T4 | Parallel review with subagents | Agent | Parallel subagents, `@` context mentions, `.bobignore` for blind evaluation |
| T5 | Fix all High & Medium findings | Agent | Agent mode, targeted `apply_diff` edits |
| T6 | Impact analysis | Agent | Agent mode, structured data extraction |
| T7 | Accessible dashboard & landing page | Agent | Agent mode, single-file HTML generation |
| T8 | PR checklist, PR template, README | Agent | Agent mode, `@` context mentions (`@/reports/IMPACT.md`, `@/PLAN.md`) |

---

## Repository Structure

```
.bob/skills/a11y-review/   # Reusable skill (SKILL.md, wcag-checklist.md, …)
.github/
  pull_request_template.md # PR template with 15-item a11y checklist
sample-app/                # Three-page site (fixed)
sample-app-before/         # Frozen snapshot before fixes
ground-truth/
  seeded-issues.md         # 20 seeded issues with WCAG refs
reports/
  A11Y_REVIEW.md           # Human-readable findings report
  findings.js              # Machine-readable findings (window.A11Y_FINDINGS)
  FIX_LOG.md               # Before/after fix log
  IMPACT.md                # Detection rate, Lighthouse deltas, time savings
  metrics.js               # Metrics data (window.A11Y_METRICS)
metrics/                   # Lighthouse scores and time log (filled by hand)
dashboard/index.html       # Interactive results dashboard
docs/A11Y_PR_CHECKLIST.md  # Standalone 15-item reviewer checklist
bob_sessions/              # Task session screenshots
index.html                 # GitHub Pages landing page
```

---

## Data and Compliance

All content was generated specifically for this project.
No client, confidential, personal, or social media data is present anywhere in the repository.
WCAG references link to the authoritative specification at [w3.org](https://www.w3.org/TR/WCAG22/).

---

## Limitations and Next Steps

- The one missed issue (a low-contrast hero paragraph) shows that static analysis still needs human judgment for subtle colour combinations.
- The sample site is intentionally small (3 pages, ~20 issues). Real projects may need per-component or per-route reviews.
- Next steps: CI integration (run the skill on every PR), WCAG 2.2 Level AAA checks, and coverage for single-page app routing.

---

## Team

Built by [Dominika Devaney](https://github.com/Domideva) as a demonstration of IBM Bob's agentic capabilities for accessibility engineering.
