# Revision 3 implementation receipt

Scope: the Quill-approved Revision 3 redesign across variants A–E and all six
routes per variant, implemented on branch `revision-3` per
`faith-baptist-revision-3-design-brief.md` (source task t_12fc159d).

## Route of record

- Selected route: mandatory default coding agent (Codex) through the isolated
  coding CLI router, project `faith-baptist-revision3-canonical`.
- Router run: `run-20260910T081522-4b1b41aa` (result:
  `/home/solo/.hermes/coding-worker/runs/run-20260910T081522-4b1b41aa/result.json`).
- The gate classified the run `verification_failed` only because the provider
  hit its usage limit mid-turn ("try again at Sep 14th, 2026 9:26 PM"); the
  policy gate reclassified this as CLI-unavailable and authorized DEV-direct
  continuation (`execution_fallback: dev_direct`). No other provider was used.
- DEV preserved the router worktree diff into a clean `revision-3` worktree at
  base `785573625b056993643c9a9a596c49aff3245a68` and verified it independently
  (below). Three incidental `__pycache__/*.pyc` artifacts were excluded, and
  the two superseded Variant C font binaries were removed from the index to
  match the build's new single shared `assets/fonts/` bundle.

## Verification performed

Canonical checks (run in the preserved implementation tree):

- `python3 build.py` — exit 0 (`Built.`)
- `python3 verify.py` — exit 0: `Verified 30 pages: route/copy/identity/noindex/link contracts, exact raster alts and bytes, bundled assets, triad colors, five regime structures and 10/10 different static fingerprint pairs on every route. Static checks only; visual uniqueness, browser accessibility, mobile layout, font loading and live HTTPS remain separate QA.`
- `git diff --check` — exit 0 (no whitespace errors)

The same project verification had already passed inside the router run
(baseline and post-run, exit 0) before the provider halt.

## Known environmental limits recorded during the route

- Chrome could not start inside the coding sandbox
  (`setsockopt: Operation not permitted`), so browser-based visual,
  accessibility, and mobile-layout QA did not run there. Those gates are
  executed separately against the live deployments.
- DNS was unavailable in the sandbox, so no remote font fetches were claimed.
  Variant D fonts are locally bundled with provenance records
  (`assets/fonts/Variant-D-PROVENANCE.md`); Playfair Display remains a Google
  Fonts import with a Georgia serif fallback.
- The source-facts contract in `qa/revision-3-media.json` records the four
  client rasters with exact URLs, dimensions, alt text, and SHA-256 hashes from
  the local bundle. No crest raster exists in the accepted source bundle, and
  none was invented.

## Evidence custody

Live deployment, per-variant QA, screenshots, the approval-page section, and
the CRM read-back are recorded with the deployment evidence on the Kanban card
and the canonical QA/approval page; they are not reproduced here.
