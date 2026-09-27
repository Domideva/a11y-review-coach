# Accessibility PR Checklist

A 15-item WCAG 2.2 AA review a developer or reviewer can complete in under 5 minutes.
Items are ordered by the issue types that were **High** severity in this project (detected by the a11y-review skill).

---

## High-Severity Issue Types (check these first)

- [ ] **KBD: Focus indicator** — No CSS rule removes the focus ring (`outline: none` / `outline: 0`).  
  Custom `:focus-visible` style provides ≥ 3 px high-contrast outline. *(WCAG 2.4.11 AA)*

- [ ] **KBD: Keyboard operability** — All interactive elements (links, buttons, widgets) are reachable and usable by keyboard alone; no click-only handlers on `<div>` or `<span>`. *(WCAG 2.1.1 A)*

- [ ] **KBD: No keyboard trap** — Focus is never stranded inside a component; Escape closes modals. *(WCAG 2.1.2 A)*

- [ ] **ARIA: Name, role, value** — Every custom widget exposes a valid ARIA role and accessible name; no ARIA attributes are misused or applied to prohibited elements. *(WCAG 4.1.2 A)*

- [ ] **ARIA: Live regions** — Dynamic updates (alerts, status changes, booking confirmation) are wrapped in `role="status"` or `role="alert"`. *(WCAG 4.1.3 AA)*

- [ ] **ARIA: Expanded state** — Toggle controls (accordions, dropdowns) set `aria-expanded` and update it in JS. *(WCAG 4.1.2 A)*

- [ ] **Forms: Input labels** — Every `<input>`, `<select>`, and `<textarea>` has a visible `<label>` or `aria-label`. *(WCAG 1.3.1 / 3.3.2 A)*

- [ ] **Forms: Error identification** — Validation errors appear as text linked to the field via `aria-describedby`. *(WCAG 3.3.1 A)*

- [ ] **Links & Buttons: Descriptive text** — No "click here", "read more", or bare URLs as link text; icon-only buttons have an `aria-label`. *(WCAG 2.4.4 A)*

- [ ] **Links & Buttons: Correct semantics** — `<a>` is used for navigation; `<button>` for actions. *(WCAG 4.1.2 A)*

- [ ] **Color: Text contrast** — Body text meets 4.5:1; large text (≥ 18 pt or 14 pt bold) meets 3:1. *(WCAG 1.4.3 AA)*

- [ ] **Motion: Reduced-motion** — A `@media (prefers-reduced-motion: reduce)` block disables or slows animations. *(WCAG 2.3.3 AAA / best practice)*

- [ ] **Mobile: Zoom / reflow** — No `user-scalable=no` on `<meta name="viewport">`; content reflows at 320 px without horizontal scroll. *(WCAG 1.4.4 / 1.4.10 AA)*

---

## Medium / Low Issue Types (check these next)

- [ ] **Structure: Heading hierarchy** — One `<h1>` per page; headings do not skip levels; heading text is descriptive. *(WCAG 1.3.1 A)*

- [ ] **Page: Language & title** — `<html lang="…">` is set; `<title>` is unique and descriptive; a "Skip to main content" link is the first focusable element. *(WCAG 3.1.1 / 2.4.2 / 2.4.1 A)*

---

*Derived from [`wcag-checklist.md`](../.bob/skills/a11y-review/wcag-checklist.md). Run the **a11y-review** skill in IBM Bob for a full automated review.*
