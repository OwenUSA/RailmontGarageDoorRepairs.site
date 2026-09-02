# docs/known-divergence.md — permanent floors

Check this file before starting any fix. Nothing listed here is a fixable divergence and no
iteration is ever spent on one.

## Opened at Prompt 1

### 1. Colour divergence from the reference is INTENTIONAL and permanently excluded (A-8)

The palette is randomized at token-write time (Prompt 5, merged 5+9), so our resolved
colours will never match Premiere Roofing's. Colour-valued fields — resolved colour,
background-colour, border-colour, gradient stops, shadow colour — are stripped from the
structural comparator. Geometry and typography, and the non-colour parts of borders and
shadows (widths, offsets, blur, spread, radii), are all still measured.

**Excluded from every diff, every threshold, and every future iteration. Do not reopen.**

### 2. Advisory fields never fail a row (A-12)

`innerCount`, `innerRows`, `innerCols` and `position` are computed and printed as a trailing
`advisory:` note only. They compare our clean markup against a Bootstrap-5 column tree and
are unclosable by construction. Do not restructure markup to imitate the reference's
nesting.

### 3. NO FONT SUBSTITUTION FLOOR IS BOOKED ON THIS SITE

Stated positively, because the default assumption is wrong here.

The reference's only real faces are **Hind** (body) and **Teko** (display). Both are Google
Fonts under the **OFL**, both genuinely load (`document.fonts` reports them `loaded` at
multiple weights on all five pages), and both are available through `next/font/google`. We
use the **same families**, not substitutes. There is therefore **no text-metric delta to
excuse**, and D-11 does not apply.

`Montserrat`, `Bebas Neue`, `Nanum Pen`, `var(--font)` and the Bootstrap `--bs-*-font-family`
variables all appear in the reference CSS with **zero `@font-face` rules, zero loaded faces
and zero computed usages**. They are phantoms. **Booking a floor for any of them is
forbidden** — a sibling site booked one for what turned out to be its hosting control
panel's admin-bar font and permanently excused a heading that should have converged.

If a later prompt finds a heading that will not converge, the cause is not the font.

## Not yet opened

- **Palette seeds** (winning seed + all five candidate seeds) — recorded here by Prompt 5.
- **Placeholder-blocked sections** — recorded here by Prompt 2 / the build wave.
- **Structural residuals** — one fix attempt each (`ITERATION_CAP = 1`, A-2), then the
  residual and a hypothesis are written here.
