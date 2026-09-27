# Accessibility Review — Riverside Community Library Sample App

**Standard:** WCAG 2.2 AA
**Reviewed by:** Bob (a11y-review skill)
**Date:** 2025-07-10
**Pages reviewed:** index.html, book.html, contact.html

---

## Summary

### Findings by Severity

| Severity | Count |
|---|---|
| 🔴 High | 13 |
| 🟠 Medium | 14 |
| 🟡 Low | 2 |
| **Total** | **29** |

### Findings by Page

| Page / File | High | Medium | Low | Total |
|---|---|---|---|---|
| index.html | 4 | 6 | 2 | 12 |
| book.html | 8 | 3 | 1 | 12 |
| contact.html | 2 | 5 | 1 | 8 |
| shared (styles.css / app.js) | — | — | — | — |

> Note: Issues originating from shared `styles.css` or `app.js` are counted once and attributed to all affected pages in the Findings section. The per-page totals above count each issue against every page it affects.

### Findings by Category

| Category | Count |
|---|---|
| Images | 2 |
| Forms | 4 |
| Keyboard & Focus | 4 |
| Color & Contrast | 1 |
| Structure | 4 |
| Links & Buttons | 4 |
| ARIA & Dynamic | 5 |
| Motion | 1 |
| Mobile & Zoom | 2 |
| Page | 2 |

---

## Top 5 Risks

1. **A11Y-001** — Every focus indicator on the site is suppressed by a single CSS rule, leaving keyboard users with no visible cue of where they are on the page. *(affects: keyboard-only users, low-vision users)*
2. **A11Y-003** — The booking page's `<html>` element has no `lang` attribute, causing screen readers to use the wrong pronunciation engine for the entire page. *(affects: screen reader users, users with cognitive disabilities)*
3. **A11Y-006** — The booking form's email field has no label, so screen reader users cannot identify the field and may be unable to complete the booking. *(affects: screen reader users, users with cognitive disabilities)*
4. **A11Y-009** — Form validation errors are communicated only by a red border change — no text message is shown and no error is announced to screen readers. *(affects: screen reader users, color-blind users)*
5. **A11Y-011** — The modal dialog that confirms a booking has no accessible name and no focus management, leaving keyboard and screen reader users stranded with no booking confirmation. *(affects: keyboard-only users, screen reader users)*

---

## Findings

---

### A11Y-001 — Focus indicators globally suppressed

| Field | Value |
|---|---|
| **Page / File** | index.html, book.html, contact.html · `sample-app/styles.css` |
| **Line** | 8 |
| **Element** | `* { outline: none }` |
| **WCAG SC** | 2.4.11 Focus Appearance |
| **Level** | AA |
| **Category** | Keyboard & Focus |
| **Severity** | 🔴 High |
| **Affects** | keyboard-only users, low-vision users |
| **Effort** | 10 min |
| **Status** | Open |

**Problem**

A single global CSS rule removes the browser's default focus ring from every interactive element across the entire site. Keyboard-only users have absolutely no visual cue showing which element currently has focus, making the site effectively unusable without a mouse.

**Fix**

Remove `* { outline: none }` entirely. Replace it with a `:focus-visible` rule that provides a clearly visible, high-contrast focus indicator.

```css
/* Before */
* {
  outline: none;
}

/* After */
*:focus-visible {
  outline: 3px solid #005fcc;
  outline-offset: 2px;
}
```

---

### A11Y-002 — Browser zoom blocked by viewport meta

| Field | Value |
|---|---|
| **Page / File** | index.html, book.html, contact.html |
| **Line** | 5 (all three pages) |
| **Element** | `<meta name="viewport">` |
| **WCAG SC** | 1.4.4 Resize Text |
| **Level** | AA |
| **Category** | Mobile & Zoom |
| **Severity** | 🔴 High |
| **Affects** | low-vision users, mobile and zoom users |
| **Effort** | 5 min |
| **Status** | Open |

**Problem**

All three pages include `user-scalable=no, maximum-scale=1.0` in the viewport meta tag, which prevents pinch-to-zoom on mobile devices. Low-vision users who rely on browser zoom to enlarge text are completely blocked.

**Fix**

Remove `user-scalable=no` and `maximum-scale=1.0` from each page's viewport meta tag.

```html
<!-- Before -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0">

<!-- After -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

---

### A11Y-003 — Missing lang attribute on book.html

| Field | Value |
|---|---|
| **Page / File** | book.html · `sample-app/book.html` |
| **Line** | 2 |
| **Element** | `<html>` |
| **WCAG SC** | 3.1.1 Language of Page |
| **Level** | A |
| **Category** | Page |
| **Severity** | 🔴 High |
| **Affects** | screen reader users, users with cognitive disabilities |
| **Effort** | 2 min |
| **Status** | Open |

**Problem**

The `<html>` element on the booking page has no `lang` attribute. Screen readers cannot determine the language and may switch to the wrong voice or mispronounce every word on the page, making the entire booking form difficult to understand.

**Fix**

Add `lang="en"` to the opening `<html>` tag.

```html
<!-- Before -->
<html>

