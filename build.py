#!/usr/bin/env python3
"""Build Faith Baptist Church preview site: variants A/B/C, static HTML, 6 routes each."""
import os, shutil

ROOT = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.join(ROOT, 'variants')
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


def nav(active):
    links = ''
    for h, t in NAV_LINKS:
        cls = ' class="active" aria-current="page"' if h == active else ''
        href = '/' if h == '/' else h + '/'
        links += f'<a href="{href}"{cls}>{t}</a>'
    return f'''
<header class="site-header">
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="brand">
    <span class="mark" aria-hidden="true">&#10013;</span>
    <span class="word">Faith Baptist <strong>Church</strong></span>
  </div>
  <nav class="nav" aria-label="Main">{links}</nav>
</header>'''


def footer():
    return f'''
<footer class="site-footer">
  <p><strong>{NAME}</strong></p>
  <p>{ADDRESS}</p>
  <p><a href="tel:{PHONE_TEL}">{PHONE_DISPLAY}</a></p>
  <p><a href="{MAPS_DIR}" rel="noopener">Google Maps Directions</a></p>
  <nav aria-label="Footer">
    {''.join(f'<a href="/{"" if h=="/" else h+"/"}">{t}</a>' for h, t in NAV_LINKS)}
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

def page(variant, slug, title, desc, body):
    if variant == 'a':
        active = '/' + slug if slug else '/'
        html = HEAD_A.format(title=title, desc=desc, slug=slug or 'home', nav=nav_a(active))
        return html + body + '\n</main>\n' + footer_a() + '\n</body>\n</html>\n'
    html = HEAD.format(title=title, desc=desc, variant=variant, slug=slug,
                       nav=nav('/' + slug if slug else '/'))
    return html + body + '\n</main>\n' + footer() + '\n</body>\n</html>\n'


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
  <div class="pathway"><h3>Plan Your Visit</h3><p>See the full schedule, address, and information for children and nursery.</p><a href="/visit/">Visit information</a></div>
  <div class="pathway"><h3>View Service Times</h3><p>Sunday gatherings begin at 9:00 AM, 10:00 AM, and 6:00 PM. Wednesday prayer and Bible study begins at 7:00 PM.</p><a href="/events/">Weekly schedule</a></div>
  <div class="pathway"><h3>Call the Church</h3><p><a href="tel:{PHONE_TEL}">{A_PHONE_DISPLAY}</a></p></div>
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


# ---------------- Variant B — Sunday Starts Here ----------------

B_HOME = '''
<section class="topbar" aria-label="Quick contact"><a href="tel:+14193482171">(419) 348-2171</a></section>
<section class="split-hero">
<div class="photo"><img src="/assets/front.png" alt="''' + IMG['front'][1] + '''"></div>
<div class="panel">
<p class="eyebrow">SUNDAY STARTS HERE</p>
<h1>Faith Baptist Church</h1>
<p class="sub">''' + TAGLINE + '''</p>
<div class="times-panel"><p class="eyebrow">THIS SUNDAY</p>
<p><strong>Sunday School</strong> 9:00 AM</p><p><strong>Morning Worship</strong> 10:00 AM</p><p><strong>Evening Service</strong> 6:00 PM</p><p><strong>Wednesday Prayer &amp; Bible Study</strong> 7:00 PM</p></div>
<p>''' + CTA_PLAN + '''</p>
</div>
</section>
<section class="tasks">
<div class="card"><h2>This Sunday</h2><p>Sunday School 9:00 AM &middot; Worship 10:00 AM &middot; Evening 6:00 PM</p></div>
<div class="card"><h2>For Children</h2><p>Young children&rsquo;s class at 10:00 AM and nursery care for tots.</p></div>
<div class="card"><h2>Wednesday Prayer</h2><p>Prayer &amp; Bible Study every Wednesday at 7:00 PM.</p></div>
<div class="card"><h2>Directions</h2><p>11275 W. Township Rd. 116, Fostoria, OH 44830.</p><p><a href="''' + MAPS_DIR + '''" rel="noopener">Open in Google Maps</a></p></div>
</section>
<section class="min-list">
<h2>Ministry details</h2>
<ul>
<li><a href="/ministries/#adults-teens">Adults &amp; Teens Sunday School &mdash; 9:00 AM</a></li>
<li><a href="/ministries/#worship">Morning Worship &mdash; 10:00 AM</a></li>
<li><a href="/ministries/#children">Young Children&rsquo;s Class &mdash; 10:00 AM</a></li>
<li><a href="/ministries/#nursery">Nursery for tots &mdash; during Sunday programming</a></li>
<li><a href="/ministries/#prayer">Prayer &amp; Bible Study &mdash; Wednesday 7:00 PM</a></li>
</ul>
</section>
<section class="loc-close">
<h2>New here? Come a few minutes early &mdash; we will save you a seat.</h2>
<p class="addr">11275 W. Township Rd. 116, Fostoria, OH 44830</p>
<p><a class="btn btn-call" href="tel:+14193482171">Call (419) 348-2171</a> <a class="btn btn-primary" href="''' + MAPS_DIR + '''" rel="noopener">Directions</a></p>
</section>'''

B_VISIT = '''
<section><h1>Plan Your Visit</h1>
<img class="feature" src="/assets/front.png" alt="''' + IMG['front'][1] + '''">
<p class="eyebrow">CHECKLIST FOR YOUR FIRST SUNDAY</p></section>
<section id="times"><h2>Times</h2>''' + sched_table() + '''</section>
<section id="kids"><h2>Kids</h2><p>Nursery available for tots during Sunday programming. Young children&rsquo;s Sunday School meets at 10:00 AM; adults and teens at 9:00 AM.</p></section>
<section id="location"><h2>Location</h2><p>11275 W. Township Rd. 116, Fostoria, OH 44830</p>
<p><a class="btn btn-primary" href="''' + MAPS_DIR + '''" rel="noopener">Google Maps Directions</a></p></section>
<section id="expect"><h2>What to expect</h2><ul><li>A warm welcome from a Bible believing, gospel driven church family.</li><li>Teaching from the KJV Bible.</li><li>Room for your whole family, tots to teens.</li></ul></section>'''

B_BELIEFS = '''
<section><h1>What We Believe</h1>
<p class="lede">Bible believing. Gospel driven. Growing together in God&rsquo;s Word.</p>
<div class="split"><img src="/assets/church2.jpg" alt="''' + IMG['close'][1] + '''">
<dl><dt>The Bible</dt><dd>God&rsquo;s Word, taught from the King James Version.</dd>
<dt>The Gospel</dt><dd>Christ at the center of everything we do.</dd>
<dt>Growing together</dt><dd>One church family, learning side by side.</dd></dl></div>
<p>Join us Sunday at 10:00 AM.</p></section>'''

B_MINISTRIES = '''
<section><h1>Ministries</h1><p>Six weekly ways to grow at Faith Baptist Church.</p></section>
<section class="two-col">
<ul>
<li id="adults-teens"><strong>Adults &amp; Teens Sunday School</strong> &mdash; Sundays 9:00 AM</li>
<li id="worship"><strong>Morning Worship</strong> &mdash; Sundays 10:00 AM</li>
<li id="children"><strong>Young Children&rsquo;s Sunday School</strong> &mdash; Sundays 10:00 AM</li>
<li id="nursery"><strong>Nursery</strong> &mdash; for tots, during Sunday programming</li>
<li id="evening"><strong>Sunday Evening Service</strong> &mdash; 6:00 PM</li>
<li id="prayer"><strong>Prayer &amp; Bible Study</strong> &mdash; Wednesdays 7:00 PM</li>
</ul>
</section>
<img class="feature" src="/assets/church3.jpg" alt="''' + IMG['wide'][1] + '''">
<p><a class="btn btn-primary" href="/visit/">Plan Your Visit</a></p>'''

B_EVENTS = '''
<section><h1>Events &amp; Announcements</h1>
<p class="eyebrow">OUR WEEKLY RHYTHM</p>''' + sched_table() + '''
<p>Watch this space for upcoming announcements &mdash; and hear them first on Sunday morning.</p></section>'''

B_CONTACT = '''
<section><h1>Contact</h1>
<p class="tap-call"><a href="tel:+14193482171">Tap to call<br>(419) 348-2171</a></p>
<p>11275 W. Township Rd. 116, Fostoria, OH 44830</p>
<p><a class="btn btn-primary" href="''' + MAPS_DIR + '''" rel="noopener">Get Directions</a></p>
<img class="feature" src="/assets/front.png" alt="''' + IMG['front'][1] + '''"></section>'''


# ---------------- Variant C — Rooted & Rising ----------------

C_HOME = '''
<section class="opening">
<div class="display"><h1><span class="line1">Rooted</span> <span class="line2">in the Word</span></h1>
<p class="subline">Centered on the Gospel. A church family for Fostoria.</p>
<p>''' + CTA_PLAN + '''</p></div>
<img src="/assets/front.png" alt="''' + IMG['front'][1] + '''">
</section>
<section class="timetable">
<h2>Service timetable</h2>
<table><caption>Every week at Faith Baptist Church</caption><tbody>
<tr><th scope="row">Sunday</th><td class="num">9:00</td><td>Sunday School &mdash; adults and teens</td></tr>
<tr><th scope="row">Sunday</th><td class="num">10:00</td><td>Main Service &middot; young children&rsquo;s Sunday School &middot; nursery for tots</td></tr>
<tr><th scope="row">Sunday</th><td class="num">6:00</td><td>Evening Service</td></tr>
<tr><th scope="row">Wednesday</th><td class="num">7:00</td><td>Prayer &amp; Bible Study</td></tr>
</tbody></table>
</section>
<section class="arch-band">
<img src="/assets/church1.jpg" alt="''' + IMG['land'][1] + '''">
<img src="/assets/church3.jpg" alt="''' + IMG['wide'][1] + '''">
</section>
<section class="story">
<img src="/assets/church2.jpg" alt="''' + IMG['close'][1] + '''">
<div><h2>Bible believing. Gospel driven.</h2>
<p>We teach from the KJV Bible and keep the gospel at the center of everything.</p>
<h2>A rhythm for the week</h2>
<p>Sunday School, morning and evening worship, and midweek prayer hold our family together from one Lord&rsquo;s Day to the next.</p>
<p><a href="/beliefs/">What we believe</a> &middot; <a href="/ministries/">Our ministries</a></p></div>
</section>
<section class="visit-close">
<img src="/assets/front.png" alt="''' + IMG['front'][1] + '''">
<div class="plate"><h2>Visit us</h2><p>11275 W. Township Rd. 116, Fostoria, OH 44830</p>
<p><a href="tel:+14193482171">(419) 348-2171</a></p>
<p>''' + CTA_PLAN + '</p></div></section>'''

