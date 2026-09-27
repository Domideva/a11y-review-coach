# Fix Log — Riverside Community Library Sample App

All High and Medium findings fixed. One Low finding (A11Y-029) left open.
A11Y-028 (page titles, Low severity) was fixed as a one-liner per page.

---

## Change Table

| ID | File | What Changed |
|---|---|---|
| A11Y-001 | `sample-app/styles.css` | Replaced `* { outline: none }` with `*:focus-visible { outline: 3px solid #005fcc; outline-offset: 2px; }` |
| A11Y-002 | `sample-app/index.html`, `book.html`, `contact.html` | Removed `user-scalable=no, maximum-scale=1.0` from viewport meta on all three pages |
| A11Y-003 | `sample-app/book.html` | Added `lang="en"` to `<html>` |
| A11Y-004 | `sample-app/index.html` | Replaced three `<span class="hero-dot">` with `<button class="hero-dot" aria-label="Go to slide N">` inside a `role="group"` wrapper |
| A11Y-005 | `sample-app/index.html` | Replaced `<div id="newsletter-action">` with `<button id="newsletter-action">` |
| A11Y-006 | `sample-app/book.html` | Added `<label for="email">Email address</label>` before the email input |
| A11Y-007 | `sample-app/book.html` | Added visible text "Submit booking" inside the icon-only submit button |
| A11Y-008 | `sample-app/app.js` | Auto-advance guarded by `prefers-reduced-motion`; paused on `focusin`/`mouseenter`, resumed on `focusout`/`mouseleave` |
| A11Y-009 | `sample-app/app.js` | Validation injects `<span class="field-error">` text messages and sets `aria-describedby` on each invalid field |
| A11Y-010 | `sample-app/app.js` | Same change as A11Y-009; previous errors now cleared between submissions |
| A11Y-011 | `sample-app/book.html` | Added `aria-modal="true"`, `aria-labelledby="modal-heading"`, `aria-describedby="modal-body"`; heading and body given matching `id` attributes |
| A11Y-012 | `sample-app/app.js` | `showConfirmationModal` now moves focus to close button, traps Tab/Shift-Tab, supports Escape, and restores focus on close |
| A11Y-013 | `sample-app/book.html` | Changed modal role from `dialog` to `alertdialog` so screen readers announce it immediately |
| A11Y-014 | `sample-app/index.html`, `book.html`, `contact.html` | Added `<a href="#main-content" class="skip-link">Skip to main content</a>` as first body child; `<main id="main-content">` on each page; `.skip-link` CSS in styles.css |
| A11Y-015 | `sample-app/index.html` | Changed `<h3 class="section-title">Upcoming Events</h3>` to `<h2>` |
| A11Y-016 | `sample-app/index.html` | Added `aria-hidden="true" focusable="false"` to decorative bookshelf SVG |
| A11Y-017 | `sample-app/index.html` | Replaced "Click here" link text with "Book a seat — Author Talk: Jane Morris" |
| A11Y-018 | `sample-app/index.html` | Replaced "Read more" link text with "Book a seat — Coding for Beginners" |
| A11Y-019 | `sample-app/index.html`, `app.js` | Slides 2 and 3 initialised with `aria-hidden="true"` in HTML; `show()` updates `aria-hidden` on all slides |
| A11Y-020 | `sample-app/book.html` | Added `<p>* indicates a required field</p>` legend and `<span aria-hidden="true" class="required-mark">*</span>` to all required field labels |
| A11Y-021 | `sample-app/book.html` | Added `aria-label="Close dialog"` to the modal close button |
| A11Y-022 | `sample-app/contact.html` | Added `<thead>` with `<th scope="col">Day</th>` and `<th scope="col">Hours</th>` to the opening hours table |
| A11Y-023 | `sample-app/contact.html` | Added `role="img"`, `aria-labelledby="map-title"`, and `<title id="map-title">` child to the SVG map |
| A11Y-024 | `sample-app/contact.html` | Removed `text-decoration:none` from the phone number tel link |
| A11Y-025 | `sample-app/contact.html`, `app.js` | Added `aria-expanded="false"` to all four FAQ toggle buttons; JS now toggles it on click |
| A11Y-026 | `sample-app/contact.html` | Added `id="faq-1"` through `id="faq-4"` to FAQ body panels; added matching `aria-controls` to each button |
| A11Y-027 | `sample-app/styles.css` | Added `padding: 7px` and `background-clip: content-box` to `.hero-dot` for 24×24 px touch target |
| A11Y-028 | `sample-app/index.html`, `book.html`, `contact.html` | Set unique `<title>` on each page: "Home —", "Book an Event —", "Contact & Visit Us —" (one-line change each) |
| A11Y-029 | *(not fixed)* | Low severity; converting cards to `<ul>/<li>` requires multi-line structural change — left Open |