<!-- After -->
<html lang="en">
```

---

### A11Y-004 — Hero carousel dots inaccessible

| Field | Value |
|---|---|
| **Page / File** | index.html · `sample-app/index.html`, `sample-app/app.js` |
| **Line** | 38 (HTML), 20 (JS) |
| **Element** | `<span class="hero-dot">` |
| **WCAG SC** | 4.1.2 Name, Role, Value |
| **Level** | A |
| **Category** | ARIA & Dynamic |
| **Severity** | 🔴 High |
| **Affects** | keyboard-only users, screen reader users |
| **Effort** | 20 min |
| **Status** | Open |

**Problem**

The carousel slide-select dots are `<span>` elements with click handlers but no keyboard focusability, no ARIA role, and no accessible name. Keyboard-only users cannot reach or activate them, and screen reader users receive no information about the controls or the active slide state.

**Fix**

Replace the `<span>` elements with `<button>` elements, give each an `aria-label` (e.g. "Go to slide 1"), and toggle `aria-current="true"` on the active button via JavaScript.

```html
<!-- Before -->
<div class="hero-dots">
  <span class="hero-dot active"></span>
  <span class="hero-dot"></span>
  <span class="hero-dot"></span>
</div>

<!-- After -->
<div class="hero-dots" role="group" aria-label="Slide controls">
  <button class="hero-dot" aria-label="Go to slide 1" aria-current="true"></button>
  <button class="hero-dot" aria-label="Go to slide 2"></button>
  <button class="hero-dot" aria-label="Go to slide 3"></button>
</div>
```

---

### A11Y-005 — Newsletter action is a non-interactive div

| Field | Value |
|---|---|
| **Page / File** | index.html · `sample-app/index.html`, `sample-app/app.js` |
| **Line** | 80 (HTML), 74 (JS) |
| **Element** | `<div id="newsletter-action">` |
| **WCAG SC** | 4.1.2 Name, Role, Value |
| **Level** | A |
| **Category** | Keyboard & Focus |
| **Severity** | 🔴 High |
| **Affects** | keyboard-only users, screen reader users |
| **Effort** | 10 min |
| **Status** | Open |

**Problem**

The "Sign up for our newsletter" control is a `<div>` with only a click handler. It is not keyboard-focusable, not announced as a button by screen readers, and cannot be activated with Enter or Space. Keyboard-only users and screen reader users cannot use this control at all.

**Fix**

Replace the `<div>` with a native `<button>` element, which is automatically focusable, keyboard-operable, and semantically correct.

```html
<!-- Before -->
<div id="newsletter-action"
     style="display:inline-block;background:#0f3460;color:#fff;padding:0.75rem 2rem;border-radius:4px;cursor:pointer;font-size:1rem;">
  Sign up for our newsletter
</div>

<!-- After -->
<button id="newsletter-action"
        style="background:#0f3460;color:#fff;padding:0.75rem 2rem;border-radius:4px;cursor:pointer;font-size:1rem;border:none;">
  Sign up for our newsletter
</button>
```

---

### A11Y-006 — Email input has no label

| Field | Value |
|---|---|
| **Page / File** | book.html · `sample-app/book.html` |
| **Line** | 29 |
| **Element** | `<input type="email" id="email">` |
| **WCAG SC** | 1.3.1 Info and Relationships |
| **Level** | A |
| **Category** | Forms |
| **Severity** | 🔴 High |
| **Affects** | screen reader users, users with cognitive disabilities |
| **Effort** | 5 min |
| **Status** | Open |

**Problem**

The email address input has no associated `<label>` element — only a placeholder. Screen readers announce the placeholder text (which disappears when the user starts typing) and cannot programmatically identify the field's purpose, making the booking form difficult or impossible to complete.

**Fix**

Add a `<label for="email">` element before the input. Do not rely on `placeholder` as a substitute for a label.

```html
<!-- Before -->
<div class="form-group">
  <input type="email" id="email" name="email"
         placeholder="Your email address"
         required autocomplete="email">
</div>

<!-- After -->
<div class="form-group">
  <label for="email">Email address</label>
  <input type="email" id="email" name="email"
         placeholder="e.g. alex@example.com"
         required autocomplete="email">
