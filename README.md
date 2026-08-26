# Faith Chapel Church — Preview Site (Variants A/B/C)

Static noindex preview site, three design variants, per the Quill Design Brief 2026-08-26:

- `variants/a` — The Open Door (trust-first editorial)
- `variants/b` — Sunday Starts Here (conversion-first split hero)
- `variants/c` — Rooted & Rising (bold editorial)

Routes per variant: `/`, `/visit`, `/beliefs`, `/ministries`, `/events`, `/contact`

Rebuild: `python3 build.py` (writes HTML from shared content + per-variant CSS).
Deploy: serve each `variants/<x>` directory as a static site root (Dockerfile at repo root uses nginx:alpine; Coolify apps bind `base_directory=/variants/<x>`).
All pages carry `<meta name="robots" content="noindex, nofollow">`.

## Media manifest (local originals bundled into every build)

| File | Role | Source |
|---|---|---|
| assets/front.png | Exterior portrait (steeple/cross) | /home/solo/.hermes/profiles/vector/work/faith-chapel-assets/front.png — Appwrite f_03bb9f01ae214a5fab9b14226879ee59, HTTP 200 verified 2026-08-26 |
| assets/church1.jpg | Exterior landscape | same dir church1.jpg — Appwrite f_a1df2d0ef4c3455cb97d6c24734c16bf, HTTP 200 2026-08-26 |
| assets/church2.jpg | Sanctuary close | same dir church2.jpg — Appwrite f_01e265a73d32472384612eda393c8ebb, HTTP 200 2026-08-26 |
| assets/church3.jpg | Sanctuary wide | same dir church3.jpg — Appwrite f_a357ae8b004b4d0f816a9037f18bffae, HTTP 200 2026-08-26 |

Grace reference screenshots in the source directory are inspiration only and are NOT included in any build.
