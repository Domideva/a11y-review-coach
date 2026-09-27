# Accessibility Review — Riverside Community Library Sample App

**Standard:** WCAG 2.2 AA
**Reviewed by:** Bob (a11y-review skill)
**Date:** 2025-07-14
**Pages reviewed:** sample-app/index.html, sample-app/book.html, sample-app/contact.html

---

## Summary

### Findings by Severity

| Severity | Count |
|---|---|
| 🔴 High | 11 |
| 🟠 Medium | 8 |
| 🟡 Low | 1 |
| **Total** | **20** |

### Findings by Page

| Page / File | High | Medium | Low | Total |
|---|---|---|---|---|
| index.html | 4 | 4 | 0 | 8 |
| book.html | 4 | 2 | 0 | 6 |
| contact.html | 1 | 2 | 1 | 4 |
| All pages (shared CSS/JS) | 2 | 2 | 0 | 4 |

*Note: Issues affecting multiple pages are counted once in the "All pages" row and not double-counted in per-page rows.*

### Findings by Category

| Category | Count |
|---|---|
| Images | 2 |
| Forms | 3 |
| Keyboard & Focus | 4 |
| Color & Contrast | 2 |
| Structure | 2 |
| Links & Buttons | 2 |
| ARIA & Dynamic | 2 |
| Motion | 1 |
| Mobile & Zoom | 1 |
| Page | 1 |

---

## Top 5 Risks

1. **A11Y-001** — Focus indicators are removed for every element site-wide, making keyboard navigation impossible for any user who cannot use a mouse. *(affects: keyboard-only users, low-vision users)*
2. **A11Y-002** — All three pages block pinch-to-zoom and browser text-scaling, preventing low-vision users from enlarging content to a readable size. *(affects: low-vision users, mobile and zoom users)*
3. **A11Y-009** — Booking form validation communicates errors only via a red border, giving screen reader users no indication of which fields failed or why. *(affects: screen reader users, color-blind users, users with cognitive disabilities)*
4. **A11Y-010** — The confirmation modal opens without moving focus inside it, and pressing Escape does not close it, leaving keyboard users stranded. *(affects: keyboard-only users, screen reader users)*
5. **A11Y-008** — The form submit button contains only a hidden SVG icon with no text or accessible label, so screen reader users cannot identify or activate it. *(affects: screen reader users)*

---

## Findings

---

### A11Y-001 — Global focus indicator suppressed

| Field | Value |
|---|---|
| **Page / File** | sample-app/styles.css (affects all pages) |
| **Line** | 8 |
| **Element** | `* { outline: none; }` |
| **WCAG SC** | 2.4.7 Focus Visible / 2.4.11 Focus Appearance |
| **Level** | AA |
| **Category** | Keyboard & Focus |
| **Severity** | High |
| **Affects** | keyboard-only users, low-vision users |
| **Effort** | 10 min |
| **Status** | Open |

**Problem**

The universal CSS rule `* { outline: none; }` removes the browser-default focus ring from every focusable element across all three pages. Keyboard-only users and switch-device users have no visual cue showing where focus currently is, making the entire site effectively unusable without a mouse.

**Fix**

Remove the `outline: none` wildcard rule. If a custom focus style is needed, apply it only via `:focus-visible` so pointer-initiated focus remains unaffected, while keyboard-initiated focus stays clearly visible.

```css
/* Before */
* {
  outline: none;
}

/* After — remove the rule entirely, or replace with a custom focus-visible style */
:focus-visible {
  outline: 2px solid #0f3460;
  outline-offset: 2px;
}
```

---

### A11Y-002 — Viewport blocks user zoom

| Field | Value |
|---|---|
| **Page / File** | sample-app/index.html, sample-app/book.html, sample-app/contact.html |
| **Line** | 5 |
| **Element** | `<meta name="viewport">` |
| **WCAG SC** | 1.4.4 Resize Text |
| **Level** | AA |
| **Category** | Mobile & Zoom |
| **Severity** | High |
| **Affects** | low-vision users, mobile and zoom users |
| **Effort** | 5 min |
| **Status** | Open |