</div>
```

---

### A11Y-007 — Submit button has no accessible name

| Field | Value |
|---|---|
| **Page / File** | book.html · `sample-app/book.html` |
| **Line** | 71 |
| **Element** | `<button type="submit" class="btn-primary">` |
| **WCAG SC** | 4.1.2 Name, Role, Value |
| **Level** | A |
| **Category** | Links & Buttons |
| **Severity** | 🔴 High |
| **Affects** | screen reader users, keyboard-only users |
| **Effort** | 5 min |
| **Status** | Open |

**Problem**

The form's submit button contains only an SVG icon that is marked `aria-hidden="true"`, giving the button no accessible name whatsoever. Screen readers announce it as an unlabelled button, and users cannot determine its purpose or confirm it will submit the booking.

**Fix**

Add visible text inside the button alongside the icon, or add `aria-label="Submit booking"` to the button element.

```html
<!-- Before -->
<button type="submit" class="btn-primary" style="display:flex;align-items:center;gap:0.5rem;">
  <svg width="18" height="18" aria-hidden="true" focusable="false">...</svg>
</button>

<!-- After -->
<button type="submit" class="btn-primary" style="display:flex;align-items:center;gap:0.5rem;">
  <svg width="18" height="18" aria-hidden="true" focusable="false">...</svg>
  Submit booking
</button>
```

---

### A11Y-008 — Hero auto-advances with no pause control

| Field | Value |
|---|---|
| **Page / File** | index.html · `sample-app/app.js` |
| **Line** | 19 |
| **Element** | `setInterval(function () { show(current + 1); }, 3000)` |
| **WCAG SC** | 2.2.2 Pause, Stop, Hide |
| **Level** | A |
| **Category** | Motion |
| **Severity** | 🔴 High |
| **Affects** | users with cognitive disabilities, screen reader users, keyboard-only users |
| **Effort** | 30 min |
| **Status** | Open |

**Problem**

The hero carousel auto-advances every 3 seconds with no mechanism to pause, stop, or hide the moving content. Users with cognitive disabilities or those using screen readers can be disoriented by automatically moving content they cannot control.

**Fix**

Add a pause/play button to the carousel, or at minimum suppress auto-advance when `prefers-reduced-motion: reduce` is set. Also pause when keyboard focus enters the carousel.

```js
// Before
setInterval(function () { show(current + 1); }, 3000);

// After — respect reduced-motion and add pause on focus
var autoPlay;
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  autoPlay = setInterval(function () { show(current + 1); }, 3000);
}
wrapper.addEventListener('focusin', function () { clearInterval(autoPlay); });
wrapper.addEventListener('focusout', function () {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    autoPlay = setInterval(function () { show(current + 1); }, 3000);
  }
});
```

---

### A11Y-009 — Form errors conveyed by colour only

| Field | Value |
|---|---|
| **Page / File** | book.html · `sample-app/styles.css`, `sample-app/app.js` |
| **Line** | 179 (CSS), 34 (JS) |
| **Element** | `input.error, select.error` |
| **WCAG SC** | 1.4.1 Use of Color |
| **Level** | A |
| **Category** | Color & Contrast |
| **Severity** | 🔴 High |
| **Affects** | color-blind users, screen reader users |
| **Effort** | 20 min |
| **Status** | Open |

**Problem**

When the booking form fails validation, the only visual indication is a red border on invalid fields. Users with red-green colour blindness cannot perceive the red state, and screen reader users receive no announcement because no text error message is added.

**Fix**

Inject visible text error messages next to each invalid field in JavaScript, and link each message to its input via `aria-describedby`. The CSS border colour can remain as a supplementary visual cue.

```js
// After — add text error messages in app.js
form.querySelectorAll('[required]').forEach(function (field) {
  field.classList.remove('error');
  var errId = field.id + '-error';
  var existing = document.getElementById(errId);
  if (existing) existing.remove();
  field.removeAttribute('aria-describedby');

  if (!field.value.trim()) {
    field.classList.add('error');
    var msg = document.createElement('span');
    msg.id = errId;
    msg.className = 'field-error';
    msg.textContent = 'This field is required.';
    field.insertAdjacentElement('afterend', msg);
    field.setAttribute('aria-describedby', errId);
    valid = false;
  }
});
```

---

### A11Y-010 — Form errors not linked to fields (aria-describedby)

| Field | Value |
|---|---|
| **Page / File** | book.html · `sample-app/app.js` |
| **Line** | 34 |
| **Element** | `field.classList.add('error')` |
| **WCAG SC** | 3.3.1 Error Identification |
| **Level** | A |
| **Category** | Forms |
| **Severity** | 🔴 High |
| **Affects** | screen reader users, users with cognitive disabilities |
| **Effort** | 30 min |
| **Status** | Open |

**Problem**

The validation script adds a CSS class to flag errors but never inserts a text error message and never sets `aria-describedby` on the input to link any description to it. Screen reader users receive zero information about which fields failed validation or what must be corrected.

**Fix**

For each invalid field, create a visible `<span>` with a descriptive error message, give it a unique `id`, insert it after the field, and add `aria-describedby` referencing that id. Remove both when the error is cleared.

```js
// See A11Y-009 fix — both issues are resolved by the same code change in app.js
field.setAttribute('aria-describedby', errId);
msg.textContent = 'Please fill in this field.';
```

---

### A11Y-011 — Confirmation modal has no accessible name

| Field | Value |
|---|---|
| **Page / File** | book.html · `sample-app/book.html` |
| **Line** | 81 |
| **Element** | `<div id="confirmation-modal" role="dialog">` |
| **WCAG SC** | 4.1.2 Name, Role, Value |
| **Level** | A |
| **Category** | ARIA & Dynamic |
| **Severity** | 🔴 High |
| **Affects** | screen reader users |
| **Effort** | 5 min |
| **Status** | Open |

**Problem**

The booking confirmation dialog has `role="dialog"` but no `aria-labelledby` or `aria-label` attribute. When it opens, screen readers announce an unnamed dialog and users cannot determine what it is or what action to take.

**Fix**

Add `aria-labelledby` referencing the modal's `<h2>`, add `aria-modal="true"`, and give the heading a matching `id`.

```html
<!-- Before -->
<div id="confirmation-modal" class="modal-backdrop" role="dialog">
  <div class="modal">
    <button id="modal-close-btn" class="modal-close">&#x2715;</button>
    <h2>Booking Confirmed!</h2>