C_VISIT = '''
<section><h1>Plan Your Visit</h1><p class="lede">One visit and you will know you are home.</p></section>
<section class="timetable"><h2>When to come</h2>
<table><tbody>
<tr><th scope="row">Sunday</th><td class="num">9:00</td><td>Sunday School &mdash; adults and teens</td></tr>
<tr><th scope="row">Sunday</th><td class="num">10:00</td><td>Main Service &middot; children&rsquo;s class &middot; nursery</td></tr>
<tr><th scope="row">Sunday</th><td class="num">6:00</td><td>Evening Service</td></tr>
<tr><th scope="row">Wednesday</th><td class="num">7:00</td><td>Prayer &amp; Bible Study</td></tr>
</tbody></table></section>
<section><h2>Where</h2><p>11275 W. Township Rd. 116, Fostoria, OH 44830</p><p><a class="btn btn-primary" href="''' + MAPS_DIR + '''" rel="noopener">Directions</a></p></section>
<section><h2>Bring the kids</h2><p>Nursery for tots and a dedicated young children&rsquo;s class mean the whole family is cared for.</p></section>
<img class="feature" src="/assets/front.png" alt="''' + IMG['front'][1] + '''">'''

C_BELIEFS = '''
<section class="opening-line"><h1>&ldquo;Rooted in the Word. Centered on the Gospel.&rdquo;</h1></section>
<section class="editorial">
<p class="lede">This is what holds us: the Bible, the gospel, and a family growing together in God&rsquo;s Word.</p>
<p>We are Bible believing. We preach Christ crucified and risen. And we open the King James Bible together every Sunday and Wednesday, letting the Word do its work in us.</p>
<dl><dt>Bible believing</dt><dd>The Scriptures are our foundation &mdash; taught plainly from the KJV.</dd>
<dt>Gospel driven</dt><dd>The good news of Jesus shapes our worship, our preaching, our week.</dd>
<dt>Growing together</dt><dd>No one grows alone here. From the nursery to the Wednesday study, we grow as one family.</dd></dl>
<p>Sundays at 9:00 and 10:00 AM. Wednesdays at 7:00 PM.</p></section>
<img class="feature" src="/assets/church2.jpg" alt="''' + IMG['close'][1] + '''">'''