**Problem**

All three pages include `user-scalable=no, maximum-scale=1.0` in the viewport meta tag, which prevents users from pinching to zoom or using browser text-scaling. Low-vision users who rely on 200–400% zoom to read content are completely blocked.

**Fix**

Remove `user-scalable=no` and `maximum-scale=1.0` from all three viewport meta tags. The layout already uses flexible units and will adapt correctly.

```html
<!-- Before -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0">

<!-- After -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

---

### A11Y-003 — Hero carousel auto-rotates with no pause mechanism

| Field | Value |
|---|---|
| **Page / File** | sample-app/index.html (line 23), sample-app/app.js (line 19) |
| **Line** | 19 |
| **Element** | `.hero-slides` / `setInterval` |
| **WCAG SC** | 2.2.2 Pause, Stop, Hide |
| **Level** | A |
| **Category** | Motion |
| **Severity** | High |
| **Affects** | users with cognitive disabilities, keyboard-only users, screen reader users |
| **Effort** | 30 min |
| **Status** | Open |

**Problem**

The hero banner automatically rotates slides every three seconds, and there is no button, control, or keyboard mechanism to pause, stop, or hide the movement. Users with attention or cognitive disabilities can be distracted by constant motion, and screen reader users may be disrupted as content changes beneath them.

**Fix**

Add a visible pause/play button next to the carousel dots. In JavaScript, clear the `setInterval` when the user activates pause and restart it on play. Also respect `prefers-reduced-motion` by skipping the auto-rotation entirely.

```html
<!-- Before: no pause control -->
<div class="hero-dots">
  <span class="hero-dot active"></span>
  <span class="hero-dot"></span>
  <span class="hero-dot"></span>
</div>

<!-- After: add a pause button -->
<div class="hero-dots">
  <span class="hero-dot active"></span>
  <span class="hero-dot"></span>
  <span class="hero-dot"></span>
  <button class="hero-pause" aria-label="Pause slideshow">&#9646;&#9646;</button>
</div>
```

---

### A11Y-004 — Decorative SVG illustration has no accessible name

| Field | Value |
|---|---|
| **Page / File** | sample-app/index.html |
| **Line** | 47 |
| **Element** | `<svg width="120" height="80">` (library skyline) |
| **WCAG SC** | 1.1.1 Non-text Content |
| **Level** | A |
| **Category** | Images |
| **Severity** | High |
| **Affects** | screen reader users |
| **Effort** | 5 min |
| **Status** | Open |

**Problem**

The SVG illustration of the library skyline conveys visual context about the library but has no `<title>`, `aria-label`, or `role="img"`. Screen readers will either announce the raw SVG markup or skip it silently, depending on the browser, providing no meaningful description of the image.

**Fix**

Add `role="img"` and `aria-label` to the `<svg>`, or add a `<title>` as its first child element. If the image is purely decorative, add `aria-hidden="true"` instead.

```html
<!-- Before -->
<svg width="120" height="80" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">

<!-- After (informative) -->
<svg width="120" height="80" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg"
     role="img" aria-label="Illustration of the Riverside Library building">
  <title>Riverside Library building illustration</title>
```

---

### A11Y-005 — Newsletter sign-up is a `<div>` with no keyboard support

| Field | Value |
|---|---|
| **Page / File** | sample-app/index.html (line 80), sample-app/app.js (line 76) |
| **Line** | 80 |
| **Element** | `<div id="newsletter-action">` |
| **WCAG SC** | 2.1.1 Keyboard |
| **Level** | A |
| **Category** | Keyboard & Focus |
| **Severity** | High |
| **Affects** | keyboard-only users, screen reader users |
| **Effort** | 10 min |
| **Status** | Open |

**Problem**

The "Sign up for our newsletter" control is a plain `<div>` element with only a click event handler and no `role`, `tabindex`, or keyboard event handler. Keyboard-only users cannot reach or activate it because `<div>` elements are not focusable or operable by keyboard.

**Fix**

Replace the `<div>` with a `<button>` element. The JavaScript click handler will continue to work without modification.

```html
<!-- Before -->
<div id="newsletter-action"
     style="display:inline-block;background:#0f3460;color:#fff;padding:0.75rem 2rem;border-radius:4px;cursor:pointer;font-size:1rem;">
  Sign up for our newsletter
