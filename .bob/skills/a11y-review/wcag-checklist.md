# WCAG 2.2 AA Checklist

Use this checklist for every HTML, CSS, and JavaScript file in scope. Each check lists what to look for, the relevant Success Criterion, its level, how to spot the issue in code, and the standard fix.

---

## Images

### IMG-1 — Text alternative for informative images
- **What to check:** Every `<img>` that conveys meaning has a non-empty `alt` attribute.
- **WCAG SC:** 1.1.1 Non-text Content — Level A
- **Spot in code:** `grep` for `<img` without `alt=` or with `alt=""` on non-decorative images.
- **Fix:** Add a concise `alt` describing the image's purpose, e.g. `alt="Bar chart showing Q3 revenue"`.

### IMG-2 — Decorative images hidden from assistive technology
- **What to check:** Purely decorative `<img>` elements use `alt=""` (empty string, not missing).
- **WCAG SC:** 1.1.1 Non-text Content — Level A
- **Spot in code:** `grep` for `<img` elements clearly used as decoration (spacers, background-style divs) that lack `alt=""`.
- **Fix:** Set `alt=""` so screen readers skip them. Background images in CSS need no alt.

### IMG-3 — SVG accessible name
- **What to check:** Inline `<svg>` elements used as icons or illustrations have an accessible name.
- **WCAG SC:** 1.1.1 Non-text Content — Level A
- **Spot in code:** Look for `<svg>` without a `<title>`, `aria-label`, or `aria-labelledby`.
- **Fix:** Add `<title>Description</title>` as the first child of the `<svg>` and `role="img"` on the element, or use `aria-label`.

---

## Forms

### FORM-1 — Input labels
- **What to check:** Every form control (`<input>`, `<select>`, `<textarea>`) has an associated `<label>` or accessible name via `aria-label` / `aria-labelledby`.
- **WCAG SC:** 1.3.1 Info and Relationships — Level A; 3.3.2 Labels or Instructions — Level A
- **Spot in code:** `grep` for `<input` lacking a matching `<label for="">` or `aria-label`.
- **Fix:** Wrap with `<label>` or add `<label for="id">` that matches the input's `id`.

### FORM-2 — Error identification
- **What to check:** Validation errors are communicated in text, not colour alone, and are linked to the relevant field via `aria-describedby`.
- **WCAG SC:** 3.3.1 Error Identification — Level A
- **Spot in code:** Search JS and HTML for error display patterns; check that error text elements reference the input via `aria-describedby`.
- **Fix:** Add `aria-describedby="error-id"` on the input; ensure `<span id="error-id">` contains a clear text message.

### FORM-3 — Required fields indicated
- **What to check:** Required fields are marked both visually and programmatically.
- **WCAG SC:** 3.3.2 Labels or Instructions — Level A
- **Spot in code:** Look for required fields that use only a `*` symbol with no accessible explanation.
- **Fix:** Add `required` or `aria-required="true"` on the input, and include a note explaining the `*` convention above the form.

### FORM-4 — Autocomplete attributes on personal data fields
- **What to check:** Fields collecting name, email, address, phone, or password set the correct `autocomplete` token.
- **WCAG SC:** 1.3.5 Identify Input Purpose — Level AA
- **Spot in code:** `grep` for `type="email"`, `type="tel"`, `name="address"` etc. and check for `autocomplete=`.
- **Fix:** Add the appropriate `autocomplete` token, e.g. `autocomplete="email"`, `autocomplete="given-name"`.

### FORM-5 — Form submission confirmation
- **What to check:** After a successful form submission, feedback is provided and focus is managed so screen-reader users know it succeeded.
- **WCAG SC:** 4.1.3 Status Messages — Level AA
- **Spot in code:** Check JS for post-submit behaviour; look for `role="status"` or `role="alert"` on success messages.
- **Fix:** Inject a success message into a live region (`role="status"` or `aria-live="polite"`) or move focus to a confirmation heading.

---

## Keyboard & Focus

