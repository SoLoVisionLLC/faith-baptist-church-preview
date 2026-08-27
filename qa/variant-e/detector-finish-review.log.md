# Variant E detector and finish-review log

Recorded for later DESIGN.md inclusion. This log describes the fully built six-route output at `variants/e/`.

## Mechanical detector

- Runs for this completed output: **exactly 1**
- Command: `node /home/solo/.hermes/profiles/vector/skills/impeccable/scripts/detect.mjs --json variants/e`
- Working directory: `/home/solo/.hermes/kanban/workspaces/t_67837fdb/repo`
- Exit code: **2**
- Detector state: **DEGRADED**. HTML parser modules `htmlparser2`, `css-select`, `css-tree`, and `domutils` were unavailable, so the detector fell back to regex matching. Custom properties, selector matching, and computed contrast were not evaluated. Findings are therefore an undercount, not a clean bill of health.
- Finding count: **2 warnings**

### Detector findings

1. `border-accent-on-rounded` — Border accent on rounded element
   - Severity: warning
   - Category: slop
   - File: `variants/e/styles.css`
   - Line: 13
   - Snippet: `border-bottom:4px solid`
   - Detector description: “Thick accent border on a rounded card — the border clashes with the rounded corners. Remove the border or the border-radius.”
2. `border-accent-on-rounded` — Border accent on rounded element
   - Severity: warning
   - Category: slop
   - File: `variants/e/styles.css`
   - Line: 17
   - Snippet: `border-bottom:4px solid`
   - Detector description: “Thick accent border on a rounded card — the border clashes with the rounded corners. Remove the border or the border-radius.”

The fresh finish reviewer inspected these warnings in context and judged that they do not identify rounded accent containers and are not material.

## Fresh Impeccable finish review

Reviewer substitution: the shipped finish-review role was executed by a fresh isolated Hermes subagent with no build-thread history. It edited nothing and did not rerun the detector.

Inputs supplied: original Variant E request and fixed facts; `variants/e/`; authoritative desktop and 390×844 mobile captures; `PRODUCT.md`; the pinned Service-Time Compass direction contract; detector output above; and Impeccable 4.1.1 `craft-floor.md`. This is a code-led, brief-pinned world with no approved comp or comp-round.

### Exact disposition and contracted review

disposition: fix

#### persistence

pass — PRODUCT.md and the direction contract are present. This is code-led, so no approved comp, comp-round approval, or hero-reproduction checkpoint is required. Both required captures are valid. The degraded detector’s two border-bottom warnings do not identify rounded accent containers and are not material.

#### fidelity

| Salient element | Classification | Evidence |
|---|---|---|
| 58/42 photographic first viewport | match | Desktop uses the committed church photograph beside a deep-navy content field. |
| Church identity and CTA | match | Church name, exact identity line, and Plan Your Visit action are prominent in both captures. |
| Four first-viewport schedule labels | acceptable adaptation | All four remain visible at 390×844, but the mobile lettering is undersized. |
| Service-time rail orientation | contradicted | The embedded FIRST VIEWPORT promise specifies a vertical Sunday/Wednesday rail; the shipped rail is horizontal. |
| TYPE | contradicted | The capture lacks the promised condensed Archivo Black character, and the CSS supplies no font asset or import, leaving system-font fallbacks as the rendered display voice. |
| MATERIAL | match | Real photography, flat navy fields, sharp dividers, and brick action color retain the committed hard-edged visual material without imitation texture. |
| GROUND | match | Deep navy, chapel white, cool mist, and brick remain on-temperature and visually distinct. |
| Narrow integrated header | acceptable adaptation | The header shares the navy world and remains compact, though the desktop navigation reads conventionally. |
| Eyebrow treatment | contradicted | “FOSTORIA, OHIO” uses the explicitly refused tracked uppercase eyebrow pattern. |
| Purposeful motion | match | The authored schedule-line draw is singular and has a reduced-motion fallback. |

#### ceiling

not reached — the world leaves its strongest native devices underdeveloped: genuinely condensed sourced lettering, a vertical first-viewport compass rail, more assertive schedule numerals, and themed selection and scrollbar surfaces. Mobile preserves the required content but reduces the schedule to tiny utility text rather than a confident navigational spine.

#### material_fixes

1. Fidelity/contract: implement the promised vertical Sunday/Wednesday first-viewport rail on desktop while retaining a legible responsive adaptation on mobile.
2. Fidelity/type: source and load Archivo Black or a genuinely comparable condensed display face; do not ship the system-font fallback as the display voice.
3. Floor: remove the tracked uppercase “FOSTORIA, OHIO” eyebrow and let the church name establish the hierarchy directly.
4. Accessibility/floor: enlarge the four mobile schedule labels from approximately 9–10px to a clearly readable size while keeping all four inside the 390×844 viewport.
5. Ceiling/floor: theme remaining browser surfaces—at minimum selection and scrollbar treatment—from the committed palette.

#### keep

Keep the exact 58/42 real-photo/navy split, immediate identity and CTA, all four first-viewport schedule points, sharp geometry, and brick-only action color while applying the fixes.