</div>

<!-- After -->
<button id="newsletter-action"
        style="display:inline-block;background:#0f3460;color:#fff;padding:0.75rem 2rem;border-radius:4px;cursor:pointer;font-size:1rem;border:none;">
  Sign up for our newsletter
</button>
```

---

### A11Y-006 — Hero subtitle text has insufficient contrast

| Field | Value |
|---|---|
| **Page / File** | sample-app/styles.css (affects sample-app/index.html) |
| **Line** | 79 |
| **Element** | `.hero p` |
| **WCAG SC** | 1.4.3 Contrast (Minimum) |
| **Level** | AA |
| **Category** | Color & Contrast |
| **Severity** | High |
| **Affects** | low-vision users, color-blind users |
| **Effort** | 5 min |
| **Status** | Open |

**Problem**

The hero section paragraph text uses colour `#a8a8b3` on a `#0f3460` background, producing a contrast ratio of approximately 2.8:1. The WCAG 2.2 AA minimum for normal-weight text is 4.5:1. Low-vision users will struggle to read the sub-headings describing events.

**Fix**

Lighten the text colour to a value that achieves at least 4.5:1 contrast against `#0f3460`. Using `#ffffff` (white) yields a ratio of approximately 14:1 and is consistent with the h1 heading colour already used in the hero.

```css
/* Before */
.hero p {
  color: #a8a8b3;
}

/* After */
.hero p {
  color: #ffffff;
}
```

---

### A11Y-007 — Email input has no visible label

| Field | Value |
|---|---|
| **Page / File** | sample-app/book.html |
| **Line** | 29 |
| **Element** | `<input type="email" id="email">` |
| **WCAG SC** | 1.3.1 Info and Relationships / 3.3.2 Labels or Instructions |
| **Level** | A |
| **Category** | Forms |
| **Severity** | High |
| **Affects** | screen reader users, users with cognitive disabilities |
| **Effort** | 5 min |
| **Status** | Open |

**Problem**

The email input field relies on `placeholder="Your email address"` as its only label. Placeholders disappear as soon as the user begins typing, leaving users with cognitive disabilities with no reminder of what the field expects. Screen readers may not reliably expose placeholder text as a label.

**Fix**

Add a `<label for="email">` element above the input. The placeholder can remain as an additional hint.

```html
<!-- Before -->
<div class="form-group">
  <input type="email" id="email" name="email"
         placeholder="Your email address"
         required
         autocomplete="email">
</div>

<!-- After -->
<div class="form-group">
  <label for="email">Email address</label>
  <input type="email" id="email" name="email"
         placeholder="Your email address"
         required
         autocomplete="email">
</div>
```

---

### A11Y-008 — Submit button has no accessible name

| Field | Value |
|---|---|
| **Page / File** | sample-app/book.html |
| **Line** | 71 |
| **Element** | `<button type="submit" class="btn-primary">` |
| **WCAG SC** | 4.1.2 Name, Role, Value |
| **Level** | A |
| **Category** | Links & Buttons |
| **Severity** | High |
| **Affects** | screen reader users |
| **Effort** | 5 min |
| **Status** | Open |

**Problem**

The booking form's submit button contains only an SVG checkmark icon that has `aria-hidden="true"`, which means the button has no accessible name at all. Screen readers will announce it as an unlabelled button, and users who rely on voice control cannot activate it by speaking a name.

**Fix**

Add visible text inside the button, or at minimum add `aria-label="Submit booking"` to the button element.

