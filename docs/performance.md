# Performance pass — 2026-09-17

Preserves the existing design, photographs, bilingual copy, typefaces, font sizes,
weights, scene selection and 1.8-second casting sequence.

## Changes

- Responsive, content-hashed WebP assets for landscapes, photos, icons and casting
  cels. Native `srcset` chooses resolution; originals remain in `public/images`.
- The oak texture falls from 2,259,761 bytes to 33,270 bytes, plus a similarly small
  pre-rotated vertical tile. Frame rails no longer paint four 150vmax surfaces.
- Noto Serif SC remains the same pinned variable font, retaining its weight axis.
  Subsets contain site characters (117,372 bytes). 524 outline/advance-width checks
  at weights 400 and 500 matched the original font exactly. Libre Baskerville
  regular and italic, CSS sizes and weights are unchanged.
- Catch photographs are requested on hover/focus or opening a detail, rather than
  downloading all full-size hidden reverse faces on a desktop's first visit.
  The frame flips only after its preview image has loaded.
- Scroll geometry is cached on resize. Progress variables update only the layers
  that consume them, and unchanged values are skipped.
- Fish share one capped timer, scale each illustration once, and paint fewer
  strips. They pause outside the viewport, during scrolling or in hidden tabs.
  Casting remains active during scrolling. High-DPI srcset images are normalized
  before canvas cropping so browser density correction cannot hide a fish.
- Water highlights use a pre-rendered version of the same soft mask, avoiding
  full-screen SVG filter work on each pulse. Offscreen title animation pauses.
- Generated media goes through Vite asset imports and receives immutable hashed
  URLs. Production builds precompress CSS and JS.

## Validation

- Production build, TypeScript, changed-file lint and diff checks pass.
- All 11 existing locale/daylight tests pass; subset coverage is checked at build.
- Browser checks: 390px touch and 1440px desktop, no horizontal overflow or page
  errors; all five casting cels; nonempty/animating fish canvases; desktop flip,
  touch direct-open, detail images, Escape, language switching and simulator link.
- All four time-of-day scenes checked. Hero, about, collection and detail
  screenshots inspected. This is Chromium device emulation, not a physical iPhone.

Baseline on the live site: a fresh Chinese mobile visit requested 5.93 MB; a
desktop visit requested 10.29 MB. The mobile lab profile used 1.6 Mbps download,
80 ms added latency and 4x CPU slowdown. LCP varied from 17.4 to 19.7 seconds.
Final live measurements are recorded in the private project context after deploy.
These are lab results, not real-user percentile guarantees.

## Maintaining the assets

After changing original pictures, run `npm run assets:images` and commit generated
`assets/journal`, `content/responsive-images.ts` and `app/materials.css`. Vite emits
only imported files. Avoid committing screenshots, raw performance traces or
private project context to the website repository.

If new Chinese copy adds characters, install `fonttools[woff]==4.59.1` in a Python
environment and run `python scripts/prepare-fonts.py` from this directory. Commit
`app/fonts` and `app/site-fonts.css`. A normal Railway build needs no Python;
`scripts/check-fonts.mjs` rejects missing Chinese glyphs instead of silently
falling back to a different font.