<!-- After -->
<div id="confirmation-modal" class="modal-backdrop"
     role="dialog" aria-modal="true" aria-labelledby="modal-heading">
  <div class="modal">
    <button id="modal-close-btn" class="modal-close" aria-label="Close dialog">&#x2715;</button>
    <h2 id="modal-heading">Booking Confirmed!</h2>
```

---

### A11Y-012 — Modal has no focus management or keyboard trap

| Field | Value |
|---|---|
| **Page / File** | book.html · `sample-app/app.js` |
| **Line** | 53 |
| **Element** | `showConfirmationModal()` |
| **WCAG SC** | 2.1.2 No Keyboard Trap |
| **Level** | A |
| **Category** | Keyboard & Focus |
| **Severity** | 🔴 High |
| **Affects** | keyboard-only users, screen reader users |
| **Effort** | 45 min |
| **Status** | Open |

**Problem**

When the confirmation modal opens, focus is not moved into it and there is no focus trap, so keyboard users can Tab through and interact with the obscured background content. When the modal closes, focus is not returned to the submit button, leaving the user disoriented.

**Fix**

On open, move focus to the close button (or modal container with `tabindex="-1"`). Trap Tab/Shift+Tab within the modal while it is open. On close, restore focus to the triggering element.

```js
function showConfirmationModal() {
  var backdrop = document.getElementById('confirmation-modal');
  if (!backdrop) return;
  var trigger = document.activeElement;
  backdrop.classList.add('open');
  var closeBtn = document.getElementById('modal-close-btn');
  closeBtn.focus();

  function trapFocus(e) {
    var focusable = backdrop.querySelectorAll('button,[href],input,[tabindex]:not([tabindex="-1"])');
    var first = focusable[0], last = focusable[focusable.length - 1];
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    if (e.key === 'Escape') { closeModal(); }
  }

  backdrop.addEventListener('keydown', trapFocus);

  closeBtn.addEventListener('click', function closeModal() {
    backdrop.classList.remove('open');
    backdrop.removeEventListener('keydown', trapFocus);
    if (trigger) trigger.focus();
  });
}
```

---

### A11Y-013 — Confirmation modal not announced to screen readers

| Field | Value |
|---|---|
| **Page / File** | book.html · `sample-app/book.html`, `sample-app/app.js` |
| **Line** | 81 (HTML), 53 (JS) |
| **Element** | `<div id="confirmation-modal" role="dialog">` |
| **WCAG SC** | 4.1.3 Status Messages |
| **Level** | AA |
| **Category** | ARIA & Dynamic |
| **Severity** | 🔴 High |
| **Affects** | screen reader users |
| **Effort** | 10 min |
| **Status** | Open |

**Problem**

After a successful form submission, the booking confirmation modal appears but there is no live region or `role="alertdialog"` to cause screen readers to announce the confirmation automatically. Screen reader users who rely on announcements—rather than focus movement—will not know their booking succeeded.

**Fix**

Change `role="dialog"` to `role="alertdialog"` on the confirmation modal, which causes screen readers to announce the dialog and its label immediately when it appears. Alternatively, add a `role="status"` live region that is updated with the confirmation text on submission.

```html
<!-- Before -->
<div id="confirmation-modal" class="modal-backdrop" role="dialog">