```html
<!-- Before -->
<button type="submit" class="btn-primary" style="display:flex;align-items:center;gap:0.5rem;">
  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" focusable="false">
    <path d="M2 9l5 5L16 4" stroke="#fff" stroke-width="2.5" fill="none"/>
  </svg>
</button>

<!-- After -->
<button type="submit" class="btn-primary" style="display:flex;align-items:center;gap:0.5rem;">
  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" focusable="false">
    <path d="M2 9l5 5L16 4" stroke="#fff" stroke-width="2.5" fill="none"/>
  </svg>
  Confirm booking
</button>
```

---

### A11Y-009 — Form validation errors not communicated to assistive technology

| Field | Value |
|---|---|
| **Page / File** | sample-app/book.html (line 26), sample-app/app.js (line 33) |
| **Line** | 33 |
| **Element** | `field.classList.add('error')` |
| **WCAG SC** | 3.3.1 Error Identification / 4.1.3 Status Messages |
| **Level** | A |
| **Category** | Forms |
| **Severity** | High |
| **Affects** | screen reader users, color-blind users, users with cognitive disabilities |
| **Effort** | 30 min |
| **Status** | Open |

**Problem**

When form validation fails, the JavaScript only adds a red border (`.error` class) to the offending fields. No error message text is injected, no `aria-describedby` links the error to the field, and no live region announces the failure. Screen reader users and colour-blind users receive no indication that validation has failed.

**Fix**

For each invalid field, inject a text error message below it, set `aria-describedby` on the input to point to that message element, and wrap the error messages in an `aria-live="assertive"` region or `role="alert"` container at the top of the form.

```js
// Before
field.classList.add('error');

// After
field.classList.add('error');
var errId = field.id + '-error';
var errEl = document.getElementById(errId);
if (!errEl) {
  errEl = document.createElement('span');
  errEl.id = errId;
  errEl.className = 'field-error';
  field.parentNode.appendChild(errEl);
}
errEl.textContent = field.labels[0]
  ? field.labels[0].textContent + ' is required.'
  : 'This field is required.';
field.setAttribute('aria-describedby', errId);
```

---

### A11Y-010 — Confirmation modal focus not managed

| Field | Value |
|---|---|
| **Page / File** | sample-app/book.html (line 81), sample-app/app.js (line 53) |
| **Line** | 53 |
| **Element** | `#confirmation-modal` / `showConfirmationModal()` |
| **WCAG SC** | 2.1.1 Keyboard / 2.4.3 Focus Order |
| **Level** | A |
| **Category** | Keyboard & Focus |
| **Severity** | High |
| **Affects** | keyboard-only users, screen reader users |
| **Effort** | 30 min |
| **Status** | Open |

**Problem**

When the booking confirmation modal opens, focus remains on the submit button behind the backdrop. Keyboard users cannot reach the modal's "close" button, and pressing Escape does not close the modal. When the modal is closed, focus is not returned to the triggering element.

**Fix**

On modal open, move focus to the modal container (or its heading/close button). Add a `keydown` listener on the document to close the modal on Escape. On close, return focus to the submit button. Add `aria-modal="true"` to the dialog element.

```js
// Before
function showConfirmationModal() {
  var backdrop = document.getElementById('confirmation-modal');
  backdrop.classList.add('open');
  document.getElementById('modal-close-btn').addEventListener('click', function () {
    backdrop.classList.remove('open');
  });
}

// After
function showConfirmationModal() {
  var backdrop = document.getElementById('confirmation-modal');
  var closeBtn = document.getElementById('modal-close-btn');
  var submitBtn = document.querySelector('#booking-form [type="submit"]');
  backdrop.setAttribute('aria-modal', 'true');
  backdrop.classList.add('open');
  closeBtn.focus();
  function handleEscape(e) {
    if (e.key === 'Escape') { closeModal(); }
  }
  function closeModal() {
    backdrop.classList.remove('open');
    document.removeEventListener('keydown', handleEscape);
    if (submitBtn) submitBtn.focus();
  }
  closeBtn.addEventListener('click', closeModal, { once: true });
  document.addEventListener('keydown', handleEscape);
}
```

