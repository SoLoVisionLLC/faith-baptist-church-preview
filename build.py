#!/usr/bin/env python3
"""Build Faith Baptist Church static variants, six routes each."""
import os, shutil

import variant_e

ROOT = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.join(ROOT, 'variants')
E_FONT_ASSETS = (
    'LiberationSansNarrow-Bold.ttf',
    'LiberationSansNarrow-LICENSE.txt',
    'SourceSans3-Latin.woff2',
    'SourceSans3-OFL.txt',
    'SourceSans3-PROVENANCE.md',
)
C_FONT_ASSETS = (
    'Fraunces-Latin.woff2',
    'Karla-Latin.woff2',
    'Fraunces-OFL.txt',
    'Karla-OFL.txt',
    'Fraunces-Karla-PROVENANCE.md',
)
ROUTES = {
    '/': 'index.html',
    '/visit': 'visit/index.html',
    '/beliefs': 'beliefs/index.html',
    '/ministries': 'ministries/index.html',
    '/events': 'events/index.html',
    '/contact': 'contact/index.html',
}

NAME = 'Faith Baptist Church'
ADDRESS = '11275 W. Township Rd. 116, Fostoria, OH 44830'
PHONE_DISPLAY = '(419) 348-2171'
PHONE_TEL = '+14193482171'
MAPS_DIR = 'https://www.google.com/maps/dir/?api=1&destination=11275+W.+Township+Rd.+116%2C+Fostoria%2C+OH+44830'
D_ADDRESS = '11275 W. Twp. Rd. 116, Fostoria, OH 44830'
D_MAPS_DIR = 'https://www.google.com/maps/dir/?api=1&destination=11275+W.+Twp.+Rd.+116%2C+Fostoria%2C+OH+44830'
TAGLINE = "Bible believing. Gospel driven. Growing together in God&rsquo;s Word."
POSITIONING = 'Rooted in the Word. Centered on the Gospel. A church family for Fostoria.'

A_ADDRESS = '11275 W. Twp. Rd. 116, Fostoria, OH 44830'
A_PHONE_DISPLAY = '419-348-2171'
A_MAPS_DIR = 'https://www.google.com/maps/dir/?api=1&destination=11275+W.+Twp.+Rd.+116%2C+Fostoria%2C+OH+44830'
A_IDENTITY = "Bible believing. Gospel driven. Growing together in God's Word."

IMG = {
    'front': ('/assets/front.png', 'Faith Baptist Church exterior with white steeple and cross'),
    'land':  ('/assets/church1.jpg', 'Faith Baptist Church building and grounds, wide exterior view'),
    'close': ('/assets/church2.jpg', 'Inside the sanctuary of Faith Baptist Church, close view of pulpit area'),
    'wide':  ('/assets/church3.jpg', 'Wide view of the Faith Baptist Church sanctuary'),
}

B_ADDRESS = '11275 W. Twp. Rd. 116, Fostoria, OH 44830'
B_ALT = {
    'front': 'Faith Baptist Church brick exterior with a white steeple and cross beneath a clear blue sky.',
    'land': 'Faith Baptist Church across a green lawn with a landscaped flower bed and white steeple.',
    'close': 'Faith Baptist Church sanctuary with a central pulpit, stone wall, wooden cross, and American flag.',
    'wide': 'Faith Baptist Church sanctuary viewed down the center aisle toward the cross and altar.',
}

A_IMG = {
    'front': (
        '/assets/front.png',
        'Faith Baptist Church brick exterior with a white steeple and cross beneath a clear blue sky.',
        277,
        600,
    ),
    'land': (
        '/assets/church1.jpg',
        'Faith Baptist Church across a green lawn with a landscaped flower bed and white steeple.',
        600,
        450,
    ),
    'close': (
        '/assets/church2.jpg',
        'Faith Baptist Church sanctuary with a central pulpit, stone wall, wooden cross, and American flag.',
        450,
        600,
    ),
    'wide': (
        '/assets/church3.jpg',
        'Faith Baptist Church sanctuary viewed down the center aisle toward the cross and altar.',
        450,
        600,
    ),
}

NAV_LINKS = [
    ('/', 'Home'),
    ('/visit', 'Plan Your Visit'),
    ('/beliefs', 'What We Believe'),
    ('/ministries', 'Ministries'),
    ('/events', 'Events'),
    ('/contact', 'Contact'),
]

A_NAV_LINKS = [
    ('/', 'Home'),
    ('/visit', 'Visit'),
    ('/beliefs', 'Beliefs'),
    ('/ministries', 'Ministries'),
    ('/events', 'Events'),
    ('/contact', 'Contact'),
]

SCHEDULE = [
    ('Sunday School', '9:00 AM', 'Adults and teens'),
    ('Morning Worship', '10:00 AM', 'Sunday Main Service'),
    ("Young Children's Sunday School", '10:00 AM', 'During the main service'),
    ('Sunday Evening Service', '6:00 PM', ''),
    ('Prayer &amp; Bible Study', 'Wednesday 7:00 PM', ''),
]


def nav(active, variant='a'):
    links = ''
    for h, t in NAV_LINKS:
        cls = ' class="active" aria-current="page"' if h == active else ''
        href = '/' if h == '/' else h + '/'
        links += f'<a href="{href}"{cls}>{t}</a>'
    if variant == 'b':
        return f'''
<header class="site-header">
  <a class="skip-link" href="#main">Skip to content</a>
  <a class="brand" href="/">Faith Baptist Church</a>
  <a class="header-phone" href="tel:{PHONE_TEL}">419-348-2171</a>
  <details class="mobile-menu"><summary>Menu</summary><nav aria-label="Mobile">{links}</nav></details>
  <nav class="nav" aria-label="Main">{links}</nav>
  <a class="header-cta" href="/visit/">Plan Your Visit</a>
</header>'''
    return f'''
<header class="site-header">
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="brand">
    <span class="mark" aria-hidden="true">&#10013;</span>
    <span class="word">Faith Baptist <strong>Church</strong></span>
  </div>
  <nav class="nav" aria-label="Main">{links}</nav>
</header>'''


def footer(variant='a'):
    address = B_ADDRESS if variant == 'b' else ADDRESS
    footer_links = ''.join(
        f'<a href="{"/" if h == "/" else h + "/"}">{t}</a>'
        for h, t in NAV_LINKS
    ) if variant == 'b' else ''.join(
        f'<a href="/{"" if h=="/" else h+"/"}">{t}</a>'
        for h, t in NAV_LINKS
    )
    return f'''
<footer class="site-footer">
  <p><strong>{NAME}</strong></p>
  <p>{address}</p>
  <p><a href="tel:{PHONE_TEL}">{PHONE_DISPLAY}</a></p>
  <p><a href="{MAPS_DIR}" rel="noopener">Google Maps Directions</a></p>
  <nav aria-label="Footer">
    {footer_links}
  </nav>
</footer>
<a class="callbar" href="tel:{PHONE_TEL}">Call the Church</a>
'''


