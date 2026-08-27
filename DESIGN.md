---
version: alpha
name: Faith Baptist Church — Variant E
description: Impeccable 4.1.1 Persuade world organized around a Service-Time Compass.
colors:
  primary: "#10283F"
  navy: "#10283F"
  chapel-white: "#F7F8F5"
  brick: "#963C32"
  cool-mist: "#DCE5EA"
  ink: "#14222D"
typography:
  display:
    fontFamily: Liberation Sans Narrow
    fontSize: 3rem
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.035em"
  body:
    fontFamily: Source Sans 3
    fontSize: 1.0625rem
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0em
rounded:
  sharp: 0px
  control: 2px
  maximum: 4px
spacing:
  control-y: 12px
  control-x: 19px
  mobile-gutter: 20px
  desktop-gutter: 6vw
components:
  primary-action:
    backgroundColor: "{colors.brick}"
    textColor: "#FFFFFF"
    rounded: "{rounded.control}"
    padding: 12px
  primary-action-focus:
    backgroundColor: "{colors.brick}"
    textColor: "#FFFFFF"
    rounded: "{rounded.control}"
    padding: 12px
  navy-field:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.chapel-white}"
    rounded: "{rounded.sharp}"
    padding: 20px
  reading-field:
    backgroundColor: "{colors.chapel-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sharp}"
    padding: 20px
  schedule-region:
    backgroundColor: "{colors.cool-mist}"
    textColor: "{colors.navy}"
    rounded: "{rounded.sharp}"
    padding: 20px
  schedule-number:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.chapel-white}"
    typography: "{typography.display}"
    rounded: "{rounded.sharp}"
    size: 88px
---

## Overview

This document is the durable receipt for the Variant E visual world in `variants/e/`. It records both the brief-pinned target and the artifact actually reviewed. The governing design regime is **Impeccable 4.1.1 only**, in **Persuade** mode, with the source-grounded **Service-Time Compass** direction. No Taste, Frontend Design Pro Demo, UI/UX Pro Max, or other generator was used.

The visual thesis is a luminous wayfinding system in which recurring service times are the navigational spine. Real, hard-edged church photography and large sans-serif type establish identity without inventing a logo. The primary use scene is a first-time visitor or family checking details on a phone in daylight before driving to a rural church.

### Documentation status and finish-review disposition

This file documents the corrected generated output after the bounded finish-review remediation. The earlier fresh finish review recorded the exact disposition **`fix`**; that historical receipt remains intact in `qa/variant-e/detector-finish-review.log.md`. All five material findings from that review are now implemented in source and generated Variant E output. Per the remediation boundary, the Impeccable detector was not run a second time, no replacement finish review was created, and no deployment was performed. The current artifact is ready for DEV to inspect as a working-tree diff.

Authoritative local evidence:

- Product truth: `PRODUCT.md`
- Pilot brief: `docs/faith-baptist-five-regime-pilot-brief.md`
- Direction contract: `qa/variant-e/direction-contract.md`
- Impeccable context receipt: `qa/variant-e/impeccable-context.txt`
- Detector and finish review: `qa/variant-e/detector-finish-review.log.md`
- Machine-readable build receipt and raster provenance: `variant-e-receipt.json`
- Generated artifact: `variants/e/`

### Impeccable 4.1.1 execution receipt

- Skill path: `/home/solo/.hermes/profiles/vector/skills/impeccable`
- Version: **4.1.1**
- Mode: **Persuade**
- Direction: **Service-Time Compass**, pinned by the verified brief; no random direction roll was required.
- Context command: `node /home/solo/.hermes/profiles/vector/skills/impeccable/scripts/context.mjs --target build.py`
- Context runs: exactly one; exit code 0.
- Context initially reported `NO_PRODUCT_MD`; `PRODUCT.md` was then created from verified fixed facts without rerunning context.
- The context output required a single post-build mechanical detector run because no automatic design hook was active.

