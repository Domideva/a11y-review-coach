---
name: a11y-review
description: Review HTML, CSS and JavaScript front-end code for WCAG 2.2 AA accessibility issues, rank their severity, explain the impact in plain language, and propose exact code fixes.
---

# A11y Review Workflow

Follow these numbered steps in order. Do not skip steps. Do not modify any source file during a review unless the user explicitly asks for fixes.

## Step 1 — Identify Files in Scope

Use `list_files` to enumerate every `.html`, `.css`, and `.js` file in the directory the user specifies (or the whole workspace if none is given). Print the file list so the user can confirm scope before proceeding.

## Step 2 — Check Every File Against the WCAG Checklist

Open `wcag-checklist.md` (located in the same directory as this skill) with `read_file`. For each file in scope, use `read_file` and `grep` to inspect the code. Work through every check in every category of the checklist methodically. Note every instance where the code fails or likely fails a check. Record the file path, approximate line number, and the relevant element or code pattern.

## Step 3 — Classify Each Issue Using the Severity Guide

Open `severity-guide.md` (same directory) with `read_file`. For each issue found in Step 2, assign:
- **Severity**: High, Medium, or Low — using the definitions in severity-guide.md
- **Affected users**: one or more groups from the approved list in severity-guide.md

Do not invent severity labels or affected-user descriptions outside those defined in the guide.

## Step 4 — Record Every Finding in the Schema

For each issue, populate every field of the findings schema from `PLAN.md §4`:

| Field | Notes |
|---|---|
| `id` | Sequential string, e.g. `"A001"` |
| `pages` | Array of page names where the issue appears |
| `file` | Relative path to the source file |
| `line` | Approximate line number (integer) |
| `element` | The HTML element or selector involved |
| `wcag` | Success criterion number, e.g. `"1.1.1"` |
| `level` | `"A"` or `"AA"` |
| `category` | One of: Images, Forms, Keyboard & Focus, Color & Contrast, Structure, Links & Buttons, ARIA & Dynamic, Motion, Mobile & Zoom, Page |
| `severity` | `"High"`, `"Medium"`, or `"Low"` |
| `affects` | Array of affected user groups from severity-guide.md |
| `problem` | Plain-language description, max 2 sentences, no jargon |
| `fix` | Prose description of the fix |
| `fixCode` | Code snippet showing the corrected code |
| `effortMinutes` | Estimated fix time in minutes (integer) |
| `status` | `"Open"` for all new findings |
| `fixSummary` | Leave `""` until a fix is applied |

## Step 5 — Write the Reports

Using `report-template.md` (same directory), write `reports/A11Y_REVIEW.md` with the full human-readable report. Then write `reports/findings.js` with the machine-readable data in the format:

```js
window.A11Y_FINDINGS = { project, standard: "WCAG 2.2 AA", generatedAt, findings: [ /* ... */ ] };
```

Use `write_file` for both outputs.

## Step 6 — Do Not Change Source Files During Review

Never edit any file in `sample-app/` or any other source directory during a review pass. Only report findings. Wait for an explicit instruction such as "apply the fixes" before touching source files.

## Step 7 — When Fixing, Prefer Native HTML Over ARIA

If the user asks for fixes after the review:
- Prefer native semantic HTML elements (`<button>`, `<label>`, `<nav>`, etc.) over ARIA attributes wherever possible.
- Only add ARIA roles, states, or properties when no native HTML equivalent exists.
- Keep all visual styles unchanged — do not alter colours, fonts, spacing, or layout.
- Record every change in `reports/FIX_LOG.md` with a before/after code snippet.