def a_nav_links(active, class_name):
    links = ''
    for href, label in A_NAV_LINKS:
        route = '/' if href == '/' else href + '/'
        current = ' aria-current="page"' if href == active else ''
        links += f'<a href="{route}"{current}>{label}</a>'
    return f'<nav class="{class_name}" aria-label="Primary">{links}</nav>'


def nav_a(active):
    return f'''
<header class="site-header">
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="header-inner">
    <a class="wordmark" href="/" aria-label="Faith Baptist Church home">Faith Baptist Church</a>
    {a_nav_links(active, 'desktop-navigation')}
    <a class="header-cta" href="/visit/">Plan Your Visit</a>
    <details class="menu">
      <summary>Menu</summary>
      <div class="mobile-panel">
        {a_nav_links(active, 'mobile-navigation')}
        <a class="mobile-cta" href="/visit/">Plan Your Visit</a>
      </div>
    </details>
  </div>
</header>'''


def footer_a():
    return f'''
<footer class="site-footer">
  <div>
    <p class="footer-name">{NAME}</p>
  </div>
  <address>
    <span>{A_ADDRESS}</span>
    <a href="tel:{PHONE_TEL}">{A_PHONE_DISPLAY}</a>
    <a href="{A_MAPS_DIR}" rel="noopener">Directions</a>
  </address>
</footer>
'''


def c_nav_links(active, class_name):
    links = ''
    for href, label in NAV_LINKS:
        route = '/' if href == '/' else href + '/'
        current = ' aria-current="page"' if route == active else ''
        links += f'<a href="{route}"{current}>{label}</a>'
    return f'<nav class="{class_name}" aria-label="Primary">{links}</nav>'


def nav_c(active):
    return f'''
<header class="c-site-header">
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="c-header-inner">
    <a class="c-wordmark" href="/">Faith Baptist Church</a>
    {c_nav_links(active, 'c-desktop-navigation')}
    <details class="c-menu">
      <summary>Menu</summary>
      {c_nav_links(active, 'c-mobile-navigation')}
    </details>
  </div>
</header>'''


def footer_c():
    links = ''.join(
        f'<a href="{"/" if href == "/" else href + "/"}">{label}</a>'
        for href, label in NAV_LINKS
    )
    return f'''
<footer class="c-site-footer">
  <div class="c-footer-primary">
    <p class="c-footer-name">{NAME}</p>
    <address>{A_ADDRESS}</address>
    <a href="tel:{PHONE_TEL}">{A_PHONE_DISPLAY}</a>
    <a href="{A_MAPS_DIR}" rel="noopener">Directions</a>
  </div>
  <nav class="c-footer-navigation" aria-label="Footer">{links}</nav>
</footer>'''


def nav_d(active):
    links = ''
    for href, label in (
        ('/', 'Home'),
        ('/beliefs', 'Beliefs'),
        ('/ministries', 'Ministries'),
        ('/events', 'Schedule'),
        ('/contact', 'Contact'),
    ):
        cls = ' class="active" aria-current="page"' if href == active else ''
        path = '/' if href == '/' else href + '/'
        links += f'<a href="{path}"{cls}>{label}</a>'

    visit_current = ' aria-current="page"' if active == '/visit' else ''
    return f'''
<header class="site-header d-site-header">
  <a class="skip-link" href="#main">Skip to main content</a>
  <div class="d-header-inner">
    <a class="d-wordmark" href="/" aria-label="Faith Baptist Church home">
      <span>Faith Baptist</span><strong>Church</strong>
    </a>
    <nav class="d-primary-nav" aria-label="Primary navigation">{links}</nav>
    <div class="d-header-actions">
      <a class="d-call" href="tel:{PHONE_TEL}" aria-label="Call Faith Baptist Church at {PHONE_DISPLAY}">Call the Church</a>
      <a class="d-plan" href="/visit/"{visit_current}>Plan Your Visit</a>
    </div>
  </div>
</header>'''


def footer_d():
    links = ''.join(
        f'<a href="{("/" if href == "/" else href + "/")}">{label}</a>'
        for href, label in NAV_LINKS
    )
    return f'''
<footer class="site-footer d-site-footer">
  <div class="d-footer-inner">
    <div>
      <p class="d-footer-name"><strong>{NAME}</strong></p>
      <address>{D_ADDRESS}</address>
      <p><a href="tel:{PHONE_TEL}">{PHONE_DISPLAY}</a></p>
      <p><a href="{D_MAPS_DIR}" rel="noopener">Get directions</a></p>
    </div>
    <nav aria-label="Footer navigation">{links}</nav>
  </div>
</footer>'''


HEAD = '''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="stylesheet" href="/styles.css">
<link rel="icon" href="/assets/front.png">
</head>
<body class="v-{variant} p-{slug}">
{nav}
<main id="main">
'''

HEAD_A = '''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="stylesheet" href="/styles.css">
<link rel="icon" href="/assets/front.png">
</head>
<body class="v-a p-{slug}">
{nav}
<main id="main" tabindex="-1">
'''

HEAD_C = '''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="stylesheet" href="/styles.css">
<link rel="icon" href="/assets/front.png">
</head>
<body class="v-c p-{slug}">
<div class="ambient-layer" aria-hidden="true"><span class="ambient-shape ambient-one"></span><span class="ambient-shape ambient-two"></span></div>
{nav}
<main id="main" tabindex="-1">
'''

def page(variant, slug, title, desc, body):
    if variant == 'a':
        active = '/' + slug if slug else '/'
        html = HEAD_A.format(title=title, desc=desc, slug=slug or 'home', nav=nav_a(active))
        return html + body + '\n</main>\n' + footer_a() + '\n</body>\n</html>\n'
    if variant == 'c':
        active = '/' if not slug else f'/{slug}/'
        html = HEAD_C.format(title=title, desc=desc, slug=slug or 'home', nav=nav_c(active))
        return html + body + '\n</main>\n' + footer_c() + '\n</body>\n</html>\n'
    if variant == 'd':
        active = '/' + slug if slug else '/'
        html = HEAD.format(title=title, desc=desc, variant=variant, slug=slug,
                           nav=nav_d(active))
        return html + body + '\n</main>\n' + footer_d() + '\n</body>\n</html>\n'
    html = HEAD.format(title=title, desc=desc, variant=variant, slug=slug,
                       nav=nav('/' + slug if slug else '/', variant))
    return html + body + '\n</main>\n' + footer(variant) + '\n</body>\n</html>\n'


# ---------------- shared sections ----------------

def sched_table(cls='schedule-table'):
    rows = ''.join(f'<tr><th scope="row">{d}</th><td>{t}</td><td>{x}</td></tr>' for d, t, x in SCHEDULE)
    return f'<table class="{cls}"><caption>Weekly gathering times</caption><tbody>{rows}</tbody></table>'


CTA_PLAN = '<a class="btn btn-primary" href="/visit/">Plan Your Visit</a>'


# ---------------- Variant A — Plain Welcome, regime A ----------------


def a_image(key, class_name=''):
    src, alt, width, height = A_IMG[key]
    css_class = f' class="{class_name}"' if class_name else ''
    return f'<img{css_class} src="{src}" alt="{alt}" width="{width}" height="{height}">'