### Embedded direction contract

The following exact comment is the first child of `<body>` on all six generated routes and must survive production builds:

```html
<!--
THESIS: Service times are the interface. Refuse the conventional church hero followed by a generic card grid.
OWN-WORLD: Deep navy fields, cold white reading surfaces, brick action color, compressed sans display, sharp image plates, and a numbered weekly compass.
STORY: A visitor sees who Faith Baptist Church is, understands the complete weekly rhythm, confirms children and nursery options, and chooses Plan Your Visit.
FIRST VIEWPORT: church1.jpg occupies the left 58 percent. The right 42 percent is navy with the name, exact identity line, Plan Your Visit action, and a vertical Sunday/Wednesday time rail. The CTA is visible at 390x844 without scrolling.
FORM: Pinned Impeccable Persuade control. Build the brief's committed world, not a softened generic church layout.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
-->
```

## Colors

The strategy is **Committed**, not theme-switching. Light mode is the primary reading scene; navy is a deliberate field rather than a dark-mode default.

- **Deep navy `#10283F`:** owns roughly half the surface; header, first-view content plate, ministry field, footer, dividers, and schedule numerals.
- **Chapel white `#F7F8F5`:** reading fields and navy-field text.
- **Brick `#963C32`:** the only saturated action color; primary CTA, line progression, and limited emphasis.
- **Cool mist `#DCE5EA`:** schedule-region support and image loading ground.
- **Ink `#14222D`:** body text on chapel-white fields.
- No gradient, glow, glass, mixed theme, cream/terracotta default world, or second saturated action color belongs in Variant E.

Real photography, flat navy fields, sharp dividers, chapel white, mist, and brick remain faithful. Browser selection now uses brick with chapel-white text; standards-based and WebKit scrollbar treatments use a navy thumb, mist track, and brick hover state. These browser surfaces therefore remain inside the committed palette.

## Typography

The direction permits **Archivo Black or a genuinely comparable obtainable condensed sans**. The shipped comparable face is **Liberation Sans Narrow Bold**, bundled locally and loaded through `@font-face`; display rendering no longer depends on a system-font fallback. Body copy uses **Source Sans 3** with its existing system fallback stack. Display type is compressed, large, blunt, and paired with oversized schedule numerals.

- Display: `"Liberation Sans Narrow", "Arial Narrow", sans-serif`, weight 700.
- Source asset: `assets/fonts/LiberationSansNarrow-Bold.ttf`; built asset: `variants/e/assets/fonts/LiberationSansNarrow-Bold.ttf`.
- Upstream: `https://github.com/liberationfonts/liberation-sans-narrow`; bundled license: `variants/e/assets/fonts/LiberationSansNarrow-LICENSE.txt`.
- Font SHA256: `4cd16b98cea43a9ce4471df068634fce71ab279dfc9b303b6b188bd96b35226a`.
- Body: `"Source Sans 3", "Segoe UI", sans-serif`
- Body baseline: 17px desktop, 16px below 768px, line-height 1.55.
- Display line-height: 0.95; letter-spacing: -0.035em.
- `h1`: `clamp(3rem, 7vw, 7.4rem)` globally; first-view override `clamp(3rem, 6vw, 6.5rem)`.
- `h2`: `clamp(2.2rem, 5vw, 5.4rem)`.

The refused tracked uppercase `FOSTORIA, OHIO` eyebrow is absent from the first viewport. The church name now opens the content hierarchy directly.

## Layout

### Geometry and rhythm

- Sharp 0–4px geometry; controls currently use a 2px radius.
- Thick 2px structural dividers.
- Architectural raster crops aligned to the building and sanctuary.
- One repeated numbered compass line connects weekly service points to routes.
- No generic card grid, ornamental blob, pill system, or detached stock navbar.
- Header is integrated into the navy first-view world: 68px desktop and 64px mobile.

### Home composition contract