<!-- After -->
<div id="confirmation-modal" class="modal-backdrop"
     role="alertdialog" aria-modal="true"
     aria-labelledby="modal-heading" aria-describedby="modal-body">
  <div class="modal">
    <button id="modal-close-btn" class="modal-close" aria-label="Close dialog">&#x2715;</button>
    <h2 id="modal-heading">Booking Confirmed!</h2>
    <div id="modal-body">
      <p>Thank you for booking. You will receive a confirmation by email.</p>
    </div>
  </div>
</div>
```

---

### A11Y-014 — Skip navigation link absent on all pages

| Field | Value |
|---|---|
| **Page / File** | index.html, book.html, contact.html |
| **Line** | 9 (body start, all pages) |
| **Element** | `<body>` (first child) |
| **WCAG SC** | 2.4.1 Bypass Blocks |
| **Level** | A |
| **Category** | Page |
| **Severity** | 🟠 Medium |
| **Affects** | keyboard-only users, screen reader users |
| **Effort** | 15 min |
| **Status** | Open |

**Problem**

None of the three pages provides a skip navigation link. Keyboard-only users must tab through the site logo and all three navigation links on every page load before reaching the main content area.

**Fix**

Add a visually hidden "Skip to main content" anchor as the first element inside `<body>` on each page. Make it visible on `:focus` and target the `<main>` element's `id`.

```html
<!-- First child of <body> on every page -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- Give <main> a matching id -->
<main id="main-content">

<!-- In styles.css -->
.skip-link {
  position: absolute;
  left: -9999px;
  top: 0;
}
.skip-link:focus {
  left: 0;
  width: auto;
  padding: 0.5rem 1rem;
  background: #0f3460;
  color: #fff;
  text-decoration: none;
  z-index: 1000;
}
```

---

### A11Y-015 — Heading hierarchy skips from h1 to h3

| Field | Value |
|---|---|
| **Page / File** | index.html · `sample-app/index.html` |
| **Line** | 55 |
| **Element** | `<h3 class="section-title">Upcoming Events</h3>` |
| **WCAG SC** | 1.3.1 Info and Relationships |
| **Level** | A |
| **Category** | Structure |
| **Severity** | 🟠 Medium |
| **Affects** | screen reader users, users with cognitive disabilities |
| **Effort** | 5 min |
| **Status** | Open |

**Problem**

The page jumps directly from `<h1>` (in the hero banner) to `<h3>` for the "Upcoming Events" section, skipping `<h2>` entirely. Screen reader users navigating by headings will encounter a broken document outline that implies a missing section level.

**Fix**

Change `<h3 class="section-title">` to `<h2 class="section-title">`. Visual size is controlled by CSS, not heading level.

```html
<!-- Before -->
<h3 class="section-title">Upcoming Events</h3>

<!-- After -->
<h2 class="section-title">Upcoming Events</h2>
```

---

### A11Y-016 — SVG bookshelf illustration has no accessible name

| Field | Value |
|---|---|
| **Page / File** | index.html · `sample-app/index.html` |
| **Line** | 47 |
| **Element** | `<svg width="120" height="80">` |
| **WCAG SC** | 1.1.1 Non-text Content |
| **Level** | A |
| **Category** | Images |
| **Severity** | 🟠 Medium |
| **Affects** | screen reader users |
| **Effort** | 10 min |
| **Status** | Open |

**Problem**

The inline SVG illustration used as a decorative bookshelf graphic has no `aria-hidden` attribute, `role`, or accessible name. Screen readers will attempt to read or traverse its raw SVG child elements, announcing confusing or meaningless content.

**Fix**

If the illustration is purely decorative, add `aria-hidden="true"` and `focusable="false"`. If it conveys meaning, add `role="img"` and either a `<title>` child element or `aria-label`.

```html
<!-- Before -->
<svg width="120" height="80" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">

<!-- After (decorative) -->
<svg width="120" height="80" viewBox="0 0 120 80"
     xmlns="http://www.w3.org/2000/svg"
     aria-hidden="true" focusable="false">
```

---

### A11Y-017 — "Click here" non-descriptive link text

| Field | Value |
|---|---|
| **Page / File** | index.html · `sample-app/index.html` |
| **Line** | 62 |
| **Element** | `<a href="book.html" class="card-link">Click here</a>` |
| **WCAG SC** | 2.4.4 Link Purpose (In Context) |
| **Level** | A |
| **Category** | Links & Buttons |
| **Severity** | 🟠 Medium |
| **Affects** | screen reader users, users with cognitive disabilities |
| **Effort** | 5 min |
| **Status** | Open |

**Problem**

The link text "Click here" conveys no information about the destination or purpose. Screen reader users navigating a list of links out of context will encounter multiple ambiguous "Click here" references with no way to distinguish them.

**Fix**

Replace the generic text with a descriptive label that names the specific event and action.

```html
<!-- Before -->
<a href="book.html" class="card-link">Click here</a>

