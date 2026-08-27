"""Variant E: Impeccable 4.1.1 Persuade, Service-Time Compass."""

NAME = "Faith Baptist Church"
ADDRESS = "11275 W. Twp. Rd. 116, Fostoria, OH 44830"
PHONE = "419-348-2171"
PHONE_TEL = "+1" + PHONE.replace("-", "")
DIRECTIONS = "https://www.google.com/maps/dir/?api=1&destination=11275+W.+Twp.+Rd.+116%2C+Fostoria%2C+OH+44830"
IDENTITY = "Bible believing. Gospel driven. Growing together in God's Word."

DIRECTION_CONTRACT = """<!--
THESIS: Service times are the interface. Refuse the conventional church hero followed by a generic card grid.
OWN-WORLD: Deep navy fields, cold white reading surfaces, brick action color, compressed sans display, sharp image plates, and a numbered weekly compass.
STORY: A visitor sees who Faith Baptist Church is, understands the complete weekly rhythm, confirms children and nursery options, and chooses Plan Your Visit.
FIRST VIEWPORT: church1.jpg occupies the left 58 percent. The right 42 percent is navy with the name, exact identity line, Plan Your Visit action, and a vertical Sunday/Wednesday time rail. The CTA is visible at 390x844 without scrolling.
FORM: Pinned Impeccable Persuade control. Build the brief's committed world, not a softened generic church layout.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
-->"""

MEDIA = {
    "front": ("/assets/front.png", "Faith Baptist Church brick exterior with a white steeple and cross beneath a clear blue sky.", 277, 600),
    "land": ("/assets/church1.jpg", "Faith Baptist Church across a green lawn with a landscaped flower bed and white steeple.", 600, 450),
    "close": ("/assets/church2.jpg", "Faith Baptist Church sanctuary with a central pulpit, stone wall, wooden cross, and American flag.", 450, 600),
    "wide": ("/assets/church3.jpg", "Faith Baptist Church sanctuary viewed down the center aisle toward the cross and altar.", 450, 600),
}

ROUTES = (("/", "Home"), ("/visit/", "Plan Your Visit"), ("/beliefs/", "What We Believe"), ("/ministries/", "Ministries"), ("/events/", "Events & Announcements"), ("/contact/", "Contact"))


def image(key, class_name=""):
    src, alt, width, height = MEDIA[key]
    cls = f' class="{class_name}"' if class_name else ""
    return f'<img{cls} src="{src}" alt="{alt}" width="{width}" height="{height}">'


def nav(active):
    links = ""
    for href, label in ROUTES:
        current = ' aria-current="page"' if href == active else ""
        links += f'<a href="{href}"{current}>{label}</a>'
    return f'''<header class="site-header">
  <a class="wordmark" href="/">Faith Baptist Church</a>
  <nav class="desktop-nav" aria-label="Primary">{links}</nav>
  <details class="mobile-menu"><summary>Menu</summary><nav aria-label="Mobile primary">{links}</nav></details>
</header>'''


def compass(compact=False):
    cls = "compass compact-compass" if compact else "compass"
    heading = "Weekly compass" if compact else "Service-Time Compass"
    return f'''<section class="{cls}" aria-labelledby="compass-title{'-compact' if compact else ''}">
  <div class="compass-heading"><p class="section-mark">Weekly rhythm</p><h2 id="compass-title{'-compact' if compact else ''}">{heading}</h2></div>
  <ol class="compass-line">
    <li><span class="compass-number">01</span><div><strong>9:00 AM</strong><p>Sunday School for adults and teens</p></div></li>
    <li><span class="compass-number">02</span><div><strong>10:00 AM</strong><p>Sunday main service</p><p>Young children's Sunday School and nursery for tots during Sunday programming</p></div></li>
    <li><span class="compass-number">03</span><div><strong>6:00 PM</strong><p>Sunday evening service</p></div></li>
    <li><span class="compass-number">04</span><div><strong>Wednesday 7:00 PM</strong><p>Prayer and Bible study</p></div></li>
  </ol>
</section>'''


def inner_intro(title, text):
    return f'''<section class="inner-intro"><p class="section-mark">Faith Baptist Church</p><h1>{title}</h1><p>{text}</p></section>'''


HOME = f'''<section class="first-view" aria-labelledby="home-title">
  <div class="hero-photo">{image("land")}</div>
  <div class="hero-panel">
    <h1 id="home-title">Faith Baptist Church</h1>
    <p class="identity">{IDENTITY}</p>
    <a class="button" href="/visit/">Plan Your Visit</a>
    <div class="hero-rail" aria-label="Weekly service times"><span>Sun 9:00</span><span>Sun 10:00</span><span>Sun 6:00</span><span>Wed 7:00</span></div>
  </div>
</section>
{compass()}
<section class="real-place" aria-labelledby="place-title">
  <div class="place-copy"><p class="section-mark">Real place</p><h2 id="place-title">A church in Fostoria</h2><address>{ADDRESS}</address><a href="tel:{PHONE_TEL}">{PHONE}</a><a href="{DIRECTIONS}" rel="noopener">Get Directions</a></div>
  {image("front", "portrait")}{image("wide", "aisle")}
</section>
<section class="conviction" aria-labelledby="conviction-title">{image("close")}<div><p class="section-mark">Confirmed convictions</p><h2 id="conviction-title">What we believe</h2><ul><li>Bible believing.</li><li>Gospel driven.</li><li>We teach from the KJV Bible.</li></ul><a href="/beliefs/">What We Believe</a></div></section>
<section class="ministry-rhythm" aria-labelledby="ministry-title"><p class="section-mark">Along the weekly line</p><h2 id="ministry-title">Ministry rhythm</h2><div><strong>Sunday 9:00 AM</strong><p>Sunday School for adults and teens.</p></div><div><strong>Sunday 10:00 AM</strong><p>Main service, young children's Sunday School, and nursery for tots.</p></div><div><strong>Sunday 6:00 PM</strong><p>Sunday evening service.</p></div><div><strong>Wednesday 7:00 PM</strong><p>Prayer and Bible study.</p></div></section>
<section class="visit-close"><div><p class="section-mark">Your next point</p><h2>Plan Your Visit</h2><address>{ADDRESS}</address><a href="tel:{PHONE_TEL}">Call the Church: {PHONE}</a><a href="{DIRECTIONS}" rel="noopener">Get Directions</a></div><a class="button button-light" href="/visit/">Plan Your Visit</a></section>'''

