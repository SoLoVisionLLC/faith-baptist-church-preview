---
version: alpha
name: Faith Baptist Church - Faith in the Heartland
description: A bright Main Street procession of local faith, clear Sunday guidance, and civic-scale welcome.
colors:
  primary-red: "#c41f2c"
  primary-red-dark: "#9f111c"
  procession-blue: "#2366c6"
  heartland-navy: "#071c38"
  heartland-navy-bright: "#123f72"
  bright-white: "#fff"
  morning-mist: "#edf2f7"
  rule-line: "#cbd4df"
  scripture-ink: "#102033"
  neighbor-muted: "#556579"
  focus-blue: "#73a8ff"
typography:
  display:
    fontFamily: '"Rokkitt", Georgia, serif'
    fontSize: "clamp(59px, 6.4vw, 102px)"
    fontWeight: 700
    lineHeight: 0.87
    letterSpacing: "-0.04em"
  headline:
    fontFamily: '"Rokkitt", Georgia, serif'
    fontSize: "clamp(50px, 5.2vw, 78px)"
    fontWeight: 700
    lineHeight: 0.91
    letterSpacing: "-0.04em"
  title:
    fontFamily: '"Rokkitt", Georgia, serif'
    fontSize: "23px"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "normal"
  body:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI Variable Text", "Segoe UI", Helvetica, Arial, sans-serif'
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "normal"
  label:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI Variable Text", "Segoe UI", Helvetica, Arial, sans-serif'
    fontSize: "10px"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "0.13em"
rounded:
  square: "0px"
  circle: "50%"
spacing:
  xs: "8px"
  sm: "12px"
  md: "18px"
  lg: "24px"
  gutter-mobile: "14px"
  gutter-tablet: "20px"
  gutter-desktop: "28px"
  target: "44px"
  section: "120px"
components:
  button-primary:
    backgroundColor: "{colors.primary-red}"
    textColor: "{colors.bright-white}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "0 21px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.primary-red-dark}"
    textColor: "{colors.bright-white}"
    rounded: "{rounded.square}"
  button-white:
    backgroundColor: "{colors.bright-white}"
    textColor: "{colors.heartland-navy}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "0 21px"
    height: "52px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.heartland-navy}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "0 21px"
    height: "52px"
  sunday-ticket:
    backgroundColor: "{colors.primary-red}"
    textColor: "{colors.bright-white}"
    rounded: "{rounded.square}"
    padding: "22px 25px"
    width: "290px"
  schedule-day:
    backgroundColor: "{colors.procession-blue}"
    textColor: "{colors.bright-white}"
    rounded: "{rounded.square}"
    padding: "0 18px"
    height: "62px"
---

# Design System: Faith Baptist Church - Faith in the Heartland

## Overview

**Creative North Star: "Faith in the Heartland"**

Faith moves through Fostoria like a Main Street procession. The system replaces the expected dark church hero and stacked-card template with daylight, hard civic banners, ruled information, and real local photography. It should feel immediate and neighborly: public enough to read from across the street, warm enough to make a first Sunday feel manageable.

The visual world belongs to the supplied crest and the church's actual place. Flag red, clear navy, procession blue, and bright white create American energy without political or military cues. Civic-scale Rokkitt headlines carry the public-square voice; a quiet system sans keeps practical details effortless to scan.

**Key Characteristics:**

- Hard-edged red, navy, blue, and white fields arranged as a continuous procession.
- Monumental Rokkitt headlines paired with plain, high-clarity service information.
- Real church photography, the supplied crest, ruled schedules, and numbered family bands as proof-bearing structure.
- Flat, daylight presentation with one coordinated crest-and-star-rail entrance.
- Clear visit actions and content that remains available before animation or scripting completes.

## Colors

The palette is bright, civic, and literal: flag colors create orientation and momentum, while cool neutrals protect readability.

### Primary

- **Flag Red:** The conversion and declaration color for primary actions, Sunday tickets, conviction fields, and emphatic type. Its darker state is reserved for interaction feedback.

### Secondary

- **Procession Blue:** The public-facing blue for star rails, schedule headers, route markers, and the closing field.
- **Heartland Navy:** The grounding color for navigation actions, schedule stages, footer fields, headings, and strong outlines. The brighter navy is available for controlled tonal variation.

### Neutral

- **Bright White:** The primary daylight canvas, inverse text, and hard photo frame.
- **Morning Mist:** The cool off-white field behind quieter procession sections.
- **Scripture Ink:** The strongest long-form text on light surfaces.
- **Neighbor Muted:** Supporting copy that should remain calm but readable.
- **Rule Line:** Dividers, schedule rules, arrival steps, and structural boundaries.
- **Focus Blue:** The global keyboard focus outline.

### Named Rules

**The Daylight Americana Rule.** American character comes from clear red, white, and blue structure, never sepia, distressed flags, gold, camouflage, or political imagery.

**The Red Declaration Rule.** Use red for action, arrival, and conviction, not for long paragraphs.

## Typography

**Display Font:** Rokkitt variable, self-hosted, with Georgia and serif fallbacks

**Body Font:** System sans, beginning with Apple and Segoe UI variable faces

**Italic Display:** Rokkitt Italic variable, self-hosted

**Character:** Rokkitt brings the sturdy, open character of a civic handbill or Main Street marquee without becoming nostalgic costume. The system sans makes times, directions, navigation, labels, and body copy feel current and immediately usable.

### Hierarchy