def a_schedule():
    return '''
<section class="weekly-schedule" aria-labelledby="weekly-schedule-title">
  <h2 id="weekly-schedule-title">Weekly service times</h2>
  <div class="day-group">
    <h3>Sunday</h3>
    <div class="schedule-rows">
      <div class="schedule-row"><span>Sunday School</span><strong>9:00 AM</strong><span>Adults and teens</span></div>
      <div class="schedule-row"><span>Main service</span><strong>10:00 AM</strong><span></span></div>
      <div class="schedule-row"><span>Young children's Sunday School</span><strong>10:00 AM</strong><span></span></div>
      <div class="schedule-row"><span>Sunday evening service</span><strong>6:00 PM</strong><span></span></div>
    </div>
  </div>
  <div class="day-group">
    <h3>Wednesday</h3>
    <div class="schedule-rows">
      <div class="schedule-row"><span>Prayer and Bible study</span><strong>7:00 PM</strong><span></span></div>
    </div>
  </div>
</section>'''


A_HOME = f'''
<section class="home-hero" aria-labelledby="home-title">
  {a_image('land', 'hero-image')}
  <div class="hero-copy">
    <h1 id="home-title">Faith Baptist Church</h1>
    <p>{A_IDENTITY}</p>
    <div class="actions"><a class="button primary" href="/visit/">Plan Your Visit</a><a class="button secondary" href="/events/">View Service Times</a></div>
  </div>
</section>
{a_schedule()}
<section class="welcome-grid page-width" aria-labelledby="welcome-title">
  <div>
    <h2 id="welcome-title">Welcome</h2>
    <p>Faith Baptist Church is in Fostoria, Ohio. Our recurring gatherings include Sunday services and Wednesday prayer and Bible study.</p>
  </div>
  <div class="location-block">
    <h2>Find the church</h2>
    <address>{A_ADDRESS}</address>
    <a href="tel:{PHONE_TEL}">{A_PHONE_DISPLAY}</a>
  </div>
</section>
<section class="pathways page-width" aria-labelledby="pathways-title">
  <h2 id="pathways-title">Start here</h2>
  <div class="pathway"><h3>Service Times</h3><p>Sunday School for adults and teens begins at 9:00 AM. The main service and young children's Sunday School begin at 10:00 AM. Sunday evening service begins at 6:00 PM. Wednesday prayer and Bible study begins at 7:00 PM.</p><a href="/events/">Weekly schedule</a></div>
  <div class="pathway"><h3>Children and Nursery</h3><p>Young children's Sunday School begins at 10:00 AM. A nursery for tots is available during Sunday programming.</p><a href="/visit/">Visit information</a></div>
  <div class="pathway"><h3>Directions</h3><address>{A_ADDRESS}</address><a href="{A_MAPS_DIR}" rel="noopener">Get directions</a></div>
</section>
<section class="beliefs-split page-width" aria-labelledby="beliefs-title">
  {a_image('close', 'sanctuary-close')}
  <div>
    <h2 id="beliefs-title">Confirmed beliefs</h2>
    <ul class="belief-statements"><li>Bible believing.</li><li>Gospel driven.</li><li>KJV Bible.</li></ul>
    <a href="/beliefs/">What We Believe</a>
  </div>
</section>
<section class="ministry-list page-width" aria-labelledby="ministry-title">
  <h2 id="ministry-title">Recurring ministries</h2>
  <div class="ministry-row"><h3>Adults and teens</h3><p>Sunday School at 9:00 AM.</p></div>
  <div class="ministry-row"><h3>Young children</h3><p>Sunday School at 10:00 AM.</p></div>
  <div class="ministry-row"><h3>Nursery for tots</h3><p>Available during Sunday programming.</p></div>
  <div class="ministry-row"><h3>Prayer and Bible study</h3><p>Wednesday at 7:00 PM.</p></div>
</section>
<figure class="wide-sanctuary">{a_image('wide')}</figure>
<section class="visit-close page-width" aria-labelledby="visit-close-title">
  <div><h2 id="visit-close-title">Plan your visit</h2><p>Sunday School begins at 9:00 AM. The Sunday main service begins at 10:00 AM.</p></div>
  <div><address>{A_ADDRESS}</address><a href="{A_MAPS_DIR}" rel="noopener">Directions</a><a href="tel:{PHONE_TEL}">Call the Church</a></div>
</section>'''

A_VISIT = f'''
<section class="page-intro image-split page-width">
  <div><h1>Plan Your Visit</h1><p>Service times, the church address, and confirmed children and nursery information are listed below.</p></div>
  {a_image('front', 'exterior-portrait')}
</section>
{a_schedule()}
<section class="visit-details page-width" aria-label="Visit details">
  <div><h2>Address and directions</h2><address>{A_ADDRESS}</address><a class="button primary" href="{A_MAPS_DIR}" rel="noopener">Get Directions</a></div>
  <div><h2>Children and nursery</h2><p>Young children's Sunday School begins at 10:00 AM. A nursery for tots is available during Sunday programming.</p></div>
  <div><h2>Questions</h2><p><a href="tel:{PHONE_TEL}">Call the Church: {A_PHONE_DISPLAY}</a></p></div>
</section>'''

A_BELIEFS = f'''
<section class="beliefs-page image-split page-width">
  {a_image('close', 'sanctuary-close')}
  <div><h1>What We Believe</h1><ul class="belief-statements"><li>Bible believing.</li><li>Gospel driven.</li><li>KJV Bible.</li></ul></div>
</section>'''

A_MINISTRIES = f'''
<section class="page-intro page-width"><h1>Recurring Ministries</h1><p>Confirmed weekly gatherings at Faith Baptist Church.</p></section>
<section class="ministry-list page-width" aria-label="Recurring gatherings">
  <div class="ministry-row"><h2>Adults and teens Sunday School</h2><p>Sunday at 9:00 AM.</p></div>
  <div class="ministry-row"><h2>Sunday main service</h2><p>Sunday at 10:00 AM.</p></div>
  <div class="ministry-row"><h2>Young children's Sunday School</h2><p>Sunday at 10:00 AM.</p></div>
  <div class="ministry-row"><h2>Nursery for tots</h2><p>During Sunday programming.</p></div>
  <div class="ministry-row"><h2>Sunday evening service</h2><p>Sunday at 6:00 PM.</p></div>
  <div class="ministry-row"><h2>Prayer and Bible study</h2><p>Wednesday at 7:00 PM.</p></div>
</section>
<figure class="wide-sanctuary">{a_image('wide')}</figure>'''

A_EVENTS = f'''
<section class="page-intro page-width"><h1>Weekly Services and Announcements</h1><p>The confirmed weekly schedule is listed below.</p></section>
{a_schedule()}
<section class="announcement-note page-width" aria-labelledby="announcements-title"><h2 id="announcements-title">Announcements</h2><p>Current announcements will appear here when supplied.</p></section>'''