### KBD-1 — Keyboard operability
- **What to check:** All interactive elements (links, buttons, form controls, custom widgets) are reachable and activatable by keyboard alone.
- **WCAG SC:** 2.1.1 Keyboard — Level A
- **Spot in code:** Look for click-only event handlers on non-focusable elements (`<div>`, `<span>`) without a corresponding `keydown`/`keyup` handler.
- **Fix:** Replace with a native `<button>` or `<a>`, or add `tabindex="0"` and keyboard event handlers.

### KBD-2 — No keyboard trap
- **What to check:** Focus cannot become trapped inside a component (unless it's a modal dialog).
- **WCAG SC:** 2.1.2 No Keyboard Trap — Level A
- **Spot in code:** Search JS for focus-management code; check for event listeners that intercept Tab/Shift-Tab without providing an escape.
- **Fix:** Ensure Tab moves focus out of the component or document the keyboard escape method (e.g. Escape closes a modal).

### KBD-3 — Visible focus indicator
- **What to check:** Focused elements have a clearly visible focus ring.
- **WCAG SC:** 2.4.7 Focus Visible — Level AA; 2.4.11 Focus Appearance — Level AA
- **Spot in code:** `grep` CSS for `outline: none`, `outline: 0`, or `:focus { outline: none }`.
- **Fix:** Remove suppression or replace with a high-contrast custom `:focus-visible` style.

### KBD-4 — Focus order
- **What to check:** The tab order follows a logical reading order consistent with the visual layout.
- **WCAG SC:** 2.4.3 Focus Order — Level A
- **Spot in code:** Check for positive `tabindex` values (>0) that may disrupt natural order.
- **Fix:** Remove positive `tabindex` values; use DOM order and CSS to control visual layout.

### KBD-5 — Target size
- **What to check:** Interactive controls are at least 24×24 CSS pixels in size (AA minimum for 2.2).
- **WCAG SC:** 2.5.8 Target Size (Minimum) — Level AA
- **Spot in code:** Inspect CSS for very small button or link dimensions.
- **Fix:** Increase padding or set a minimum `width`/`height` of 24px on interactive elements.

---

## Color & Contrast

### COL-1 — Normal text contrast
- **What to check:** Text smaller than 18pt (or 14pt bold) has a contrast ratio of at least 4.5:1 against its background.
- **WCAG SC:** 1.4.3 Contrast (Minimum) — Level AA
- **Spot in code:** Extract foreground and background colour pairs from CSS; calculate ratios for body copy and small labels.
- **Fix:** Darken foreground or lighten background until the ratio meets 4.5:1.

### COL-2 — Large text contrast
- **What to check:** Text 18pt or larger (14pt bold) has a contrast ratio of at least 3:1.
- **WCAG SC:** 1.4.3 Contrast (Minimum) — Level AA
- **Spot in code:** Identify large text declarations (font-size ≥ 24px or ≥ 18.67px bold) and check their colour pairs.
- **Fix:** Adjust colours to reach a 3:1 ratio.

### COL-3 — Non-text contrast
- **What to check:** UI components (button borders, input borders, focus rings, icons) and informational graphics have at least 3:1 contrast against adjacent colours.
- **WCAG SC:** 1.4.11 Non-text Contrast — Level AA
- **Spot in code:** Check CSS `border-color`, `outline-color`, and icon fill/stroke colours.
- **Fix:** Increase the contrast of border or icon colours.

### COL-4 — Colour not the only means of conveying information
- **What to check:** Information is not conveyed by colour alone (e.g. required fields marked only in red, chart lines distinguished only by colour).
- **WCAG SC:** 1.4.1 Use of Color — Level A
- **Spot in code:** Look for error or state indicators that rely solely on a colour change.
- **Fix:** Add a text label, pattern, icon, or shape in addition to colour.

---

## Structure

### STRUCT-1 — Heading hierarchy
- **What to check:** The page uses headings (`<h1>`–`<h6>`) in a logical, non-skipping hierarchy. Each page has exactly one `<h1>`.
- **WCAG SC:** 1.3.1 Info and Relationships — Level A
- **Spot in code:** `grep` for heading elements and verify the nesting order.
- **Fix:** Restructure headings to reflect document outline; use CSS to control visual size, not heading level.

### STRUCT-2 — Landmark regions
- **What to check:** The page has appropriate landmark regions: `<header>`, `<nav>`, `<main>`, `<footer>` (or equivalent ARIA roles).
- **WCAG SC:** 1.3.1 Info and Relationships — Level A
- **Spot in code:** Check for the presence of semantic HTML5 landmark elements or `role="main"` etc.
- **Fix:** Wrap major page regions in the appropriate semantic elements.

### STRUCT-3 — Lists used for list content
- **What to check:** Navigation links, step sequences, and grouped items are marked up as `<ul>`, `<ol>`, or `<dl>`.
- **WCAG SC:** 1.3.1 Info and Relationships — Level A
- **Spot in code:** Look for groups of items implemented as repeated `<div>` or `<span>` without list markup.
- **Fix:** Replace with `<ul>`/`<li>` or `<ol>`/`<li>` as appropriate.

### STRUCT-4 — Table headers
- **What to check:** Data tables use `<th>` with appropriate `scope` attributes; complex tables use `id`/`headers`.
- **WCAG SC:** 1.3.1 Info and Relationships — Level A
- **Spot in code:** `grep` for `<table>` and verify `<th scope="col">` or `<th scope="row">`.
- **Fix:** Add `scope="col"` to column headers and `scope="row"` to row headers.

---

## Links & Buttons

### LNK-1 — Descriptive link text
- **What to check:** Link text describes the destination or purpose; no "click here", "read more", or bare URLs used as link text.
- **WCAG SC:** 2.4.6 Headings and Labels — Level AA; 2.4.4 Link Purpose (In Context) — Level A
- **Spot in code:** `grep` for `>click here<`, `>read more<`, `>here<` inside `<a>` tags.
- **Fix:** Rewrite link text to describe the destination, or add `aria-label` with a descriptive name.

### LNK-2 — Buttons vs links used correctly
- **What to check:** `<a>` is used for navigation (changes URL or page); `<button>` is used for actions (submits, opens, toggles).
- **WCAG SC:** 4.1.2 Name, Role, Value — Level A
- **Spot in code:** Look for `<a href="#">` wired to JS actions, or `<button>` used purely for navigation.
- **Fix:** Swap element types to match semantic intent.

### LNK-3 — Links distinguishable from body text
- **What to check:** Inline links are distinguishable from surrounding text by more than colour alone (underline or other visual cue).
- **WCAG SC:** 1.4.1 Use of Color — Level A
- **Spot in code:** Check CSS for `text-decoration: none` on inline `<a>` elements without another distinguishing style.
- **Fix:** Restore underline, or add a border-bottom, icon, or other non-colour distinguisher.

---

## ARIA & Dynamic

### ARIA-1 — Valid ARIA roles and attributes
- **What to check:** All `role`, `aria-*` attributes use values defined in the ARIA specification; no ARIA attributes are used on elements where they are prohibited.
- **WCAG SC:** 4.1.2 Name, Role, Value — Level A
- **Spot in code:** `grep` for `role=` and `aria-` and cross-check against known valid values.
- **Fix:** Remove invalid roles/attributes; replace with correct ones or with native HTML equivalents.

### ARIA-2 — Required owned children for composite roles
- **What to check:** Elements with composite roles (`role="list"`, `role="menu"`, `role="tablist"`) contain the required child roles.
- **WCAG SC:** 1.3.1 Info and Relationships — Level A
- **Spot in code:** Find composite ARIA roles and verify child elements carry the expected roles.
- **Fix:** Add the required child roles (`role="listitem"`, `role="menuitem"`, `role="tab"`) or use native HTML.

### ARIA-3 — Live region announcements
- **What to check:** Dynamic content updates (alerts, loading states, count changes) use an appropriate live region (`aria-live`, `role="status"`, `role="alert"`).
- **WCAG SC:** 4.1.3 Status Messages — Level AA
- **Spot in code:** Search JS for DOM mutations or `innerHTML` updates that add user-facing messages; check for live region markup.
- **Fix:** Wrap dynamically updated content in `<div role="status" aria-live="polite">` (or `role="alert"` for urgent messages).

### ARIA-4 — Expanded/collapsed state communicated
- **What to check:** Toggle controls (accordions, dropdowns, menus) set `aria-expanded` to reflect open/closed state.
- **WCAG SC:** 4.1.2 Name, Role, Value — Level A
- **Spot in code:** Look for toggle patterns in JS; check for `aria-expanded` toggling alongside visibility changes.
- **Fix:** Add `aria-expanded="false"` on the trigger; toggle it to `"true"` in JS when content opens.

---

## Motion

### MOT-1 — Respects prefers-reduced-motion
- **What to check:** Animations and transitions are suppressed or reduced when the user has `prefers-reduced-motion: reduce` set.
- **WCAG SC:** 2.3.3 Animation from Interactions — Level AAA (best practice; required for general UX quality); 2.3.1 Three Flashes — Level A
- **Spot in code:** `grep` CSS for `@keyframes`, `transition`, `animation`; check for a `@media (prefers-reduced-motion: reduce)` block.
- **Fix:** Add `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }`.

### MOT-2 — No content flashes more than three times per second
- **What to check:** No element flashes at a rate that could trigger photosensitive seizures.
- **WCAG SC:** 2.3.1 Three Flashes or Below Threshold — Level A
- **Spot in code:** Look for rapid `setInterval` or CSS animations that strobe visuals.
- **Fix:** Remove or slow the flashing; ensure flash rate stays below 3 Hz.

---

## Mobile & Zoom

### MOB-1 — Content reflows at 320px
- **What to check:** All content and functionality is available without horizontal scrolling when the viewport is 320 CSS pixels wide (equivalent to 400% zoom at 1280px).
- **WCAG SC:** 1.4.10 Reflow — Level AA
- **Spot in code:** Check CSS for fixed-width elements that exceed 320px or `overflow: hidden` that clips content.
- **Fix:** Use responsive units (`%`, `em`, `rem`, `fr`, `max-width`) and flexbox/grid to allow wrapping.

### MOB-2 — No orientation lock
- **What to check:** Content is not locked to portrait or landscape orientation.
- **WCAG SC:** 1.3.4 Orientation — Level AA
- **Spot in code:** Search CSS for `@media (orientation: …)` blocks that hide content or JS for screen orientation locks.
- **Fix:** Remove orientation-specific content hiding; support both orientations.

### MOB-3 — Touch target size
- **What to check:** Interactive touch targets are at least 24×24 CSS pixels with adequate spacing.
- **WCAG SC:** 2.5.8 Target Size (Minimum) — Level AA
- **Spot in code:** Inspect CSS for tightly spaced or undersized touch targets on mobile breakpoints.
- **Fix:** Increase padding or margin so each target has sufficient hit area.

---

## Page

### PAGE-1 — Page language declared
- **What to check:** The `<html>` element has a valid `lang` attribute.
- **WCAG SC:** 3.1.1 Language of Page — Level A
- **Spot in code:** `grep` for `<html` and check for `lang=`.
- **Fix:** Add `lang="en"` (or the correct BCP 47 language tag) to `<html>`.

### PAGE-2 — Descriptive page title
- **What to check:** The `<title>` element is present, non-empty, and describes the page's topic or purpose.
- **WCAG SC:** 2.4.2 Page Titled — Level A
- **Spot in code:** `grep` for `<title>` in each HTML file.
- **Fix:** Write a descriptive title: "Page Name — Site Name".

### PAGE-3 — Skip navigation link
- **What to check:** A "skip to main content" link is the first focusable element on pages with repeated navigation.
- **WCAG SC:** 2.4.1 Bypass Blocks — Level A
- **Spot in code:** Check the first `<a>` in the `<body>` of each page.
- **Fix:** Add `<a href="#main" class="skip-link">Skip to main content</a>` as the first element; style it to become visible on focus.