C_MINISTRIES = '''
<section><h1>Ministries</h1><p class="lede">Measured, faithful, every week.</p></section>
<section class="timetable">
<table><tbody>
<tr><th scope="row">Adults &amp; Teens</th><td class="num">9:00</td><td>Sunday School opens the day in the Word.</td></tr>
<tr><th scope="row">Worship</th><td class="num">10:00</td><td>The gathered church sings, prays, and hears the Word preached.</td></tr>
<tr><th scope="row">Children</th><td class="num">10:00</td><td>Young children&rsquo;s Sunday School alongside nursery care for tots.</td></tr>
<tr><th scope="row">Evening</th><td class="num">6:00</td><td>Sunday Evening Service closes the Lord&rsquo;s Day together.</td></tr>
<tr><th scope="row">Midweek</th><td class="num">7:00</td><td>Prayer &amp; Bible Study every Wednesday.</td></tr>
</tbody></table></section>
<img class="feature" src="/assets/church3.jpg" alt="''' + IMG['wide'][1] + '''">'''

C_EVENTS = '''
<section><h1>Events &amp; Announcements</h1><p class="lede">The same table, set every week.</p></section>
<section class="timetable"><h2>This week &mdash; and every week</h2>
<table><tbody>
<tr><th scope="row">Sun</th><td class="num">9:00</td><td>Sunday School (adults &amp; teens)</td></tr>
<tr><th scope="row">Sun</th><td class="num">10:00</td><td>Morning Service &middot; children&rsquo;s class &middot; nursery</td></tr>
<tr><th scope="row">Sun</th><td class="num">6:00</td><td>Evening Service</td></tr>
<tr><th scope="row">Wed</th><td class="num">7:00</td><td>Prayer &amp; Bible Study</td></tr>
</tbody></table>
<p>Announcements are made in each service.</p></section>'''