A_CONTACT = f'''
<section class="contact-page image-split page-width">
  <div><h1>Contact Faith Baptist Church</h1><h2>Call</h2><p><a class="contact-phone" href="tel:{PHONE_TEL}">Call the Church: {A_PHONE_DISPLAY}</a></p><h2>Address</h2><address>{A_ADDRESS}</address><p><a class="button primary" href="{A_MAPS_DIR}" rel="noopener">Get Directions</a></p></div>
  {a_image('land', 'contact-exterior')}
</section>'''


# ---------------- Variant B: Sunday Starts Here ----------------

B_HOME = '''
<section class="home-hero"><div class="hero-photo"><img src="/assets/front.png" width="277" height="600" alt="''' + B_ALT['front'] + '''"></div><div class="hero-plan"><h1>Faith Baptist Church</h1><p class="hero-line">''' + TAGLINE + '''</p><div class="sunday-plan" aria-label="Sunday schedule"><div><strong>9:00 AM</strong><span>Sunday School for adults and teens</span></div><div><strong>10:00 AM</strong><span>Main service, young children's class, and nursery</span></div><div><strong>6:00 PM</strong><span>Sunday Evening Service</span></div></div><p>''' + CTA_PLAN + '''</p></div></section>
<section class="today-band" aria-labelledby="today-title"><h2 id="today-title">Today at Faith Baptist</h2><p><strong>Sunday:</strong> 9:00 AM Sunday School, 10:00 AM main service and children's classes, 6:00 PM evening service.</p><p><strong>Wednesday:</strong> 7:00 PM Prayer and Bible Study.</p></section>
<section class="task-grid" aria-labelledby="questions-title"><h2 id="questions-title">Plan the practical details</h2><a class="task task-wide" href="/visit/"><strong>This Sunday</strong><span>See every service time and children's option.</span></a><a class="task" href="/ministries/"><strong>For Children</strong><span>Young children's class and nursery details.</span></a><a class="task" href="/events/"><strong>Wednesday Prayer and Bible Study</strong><span>Join us at 7:00 PM.</span></a><a class="task task-location" href="''' + MAPS_DIR + '''" rel="noopener"><strong>Find Us</strong><span>''' + B_ADDRESS + '''</span></a></section>
<section class="place-story"><img src="/assets/church1.jpg" width="600" height="450" alt="''' + B_ALT['land'] + '''"><div><h2>A local church in Fostoria</h2><p>We are Bible believing, gospel driven, and growing together in God's Word.</p><p><a href="tel:+14193482171">Call the Church at 419-348-2171</a></p></div></section>
<section class="ministry-groups"><h2>Our weekly rhythm</h2><div><h3>Sunday Learning</h3><p>Adults and teens meet at 9:00 AM. Young children's Sunday School meets at 10:00 AM, with nursery available for tots.</p></div><div><h3>Worship Gatherings</h3><p>The main service begins Sunday at 10:00 AM. Sunday Evening Service begins at 6:00 PM.</p></div><div><h3>Midweek Prayer</h3><p>Wednesday Prayer and Bible Study begins at 7:00 PM.</p></div></section>
<section class="photo-story" aria-label="Inside Faith Baptist Church"><figure><img src="/assets/church2.jpg" width="450" height="600" alt="''' + B_ALT['close'] + '''"><figcaption>The central pulpit and cross inside the sanctuary.</figcaption></figure><figure><img src="/assets/church3.jpg" width="450" height="600" alt="''' + B_ALT['wide'] + '''"><figcaption>The center aisle leads toward the cross and altar.</figcaption></figure></section>
<section class="location-close"><h2>Plan Your Visit</h2><p>''' + B_ADDRESS + '''</p><p><a href="tel:+14193482171">419-348-2171</a></p><p><a class="btn btn-primary" href="/visit/">Plan Your Visit</a> <a class="btn btn-secondary" href="''' + MAPS_DIR + '''" rel="noopener">Get Directions</a></p></section>'''

B_VISIT = '''<section class="page-intro"><h1>Plan Your Visit</h1><p>Use this checklist for service times, children and nursery, location, and a direct call.</p></section><section class="visit-checklist"><div><h2>Times</h2>''' + sched_table() + '''</div><div><h2>Children and Nursery</h2><p>Adults and teens meet for Sunday School at 9:00 AM. Young children's Sunday School meets at 10:00 AM, with nursery available for tots during Sunday programming.</p></div><div><h2>Location</h2><p>''' + B_ADDRESS + '''</p><p><a class="btn btn-secondary" href="''' + MAPS_DIR + '''" rel="noopener">Get Directions</a></p></div><div><h2>Call</h2><p><a class="phone-action" href="tel:+14193482171">Call the Church at 419-348-2171</a></p></div></section><img class="feature portrait-feature" src="/assets/front.png" width="277" height="600" alt="''' + B_ALT['front'] + '''">'''

B_BELIEFS = '''<section class="page-intro"><h1>What We Believe</h1><p>These are the confirmed convictions Faith Baptist Church has shared.</p></section><section class="belief-layout"><img src="/assets/church2.jpg" width="450" height="600" alt="''' + B_ALT['close'] + '''"><div><h2>Bible believing</h2><p>We are Bible believing.</p><h2>Gospel driven</h2><p>We are gospel driven.</p><h2>KJV Bible</h2><p>We teach from the KJV Bible.</p></div></section>'''

B_MINISTRIES = '''<section class="page-intro"><h1>Ministries</h1><p>Our ministries follow a clear weekly rhythm for adults, teens, children, and tots.</p></section><section class="ministry-groups"><div><h2>Sunday Learning</h2><p>Sunday School begins at 9:00 AM for adults and teens. Young children's Sunday School begins at 10:00 AM. Nursery is available for tots during Sunday programming.</p></div><div><h2>Worship Gatherings</h2><p>The main service begins Sunday at 10:00 AM. Sunday Evening Service begins at 6:00 PM.</p></div><div><h2>Midweek Prayer</h2><p>Wednesday Prayer and Bible Study begins at 7:00 PM.</p></div></section><img class="feature" src="/assets/church3.jpg" width="450" height="600" alt="''' + B_ALT['wide'] + '''"><p class="center-action"><a class="btn btn-primary" href="/visit/">Plan Your Visit</a></p>'''

B_EVENTS = '''<section class="page-intro"><h1>Events and Announcements</h1><p>Our recurring schedule is grouped by Sunday and Wednesday.</p></section><section class="weekly-groups"><div><h2>Sunday</h2><p><strong>9:00 AM</strong> Sunday School for adults and teens</p><p><strong>10:00 AM</strong> Main service, young children's Sunday School, and nursery</p><p><strong>6:00 PM</strong> Sunday Evening Service</p></div><div><h2>Wednesday</h2><p><strong>7:00 PM</strong> Prayer and Bible Study</p></div></section><section class="announcement-note"><h2>Current Announcements</h2><p>Current announcements will appear here when supplied.</p></section>'''

B_CONTACT = '''<section class="page-intro"><h1>Contact Faith Baptist Church</h1><p>Call the church or open directions to the exact address.</p></section><section class="contact-layout"><div><h2>Call</h2><p><a class="phone-action" href="tel:+14193482171">419-348-2171</a></p><h2>Address</h2><p>''' + B_ADDRESS + '''</p><p><a class="btn btn-secondary" href="''' + MAPS_DIR + '''" rel="noopener">Get Directions</a></p></div><img src="/assets/church1.jpg" width="600" height="450" alt="''' + B_ALT['land'] + '''"></section>'''


