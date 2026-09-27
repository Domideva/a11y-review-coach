# Severity Guide

Use this guide to assign every finding exactly one severity level and one or more affected-user groups.

---

## Severity Levels

### High

**Definition:** The issue blocks a user from completing a key task — for example, they cannot submit the booking form using a keyboard, cannot activate the main navigation with a screen reader, or cannot read essential content because contrast is critically low.

**Characteristics:**
- No accessible workaround exists (the feature is simply unusable for the affected group).
- The affected task is on the user's critical path (checkout, registration, contact, core navigation).
- Failure breaches a WCAG Level A or Level AA criterion whose absence renders the feature non-functional for the affected group.

**Examples:**
- Form with no labels — screen reader user cannot identify fields and cannot submit.
- Keyboard focus trapped inside a widget with no escape — keyboard-only user cannot leave.
- Submit button implemented as a `<div>` with only a click handler — keyboard-only user cannot activate it.
- Page language not set and entire page is unreadable aloud because the screen reader uses the wrong voice.

---

### Medium

**Definition:** The issue causes serious difficulty for the affected group, but a workaround exists. The user can complete the task but only with significant extra effort, frustration, or by using an alternative route.

**Characteristics:**
- A cumbersome workaround is available (e.g. user can tab past the problem area, or can zoom in despite poor contrast).
- The issue is on a common path but does not completely block task completion.
- Failure breaches a WCAG Level A or Level AA criterion but the feature remains partially operable.

**Examples:**
- Low-contrast text (ratio 3.5:1 against a 4.5:1 requirement) — low-vision user struggles but can read with effort.
- Missing focus indicator — keyboard user can still tab through the page but cannot tell where focus is.
- Error message not linked to input via `aria-describedby` — screen reader user hears the error but must navigate to find which field it applies to.
- Reflow failure at 320px — mobile/zoom user must scroll horizontally but content is still reachable.

---

### Low

**Definition:** The issue is a minor inconvenience or a best-practice deviation. The affected group experiences no meaningful barrier to completing their task.

**Characteristics:**
- Has no material impact on task completion.
- Represents a code quality or best-practice gap rather than a functional barrier.
- May fail a WCAG technique but not a normative Success Criterion, or fails a criterion whose practical impact in this context is negligible.

**Examples:**
- Decorative image has no `alt=""` (uses `alt` absent rather than empty string) — screen reader announces the filename, which is mildly confusing but not blocking.
- Positive `tabindex` values are present but happen to produce a logical order — technically incorrect but no real disruption.
- `<b>` or `<i>` used instead of `<strong>` or `<em>` — semantically imprecise but no functional impact.
- Missing `autocomplete` on a non-critical field — convenience loss only.

---

## Affected User Groups

Use only these group names in the `affects` field of every finding. You may list multiple groups.

| Group name | Who they are |
|---|---|
| **screen reader users** | Blind or low-vision users who navigate with a screen reader (NVDA, JAWS, VoiceOver, TalkBack). They rely on semantic HTML, accessible names, and live regions. |
| **keyboard-only users** | Users who cannot use a pointer device and navigate entirely via keyboard (Tab, Enter, Space, arrow keys). They need focusable elements, visible focus indicators, and no keyboard traps. |
| **low-vision users** | Users with reduced visual acuity who zoom the browser (up to 400%), increase font sizes, or use OS high-contrast modes. They need sufficient contrast, reflow support, and scalable text. |
| **color-blind users** | Users with any form of colour vision deficiency (deuteranopia, protanopia, tritanopia, achromatopsia). They need information conveyed by means other than colour alone. |
| **users with cognitive disabilities** | Users who benefit from clear structure, consistent navigation, plain language, error prevention, and adequate time to complete tasks. |
| **mobile and zoom users** | Users on small screens or who zoom to 200–400%. They need responsive layouts, adequate touch target sizes, and no orientation lock. |

---

## Mapping WCAG Level to Severity

WCAG conformance level is an input to severity, but it is **not** the only factor. Apply judgment:

| WCAG Level | Typical severity | Override condition |
|---|---|---|
| A — issue completely blocks an interactive control | **High** | — |
| A — issue causes difficulty but workaround exists | **Medium** | — |
| AA — issue blocks task completion | **High** | Upgrade from AA to High when on a critical path |
| AA — issue causes difficulty | **Medium** | — |
| AA — cosmetic / best-practice only | **Low** | — |
| AAA (informative only) | **Low** | Only flag if it was explicitly requested |

Always state which WCAG Success Criterion is failed. If no normative criterion is failed, classify the finding as **Low** and note it as a best-practice recommendation.
