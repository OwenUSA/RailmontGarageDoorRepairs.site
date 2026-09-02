# assets/INVENTORY.md — asset slots, provenance, status (Prompt 2)

**Regenerate, never hand-edit the tables.** The two tables below are produced by
`node ../_shared/harness/src/write-inventory.mjs` from `.harness/inventory.json`. This
preamble is `assets/INVENTORY.head.md` and the narrative after the tally is
`assets/INVENTORY.tail.md`; those two are hand-written and are the only editable parts.

Pipeline, in order:

```bash
node ../_shared/harness/src/serve-reference.mjs      # verify "Premiere Roofing" in the banner
MSYS_NO_PATHCONV=1 node ../_shared/harness/src/assets.mjs        # -> .harness/assets/*.json
MSYS_NO_PATHCONV=1 node ../_shared/harness/src/inventory.mjs     # -> .harness/inventory.json + public/placeholders/
node scripts/placeholder-guard.mjs                               # repaint near-white placeholder FILES
node ../_shared/harness/src/write-inventory.mjs                  # -> this file
```

## Provenance policy — D-09 and D-11, applied

Two buckets only, and the split is decided by ownership, not by usefulness.

- **TAKE** — generic UI icons and open-licensed fonts whose licence verifies in one step.
  On this reference that is a very short list, enumerated in the TAKE section below,
  because the reference ships **no icon font at all**: every glyph is an inline SVG drawn
  in the theme. Our icons come from `lucide-react` (ISC), which we already have on the
  dependency allowlist.
- **REPLACE** — everything else. Their photographs, logo, wordmark, staff headshots,
  certification badges, award graphics, band backgrounds and video poster frames belong to
  Premiere Roofing and stay on their site. **Not one REPLACE asset is downloaded into this
  repo, not even temporarily.** What we record is geometry, aspect, `object-fit` and a
  dominant colour sampled from the Prompt 1 screenshots that are already on disk — enough
  for a generator to fill the slot, and nothing that is theirs.

`DELETED` in the second table is not a third provenance. It is a REPLACE-class slot whose
band `docs/sections.md` deletes, or a slot a `lucide-react` glyph satisfies with no file.

## Slot counting

WordPress srcset variants collapse: `foo-480x281.png`, `foo-980x574.png` and `foo.png` are
**one slot**, keyed on the base name. Dimensions recorded per breakpoint are **rendered**
boxes, not file sizes, and the `natural` figure carried in `.harness/inventory.json` is the
highest resolution the reference actually served across the three widths.