# ---------------- Variant C — Gathered and Growing / Organic Biomorphic 11 ----------------


def c_image(key, class_name=''):
    src, alt, width, height = A_IMG[key]
    css_class = f' class="{class_name}"' if class_name else ''
    tag = f'<img{css_class} src="{src}" alt="{alt}" width="{width}" height="{height}">'
    return tag


C_HOME = f'''
<section class="c-home-hero c-page-shell" aria-labelledby="home-title">
  <div class="hero-copy">
    <p class="c-kicker">Fostoria, Ohio</p>
    <h1 id="home-title">Faith Baptist Church</h1>
    <p class="identity-line">{A_IDENTITY}</p>
    <div class="c-actions"><a class="c-button c-button-primary" href="/visit/">Plan Your Visit</a><a class="c-button c-button-secondary" href="/events/">View Service Times</a></div>
  </div>
  <figure class="hero-image-plate"><div class="hero-image-mask">{c_image('land')}</div></figure>
</section>
<section class="rhythm-section c-page-shell" aria-labelledby="rhythm-title">
  <div class="section-intro"><p class="c-kicker">Complete weekly schedule</p><h2 id="rhythm-title">Weekly Rhythm</h2></div>
  <ol class="weekly-rhythm">
    <li class="rhythm-stop"><p><strong>Sunday</strong> <time datetime="09:00">9:00 AM</time></p><p>Sunday School for adults and teens.</p></li>
    <li class="rhythm-stop"><p><strong>Sunday</strong> <time datetime="10:00">10:00 AM</time></p><p>Main service. Young children's Sunday School begins at 10:00 AM. A nursery for tots is available during Sunday programming.</p></li>
    <li class="rhythm-stop"><p><strong>Sunday</strong> <time datetime="18:00">6:00 PM</time></p><p>Sunday evening service.</p></li>
    <li class="rhythm-stop"><p><strong>Wednesday</strong> <time datetime="19:00">7:00 PM</time></p><p>Prayer and Bible study.</p></li>
  </ol>
</section>
<section class="growing-section c-page-shell" aria-labelledby="growing-title">
  <div class="section-intro"><p class="c-kicker">Recurring ministries</p><h2 id="growing-title">Growing Together</h2></div>
  <div class="growing-cluster">
    <article class="growing-panel panel-wide"><h3>Adults and Teens</h3><p>Sunday School at 9:00 AM.</p></article>
    <article class="growing-panel panel-tall"><h3>Young Children</h3><p>Sunday School at 10:00 AM.</p></article>
    <article class="growing-panel panel-small"><h3>Nursery</h3><p>Available for tots during Sunday programming.</p></article>
  </div>
</section>
<section class="place-section c-page-shell" aria-labelledby="place-title">
  <div class="section-intro"><p class="c-kicker">Church grounds and sanctuary</p><h2 id="place-title">A Real Place</h2></div>
  <div class="real-place-gallery">
    <figure class="place-photo place-portrait">{c_image('front')}</figure>
    <figure class="place-photo place-close">{c_image('close')}</figure>
    <figure class="place-photo place-wide">{c_image('wide')}</figure>
  </div>
</section>
<section class="belief-field c-page-shell" aria-labelledby="belief-title">
  <div><p class="c-kicker">Confirmed convictions</p><h2 id="belief-title">What We Believe</h2></div>
  <ul><li>Bible believing.</li><li>Gospel driven.</li><li>We teach from the KJV Bible.</li></ul>
  <a class="c-text-link" href="/beliefs/">Read our confirmed beliefs</a>
</section>
<section class="visit-field c-page-shell" aria-labelledby="visit-title">
  <div><p class="c-kicker">Fostoria, Ohio</p><h2 id="visit-title">Plan Your Visit</h2><address>{A_ADDRESS}</address></div>
  <div class="visit-actions"><a href="tel:{PHONE_TEL}">{A_PHONE_DISPLAY}</a><a class="c-button c-button-dark" href="{A_MAPS_DIR}" rel="noopener">Get Directions</a></div>
</section>'''

C_VISIT = f'''
<section class="inner-intro c-page-shell"><p class="c-kicker">Sunday and Wednesday</p><h1>Plan Your Visit</h1><p>Find the complete weekly schedule, location, children and nursery information, and church phone below.</p></section>
<section class="visit-quick c-page-shell" aria-label="Phone and directions"><a class="c-button c-button-primary" href="tel:{PHONE_TEL}">Call the Church</a><address>{A_ADDRESS}</address><a class="c-text-link" href="{A_MAPS_DIR}" rel="noopener">Get Directions</a></section>
<section class="visit-layout c-page-shell" aria-labelledby="visit-schedule-title">
  <div class="visit-schedule"><h2 id="visit-schedule-title">Weekly schedule</h2>
    <div class="schedule-row"><h3>Sunday School</h3><strong>9:00 AM</strong><p>Adults and teens.</p></div>
    <div class="schedule-row"><h3>Main service</h3><strong>10:00 AM</strong></div>
    <div class="schedule-row"><h3>Young children's Sunday School</h3><strong>10:00 AM</strong></div>
    <div class="schedule-row"><h3>Sunday evening service</h3><strong>6:00 PM</strong></div>
    <div class="schedule-row"><h3>Prayer and Bible study Wednesday at 7:00 PM.</h3></div>
    <div class="children-note"><h2>Children and nursery</h2><p>A nursery for tots is available during Sunday programming.</p></div>
  </div>
  <figure class="visit-photo-mask">{c_image('front')}</figure>
</section>'''

C_BELIEFS = f'''
<section class="beliefs-inner c-page-shell"><div><h1>What We Believe</h1><p>These are the confirmed convictions of Faith Baptist Church.</p><ul><li>Bible believing.</li><li>Gospel driven.</li><li>We teach from the KJV Bible.</li></ul></div><figure class="belief-photo-mask">{c_image('close')}</figure></section>'''

C_MINISTRIES = f'''
<section class="inner-intro c-page-shell"><p class="c-kicker">Recurring weekly gatherings</p><h1>Ministries</h1><p>These recurring gatherings are available each week at Faith Baptist Church.</p></section>
<section class="ministry-cluster c-page-shell" aria-label="Recurring ministries">
  <article class="ministry-shape ministry-a"><h2>Adults and teens Sunday School</h2><p>Sunday at 9:00 AM.</p></article>
  <article class="ministry-shape ministry-b"><h2>Main service</h2><p>Sunday at 10:00 AM.</p></article>
  <article class="ministry-shape ministry-c"><h2>Young children's Sunday School</h2><p>Sunday at 10:00 AM.</p></article>
  <article class="ministry-shape ministry-d"><h2>Nursery for tots</h2><p>Available during Sunday programming.</p></article>
  <article class="ministry-shape ministry-e"><h2>Sunday evening service</h2><p>Sunday at 6:00 PM.</p></article>
  <article class="ministry-shape ministry-f"><h2>Prayer and Bible study</h2><p>Wednesday at 7:00 PM.</p></article>
</section>
<figure class="ministry-photo c-page-shell">{c_image('wide')}</figure>'''