---

## Top 5 Fixes — Before / After

### 1. A11Y-001 — Focus indicators globally suppressed (`styles.css`)

**Before**
```css
* {
  outline: none;
}
```

**After**
```css
*:focus-visible {
  outline: 3px solid #005fcc;
  outline-offset: 2px;
}
```

---

### 2. A11Y-012 — Modal has no focus management or keyboard trap (`app.js`)

**Before**
```js
function showConfirmationModal() {
  var backdrop = document.getElementById('confirmation-modal');
  if (!backdrop) return;
  backdrop.classList.add('open');

  document.getElementById('modal-close-btn').addEventListener('click', function () {
    backdrop.classList.remove('open');
  });
}
```

**After**
```js
function showConfirmationModal() {
  var backdrop = document.getElementById('confirmation-modal');
  if (!backdrop) return;

  var trigger = document.activeElement;
  backdrop.classList.add('open');

  var closeBtn = document.getElementById('modal-close-btn');
  if (closeBtn) { closeBtn.focus(); }

  function trapFocus(e) {
    var focusable = Array.prototype.slice.call(
      backdrop.querySelectorAll('button, [href], input, [tabindex]:not([tabindex="-1"])')
    ).filter(function (el) { return !el.disabled; });
    if (!focusable.length) return;
    var first = focusable[0], last = focusable[focusable.length - 1];
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    if (e.key === 'Escape') { closeModal(); }
  }

  function closeModal() {
    backdrop.classList.remove('open');
    backdrop.removeEventListener('keydown', trapFocus);
    if (trigger) { trigger.focus(); }
  }

  backdrop.addEventListener('keydown', trapFocus);

  if (closeBtn) {
    var newClose = closeBtn.cloneNode(true);
    closeBtn.parentNode.replaceChild(newClose, closeBtn);
    newClose.addEventListener('click', closeModal);
  }
}
```

---

### 3. A11Y-004 — Hero carousel dots inaccessible (`index.html` + `app.js`)

**Before** (`index.html`)
```html
<div class="hero-dots">
  <span class="hero-dot active"></span>
  <span class="hero-dot"></span>
  <span class="hero-dot"></span>
</div>
```

**After** (`index.html`)
```html
<div class="hero-dots" role="group" aria-label="Slide controls">
  <button class="hero-dot active" aria-label="Go to slide 1" aria-current="true"></button>
  <button class="hero-dot" aria-label="Go to slide 2"></button>
  <button class="hero-dot" aria-label="Go to slide 3"></button>
</div>
```

**After** (`app.js` — inside `show()`)
```js
dots.forEach(function (d, i) {
  d.classList.toggle('active', i === current);
  d.setAttribute('aria-current', i === current ? 'true' : 'false');
});
slides.forEach(function (s, i) {
  s.setAttribute('aria-hidden', i !== current ? 'true' : 'false');
});
```

---

### 4. A11Y-009/010 — Form errors conveyed by colour only, not linked to fields (`app.js`)

**Before**
```js
form.querySelectorAll('[required]').forEach(function (field) {
  field.classList.remove('error');
  if (!field.value.trim()) {
    field.classList.add('error');
    valid = false;
  }
});
```

**After**
```js
// Clear previous errors first
form.querySelectorAll('.field-error').forEach(function (el) { el.remove(); });
form.querySelectorAll('[required]').forEach(function (field) {
  field.classList.remove('error');
  field.removeAttribute('aria-describedby');
});

form.querySelectorAll('[required]').forEach(function (field) {
  if (!field.value.trim()) {
    field.classList.add('error');
    var errId = field.id + '-error';
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

### 5. A11Y-013/011 — Confirmation modal not announced, unnamed (`book.html`)

**Before**
```html
<div id="confirmation-modal" class="modal-backdrop" role="dialog">
  <div class="modal">
    <button id="modal-close-btn" class="modal-close">&#x2715;</button>
    <h2>Booking Confirmed!</h2>
    <p>Thank you for booking. You will receive a confirmation by email.</p>
  </div>
</div>
```

**After**
```html
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

*Generated after T5 remediation pass.*
