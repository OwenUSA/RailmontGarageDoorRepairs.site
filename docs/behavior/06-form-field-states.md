# 06 — Form field focus, error and success states

**Owner:** the `/contact` route agent for `callback-form`; the lead for the copies embedded
in `hero` (`/`) and `services-banner` (`/services`). **Class: ADAPTED.**

## What we are replacing

Formidable Forms + Formidable Pro with Google reCAPTCHA, 17 to 44 inputs depending on the
page, plus an Akismet timestamp script whose text is literally part of the reference band's
`textContent`. We ship none of it: no third-party form backend (D-03), no captcha, no
tracker (D-15).

**Five fields, per D-05:** name, phone, service needed (select), preferred callback window,
message. **No `<input type="email">` and no field that accepts an address** (D-03 — this is
absolute and is swept for before every report). No backend: client-side validation only, and
the component carries `// STUB: no submission target` as its first line.

## Mechanism

- A real `<form>` with a real `<button type="submit">`. Not a `<div>` with a click handler:
  `Enter` in a text input must submit, and it only does inside a form.
- Every field has a `<label for>`. **Not `placeholder` as the label** — a placeholder
  disappears the moment typing starts, fails contrast in most implementations, and is not
  reliably announced. Placeholders are used only for format hints, or not at all.
- **Validation fires on `blur`, not on every keystroke**, and once a field has been marked
  invalid it re-validates on `input` so the error clears as soon as the user fixes it.
  Validating on the first keystroke tells someone their phone number is wrong when they have
  typed one digit.
- Errors are rendered in a `<p id="field-error">` associated with
  `aria-describedby="field-error"` and `aria-invalid="true"` on the control. Not a `title`,
  not a tooltip, not colour alone.
- The submit handler calls `event.preventDefault()`, `console.warn`s the stub notice, and
  swaps the form for a **"we'll call you back"** panel. Nothing is transmitted anywhere and
  the privacy policy says exactly that.
- Phone validation is a **permissive digit count**, not a strict pattern and definitely not
  `libphonenumber` (one country, five fields — it is on the banned list with that reason).
  Strip non-digits, require 10 or 11. A form that rejects `(803) 555-0164` because of the
  parentheses loses the customer, not the malformed input.
- Focus styling is `:focus-visible`, with the ring drawn as `outline` + `outline-offset` so
  it is never clipped by the field's own border radius.

## Ratio, and why

- Focus ring appears in **0 ms** — no transition on the outline. A focus indicator that
  fades in is a focus indicator that is absent for the first frames of a keyboard user's
  navigation, and keyboard navigation is fast.
- Border colour on focus transitions in **120 ms**. Decorative, so it may animate; the ring
  may not.
- Error message reveal **150 ms** opacity plus a **4px** rise. Short and small: an error is
  information the user needs immediately, not a moment of drama.
- Success panel replaces the form with a **200 ms** cross-fade. Slower than the error because
  it is a terminal state, and the extra 50 ms reads as completion rather than as a glitch.
- Ring thickness **2px** with **2px** offset. 1px rings disappear against a busy field
  border; anything above 3px starts overlapping adjacent fields in the 390 stack.

## Failure mode

1. **Focus ring invisible against the field.** The focus colour is semantic and **exempt from
   palette rotation** (A-7), so it does not move when the seed does — but it must still be
   checked at 3:1 against *both* the input's background and the band's background, because
   a ring that clears the field and not the band is only half visible. `contrast.mjs` covers
   this and it is BLOCKING (A-13).
2. **Error state signalled by colour alone.** Every error carries text; the red border is an
   accompaniment. WCAG 1.4.1.
3. **Success panel with no focus management.** Replacing a form with a confirmation and
   leaving focus on the removed submit button drops focus to `<body>` and a screen reader
   user hears nothing. Focus moves to the confirmation panel, which has `tabindex="-1"`.
4. **A red error colour that reads as the brand.** The semantic error and success hues stay
   conventional and do not rotate with the seed. A randomly green error state is a bug, not
   a palette.
5. **Autofill restyling the field out of contrast.** Chrome's `:-webkit-autofill` paints its
   own background. The token background is re-asserted for that pseudo-class.

## Trigger

- `blur` on a field → validate that field.
- `input` on a field already marked invalid → re-validate, clear the error when it passes.
- `submit` → validate all, focus the **first** invalid field and announce the summary; or, if
  clean, show the confirmation panel.
- **Client-side route change:** the form is a client component with local state. Navigating
  away from `/contact` unmounts it and everything is discarded, which is correct — nothing
  typed here should survive a navigation, and the privacy policy says the details live only
  until the tab is closed or refreshed. The `hero` form on `/` and the `services-banner` form
  on `/services` are separate instances and share no state.

## Accessibility

- Labels, not placeholders. `aria-invalid` and `aria-describedby` on every control that can
  fail.
- The error summary on submit is in an `aria-live="polite"` region; individual field errors
  are not live regions, or the user hears every one of them on every blur.
- The confirmation panel is `role="status"` so it is announced without stealing focus
  abruptly, **and** receives focus explicitly.
- The select is a native `<select>`. Its options are the eight symptom labels from
  `content/copy.ts`, so what a screen reader reads is what a sighted user sees.
- Every control is at least 44px tall at 390; the submit button is full-width there.
- `prefers-reduced-motion: reduce` → error and success transitions drop to `0.01ms`. The
  focus ring never animated, so it is unaffected.

## Acceptance

1. `rg` for `type="email"`, `mailto:` and any `@`-bearing string in the form returns nothing.
2. Every field is labelled; no field relies on a placeholder for its name.
3. Submitting an empty form focuses the first invalid field and announces a summary.
4. Submitting a valid form shows the confirmation, moves focus into it, and logs the stub
   warning. Nothing is transmitted.
5. `contrast.mjs` reports the focus ring at 3:1 against both the field and the band, on all
   three breakpoints. **0 FAIL.**
6. `(803) 555-0164` typed with parentheses and spaces validates.