C_EVENTS = '''
<section class="inner-intro c-page-shell"><p class="c-kicker">Recurring gatherings</p><h1>Events &amp; Announcements</h1><p>The recurring weekly schedule is listed below.</p><p>Current announcements will appear here when supplied.</p></section>
<section class="rhythm-section c-page-shell" aria-labelledby="events-rhythm-title"><h2 id="events-rhythm-title">Weekly Rhythm</h2>
  <ol class="weekly-rhythm">
    <li class="rhythm-stop"><p><strong>Sunday School</strong> <time datetime="09:00">9:00 AM</time></p><p>Adults and teens.</p></li>
    <li class="rhythm-stop"><p><strong>Main service</strong> <time datetime="10:00">10:00 AM</time></p><p>Young children's Sunday School <time datetime="10:00">10:00 AM</time>. Nursery for tots during Sunday programming.</p></li>
    <li class="rhythm-stop"><p><strong>Sunday evening service</strong> <time datetime="18:00">6:00 PM</time></p></li>
    <li class="rhythm-stop"><p>Prayer and Bible study Wednesday at <time datetime="19:00">7:00 PM.</time></p></li>
  </ol>
</section>'''

C_CONTACT = f'''
<section class="inner-intro c-page-shell"><p class="c-kicker">Phone and directions</p><h1>Contact Faith Baptist Church</h1><p>Call the church or open directions to the exact address.</p></section>
<section class="contact-details c-page-shell" aria-label="Contact details"><a class="contact-phone" href="tel:{PHONE_TEL}"><span>Call the Church</span>{A_PHONE_DISPLAY}</a><address>{A_ADDRESS}</address><a class="c-button c-button-primary" href="{A_MAPS_DIR}" rel="noopener">Get Directions</a></section>
<figure class="contact-photo c-page-shell">{c_image('land')}</figure>'''


# ---------------- Variant D — Accessible & Ethical ----------------

IMG_D = {
    'front': 'Faith Baptist Church brick exterior with a white steeple and cross beneath a clear blue sky.',
    'land': 'Faith Baptist Church across a green lawn with a landscaped flower bed and white steeple.',
    'close': 'Faith Baptist Church sanctuary with a central pulpit, stone wall, wooden cross, and American flag.',
    'wide': 'Faith Baptist Church sanctuary viewed down the center aisle toward the cross and altar.',
}

D_SCHEDULE = [
    ('Sunday', 'Sunday School — adults and teens', '9:00 AM'),
    ('Sunday', 'Main Service', '10:00 AM'),
    ('Sunday', "Young Children&rsquo;s Sunday School", '10:00 AM'),
    ('Sunday', 'Nursery for tots', 'During Sunday programming'),
    ('Sunday', 'Sunday Evening Service', '6:00 PM'),
    ('Wednesday', 'Prayer &amp; Bible Study', '7:00 PM'),
]


def d_schedule_table(caption='Weekly gathering times'):
    rows = ''.join(
        '<tr>'
        f'<th scope="row" data-label="Day">{day}</th>'
        f'<td data-label="Gathering">{gathering}</td>'
        f'<td class="schedule-time" data-label="Time">{time}</td>'
        '</tr>'
        for day, gathering, time in D_SCHEDULE
    )
    return f'''
<table class="d-schedule-table">
  <caption>{caption}</caption>
  <thead><tr><th scope="col">Day</th><th scope="col">Gathering</th><th scope="col">Time</th></tr></thead>
  <tbody>{rows}</tbody>
</table>'''


D_HOME = '''
<section class="d-hero" aria-labelledby="d-home-title">
  <div class="d-hero-copy">
    <p class="d-eyebrow">Faithful gatherings in Fostoria</p>
    <h1 id="d-home-title">Faith Baptist <em>Church</em></h1>
    <p class="d-identity">Bible believing. Gospel driven. Growing together in God&rsquo;s Word.</p>
    <div class="d-hero-actions">
      <a class="btn btn-accent" href="/visit/">Plan Your Visit</a>
      <a class="btn btn-secondary" href="#weekly-schedule">View Service Times</a>
    </div>
  </div>
  <figure class="d-hero-media">
    <img src="/assets/church1.jpg" width="600" height="450" alt="''' + IMG_D['land'] + '''">
  </figure>
</section>

<section class="d-section d-questions" aria-labelledby="visitor-questions-title">
  <div class="d-section-heading">
    <p class="d-kicker">Start with what matters</p>
    <h2 id="visitor-questions-title">New Visitor Questions</h2>
  </div>
  <ul class="d-question-list">
    <li><a href="#weekly-schedule"><span class="d-question">When do you gather?</span><span class="d-answer">Sunday at 9:00 AM, 10:00 AM, and 6:00 PM; Wednesday at 7:00 PM. <strong>View schedule</strong></span></a></li>
    <li><a href="/visit/#children"><span class="d-question">What is available for children?</span><span class="d-answer">Young children&rsquo;s Sunday School meets at 10:00 AM, with nursery for tots during Sunday programming. <strong>See family details</strong></span></a></li>
    <li><a href="''' + D_MAPS_DIR + '''" rel="noopener"><span class="d-question">Where is the church?</span><span class="d-answer">11275 W. Twp. Rd. 116, Fostoria, OH 44830. <strong>Get directions</strong></span></a></li>
    <li><a href="tel:+14193482171"><span class="d-question">Would you rather call?</span><span class="d-answer">Speak with the church at (419) 348-2171. <strong>Call the Church</strong></span></a></li>
  </ul>
</section>

<section class="d-section d-weekly" id="weekly-schedule" aria-labelledby="weekly-schedule-title">
  <div class="d-section-heading">
    <p class="d-kicker">A clear weekly rhythm</p>
    <h2 id="weekly-schedule-title">Weekly Schedule</h2>
  </div>
''' + d_schedule_table() + '''
</section>

<section class="d-proof" aria-labelledby="proof-title">
  <div class="d-section d-proof-inner">
    <div class="d-section-heading">
      <p class="d-kicker">Confirmed details</p>
      <h2 id="proof-title">Verified Place and Schedule Proof</h2>
      <p>These are the church building, sanctuary, location, and direct phone details.</p>
    </div>
    <div class="d-proof-facts" aria-label="Church contact details">
      <p><span>Address</span><strong>11275 W. Twp. Rd. 116, Fostoria, OH 44830</strong></p>
      <p><span>Phone</span><a href="tel:+14193482171">(419) 348-2171</a></p>
      <a class="btn btn-accent" href="''' + D_MAPS_DIR + '''" rel="noopener">Open Directions</a>
    </div>
    <div class="d-photo-grid">
      <figure class="d-photo d-photo-portrait"><img src="/assets/front.png" width="277" height="600" loading="lazy" alt="''' + IMG_D['front'] + '''"><figcaption>Church exterior and steeple</figcaption></figure>
      <figure class="d-photo d-photo-landscape"><img src="/assets/church1.jpg" width="600" height="450" loading="lazy" alt="''' + IMG_D['land'] + '''"><figcaption>Church grounds and exterior</figcaption></figure>
      <figure class="d-photo"><img src="/assets/church2.jpg" width="450" height="600" loading="lazy" alt="''' + IMG_D['close'] + '''"><figcaption>Sanctuary and pulpit</figcaption></figure>
      <figure class="d-photo"><img src="/assets/church3.jpg" width="450" height="600" loading="lazy" alt="''' + IMG_D['wide'] + '''"><figcaption>Sanctuary from the center aisle</figcaption></figure>
    </div>
  </div>
</section>

<section class="d-section d-beliefs" aria-labelledby="confirmed-beliefs-title">
  <div class="d-section-heading">
    <p class="d-kicker">What is confirmed</p>
    <h2 id="confirmed-beliefs-title">Confirmed Beliefs</h2>
  </div>
  <div class="d-belief-grid">
    <article><h3>Bible believing</h3><p>God&rsquo;s Word shapes our life together.</p></article>
    <article><h3>Gospel driven</h3><p>The gospel remains at the center of our gatherings.</p></article>
    <article><h3>KJV Bible</h3><p>Teaching uses the King James Version.</p></article>
  </div>
</section>

<section class="d-contact-cta" aria-labelledby="contact-cta-title">
  <div>
    <p class="d-kicker">One direct next step</p>
    <h2 id="contact-cta-title">Questions before you visit?</h2>
    <p>Call Faith Baptist Church at (419) 348-2171.</p>
  </div>
  <a class="btn btn-accent" href="tel:+14193482171">Call the Church</a>
</section>'''