---

### A11Y-011 — SVG map has no accessible name

| Field | Value |
|---|---|
| **Page / File** | sample-app/contact.html |
| **Line** | 50 |
| **Element** | `<svg width="400" height="220">` (location map) |
| **WCAG SC** | 1.1.1 Non-text Content |
| **Level** | A |
| **Category** | Images |
| **Severity** | High |
| **Affects** | screen reader users |
| **Effort** | 5 min |
| **Status** | Open |

**Problem**

The SVG map showing the library's location conveys meaningful spatial information — street layout, building positions, and the library pin — but has no `role="img"`, `aria-label`, or `<title>`. Screen reader users receive no description of the map's content and cannot orientate themselves using it.

**Fix**

Add `role="img"` and `aria-labelledby` pointing to an embedded `<title>` element, or use `aria-label` directly on the `<svg>`.

```html
<!-- Before -->
<svg width="400" height="220" viewBox="0 0 400 220"
     xmlns="http://www.w3.org/2000/svg"
     style="border:1px solid #e5e7eb;border-radius:6px;display:block;margin-top:0.75rem;">

<!-- After -->
<svg width="400" height="220" viewBox="0 0 400 220"
     xmlns="http://www.w3.org/2000/svg"
     role="img"
     aria-label="Map showing the library at 42 River Road at the corner of River Road and Mill Street"
     style="border:1px solid #e5e7eb;border-radius:6px;display:block;margin-top:0.75rem;">
  <title>Map: Riverside Library location at 42 River Road</title>
```

---

### A11Y-012 — All pages share the same non-unique page title

| Field | Value |
|---|---|
| **Page / File** | sample-app/index.html, sample-app/book.html, sample-app/contact.html |
| **Line** | 6 |
| **Element** | `<title>Riverside Community Library</title>` |
| **WCAG SC** | 2.4.2 Page Titled |
| **Level** | A |
| **Category** | Page |
| **Severity** | Medium |
| **Affects** | screen reader users, users with cognitive disabilities |
| **Effort** | 5 min |
| **Status** | Open |

**Problem**

All three pages share the identical `<title>Riverside Community Library</title>`. Screen reader users who have multiple tabs open cannot distinguish which tab is which, and users navigating a browser history have no way to identify the purpose of each page.

**Fix**

Give each page a unique, descriptive title following the pattern "Page Name — Site Name".

```html
<!-- Before (all three pages) -->
<title>Riverside Community Library</title>

<!-- After -->
<!-- index.html  --> <title>Home — Riverside Community Library</title>
<!-- book.html   --> <title>Book an Event — Riverside Community Library</title>
<!-- contact.html--> <title>Contact &amp; Visit Us — Riverside Community Library</title>
```

---

### A11Y-013 — No skip-navigation link on any page

| Field | Value |
|---|---|
| **Page / File** | sample-app/index.html, sample-app/book.html, sample-app/contact.html |
| **Line** | 11 |
| **Element** | `<header class="site-header">` (first element in body) |
| **WCAG SC** | 2.4.1 Bypass Blocks |
| **Level** | A |
| **Category** | Keyboard & Focus |
| **Severity** | Medium |
| **Affects** | keyboard-only users, screen reader users |
| **Effort** | 15 min |
| **Status** | Open |

**Problem**

None of the three pages provide a skip-navigation link. Keyboard users must tab through the site header and all navigation links on every page before reaching the main content, which is particularly burdensome on pages with long navigation menus.

**Fix**

Add a visually hidden "Skip to main content" link as the very first element in `<body>`, before the `<header>`. Reveal it on focus using a CSS class.

```html
<!-- Before: first element is <header> -->
<body>
  <header class="site-header">

<!-- After -->
<body>
  <a href="#main" class="skip-link visually-hidden">Skip to main content</a>
  <header class="site-header">
```

---

