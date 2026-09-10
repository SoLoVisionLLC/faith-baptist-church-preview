# Faith Baptist Church — Revision 3

Five independent static designs, with six routes each: `/`, `/visit/`, `/beliefs/`, `/ministries/`, `/events/`, and `/contact/`.

| Variant | Design contract |
|---|---|
| A | Hand-authored rectangular system-font baseline; no motion |
| B | Taste 4/2/4; light and navy dark preference modes; 180ms transitions |
| C — lead | Organic Biomorphic; Fraunces/Karla, slow morph, accessible photo carousel |
| D | Accessible & Ethical; Inter/Playfair Display, JetBrains Mono schedule, semantic tables |
| E | Impeccable Persuade; sharp Service-Time Compass, condensed display/Source Sans 3 |

All designs use Old Glory Red `#B31942`, Old Glory Blue `#0A3161`, white, and opacity variations. Every page remains `noindex,nofollow`.

Build and run the canonical offline verification:

```sh
python3 build.py && python3 verify.py && git diff --check
```

Edit `build.py`, `variant_e.py`, the five `styles-*.css` sources, `variant-c.js`, or `compass.js`; `build.py` regenerates the tracked `variants/` output. Serve each `variants/<letter>` as its own static root. Scripts progressively enhance the native gallery and gathering controls; complete content remains readable without JavaScript.

The verifier checks all 30 routes, source facts, exact raster alt text and bytes, links, indexing, palette, generated/source parity, and distinct structural contracts. It does **not** claim browser layout, assistive-technology, loaded-font, or live deployment validation.

The approved implementation authority is Quill's `faith-baptist-revision-3-design-brief.md`. [The local implementation receipt](docs/revision-3-implementation.md) records scope, verification and environmental limits. [DESIGN.md](DESIGN.md) records the current E direction and finish review.

## Client media

The four original client rasters are bundled unchanged: `front.png` (steeple exterior), `church1.jpg` (building and lawn), `church2.jpg` (sanctuary/pulpit), and `church3.jpg` (sanctuary aisle). No crest raster exists in the accepted source bundle; no logo has been invented. Exact source URLs, dimensions, alt text and SHA256 values are retained in [the media manifest](qa/revision-3-media.json).

## Evidence scope

This change is local and uncommitted. Existing `qa/screenshots/`, variant deployment receipts, `qa-live.json`, and external approval-page metadata describe older artifacts. They are historical evidence, not validation of this redesign. Deployment and external CRM/QA edits are outside this task.