D_VISIT = '''
<section class="d-page-intro" aria-labelledby="visit-title">
  <p class="d-kicker">Plan with confirmed details</p>
  <h1 id="visit-title">Plan Your Visit</h1>
  <p>Find the full weekly schedule, location, directions, and children&rsquo;s ministry details in one place.</p>
</section>
<section class="d-section d-priority-details" aria-labelledby="visit-contact-title">
  <h2 id="visit-contact-title">Phone and directions</h2>
  <p><strong>Call:</strong> <a href="tel:+14193482171">(419) 348-2171</a></p>
  <p><strong>Address:</strong> 11275 W. Twp. Rd. 116, Fostoria, OH 44830</p>
  <p><a class="btn btn-accent" href="''' + D_MAPS_DIR + '''" rel="noopener">Open Directions</a></p>
</section>
<section class="d-section d-weekly" aria-labelledby="visit-schedule-title">
  <h2 id="visit-schedule-title">Full weekly schedule</h2>
''' + d_schedule_table('Confirmed weekly gathering times') + '''
</section>
<section class="d-section d-children" id="children" aria-labelledby="children-title">
  <h2 id="children-title">Children and nursery</h2>
  <p>Adults and teens meet for Sunday School at 9:00 AM. Young Children&rsquo;s Sunday School meets at 10:00 AM. A nursery is available for tots during Sunday programming.</p>
</section>
<figure class="d-inner-media">
  <img src="/assets/front.png" width="277" height="600" loading="lazy" alt="''' + IMG_D['front'] + '''">
  <figcaption>Faith Baptist Church exterior</figcaption>
</figure>'''

D_BELIEFS = '''
<section class="d-page-intro" aria-labelledby="beliefs-title">
  <p class="d-kicker">A concise foundation</p>
  <h1 id="beliefs-title">What We Believe</h1>
  <p>These are the three convictions confirmed by Faith Baptist Church.</p>
</section>
<section class="d-section d-beliefs" aria-label="Confirmed convictions">
  <div class="d-belief-grid">
    <article><h2>Bible believing</h2><p>God&rsquo;s Word shapes our life together.</p></article>
    <article><h2>Gospel driven</h2><p>The gospel remains at the center of our gatherings.</p></article>
    <article><h2>KJV Bible</h2><p>Teaching uses the King James Version.</p></article>
  </div>
</section>
<figure class="d-inner-media d-sanctuary-media">
  <img src="/assets/church2.jpg" width="450" height="600" loading="lazy" alt="''' + IMG_D['close'] + '''">
  <figcaption>Faith Baptist Church sanctuary</figcaption>
</figure>'''

D_MINISTRIES = '''
<section class="d-page-intro" aria-labelledby="ministries-title">
  <p class="d-kicker">Gather throughout the week</p>
  <h1 id="ministries-title">Ministries</h1>
  <p>Explore the confirmed Sunday and Wednesday ministries for adults, teens, children, and tots.</p>
</section>
<section class="d-section d-ministry-list" aria-labelledby="ministry-list-title">
  <h2 id="ministry-list-title">Weekly ministries</h2>
  <dl>
    <div><dt>Adults &amp; Teens Sunday School</dt><dd>Sunday at <span class="schedule-time">9:00 AM</span></dd></div>
    <div><dt>Main Service</dt><dd>Sunday at <span class="schedule-time">10:00 AM</span></dd></div>
    <div><dt>Young Children&rsquo;s Sunday School</dt><dd>Sunday at <span class="schedule-time">10:00 AM</span></dd></div>
    <div><dt>Nursery</dt><dd>For tots during Sunday programming</dd></div>
    <div><dt>Sunday Evening Service</dt><dd>Sunday at <span class="schedule-time">6:00 PM</span></dd></div>
    <div><dt>Prayer &amp; Bible Study</dt><dd>Wednesday at <span class="schedule-time">7:00 PM</span></dd></div>
  </dl>
</section>'''

D_EVENTS = '''
<section class="d-page-intro" aria-labelledby="events-title">
  <p class="d-kicker">The recurring church week</p>
  <h1 id="events-title">Events &amp; Announcements</h1>
  <p>Use this confirmed weekly schedule to choose a gathering.</p>
</section>
<section class="d-section d-weekly" aria-labelledby="events-schedule-title">
  <h2 id="events-schedule-title">Recurring weekly schedule</h2>
''' + d_schedule_table('Recurring weekly gatherings') + '''
  <p class="d-announcement-note">Announcements appear here when supplied.</p>
</section>'''

D_CONTACT = '''
<section class="d-page-intro" aria-labelledby="contact-title">
  <p class="d-kicker">Direct church contact</p>
  <h1 id="contact-title">Contact</h1>
  <p>Call the church or open directions to the confirmed Fostoria address.</p>
</section>
<section class="d-section d-priority-details" aria-labelledby="contact-details-title">
  <h2 id="contact-details-title">Phone and location</h2>
  <p class="d-contact-phone"><a href="tel:+14193482171">(419) 348-2171</a></p>
  <address>11275 W. Twp. Rd. 116, Fostoria, OH 44830</address>
  <div class="d-contact-actions">
    <a class="btn btn-accent" href="tel:+14193482171">Call the Church</a>
    <a class="btn btn-secondary" href="''' + D_MAPS_DIR + '''" rel="noopener">Open Directions</a>
  </div>
</section>
<figure class="d-inner-media">
  <img src="/assets/front.png" width="277" height="600" loading="lazy" alt="''' + IMG_D['front'] + '''">
  <figcaption>Faith Baptist Church exterior</figcaption>
</figure>'''