### A11Y-014 — Heading hierarchy skips from h1 to h3

| Field | Value |
|---|---|
| **Page / File** | sample-app/index.html |
| **Line** | 55 |
| **Element** | `<h3 class="section-title">Upcoming Events</h3>` |
| **WCAG SC** | 1.3.1 Info and Relationships |
| **Level** | A |
| **Category** | Structure |
| **Severity** | Medium |
| **Affects** | screen reader users, users with cognitive disabilities |
| **Effort** | 5 min |
| **Status** | Open |

**Problem**

The page heading hierarchy jumps from `<h1>` in the hero section directly to `<h3>` for the "Upcoming Events" section title, skipping `<h2>`. Screen reader users who navigate by headings will find a gap in the document outline that suggests a section is missing.

**Fix**

Change the "Upcoming Events" heading to `<h2>`. Check that the event card headings (`<h3>`) are also correct within that context.

```html
<!-- Before -->
<h3 class="section-title">Upcoming Events</h3>

<!-- After -->
<h2 class="section-title">Upcoming Events</h2>
```

---

### A11Y-015 — Non-descriptive link text on event cards

| Field | Value |
|---|---|
| **Page / File** | sample-app/index.html |
| **Line** | 62 |
| **Element** | `<a href="book.html" class="card-link">Click here</a>` / `<a href="book.html">Read more</a>` |
| **WCAG SC** | 2.4.4 Link Purpose (In Context) |
| **Level** | A |
| **Category** | Links & Buttons |
| **Severity** | Medium |
| **Affects** | screen reader users, users with cognitive disabilities |
| **Effort** | 10 min |
| **Status** | Open |

**Problem**

Two of the three event card links use the text "Click here" and "Read more". When screen reader users browse a list of links out of context, all they hear is the generic text with no indication of which event the link refers to.

**Fix**

Rewrite the link text to describe the destination, or add `aria-label` with an event-specific description. The third card already uses the better pattern "Book a seat".

```html
<!-- Before -->
<a href="book.html" class="card-link">Click here</a>
<a href="book.html" class="card-link">Read more</a>

<!-- After -->
<a href="book.html" class="card-link">Book a seat — Author Talk: Jane Morris</a>
<a href="book.html" class="card-link">Book a seat — Coding for Beginners</a>
```

---

### A11Y-016 — Hero carousel dot targets are 10×10 px (below 24×24 minimum)

| Field | Value |
|---|---|
| **Page / File** | sample-app/styles.css (affects sample-app/index.html) |
| **Line** | 91 |
| **Element** | `.hero-dot` |
| **WCAG SC** | 2.5.8 Target Size (Minimum) |
| **Level** | AA |
| **Category** | Keyboard & Focus |
| **Severity** | Medium |
| **Affects** | mobile and zoom users, keyboard-only users |
| **Effort** | 10 min |
| **Status** | Open |

**Problem**

The carousel navigation dots are styled at `width: 10px; height: 10px`, well below the WCAG 2.2 AA minimum of 24×24 CSS pixels. Users with motor impairments or those on touchscreens will find them very difficult to tap accurately.

**Fix**

Increase the visual dot size, or use padding and a transparent hit area to bring the total tap target to at least 24×24 px. Also replace the `<span>` elements with `<button>` elements for proper keyboard accessibility.

```css
/* Before */
.hero-dot {
  width: 10px;
  height: 10px;
}

/* After */
.hero-dot {
  width: 12px;
  height: 12px;
  padding: 6px; /* hit area becomes 24×24 px */
  box-sizing: content-box;
}
```

---

### A11Y-017 — book.html missing `lang` attribute on `<html>`

| Field | Value |
|---|---|
| **Page / File** | sample-app/book.html |
| **Line** | 2 |
| **Element** | `<html>` |
| **WCAG SC** | 3.1.1 Language of Page |
| **Level** | A |
| **Category** | Structure |
| **Severity** | Medium |
| **Affects** | screen reader users |
| **Effort** | 2 min |
| **Status** | Open |