<!-- After -->
<a href="book.html" class="card-link">Book a seat — Author Talk: Jane Morris</a>
```

---

### A11Y-018 — "Read more" non-descriptive link text

| Field | Value |
|---|---|
| **Page / File** | index.html · `sample-app/index.html` |
| **Line** | 68 |
| **Element** | `<a href="book.html" class="card-link">Read more</a>` |
| **WCAG SC** | 2.4.4 Link Purpose (In Context) |
| **Level** | A |
| **Category** | Links & Buttons |
| **Severity** | 🟠 Medium |
| **Affects** | screen reader users, users with cognitive disabilities |
| **Effort** | 5 min |
| **Status** | Open |

**Problem**

"Read more" is a non-descriptive link label that lacks context when a screen reader user navigates by links. Users cannot determine what they will read more about without reading surrounding visual text.

**Fix**

Replace with a descriptive label identifying the specific event.

```html
<!-- Before -->
<a href="book.html" class="card-link">Read more</a>

<!-- After -->
<a href="book.html" class="card-link">Book a seat — Coding for Beginners</a>
```

---

### A11Y-019 — Multiple h1 elements in hero carousel

| Field | Value |
|---|---|
| **Page / File** | index.html · `sample-app/index.html` |
| **Line** | 25 |
| **Element** | `.hero-slide h1` (three instances) |
| **WCAG SC** | 1.3.1 Info and Relationships |
| **Level** | A |
| **Category** | Structure |
| **Severity** | 🟠 Medium |
| **Affects** | screen reader users |
| **Effort** | 15 min |
| **Status** | Open |

**Problem**

All three carousel slides are present in the DOM simultaneously, each containing an `<h1>` heading. Screen readers that scan headings encounter three `<h1>` elements on one page, implying three equal top-level topics and producing a confusing document outline.

**Fix**

Use JavaScript to add `aria-hidden="true"` to the non-current slides so only the active slide's `<h1>` is exposed to assistive technology at any time. Alternatively, keep one `<h1>` for the visible slide and use `<p>` or lower heading levels for off-screen slides.

```js
// In show(), hide non-active slides from assistive technology
slides.forEach(function (s, i) {
  s.setAttribute('aria-hidden', i !== current ? 'true' : 'false');
});
```

---

### A11Y-020 — Required fields not visually or programmatically indicated

| Field | Value |
|---|---|
| **Page / File** | book.html · `sample-app/book.html` |
| **Line** | 26 |
| **Element** | `<form id="booking-form">` required inputs |
| **WCAG SC** | 3.3.2 Labels or Instructions |
| **Level** | A |
| **Category** | Forms |
| **Severity** | 🟠 Medium |
| **Affects** | screen reader users, users with cognitive disabilities |
| **Effort** | 15 min |
| **Status** | Open |

**Problem**

Required fields have no visible indicator (such as an asterisk or the word "required") before the user attempts to submit. Users have no way to know which fields are mandatory until they accidentally submit an incomplete form and see the error state.

**Fix**

Add a visible required indicator (asterisk with a legend) to each required field's label. The `required` HTML attribute is already present, which satisfies the programmatic requirement; the visible indicator addresses the visual gap.

```html
<!-- Add above the form -->
<p><span aria-hidden="true">*</span> indicates a required field</p>

<!-- Add to each required field label -->
<label for="email">Email address <span aria-hidden="true" class="required-mark">*</span></label>
```

---

### A11Y-021 — Modal close button has ambiguous accessible name

| Field | Value |
|---|---|
| **Page / File** | book.html · `sample-app/book.html` |
| **Line** | 83 |
| **Element** | `<button id="modal-close-btn" class="modal-close">&#x2715;</button>` |
| **WCAG SC** | 4.1.2 Name, Role, Value |
| **Level** | A |
| **Category** | Links & Buttons |
| **Severity** | 🟠 Medium |
| **Affects** | screen reader users |
| **Effort** | 2 min |
| **Status** | Open |

**Problem**

The close button inside the confirmation modal uses the Unicode multiplication sign (✕) as its only label. Screen readers may announce this as "multiplication x" or "times" rather than "close", leaving the user unsure of the button's purpose.

**Fix**

Add `aria-label="Close dialog"` to the button so screen readers announce a meaningful label while the visual ✕ symbol remains.

```html
<!-- Before -->
<button id="modal-close-btn" class="modal-close">&#x2715;</button>

<!-- After -->
<button id="modal-close-btn" class="modal-close" aria-label="Close dialog">&#x2715;</button>
```

---

### A11Y-022 — Hours table has no column headers

