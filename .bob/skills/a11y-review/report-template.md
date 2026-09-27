# A11y Review Report Template

Copy this file to `reports/A11Y_REVIEW.md` and fill in every placeholder (shown as `{{…}}`). Remove this instruction line before saving.

---

# Accessibility Review — {{PROJECT_NAME}}

**Standard:** WCAG 2.2 AA
**Reviewed by:** Bob (a11y-review skill)
**Date:** {{YYYY-MM-DD}}
**Pages reviewed:** {{PAGE_LIST}}

---

## Summary

### Findings by Severity

| Severity | Count |
|---|---|
| 🔴 High | {{HIGH_COUNT}} |
| 🟠 Medium | {{MEDIUM_COUNT}} |
| 🟡 Low | {{LOW_COUNT}} |
| **Total** | **{{TOTAL_COUNT}}** |

### Findings by Page

| Page / File | High | Medium | Low | Total |
|---|---|---|---|---|
| {{PAGE_1}} | {{H}} | {{M}} | {{L}} | {{T}} |
| {{PAGE_2}} | {{H}} | {{M}} | {{L}} | {{T}} |
| {{PAGE_3}} | {{H}} | {{M}} | {{L}} | {{T}} |

### Findings by Category

| Category | Count |
|---|---|
| Images | {{N}} |
| Forms | {{N}} |
| Keyboard & Focus | {{N}} |
| Color & Contrast | {{N}} |
| Structure | {{N}} |
| Links & Buttons | {{N}} |
| ARIA & Dynamic | {{N}} |
| Motion | {{N}} |
| Mobile & Zoom | {{N}} |
| Page | {{N}} |

---

## Top 5 Risks

List the five findings with the greatest user impact. For each, give the finding ID, a one-sentence plain-language description, and who is affected.

1. **{{ID}}** — {{ONE_SENTENCE_RISK}} *(affects: {{AFFECTED_GROUPS}})*
2. **{{ID}}** — {{ONE_SENTENCE_RISK}} *(affects: {{AFFECTED_GROUPS}})*
3. **{{ID}}** — {{ONE_SENTENCE_RISK}} *(affects: {{AFFECTED_GROUPS}})*
4. **{{ID}}** — {{ONE_SENTENCE_RISK}} *(affects: {{AFFECTED_GROUPS}})*
5. **{{ID}}** — {{ONE_SENTENCE_RISK}} *(affects: {{AFFECTED_GROUPS}})*

---

## Findings

<!-- Repeat the block below once for every finding. Keep findings sorted: High first, then Medium, then Low. Within each severity group, sort by ID. -->

---

### {{ID}} — {{SHORT_TITLE}}

| Field | Value |
|---|---|
| **Page / File** | {{PAGE_OR_FILE}} |
| **Line** | {{LINE_NUMBER}} |
| **Element** | `{{ELEMENT_OR_SELECTOR}}` |
| **WCAG SC** | {{WCAG_NUMBER}} {{WCAG_NAME}} |
| **Level** | {{A_OR_AA}} |
| **Category** | {{CATEGORY}} |
| **Severity** | {{HIGH_MEDIUM_LOW}} |
| **Affects** | {{AFFECTED_USER_GROUPS}} |
| **Effort** | {{EFFORT_MINUTES}} min |
| **Status** | {{Open_or_Fixed}} |

**Problem**

{{PLAIN_ENGLISH_DESCRIPTION — maximum 2 sentences, no technical jargon. Focus on the user impact, not the technical cause.}}

**Fix**

{{PROSE_DESCRIPTION_OF_FIX}}

```html
<!-- Before -->
{{BEFORE_CODE_SNIPPET}}

<!-- After -->
{{AFTER_CODE_SNIPPET}}
```

<!-- If status is Fixed, add a fixSummary line: -->
<!-- **Fix applied:** {{BRIEF_DESCRIPTION_OF_WHAT_WAS_CHANGED}} -->

---

<!-- End of finding block -->
