---
version: alpha
name: Faith Baptist Church Americana Editorial
description: A bold, welcoming American-inspired church website grounded in real church photography and clear visitor pathways.
colors:
  primary: "#C41F2C"
  navy-deep: "#04152B"
  navy: "#071C38"
  navy-bright: "#0A2D59"
  navy-mid: "#13477F"
  red-dark: "#9F111C"
  red: "#C41F2C"
  red-bright: "#E12B38"
  blue: "#2366C6"
  cream: "#F7F4EE"
  white: "#FFFFFF"
  text: "#102033"
  muted: "#596779"
  border: "#CCD3DB"
  surface-muted: "#EDF0F3"
  focus: "#73A8FF"
typography:
  display:
    fontFamily: Georgia
    fontSize: 72px
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: -2px
  heading:
    fontFamily: Georgia
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: -1px
  body:
    fontFamily: system-ui
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: 0px
  scale:
    micro: 8px
    fine: 9px
    overline: 10px
    label-small: 11px
    label: 12px
    caption: 13px
    body-small: 14px
    body-compact: 15px
    body: 16px
    body-large: 17px
    lead-small: 18px
    lead: 19px
    nav: 20px
    address: 23px
    subheading-small: 24px
    subheading: 25px
    subheading-large: 26px
    card-title-small: 28px
    card-title: 29px
    faq-title-small: 30px
    faq-title: 31px
    mobile-title: 34px
    display-xs-fluid-min: 37px
    time-small: 38px
    quote-fluid-min: 39px
    display-mobile: 40px
    display-compact: 42px
    cta-fluid-min: 43px
    display-medium: 46px
    heading: 48px
    manifesto-fluid-min: 50px
    mobile-hero-fluid-min: 52px
    card-fluid-max: 53px
    time: 58px
    hero-fluid-min: 62px
    cta-fluid-max: 66px
    quote-fluid-max: 74px
    manifesto-fluid-max: 76px
    hero-fluid-max: 96px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  section: 120px
rounded:
  small: 4px
  medium: 6px
  circle: 50%
  pill: 999px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.white}"
    rounded: "{rounded.small}"
    padding: 16px
  button-dark:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.white}"
    rounded: "{rounded.small}"
    padding: 16px
  page:
    backgroundColor: "{colors.white}"
    textColor: "{colors.text}"
    borderColor: "{colors.border}"
  section-dark:
    backgroundColor: "{colors.navy-deep}"
    textColor: "{colors.white}"
  section-light:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.muted}"
  routine-link:
    textColor: "{colors.blue}"
---

## Overview

Faith Baptist Church uses an Americana editorial system rather than a generic church template. The American influence comes from flag-red, deep navy, clean white bands, star fields, stripe geometry, and confident civic-poster scale. It should feel spirited and welcoming, never partisan, military, novelty-themed, or cluttered.

Design variance is 9/10, motion intensity is 7/10, and visual density is 8/10. Motion supports energy and orientation, and all essential content remains available when motion is reduced.

## Colors

Deep navy is the stage for hero, beliefs, and footer sections. Red is the primary identity and conversion color. Blue is a supporting stripe and interaction accent. White and cream create breathing room between high-energy sections. Do not introduce gold, tan, orange, or faded vintage colors.

All body copy must meet WCAG AA contrast. Red should not be used for long paragraphs. White text on red is reserved for large type and strong controls.

## Typography

Georgia supplies the editorial, church-bulletin character for major headings and numbers. The system sans-serif stack handles navigation, body copy, labels, schedules, and controls. Hero type may use outlined white text for one short line only. Keep body copy between 15px and 19px with generous line height.

## Layout

Use a maximum 1180px content shell with 24px desktop gutters and 14px phone gutters. Desktop sections may use asymmetric 55/45 or 40/60 compositions. Mobile is its own single-column composition, with a 2-by-2 service-time grid and full-width ministry panels.

The page should alternate visual pace: immersive hero, compact time ribbon, light narrative section, structured journey, dark beliefs manifesto, high-color ministries, photographic verse pause, and focused visitor conversion.

## Elevation & Depth

The design is primarily flat. Shadows are limited to the Sunday information card, overlapping photography, and other elements that visibly occupy a separate layer. Persistent navigation uses a soft shadow only after it becomes sticky.

## Shapes

Controls use a compact 4px radius. Content panels and photographs stay square. Circles are reserved for the FBC location seal, logo, and live indicator. Stripes may use slight skew or rotation as an American flag reference.

## Components

The header begins transparent over the hero and becomes a white sticky bar after scrolling. The red gathering bar always provides the calculated next service. Primary buttons use red, while secondary buttons use navy or transparent white.

Service times appear once as a strong schedule ribbon. Ministry panels combine red, navy, and real church photography. FAQ content uses native `details` elements. Scroll reveals move no more than 32px and must immediately resolve when reduced motion is enabled.

## Do's and Don'ts

- Do use the real sanctuary, building, and supplied crest as the main visual proof.
- Do keep Plan Your Visit as the dominant action.
- Do use stars and stripes as structured graphic rhythm.
- Do keep American styling welcoming and nonpartisan.
- Do preserve one H1 and logical heading order.
- Don't invent leaders, events, sermons, social accounts, donation providers, or testimonials.
- Don't place every idea inside a rounded card.
- Don't add gold, sepia, distressed flag textures, military motifs, or political messaging.
- Don't hide essential content behind animation.
- Don't duplicate the service schedule in multiple full sections.