VISIT = f'''{inner_intro("Plan Your Visit", "The complete schedule, location, and confirmed children and nursery information are here for your visit.")}
{compass(True)}
<section class="visit-grid"><div><h2>Address and directions</h2><address>{ADDRESS}</address><a class="button" href="{DIRECTIONS}" rel="noopener">Get Directions</a></div><div><h2>Children and nursery</h2><p>Young children's Sunday School begins Sunday at 10:00 AM. A nursery for tots is available during Sunday programming.</p><a href="tel:{PHONE_TEL}">Call the Church: {PHONE}</a></div>{image("front", "visit-portrait")}</section>'''

BELIEFS = f'''{inner_intro("What We Believe", "These are the confirmed convictions of Faith Baptist Church.")}
<section class="beliefs-equal">{image("close")}<div><ol><li><span>01</span><strong>Bible believing.</strong></li><li><span>02</span><strong>Gospel driven.</strong></li><li><span>03</span><strong>We teach from the KJV Bible.</strong></li></ol></div></section>{compass(True)}'''

MINISTRIES = f'''{inner_intro("Ministries", "Recurring gatherings follow one clear weekly line.")}
<section class="ministry-map"><div><span>Sunday 9:00 AM</span><h2>Adults and teens Sunday School</h2></div><div><span>Sunday 10:00 AM</span><h2>Main service</h2></div><div><span>Sunday 10:00 AM</span><h2>Young children's Sunday School</h2></div><div><span>Sunday programming</span><h2>Nursery for tots</h2></div><div><span>Sunday 6:00 PM</span><h2>Sunday evening service</h2></div><div><span>Wednesday 7:00 PM</span><h2>Prayer and Bible study</h2></div></section>{image("wide", "ministry-photo")}{compass(True)}'''

EVENTS = f'''{inner_intro("Events & Announcements", "The recurring weekly schedule is listed below.")}
{compass(True)}
<section class="announcement"><p class="section-mark">Announcements</p><h2>Current announcements will appear here when supplied.</h2></section>'''

CONTACT = f'''{inner_intro("Contact Faith Baptist Church", "Call the church or open directions to the exact address.")}
<section class="contact-destination"><div><p class="section-mark">Call</p><a class="contact-phone" href="tel:{PHONE_TEL}">{PHONE}</a><p class="section-mark">Destination</p><address>{ADDRESS}</address><a class="button" href="{DIRECTIONS}" rel="noopener">Get Directions</a></div>{image("front", "contact-portrait")}</section>{compass(True)}'''

PAGES = (
    ("", "Faith Baptist Church | Service Times and Visit Information", "Faith Baptist Church service times, location, and visit information in Fostoria, Ohio.", HOME),
    ("visit", "Plan Your Visit | Faith Baptist Church", "Service times, directions, children, nursery, and phone information.", VISIT),
    ("beliefs", "What We Believe | Faith Baptist Church", "Bible believing, gospel driven, and teaching from the KJV Bible.", BELIEFS),
    ("ministries", "Ministries | Faith Baptist Church", "Recurring Sunday and Wednesday gatherings at Faith Baptist Church.", MINISTRIES),
    ("events", "Events & Announcements | Faith Baptist Church", "The recurring weekly schedule and announcements for Faith Baptist Church.", EVENTS),
    ("contact", "Contact Faith Baptist Church | Phone and Directions", "Phone, address, and directions for Faith Baptist Church.", CONTACT),
)


def page(slug, title, description, body):
    route = "/" if not slug else f"/{slug}/"
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>{title}</title>
<meta name="description" content="{description}">
<link rel="stylesheet" href="/styles.css">
<link rel="icon" href="/assets/front.png">
</head>
<body class="v-e p-{slug or 'home'}">
{DIRECTION_CONTRACT}
<a class="skip-link" href="#main">Skip to content</a>
{nav(route)}
<main id="main" tabindex="-1">{body}</main>
<footer class="site-footer"><p><strong>{NAME}</strong></p><address>{ADDRESS}</address><a href="tel:{PHONE_TEL}">{PHONE}</a><a href="{DIRECTIONS}" rel="noopener">Get Directions</a><nav aria-label="Footer">{''.join(f'<a href="{href}">{label}</a>' for href, label in ROUTES)}</nav></footer>
</body>
</html>
'''
