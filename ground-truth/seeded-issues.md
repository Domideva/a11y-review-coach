# Ground Truth — Seeded Accessibility Issues

Authoritative answer key for blind evaluation. Do not modify until all reviews are complete.

| # | Page | Element / CSS selector | WCAG SC | Level | Severity |
|---|------|------------------------|---------|-------|----------|
| 1 | index.html | `<svg>` illustration (library skyline, inside `<div>` below hero) | 1.1.1 Non-text Content | A | High |
| 2 | book.html | `<input type="email" id="email">` — placeholder only, no `<label>` | 1.3.1 Info and Relationships / 3.3.2 Labels or Instructions | A | High |
| 3 | index.html | `<div id="newsletter-action">` — click-only, no `role`, no `tabindex`, no `keydown` | 2.1.1 Keyboard | A | High |
| 4 | styles.css | `* { outline: none; }` — removes all focus indicators site-wide | 2.4.7 Focus Visible | AA | High |
| 5 | styles.css | `.hero p { color: #a8a8b3; }` on `#0f3460` background (~2.8:1 contrast ratio) | 1.4.3 Contrast (Minimum) | AA | High |
| 6 | book.html + app.js | Form validation adds `.error` (red border only) — no error text, no `aria-live`, no `role="alert"` | 3.3.1 Error Identification / 4.1.3 Status Messages | A | High |
| 7 | index.html | `<h3 class="section-title">Upcoming Events</h3>` follows `<h1>` with no intervening `<h2>` | 1.3.1 Info and Relationships / 2.4.6 Headings and Labels | A | Medium |
| 8 | index.html | `<a href="book.html">Click here</a>` and `<a href="book.html">Read more</a>` | 2.4.4 Link Purpose (In Context) | A | Medium |
| 9 | book.html | `<html>` element has no `lang` attribute | 3.1.1 Language of Page | A | Medium |
| 10 | contact.html | `.hours-table` uses `<td>` for all cells — no `<th>` header cells and no `scope` | 1.3.1 Info and Relationships | A | Medium |
| 11 | book.html | `<button type="submit">` contains only an SVG with `aria-hidden="true"` — no visible text, no `aria-label` | 4.1.2 Name, Role, Value | A | High |
| 12 | contact.html | `.faq-toggle` buttons never set `aria-expanded` (state always unknown to AT) | 4.1.2 Name, Role, Value | A | Medium |
| 13 | index.html + app.js | Hero banner auto-rotates every 3 s — no pause, stop, or hide mechanism | 2.2.2 Pause, Stop, Hide | A | High |
| 14 | index.html, book.html, contact.html | `<meta name="viewport" content="…user-scalable=no, maximum-scale=1.0">` | 1.4.4 Resize Text | AA | High |
| 15 | index.html + styles.css | `.hero-dot` elements: `width:10px; height:10px` — tap target smaller than 24×24 px | 2.5.8 Target Size (Minimum) | AA | Medium |
| 16 | index.html | No skip-navigation link before the `<header>` | 2.4.1 Bypass Blocks | A | Medium |
| 17 | index.html, book.html, contact.html | All three pages share the same `<title>Riverside Community Library</title>` | 2.4.2 Page Titled | A | Medium |
| 18 | book.html + app.js | Confirmation modal: focus not moved inside on open, Escape does not close, focus not returned on close | 2.1.1 Keyboard / 2.4.3 Focus Order | A | High |
| 19 | contact.html | `<svg>` location map conveys building layout — no `role="img"`, no `<title>`, no `aria-label` | 1.1.1 Non-text Content | A | High |
| 20 | contact.html | `<a href="tel:…" style="color:#1a1a2e;text-decoration:none;">` — telephone link styled identically to surrounding plain text, no non-colour distinguisher | 1.4.1 Use of Color | A | Low |

---

## Notes

- Issues are distributed across all three pages: **index.html** (1, 3, 4, 5, 7, 8, 13, 14, 15, 16, 17), **book.html** (2, 4, 6, 9, 11, 14, 17, 18), **contact.html** (4, 10, 12, 14, 17, 19, 20).
- Issue #4 (`outline:none`) and #14 (viewport) appear in `styles.css` / all pages respectively and should be counted once per unique defect, not once per page.
- Severity assignments follow the `severity-guide.md` in `.bob/skills/a11y-review/`.
- WCAG level column reflects the strictest applicable success criterion for each issue.