| Field | Value |
|---|---|
| **Page / File** | contact.html · `sample-app/contact.html` |
| **Line** | 27 |
| **Element** | `<table class="hours-table">` |
| **WCAG SC** | 1.3.1 Info and Relationships |
| **Level** | A |
| **Category** | Structure |
| **Severity** | 🟠 Medium |
| **Affects** | screen reader users |
| **Effort** | 10 min |
| **Status** | Open |

**Problem**

The Opening Hours table contains no `<thead>` and no `<th>` elements — all cells are `<td>`. Screen readers cannot announce column context ("Day" or "Hours") when reading cell values, so users hear raw data without knowing what the columns represent.

**Fix**

Add a `<thead>` with `<th scope="col">` cells for "Day" and "Hours". If visible headers are not desired, use the `.visually-hidden` class (already defined in styles.css) to hide the text while keeping it accessible.

```html
<!-- Before -->
<table class="hours-table">
  <tbody>
    <tr>
      <td>Monday – Friday</td>
      <td>9:00 am – 7:00 pm</td>
    </tr>

<!-- After -->
<table class="hours-table">
  <thead>
    <tr>
      <th scope="col">Day</th>
      <th scope="col">Hours</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Monday – Friday</td>
      <td>9:00 am – 7:00 pm</td>
    </tr>
```

---

### A11Y-023 — SVG map has no accessible name

| Field | Value |
|---|---|
| **Page / File** | contact.html · `sample-app/contact.html` |
| **Line** | 50 |
| **Element** | `<svg width="400" height="220">` (map illustration) |
| **WCAG SC** | 1.1.1 Non-text Content |
| **Level** | A |
| **Category** | Images |
| **Severity** | 🟠 Medium |
| **Affects** | screen reader users |
| **Effort** | 10 min |
| **Status** | Open |

**Problem**

The SVG map illustration showing the library location has no `role`, `aria-label`, or `<title>` element. Screen readers either ignore it or traverse its raw child elements (text labels, shapes), providing no meaningful description of the map or the library's location.

**Fix**

Add `role="img"`, a `<title>` child element describing the map, and `aria-labelledby` referencing that title.

```html
<!-- Before -->
<svg width="400" height="220" viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">

<!-- After -->
<svg role="img" aria-labelledby="map-title"
     width="400" height="220" viewBox="0 0 400 220"
     xmlns="http://www.w3.org/2000/svg">
  <title id="map-title">Map showing the library at the corner of River Road and Mill Street</title>
```

---

### A11Y-024 — Phone link indistinguishable from surrounding text

| Field | Value |
|---|---|
| **Page / File** | contact.html · `sample-app/contact.html` |
| **Line** | 71 |
| **Element** | `<a href="tel:+441234567890" style="color:#1a1a2e;text-decoration:none;">` |
| **WCAG SC** | 1.4.1 Use of Color |
| **Level** | A |
| **Category** | Links & Buttons |
| **Severity** | 🟠 Medium |
| **Affects** | color-blind users, low-vision users |
| **Effort** | 5 min |
| **Status** | Open |

**Problem**

The phone number link has `text-decoration: none` and `color: #1a1a2e` — the same colour as the surrounding body text. There is no underline, no border, no icon, or any other visual cue that identifies it as a link. Sighted users who do not hover cannot distinguish it from plain text.

**Fix**

Remove the `text-decoration: none` inline style (or add `text-decoration: underline`) so the link is visually distinguished from surrounding text by a means other than colour alone.

```html
<!-- Before -->
<a href="tel:+441234567890" style="color:#1a1a2e;text-decoration:none;">01234 567890</a>

<!-- After -->
<a href="tel:+441234567890" style="color:#1a1a2e;">01234 567890</a>
```

---

### A11Y-025 — FAQ buttons missing aria-expanded

| Field | Value |
|---|---|
| **Page / File** | contact.html · `sample-app/contact.html`, `sample-app/app.js` |
| **Line** | 85 (HTML), 65 (JS) |
| **Element** | `<button class="faq-toggle">` |
| **WCAG SC** | 4.1.2 Name, Role, Value |
| **Level** | A |
| **Category** | ARIA & Dynamic |
| **Severity** | 🟠 Medium |
| **Affects** | screen reader users |
| **Effort** | 15 min |
| **Status** | Open |

**Problem**

The FAQ accordion toggle buttons do not have `aria-expanded` and the JavaScript never sets it. Screen reader users are not informed whether an answer panel is currently open or closed — they must navigate into the content to discover the state.

**Fix**

Add `aria-expanded="false"` to each `.faq-toggle` button in the HTML, and update `initFaq()` to toggle the attribute between `"true"` and `"false"` when the button is clicked.