PAGES = {
    'a': [
        ('', 'Welcome to Faith Baptist Church | Fostoria, Ohio', 'Faith Baptist Church service times and visit information in Fostoria, Ohio.', A_HOME),
        ('visit', 'Plan Your Visit | Faith Baptist Church', 'Service times, directions, children, and nursery information for Faith Baptist Church.', A_VISIT),
        ('beliefs', 'What We Believe | Faith Baptist Church', 'Bible believing. Gospel driven. KJV Bible.', A_BELIEFS),
        ('ministries', 'Recurring Ministries | Faith Baptist Church', 'Confirmed recurring gatherings at Faith Baptist Church.', A_MINISTRIES),
        ('events', 'Weekly Services and Announcements | Faith Baptist Church', 'The confirmed weekly schedule for Faith Baptist Church.', A_EVENTS),
        ('contact', 'Contact Faith Baptist Church | Phone and Directions', 'Phone, address, and directions for Faith Baptist Church in Fostoria, Ohio.', A_CONTACT),
    ],
    'b': [
        ('', 'Faith Baptist Church | Sunday Starts Here | Fostoria, OH', 'Sunday School 9:00 AM, worship 10:00 AM, evening service 6:00 PM. Plan your visit to Faith Baptist Church in Fostoria, Ohio.', B_HOME),
        ('visit', 'Plan Your Visit | Faith Baptist Church', 'Your first-Sunday checklist: times, kids, location, and what to expect.', B_VISIT),
        ('beliefs', 'What We Believe | Faith Baptist Church', 'Bible believing. Gospel driven. KJV foundation.', B_BELIEFS),
        ('ministries', 'Ministries | Faith Baptist Church', 'Six weekly ministries for every age at Faith Baptist Church.', B_MINISTRIES),
        ('events', 'Events and Announcements | Faith Baptist Church', 'The weekly rhythm of Faith Baptist Church gatherings.', B_EVENTS),
        ('contact', 'Contact | Faith Baptist Church', 'Tap to call Faith Baptist Church: (419) 348-2171.', B_CONTACT),
    ],
    'c': [
        ('', 'Faith Baptist Church | Service Times and Visit Information', 'Faith Baptist Church service times, location, and visit information in Fostoria, Ohio.', C_HOME),
        ('visit', 'Plan Your Visit | Faith Baptist Church', 'Complete service times, directions, children, nursery, and phone information.', C_VISIT),
        ('beliefs', 'What We Believe | Faith Baptist Church', 'Bible believing, gospel driven, and teaching from the KJV Bible.', C_BELIEFS),
        ('ministries', 'Recurring Ministries | Faith Baptist Church', 'Recurring Sunday and Wednesday gatherings at Faith Baptist Church.', C_MINISTRIES),
        ('events', 'Weekly Schedule and Announcements | Faith Baptist Church', 'The recurring weekly schedule and announcements for Faith Baptist Church.', C_EVENTS),
        ('contact', 'Contact Faith Baptist Church | Phone and Directions', 'Phone, address, and directions for Faith Baptist Church.', C_CONTACT),
    ],
    'd': [
        ('', 'Faith Baptist Church — Fostoria, Ohio', 'Bible believing. Gospel driven. Growing together in God’s Word. View confirmed gathering times and plan your visit.', D_HOME),
        ('visit', 'Plan Your Visit — Faith Baptist Church', 'Confirmed gathering times, directions, and children’s ministry details for Faith Baptist Church.', D_VISIT),
        ('beliefs', 'What We Believe — Faith Baptist Church', 'Bible believing. Gospel driven. Teaching from the KJV Bible.', D_BELIEFS),
        ('ministries', 'Ministries — Faith Baptist Church', 'Confirmed Sunday and Wednesday ministries at Faith Baptist Church.', D_MINISTRIES),
        ('events', 'Events & Announcements — Faith Baptist Church', 'Recurring weekly gatherings and supplied announcements at Faith Baptist Church.', D_EVENTS),
        ('contact', 'Contact — Faith Baptist Church', 'Phone, address, and directions to Faith Baptist Church in Fostoria, Ohio.', D_CONTACT),
    ],
}


def main():
    if os.path.exists(SITE):
        shutil.rmtree(SITE)
    for v in ('a', 'b', 'c', 'd'):
        os.makedirs(f'{SITE}/{v}/assets', exist_ok=True)
        for slug, title, desc, body in PAGES[v]:
            folder = '' if slug == '' else slug
            outdir = os.path.join(SITE, v, folder)
            os.makedirs(outdir, exist_ok=True)
            html = page(v, slug, title, desc, body)
            with open(os.path.join(outdir, 'index.html'), 'w') as f:
                f.write(html)
        # per-variant stylesheet
        shutil.copy(f'{ROOT}/styles-{v}.css', f'{SITE}/{v}/styles.css')
        if v == 'b':
            shutil.copy(f'{ROOT}/nginx-b.conf', f'{SITE}/{v}/nginx.conf')
        for fn in ('front.png', 'church1.jpg', 'church2.jpg', 'church3.jpg'):
            shutil.copy(f'{ROOT}/assets/{fn}', f'{SITE}/{v}/assets/{fn}')
        if v == 'c':
            c_fonts = os.path.join(SITE, 'c', 'assets', 'fonts')
            os.makedirs(c_fonts, exist_ok=True)
            for fn in C_FONT_ASSETS:
                shutil.copy(os.path.join(ROOT, 'assets', 'fonts', fn), os.path.join(c_fonts, fn))
            for source, alias in (
                ('Fraunces-Latin.woff2', 'fraunces-latin.woff2'),
                ('Karla-Latin.woff2', 'karla-latin.woff2'),
            ):
                shutil.copy(os.path.join(ROOT, 'assets', 'fonts', source), os.path.join(c_fonts, alias))
    e_root = os.path.join(SITE, 'e')
    os.makedirs(os.path.join(e_root, 'assets'), exist_ok=True)
    for slug, title, desc, body in variant_e.PAGES:
        outdir = e_root if not slug else os.path.join(e_root, slug)
        os.makedirs(outdir, exist_ok=True)
        with open(os.path.join(outdir, 'index.html'), 'w') as output:
            output.write(variant_e.page(slug, title, desc, body))
    shutil.copy(f'{ROOT}/styles-e.css', os.path.join(e_root, 'styles.css'))
    for fn in ('front.png', 'church1.jpg', 'church2.jpg', 'church3.jpg'):
        shutil.copy(f'{ROOT}/assets/{fn}', os.path.join(e_root, 'assets', fn))
    e_fonts = os.path.join(e_root, 'assets', 'fonts')
    os.makedirs(e_fonts, exist_ok=True)
    for fn in E_FONT_ASSETS:
        shutil.copy(os.path.join(ROOT, 'assets', 'fonts', fn), os.path.join(e_fonts, fn))
    print('Built.')


if __name__ == '__main__':
    main()