1. A narrow header integrated with the first viewport.
2. A 58/42 first viewport: `church1.jpg` at left and a navy identity/action/schedule field at right.
3. A Service-Time Compass running Sunday 9:00 AM, Sunday 10:00 AM, Sunday 6:00 PM, and Wednesday 7:00 PM; children and nursery details attach to 10:00 AM.
4. Real Place: `front.png` and `church3.jpg` in an architectural composition with exact address and phone.
5. Conviction Field: `church2.jpg` and only the three confirmed beliefs.
6. Ministry Rhythm: staggered, sharp-edged bands rather than cards.
7. A brick Plan Your Visit close with address, phone, directions, and one primary action.

The output retains the 58/42 photographic split, exact identity line, immediate CTA, all four schedule points, sharp geometry, and brick-only action color. On desktop, the first-view schedule rail is a genuine one-column vertical sequence with four divided rows and a brick progression edge. Below 768px it adapts to a compact two-column, two-row schedule block so every label remains readable and visible.

### Inner-route composition

Each route carries a compact weekly compass without repeating the complete home composition.

- `/visit/` expands practical schedule, children/nursery, location, directions, call action, and `front.png`.
- `/beliefs/` gives `church2.jpg` and the three confirmed convictions equal authority; it does not expand doctrine.
- `/ministries/` maps each confirmed gathering to the weekly line and uses `church3.jpg`.
- `/events/` is the recurring weekly schedule and states that current announcements will appear when supplied; it does not invent event cards.
- `/contact/` prioritizes call and map destination, uses `front.png`, and has no fake form.

### Mobile behavior

At widths below 768px:

- The first viewport becomes image above navy content.
- The image is capped at 34vh (contract target: near 36vh).
- The navy content plate fills the remainder of the viewport.
- Plan Your Visit and all four schedule points must remain visible at 390×844 without scrolling.
- Major multi-column regions collapse to one column.
- Inner compasses become semantic stacked lists.
- Footer navigation becomes a two-column list.
- There must be no horizontal overflow, clipped display type, full-screen photo wall, hidden CTA, or body text below 16px.
- 430×932 must preserve the balance among first image, CTA, and schedule.

The four mobile schedule labels render at `1rem` (16px) in a two-by-two adaptation. All four labels, the exact identity line, and the Plan Your Visit CTA remain inside the 390×844 first viewport.

## Elevation & Depth

Variant E is intentionally flat. Hierarchy comes from field color, scale, real photography, hard edges, and dividers—not shadows, floating glass, or ornamental depth. Images reserve intrinsic dimensions, and surfaces should read as architectural plates.

## Shapes

- Use square plates and 0–4px corners.
- Buttons are rectangular and currently use 2px corners.
- Schedule points are square navy number blocks on a brick progression line.
- Image crops align to architecture; they are not soft organic masks.
- Do not add pills, circles as decoration, blobs, bento tiles, or rounded-card accent borders.

## Components

### Integrated header and navigation

The desktop header exposes all six routes, with a brick active state. Mobile uses native `<details>`/`<summary>` disclosure and a full-width menu. The text-only wordmark is **Faith Baptist Church**; no logo may be fabricated.

### First-view identity panel

The panel contains the church name, exact identity line, primary Plan Your Visit action, and all four weekly service points. It shares the navy world with the header rather than behaving as a detached hero card.

### Service-Time Compass

The main compass is an ordered list with four numbered points, oversized time type, a brick progression line, and children/nursery facts nested under 10:00 AM. Compact compasses appear on every inner route. The line animation is the world’s single purposeful motion device.

### Actions

- Primary: **Plan Your Visit**; brick background, white text, 2px brick border, 2px radius, and at least 48px high.
- Secondary schedule action where present: **View Service Times**.
- Phone: **Call the Church**, using the verified `tel:` destination.
- Directions: Google Maps directions to the exact address.
- Focus: 4px brick outline with 4px offset.
- Minimum touch target: 44px.