**Problem**

The `<html>` element on book.html has no `lang` attribute. Screen readers will use their default language setting to read the page, which may cause text to be pronounced incorrectly for users whose screen reader is configured for a different language.

**Fix**

Add `lang="en"` to the `<html>` element, matching the other two pages.

```html
<!-- Before -->
<html>

<!-- After -->
<html lang="en">
```

---

### A11Y-018 — Opening hours table has no column headers

| Field | Value |
|---|---|
| **Page / File** | sample-app/contact.html |
| **Line** | 27 |
| **Element** | `.hours-table` |
| **WCAG SC** | 1.3.1 Info and Relationships |
| **Level** | A |
| **Category** | Forms |
| **Severity** | Medium |
| **Affects** | screen reader users |
| **Effort** | 10 min |
| **Status** | Open |

**Problem**

The opening hours table uses `<td>` for all cells including column headings. Screen readers cannot announce whether a cell is a header or data cell, so users navigating the table hear a sequence of values with no structural context for which column they are in.

**Fix**

Add a `<thead>` section with `<th scope="col">` elements, or at minimum change the first column cells to `<th scope="row">` to mark them as row headers.

```html
<!-- Before -->
<table class="hours-table">
  <tbody>
    <tr><td>Monday – Friday</td><td>9:00 am – 7:00 pm</td></tr>
    ...

<!-- After -->
<table class="hours-table">
  <thead>
    <tr>
      <th scope="col">Day</th>
      <th scope="col">Hours</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Monday – Friday</td><td>9:00 am – 7:00 pm</td></tr>
    ...
```

---

### A11Y-019 — FAQ accordion toggles never set `aria-expanded`

| Field | Value |
|---|---|
| **Page / File** | sample-app/contact.html (line 85), sample-app/app.js (line 64) |
| **Line** | 64 |
| **Element** | `.faq-toggle` buttons / `initFaq()` |
| **WCAG SC** | 4.1.2 Name, Role, Value |
| **Level** | A |
| **Category** | ARIA & Dynamic |
| **Severity** | Medium |
| **Affects** | screen reader users |
| **Effort** | 10 min |
| **Status** | Open |

**Problem**

The FAQ accordion buttons toggle the visibility of their answer panels but never update `aria-expanded`. Screen reader users cannot tell whether a panel is currently expanded or collapsed without reading or navigating into the content area.

**Fix**

Set `aria-expanded="false"` on each `.faq-toggle` button in HTML, then toggle it between `"true"` and `"false"` in the JavaScript click handler.

```html
<!-- Before -->
<button class="faq-toggle">Is library membership free?</button>

<!-- After -->
<button class="faq-toggle" aria-expanded="false">Is library membership free?</button>
```

```js
// Before
body.classList.toggle('open');

// After
body.classList.toggle('open');
btn.setAttribute('aria-expanded', body.classList.contains('open') ? 'true' : 'false');
```

---

### A11Y-020 — Phone link indistinguishable from plain text

| Field | Value |
|---|---|
| **Page / File** | sample-app/contact.html |
| **Line** | 71 |
| **Element** | `<a href="tel:+441234567890">` |
| **WCAG SC** | 1.4.1 Use of Color |
| **Level** | A |
| **Category** | Color & Contrast |
| **Severity** | Low |
| **Affects** | color-blind users, low-vision users |
| **Effort** | 5 min |
| **Status** | Open |

**Problem**

The telephone link is styled with `color:#1a1a2e;text-decoration:none;`, making it visually identical to the surrounding plain text. The only way a user might recognise it as a link is by hovering over it, which is not possible on touch devices.

**Fix**

Remove `text-decoration:none` from the telephone link so it displays with an underline, or add another non-colour distinguisher such as a telephone icon or visible border.

```html
<!-- Before -->
<a href="tel:+441234567890" style="color:#1a1a2e;text-decoration:none;">01234 567890</a>

<!-- After -->
<a href="tel:+441234567890">01234 567890</a>
```
