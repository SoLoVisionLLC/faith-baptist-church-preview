# Faith Baptist Church — Static Site Variants

Static noindex site variants built from the verified Quill five-regime brief:

- `variants/a` — Plain Welcome
- `variants/b` — Sunday Starts Here (Taste Skill 4/2/4 visitor planner)
- `variants/c` — Rooted & Rising
- `variants/d` — Accessible & Ethical (purple/gold, accessibility-first)
- `variants/e` — Impeccable 4.1.1 Persuade, Service-Time Compass

Routes per variant: `/`, `/visit`, `/beliefs`, `/ministries`, `/events`, `/contact`

Rebuild: `python3 build.py` (writes HTML from shared content + per-variant CSS).
Verify locally: `python3 verify.py` (checks all 30 pages, confirmed identity/contact details, noindex, internal links, copied assets, and pairwise variant uniqueness).
Deploy: serve each `variants/<x>` directory as a static site root (Dockerfile at repo root uses nginx:alpine; Coolify apps bind `base_directory=/variants/<x>`).
All pages carry `<meta name="robots" content="noindex, nofollow">`.

## Preview dock and palette contract

Every generated page includes the shared comparison dock from `preview_dock.py`. Design links use the current route (`/`, `/visit/`, `/beliefs/`, `/ministries/`, `/events/`, or `/contact/`) on each deployed sibling domain; the active design link has `aria-current="page"` and an `is-active` class.

The v7 internal preview pill is 34px high with 28px controls, 12px icons, an 8px group gap, a 16px divider, dark charcoal (`#252525`) chrome, and brand red (`#BC2026`) active chips. This compact sizing applies only to the comparison tool; client-facing 44px touch targets remain unchanged. The pill stays centered above the bottom safe area, scrolls horizontally on narrow screens, retains visible keyboard focus, and honors reduced motion. Page clearance is 64px plus the bottom safe area. All generated stylesheets use `ASSET_VERSION = "20260907-dock-v7-pill-slim"`; `verify.py` checks the geometry and behavior contracts across all 30 pages.

The two palette buttons, `Original` and `Logo`, use `aria-pressed="true|false"` to expose the selected palette. They store either `logo` or `original` in `localStorage` under the key `faith-baptist-palette` on the current preview origin. On initial load, only the exact value `logo` enables the Faith Baptist logo palette; every other value (including missing or invalid data) keeps the variant's original palette. Run `node tests/preview_dock.test.js` to check palette persistence and toggling.

## QA status after the identity correction

The files in `qa/screenshots/`, the live resource URLs in `qa/capture-metadata.json`, and the historical checks in `qa-live.json` predate this local identity correction. They are preserved as historical artifacts and are not evidence of a corrected live deployment. DEV must deploy and capture fresh evidence after inspecting this isolated diff. No live resources were renamed or contacted during this correction.

## Media manifest (local originals bundled into every build)

| File | Role | Source |
|---|---|---|
| assets/front.png | Exterior portrait (steeple/cross) | Client asset archive front.png — Appwrite f_03bb9f01ae214a5fab9b14226879ee59, HTTP 200 verified 2026-08-26 |
| assets/church1.jpg | Exterior landscape | same dir church1.jpg — Appwrite f_a1df2d0ef4c3455cb97d6c24734c16bf, HTTP 200 2026-08-26 |
| assets/church2.jpg | Sanctuary close | same dir church2.jpg — Appwrite f_01e265a73d32472384612eda393c8ebb, HTTP 200 2026-08-26 |
| assets/church3.jpg | Sanctuary wide | same dir church3.jpg — Appwrite f_a357ae8b004b4d0f816a9037f18bffae, HTTP 200 2026-08-26 |

Grace reference screenshots in the source directory are inspiration only and are NOT included in any build.
