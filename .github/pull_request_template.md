## Description

<!-- What does this PR do? Why? -->

## Type of change

- [ ] Bug fix
- [ ] New feature
- [ ] Refactor / chore
- [ ] Documentation

---

## Accessibility Review

Ran the a11y-review skill in IBM Bob on changed front-end files. Summary:

<!-- Paste the one-paragraph skill summary here, or "No front-end files changed." -->

### A11y checklist

> Derived from [docs/A11Y_PR_CHECKLIST.md](docs/A11Y_PR_CHECKLIST.md). Skip items not applicable to this PR.

**High-severity checks (do these first)**

- [ ] No CSS rule removes the focus ring (`outline: none` / `outline: 0`); custom `:focus-visible` style present *(WCAG 2.4.11)*
- [ ] All interactive elements reachable and operable by keyboard alone *(WCAG 2.1.1)*
- [ ] No keyboard trap; Escape closes modals *(WCAG 2.1.2)*
- [ ] Custom widgets have valid ARIA roles and accessible names *(WCAG 4.1.2)*
- [ ] Dynamic updates use a live region (`role="status"` or `role="alert"`) *(WCAG 4.1.3)*
- [ ] Toggle controls set and update `aria-expanded` *(WCAG 4.1.2)*
- [ ] Every form control has a visible label or `aria-label` *(WCAG 1.3.1 / 3.3.2)*
- [ ] Validation errors are text, linked to the field via `aria-describedby` *(WCAG 3.3.1)*
- [ ] No "click here" / "read more" link text; icon-only buttons have `aria-label` *(WCAG 2.4.4)*
- [ ] `<a>` used for navigation, `<button>` for actions *(WCAG 4.1.2)*
- [ ] Text contrast ≥ 4.5:1 (normal) or ≥ 3:1 (large text) *(WCAG 1.4.3)*
- [ ] `@media (prefers-reduced-motion: reduce)` disables animations *(WCAG 2.3.3)*
- [ ] No `user-scalable=no`; content reflows at 320 px *(WCAG 1.4.4 / 1.4.10)*

**Medium / Low checks**

- [ ] One `<h1>` per page; headings do not skip levels *(WCAG 1.3.1)*
- [ ] `<html lang="…">` set; unique `<title>`; skip-nav link present *(WCAG 3.1.1 / 2.4.2 / 2.4.1)*

---

## Testing

- [ ] Manual keyboard navigation tested (Tab, Shift-Tab, Enter, Space, Escape)
- [ ] Tested at 200% and 400% browser zoom
- [ ] Tested with screen reader (NVDA/JAWS/VoiceOver) or browser accessibility tree inspected