- **Display** (700, fluid civic scale, very tight line-height): Hero statements and the largest visitor calls. Preserve short lines and deliberate breaks.
- **Headline** (700, fluid section scale, tight line-height): Major section openings and procession transitions.
- **Title** (700, compact slab scale): Schedule labels, belief headings, addresses, and component titles.
- **Body** (400, 16px base, 1.75 line-height): Practical visitor guidance, with long disclosure copy capped near 65 characters.
- **Label** (900, 10px base, wide tracking, uppercase): Locations, proof points, schedule metadata, chapter numbers, and route signals.

### Named Rules

**The Civic Scale Rule.** Let Rokkitt carry public declarations and numbers; keep logistics in the system sans so spectacle never slows comprehension.

**The Tight Headline Rule.** Display lines use compressed leading and tracking, but body copy keeps generous leading and conventional spacing.

## Layout

The primary content shell is capped at 1220px with 28px gutters on large screens. The page advances as a procession rather than a stack of cards: asymmetric hero and schedule grids, full-width tonal bands, a split photographic welcome, a scripture window, ruled family rows, and a focused visit destination. Major sections typically use a 120px vertical rhythm.

At 1080px, the shell contracts to a 940px maximum with 20px gutters and complex grids simplify. At 860px, navigation becomes a full-screen menu and primary two-column sections become single-column. At 560px, gutters become 14px, actions stack, headlines are recalibrated, and dense schedule and family grids shed secondary columns rather than overflow.

All interactive targets are at least 44px tall. Content is visible by default; responsive and script-enhanced states may reorganize it, but must not make reading dependent on animation.

**The Procession Rule.** Sections should connect through rules, bands, stripes, route marks, and tonal handoffs rather than isolated floating containers.

## Elevation & Depth

The system is flat and tonal. White frames, color changes, borders, overlap, and photographic scale establish depth. The crest is the only decorative element with a persistent drop shadow, giving the supplied identity a physical bridge between the white copy field and navy photo stage. A stuck header may use a faint temporary shadow only to clarify its scrolling layer; resting content surfaces stay shadowless.

### Shadow Vocabulary

- **Crest Lift:** A compact navy-tinted drop shadow gives the crest enough separation to bridge contrasting fields.

### Named Rules

**The Flat Street Rule.** Do not solve hierarchy with card shadows. Use hard edges, tonal fields, rules, and overlap first.

## Shapes

The dominant form is square and architectural. Buttons, tickets, photographs, banners, schedules, bands, and content fields use hard corners. Hairline rules and occasional heavier top rules create the visual cadence of a posted civic schedule. Circles are exceptions reserved for small signals and the route star marker; the crest keeps its supplied silhouette.

CSS-authored arrows and disclosure marks use straight two-pixel strokes. They inherit the active color and rotate when direction or state changes, preserving the same utilitarian sign-system language without external icon dependencies.

**The Hard Edge Rule.** Rounded cards and pill controls do not belong in this world; a circle must communicate a signal, marker, or supplied identity.

## Components

### Buttons

- **Shape:** Hard rectangular geometry with a 52px minimum height and two-pixel structural border.
- **Primary:** Flag red with bright white heavy sans text and a CSS-authored arrow where direction helps.
- **Hover / Focus:** Red deepens on hover; all variants use the global three-pixel focus-blue outline with a four-pixel offset.
- **White / Outline:** White buttons reverse on color fields; outline buttons remain transparent with a navy boundary on light fields.

### Navigation

- **Desktop:** A white 88px header with compact heavy sans links, a hard navy visit action, and a red underline on hover.
- **Sticky:** The bar tightens to 76px and gains only enough shadow to remain legible over scrolling content.
- **Mobile:** At 860px and below, a 48px CSS-authored menu toggle opens a full-screen navy menu with 62px ruled Rokkitt links and a red visit action.

### Sunday Arrival Ticket

The red ticket overlaps the navy hero stage and keeps the Sunday time, gathering label, and directions within the first viewport. It stays square, uses compact uppercase metadata, and gives the time a large Rokkitt numeral treatment.

### Ruled Schedule

Blue and red day banners introduce dark-navy schedule groups. Each gathering is a full-width ruled row with a large Rokkitt time, direct service name, supporting family detail, and an optional sequence number. Do not convert these rows into individual cards.

### Family Bands

The family system alternates red, white, and navy full-width bands. Each band combines a ruled sequence number, Rokkitt promise, concise explanation, and directional link, preserving a shared baseline rather than separate tiles.

### Disclosure Rows

Native details and summary elements keep first-visit answers visible and keyboard-operable. Each summary provides at least a 66px target and uses a CSS-authored plus that rotates on open; the first useful answer may be open by default.

### Processional Entrance

The hero uses one coordinated entrance: the blue star rail reveals from left to right while the crest settles into place. All other content is present at rest. Reduced-motion preference collapses animation and transition durations to effectively immediate values.

## Do's and Don'ts

### Do:

- **Do** use real exterior and sanctuary photography plus the supplied crest as the visual evidence.
- **Do** preserve Plan Your Visit as the dominant action and keep Sunday time, directions, and phone access easy to reach.
- **Do** build rhythm with hard tonal bands, ruled schedules, family rows, stars, stripes, and route marks.
- **Do** keep the red, white, and blue identity welcoming, nonpartisan, and centered on faith.
- **Do** preserve 44px targets, visible focus, reduced-motion support, semantic structure, and content visible by default.

### Don't:

- **Don't** return to a dark photographic church hero or a generic stack of rounded cards.
- **Don't** add gold, sepia, distressed flag textures, military motifs, political messaging, gradients, or decorative glass effects.
- **Don't** introduce extra decorative shadows; only the crest receives persistent lift.
- **Don't** hide essential visitor information behind motion, hover, carousels, or closed-only interactions.
- **Don't** replace the ruled schedule or family bands with disconnected tiles.