C_CONTACT = '''
<section><h1>Contact</h1>
<p class="big-tel"><a href="tel:+14193482171">(419) 348-2171</a></p>
<p>11275 W. Township Rd. 116, Fostoria, OH 44830</p>
<p><a class="btn btn-primary" href="''' + MAPS_DIR + '''" rel="noopener">Get Directions</a></p></section>
<img class="feature" src="/assets/front.png" alt="''' + IMG['front'][1] + '''">'''


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
        ('', 'Faith Baptist Church — Sunday Starts Here | Fostoria, OH', 'Sunday School 9:00 AM, worship 10:00 AM, evening service 6:00 PM. Plan your visit to Faith Baptist Church in Fostoria, Ohio.', B_HOME),
        ('visit', 'Plan Your Visit — Faith Baptist Church', 'Your first-Sunday checklist: times, kids, location, and what to expect.', B_VISIT),
        ('beliefs', 'What We Believe — Faith Baptist Church', 'Bible believing. Gospel driven. KJV foundation.', B_BELIEFS),
        ('ministries', 'Ministries — Faith Baptist Church', 'Six weekly ministries for every age at Faith Baptist Church.', B_MINISTRIES),
        ('events', 'Events & Announcements — Faith Baptist Church', 'The weekly rhythm of Faith Baptist Church gatherings.', B_EVENTS),
        ('contact', 'Contact — Faith Baptist Church', 'Tap to call Faith Baptist Church: (419) 348-2171.', B_CONTACT),
    ],
    'c': [
        ('', 'Faith Baptist Church — Rooted in the Word', 'Rooted in the Word. Centered on the Gospel. A church family for Fostoria, Ohio.', C_HOME),
        ('visit', 'Plan Your Visit — Faith Baptist Church', 'When to come, where we are, and how your family fits in.', C_VISIT),
        ('beliefs', 'What We Believe — Faith Baptist Church', 'Rooted in the Word. Centered on the Gospel. Taught from the KJV Bible.', C_BELIEFS),
        ('ministries', 'Ministries — Faith Baptist Church', 'A measured weekly rhythm of ministry at Faith Baptist Church.', C_MINISTRIES),
        ('events', 'Events & Announcements — Faith Baptist Church', 'Every week at Faith Baptist Church, in one timetable.', C_EVENTS),
        ('contact', 'Contact — Faith Baptist Church', 'Phone, address, and directions to Faith Baptist Church.', C_CONTACT),
    ],
}


def main():
    if os.path.exists(SITE):
        shutil.rmtree(SITE)
    for v in ('a', 'b', 'c'):
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
        for fn in ('front.png', 'church1.jpg', 'church2.jpg', 'church3.jpg'):
            shutil.copy(f'{ROOT}/assets/{fn}', f'{SITE}/{v}/assets/{fn}')
    print('Built.')


if __name__ == '__main__':
    main()
