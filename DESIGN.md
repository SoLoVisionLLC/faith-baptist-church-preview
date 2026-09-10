---
version: revision-3
name: Faith Baptist Church — Service-Time Compass
description: Impeccable 4.1.1 Persuade with sharp Old Glory wayfinding.
colors:
  primary: "#0A3161"
  action: "#B31942"
  surface: "#FFFFFF"
typography:
  display:
    fontFamily: Liberation Sans Narrow
    fontWeight: 700
    lineHeight: 0.97
  body:
    fontFamily: Source Sans 3
    fontSize: 1.125rem
    lineHeight: 1.55
rounded:
  sharp: 0px
---

# Revision 3 direction receipt

Quill's approved redesign preserves **Impeccable 4.1.1 Persuade / Service-Time Compass** for E. The implementation follows that existing direction; no new detector/generator invocation or outside design regime is claimed. C remains the lead among the five variants.

The compass is the signature mechanism: visitors can select one of four real weekly gathering times, see their choice, and follow Plan Your Visit. The complete schedule stays visible. Every inner route retains the same mechanism, with specific visitor content above it.

## Visual system

- Old Glory Blue `#0A3161` owns the header, identity panel, selected gathering, ministry field and footer.
- Old Glory Red `#B31942` owns the directional markers, numbered schedule points, key rules, primary actions and final visit section.
- White `#FFFFFF` provides the reading surfaces and reversed text. Dividers may use navy/white opacity. No brick, mist, gray, cream or alternate accent colors are authored.
- Display uses the existing locally bundled **Liberation Sans Narrow Bold**, the previously accepted condensed equivalent to Archivo Black. Body text uses locally bundled **Source Sans 3**. Original font hashes and licenses remain intact.
- Geometry is square, with no rounding, blobs or decorative shadows. Large type, hard image plates and alignment provide the visual rhythm.

## Composition

Home follows the approved order: identity/photo hero → Service-Time Compass → A church in Fostoria → What we believe → Ministry rhythm → Plan Your Visit → footer.

The hero pairs an architectural crop with a navy identity panel. A red image anchor carries the client line “A church family for Fostoria.” White Sunday time panels and a red top rule create a clear path to the complete compass. The real-place section offsets sanctuary imagery beside the steeple portrait and address. The final red field uses “We saved you a seat.”

Visit, beliefs, ministries, events and contact use a large navy introduction with a red baseline. The events page presents only recurring services; no events, dates, announcements or ministries are fabricated.

## Interaction and accessibility

The compass is a native radio group inside a fieldset and legend, with four fully labeled choices. Tab enters the group and native arrow keys change the selected gathering. All gathering information remains visible and selection works without JavaScript. `compass.js` adds a polite, atomic selected-time announcement. A small directional cue moves on selection through a 180ms transition; reduced motion removes the transition completely.

The mobile compass is a vertical stepper. It never requires horizontal scrolling. Mobile navigation uses native details/summary. Skip links, current-page announcements, focus rings and 44px minimum action rules remain explicit. White surrounds the red focus ring on navy surfaces. Body text uses navy on white or white on red/navy; those opaque pairs exceed 4.5:1.

Actual browser target measurements, overflow and assistive-technology behavior still require browser QA; CSS declarations alone are not proof of those outcomes.

## Content and media

Use Faith Baptist Church, the exact identity line, the source address `11275 W. Twp. Rd. 116, Fostoria, OH 44830`, and `(419) 348-2171`. Sunday School starts at 9:00 AM; Main Service and Young Children's Sunday School at 10:00 AM; nursery is during Sunday programming; Sunday Evening Service is at 6:00 PM; Wednesday Prayer & Bible Study is at 7:00 PM.

All four client rasters retain their exact original alt text, intrinsic dimensions and bytes. The steeple portrait uses contain where appropriate. No official crest has been fabricated. Source provenance is in `qa/revision-3-media.json`; font licenses are in `assets/fonts/`.

## Finish review — local implementation only

Reviewed the final source for E's section order, compass semantics, progressive enhancement, public copy, palette, responsive rules and reduced motion. Static verification is recorded in `docs/revision-3-implementation.md`.

Disposition: **browser review pending**. Chrome exits in this sandbox with `setsockopt: Operation not permitted`; no current visual screenshots or live proof are claimed. Historical Impeccable review logs and deployed screenshots in `qa/variant-e/` refer to earlier code and do not establish a Revision 3 pass. This task explicitly excludes deployment, external CRM/QA updates, commits and pushes.