### Motion

The one authored motion is a 1.2-second schedule-line draw communicating progression through the week. There are no scattered reveals. Under `prefers-reduced-motion: reduce`, smooth scrolling is disabled and animation/transition duration is effectively removed. `prefers-reduced-transparency: reduce` preserves an opaque navy header. Static content retains the complete schedule and meaning.

### Client truth and public-copy hard gate

Use these facts exactly wherever their information appears:

- Name: **Faith Baptist Church**.
- Identity: **Bible believing. Gospel driven. Growing together in God's Word.**
- Address: **11275 W. Twp. Rd. 116, Fostoria, OH 44830**.
- Phone: **419-348-2171**; verified `tel:` target is generated from this number.
- Sunday School: 9:00 AM for adults and teens.
- Main Service: Sunday at 10:00 AM.
- Young children's Sunday School: Sunday at 10:00 AM.
- Nursery: available for tots during Sunday programming.
- Sunday Evening Service: 6:00 PM.
- Wednesday Prayer and Bible Study: 7:00 PM.
- Confirmed belief language is limited to Bible believing, gospel driven, and teaching from the KJV Bible.

The former Dillon Road Baptist Church identity is provenance only and must never appear publicly. Do not invent a pastor, staff, dates, attendance, testimonials, events, flyers, bulletins, email/form endpoints, giving, livestream, sermon archive, parking promise, accessibility claim, dress expectation, music style, or expanded doctrine. Public copy must not discuss the pilot, build process, design system, revisions, sources, SoLoVision, or templates.

### Route and indexing contract

Exactly six static routes ship, each with a unique title, canonical internal navigation, one `h1`, meaningful factual content, and `<meta name="robots" content="noindex, nofollow">`:

1. `/`
2. `/visit/`
3. `/beliefs/`
4. `/ministries/`
5. `/events/`
6. `/contact/`

Hosting should also send `X-Robots-Tag: noindex,nofollow` when supported.

### Raster provenance

All four original rasters are bundled locally and used meaningfully; Grace reference screenshots do not ship.

| File | Original | Bundled path | Meaningful placement | SHA256 |
|---|---:|---|---|---|
| `front.png` | 277×600 PNG | `variants/e/assets/front.png` | Home Real Place; Visit and Contact exterior portrait | `7b0bce3499ed9df95327af8a9693b70a2876a36be53810d91edf4685ffaa0f3f` |
| `church1.jpg` | 600×450 JPEG | `variants/e/assets/church1.jpg` | Home first-view 58% image plate | `9abdb0fd06c69aa12ef11f4954afb50131ad133c5a3314a675c1a136577977f6` |
| `church2.jpg` | 450×600 JPEG | `variants/e/assets/church2.jpg` | Home Conviction Field; Beliefs equal-authority plate | `6725c18ecea252cd3ad842fae16844a0c1ff1a8f2a4a2a011853bc0a8b68bb92` |
| `church3.jpg` | 450×600 JPEG | `variants/e/assets/church3.jpg` | Home Real Place; Ministries gathering image | `75c7128197dd074613eec92fe233e04dff3539c5394f56696b4196a969969b3c` |

Exact alt text and source URLs are normative in `variant-e-receipt.json`; generated images carry matching intrinsic `width` and `height` attributes.

### Accessibility and verification contract

- Semantic landmarks, one `h1` per route, logical heading order, skip link, keyboard navigation, visible focus, and 44px controls.
- Body copy at least 16px.
- Target contrast: 4.5:1 body text and 3:1 large text.
- Exact alt text and stable raster dimensions.
- No hover-only affordance.
- Honor reduced motion and reduced transparency.
- Validate desktop full-page at 1440×1000 (or documented equivalent), true mobile full-page at 390×844 DPR2 from `scrollY=0`, and secondary 430×932 DPR2 after fonts/images load.
- Verify internal links, telephone links, and exact-address directions.
- Record homepage HTML and primary asset SHA256 for five-way uniqueness comparison.