```html
<!-- Before -->
<button class="faq-toggle">Is library membership free?</button>

<!-- After -->
<button class="faq-toggle" aria-expanded="false" aria-controls="faq-1">Is library membership free?</button>
<div class="faq-body" id="faq-1">...</div>
```

```js
// app.js — initFaq
btn.addEventListener('click', function () {
  var body = btn.nextElementSibling;
  if (!body) return;
  var isOpen = body.classList.toggle('open');
  btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});
```

---

### A11Y-026 — FAQ body panels have no id or aria-controls

| Field | Value |
|---|---|
| **Page / File** | contact.html · `sample-app/contact.html` |
| **Line** | 86 |
| **Element** | `<div class="faq-body">` |
| **WCAG SC** | 4.1.2 Name, Role, Value |
| **Level** | A |
| **Category** | ARIA & Dynamic |
| **Severity** | 🟠 Medium |
| **Affects** | screen reader users |
| **Effort** | 10 min |
| **Status** | Open |

**Problem**

The FAQ answer panels have no `id` attributes, and the toggle buttons have no `aria-controls` pointing to them. Screen reader users who activate a button have no programmatic association to the content it controls and may not be able to navigate directly to the revealed answer.

**Fix**

Assign a unique `id` to each `.faq-body` element and add a matching `aria-controls` attribute to the corresponding toggle button. (Best done together with A11Y-025.)

```html
<!-- Before -->
<button class="faq-toggle">Can I book without being a member?</button>
<div class="faq-body">...</div>

<!-- After -->
<button class="faq-toggle" aria-expanded="false" aria-controls="faq-2">Can I book without being a member?</button>
<div class="faq-body" id="faq-2">...</div>
```

---

### A11Y-027 — Hero dot target size too small (10×10 px)

| Field | Value |
|---|---|
| **Page / File** | index.html · `sample-app/styles.css` |
| **Line** | 91 |
| **Element** | `.hero-dot` |
| **WCAG SC** | 2.5.8 Target Size (Minimum) |
| **Level** | AA |
| **Category** | Mobile & Zoom |
| **Severity** | 🟠 Medium |
| **Affects** | mobile and zoom users |
| **Effort** | 10 min |
| **Status** | Open |

**Problem**

Each carousel dot is 10×10 CSS pixels, well below the WCAG 2.2 minimum touch target size of 24×24 px. Users with motor impairments or on touch screens will have difficulty accurately tapping such small targets.

**Fix**

Increase the dot's effective interactive area to at least 24×24 px using padding, while keeping the visual dot size unchanged via `background-clip`.

```css
/* Before */
.hero-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255,255,255,0.4);
  cursor: pointer;
  display: inline-block;
}

/* After */
.hero-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255,255,255,0.4);
  background-clip: content-box;
  padding: 7px;
  cursor: pointer;
  display: inline-block;
  /* effective tap area: 10 + 14 = 24px */
}
```

---

### A11Y-028 — Page titles identical across all three pages

| Field | Value |
|---|---|
| **Page / File** | index.html, book.html, contact.html |
| **Line** | 6 (all pages) |
| **Element** | `<title>` |
| **WCAG SC** | 2.4.2 Page Titled |
| **Level** | A |
| **Category** | Page |
| **Severity** | 🟡 Low |
| **Affects** | screen reader users, users with cognitive disabilities |
| **Effort** | 5 min |
| **Status** | Open |

**Problem**

All three pages share the identical `<title>Riverside Community Library</title>`. Screen reader users cannot distinguish which page they are on by title alone, and browser history and tab titles provide no page-specific context.

**Fix**

Prepend a unique page name to each title using the "Page — Site" pattern.

```html
<!-- index.html -->
<title>Home — Riverside Community Library</title>

<!-- book.html -->
<title>Book an Event — Riverside Community Library</title>

<!-- contact.html -->
<title>Contact &amp; Visit Us — Riverside Community Library</title>
```

---

### A11Y-029 — Event cards not marked up as a list

| Field | Value |
|---|---|
| **Page / File** | index.html · `sample-app/index.html` |
| **Line** | 57 |
| **Element** | `<div class="cards">` |
| **WCAG SC** | 1.3.1 Info and Relationships |
| **Level** | A |
| **Category** | Structure |
| **Severity** | 🟡 Low |
| **Affects** | screen reader users |
| **Effort** | 10 min |
| **Status** | Open |

**Problem**

The three event cards are plain `<div>` elements with no semantic grouping. Screen reader users receive no structural cue that these items form a related list of events, and no count of how many items are present.

**Fix**

Wrap the card container in a `<ul>` and make each card an `<li>`. Apply `list-style: none` in CSS to preserve the visual layout.

```html
<!-- Before -->
<div class="cards">
  <div class="card">...</div>

<!-- After -->
<ul class="cards" style="list-style:none;padding:0;">
  <li class="card">...</li>
```

---