## Do's and Don'ts

### Do

- Keep service times as the interface and navigational spine.
- Preserve the 58/42 real-photo/navy first view and immediate Plan Your Visit action.
- Keep all four schedule points visible and legible in the first mobile viewport.
- Use only real client photography, the exact facts, and one gentle primary action.
- Keep the navy/white/mist world with brick as the sole saturated action color.
- Keep geometry sharp, dividers structural, and motion singular and meaningful.
- Preserve the embedded direction contract in every emitted route.
- Keep raster provenance and exact alt text auditable.

### Don't

- Do not alter the exactly-once detector receipt or present the historical `fix` disposition as a review of the corrected artifact.
- Do not regress the desktop schedule rail from its vertical sequence or the mobile rail from its readable two-by-two adaptation.
- Do not remove or hotlink the bundled condensed display font.
- Do not restore the tracked uppercase location eyebrow.
- Do not reduce the mobile schedule labels below the documented 16px size.
- Do not move selection or scrollbar surfaces outside the committed palette.
- Do not introduce another design regime, a generic church hero/card grid, invented facts, fake forms, or template artifacts.

### Detector findings and finish-review record

The detector ran exactly once after the completed six-route implementation:

- Command: `node /home/solo/.hermes/profiles/vector/skills/impeccable/scripts/detect.mjs --json variants/e`
- Exit code: 2.
- State: **DEGRADED** because `htmlparser2`, `css-select`, `css-tree`, and `domutils` were unavailable; regex fallback could not evaluate custom properties, selector matching, or computed contrast. Findings are an undercount, not a clean bill of health.
- Findings: two warning-level `border-accent-on-rounded` matches in `variants/e/styles.css`, on the header/mobile-menu and inner-intro `border-bottom` declarations.
- Finish-review interpretation: both matches were contextual false positives because they did not identify rounded accent containers; neither was material.

A fresh isolated finish reviewer, with no build-thread history, received the original request and fixed facts, generated site, authoritative desktop and 390×844 captures, `PRODUCT.md`, direction contract, detector output, and Impeccable 4.1.1 craft floor. It edited nothing and did not rerun the detector.

Historical exact disposition: **`fix`**.

The five findings are remediated in the current generated artifact:

1. The first-view rail is vertical on desktop and adapts to a legible two-by-two mobile schedule.
2. Liberation Sans Narrow Bold is bundled and loaded as the direction-approved comparable condensed display face.
3. The tracked uppercase `FOSTORIA, OHIO` eyebrow has been removed.
4. All four mobile schedule labels render at 16px and remain within the 390×844 first viewport.
5. Selection and scrollbar surfaces use only brick, chapel white, navy, and mist.

Preserved through remediation: the exact 58/42 real-photo/navy split, immediate identity and CTA, all four first-view schedule points, sharp geometry, singular line motion, and brick-only action color. The detector was not rerun, so its exactly-once receipt remains intact.

### Build, deployment, and final receipts

- Repository: `https://github.com/SoLoVisionLLC/faith-baptist-church-preview`
- Static source/build target: `variants/e/`
- Build command: `python3 build.py`
- Local verification: `python3 verify.py`
- Coolify project: **Faith Baptist Church**, project UUID `odmsojtf0huw323he24qtugc`.
- Target URL: `https://faithbaptist-e.sololink.cloud` or a verified clear equivalent.
- Variant E requires its own source/build target and Coolify environment/resource.
- No local-only work counts. A final deployment receipt must record branch, repo path, pushed commit SHA, environment UUID, resource UUID, deployment UUID, deployed SHA, live HTTPS URL, and all six route checks.
- Deployment identifiers and live URL are intentionally absent from this document until deployment actually occurs; inventing them would violate the product truth contract.
