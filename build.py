#!/usr/bin/env python3
"""Build Faith Chapel Church preview site: variants A/B/C, static HTML, 6 routes each."""
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

NAME = 'Faith Chapel Church'
ADDRESS = '11275 W. Township Rd. 116, Fostoria, OH 44830'
PHONE_DISPLAY = '(419) 348-2171'
PHONE_TEL = '+14193482171'
MAPS_DIR = 'https://www.google.com/maps/dir/?api=1&destination=11275+W.+Township+Rd.+116%2C+Fostoria%2C+OH+44830'
TAGLINE = "Bible believing. Gospel driven. Growing together in God&rsquo;s Word."
POSITIONING = 'Rooted in the Word. Centered on the Gospel. A church family for Fostoria.'

IMG = {
    'front': ('/assets/front.png', 'Faith Chapel Church exterior with white steeple and cross'),
    'land':  ('/assets/church1.jpg', 'Faith Chapel Church building and grounds, wide exterior view'),
    'close': ('/assets/church2.jpg', 'Inside the sanctuary of Faith Chapel Church, close view of pulpit area'),
    'wide':  ('/assets/church3.jpg', 'Wide view of the Faith Chapel Church sanctuary'),
}

NAV_LINKS = [
    ('/', 'Home'),
    ('/visit', 'Plan Your Visit'),
    ('/beliefs', 'What We Believe'),
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
        href = 'index.html' if h == '/' else h + '/'
        links += f'<a href="{href}"{cls}>{t}</a>'
    return f'''
<header class="site-header">
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="brand">
    <span class="mark" aria-hidden="true">&#10013;</span>
    <span class="word">Faith Chapel <strong>Church</strong></span>
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

def page(variant, slug, title, desc, body):
    html = HEAD.format(title=title, desc=desc, variant=variant, slug=slug,
                       nav=nav('/' + slug if slug else '/'))
    return html + body + '\n</main>\n' + footer() + '\n</body>\n</html>\n'


# ---------------- shared sections ----------------

def sched_table(cls='schedule-table'):
    rows = ''.join(f'<tr><th scope="row">{d}</th><td>{t}</td><td>{x}</td></tr>' for d, t, x in SCHEDULE)
    return f'<table class="{cls}"><caption>Weekly gathering times</caption><tbody>{rows}</tbody></table>'


CTA_PLAN = '<a class="btn btn-primary" href="/visit/">Plan Your Visit</a>'
CTA_TIMES = '<a class="btn btn-ghost" href="/events/">View Service Times</a>'

WELCOME_A = '''
<section class="welcome">
<h2>Welcome home</h2>
<p>We are a Bible believing, gospel driven church family in Fostoria, Ohio &mdash; growing together in God&rsquo;s Word. Whether you have never set foot in a church or you are looking for a place to plug back in, you are welcome at Faith Chapel.</p>
</section>'''

PATHWAYS_A = '''
<section class="pathways">
<h2>Planning your first visit?</h2>
<div class="steps">
<div><h3>1. See the schedule</h3><p>Sunday School starts at 9:00 AM and morning worship at 10:00 AM.</p><p><a href="/visit/">See the full schedule</a></p></div>
<div><h3>2. Bring your children</h3><p>A nursery is available for tots, and young children have their own Sunday School at 10:00 AM.</p></div>
<div><h3>3. Find us</h3><p>11275 W. Township Rd. 116, Fostoria, OH 44830.</p><p><a href="''' + MAPS_DIR + '''" rel="noopener">Get directions</a></p></div>
</div>
</section>'''

BELIEFS_SNIPPET = '''
<section class="beliefs-summary">
<div class="split"><img src="/assets/church2.jpg" alt="''' + IMG['close'][1] + '''">
<div><h2>What we believe</h2>
<p>Bible believing. Gospel driven. Teaching from the KJV Bible.</p>
<p><a href="/beliefs/">Read what we believe</a></p></div></div>
</section>'''

MINISTRY_GRID = '''
<section class="grid">
<h2>For every member of the family</h2>
<div class="cards">
<div class="card"><h3>Adults &amp; Teens Sunday School</h3><p class="time">9:00 AM</p><p><a href="/ministries/">More about Sunday School</a></p></div>
<div class="card"><h3>Young Children&rsquo;s Class</h3><p class="time">10:00 AM</p><p><a href="/ministries/">More about children&rsquo;s classes</a></p></div>
<div class="card"><h3>Nursery</h3><p class="time">Tots welcome</p><p><a href="/ministries/">More about the nursery</a></p></div>
<div class="card"><h3>Prayer &amp; Bible Study</h3><p class="time">Wednesday 7:00 PM</p><p><a href="/ministries/">Midweek study details</a></p></div>
</div>
</section>'''

DIRECTIONS_CLOSE = '''
<section class="directions-close">
<h2>Come see us this Sunday</h2>
<p class="addr">11275 W. Township Rd. 116, Fostoria, OH 44830</p>
<p><a class="tel" href="tel:+14193482171">(419) 348-2171</a></p>
<p><a class="btn btn-primary" href="''' + MAPS_DIR + '''" rel="noopener">Get Directions</a> <a class="btn btn-ghost" href="/visit/">Plan Your Visit</a></p>
</section>'''


# ---------------- Variant A — The Open Door ----------------

A_HOME = '''
<section class="hero">
<img src="/assets/church1.jpg" alt="''' + IMG['land'][1] + '''">
<div class="hero-text"><h1>Faith Chapel Church</h1><p>''' + TAGLINE + '''</p>
<p>''' + CTA_PLAN + ' ' + CTA_TIMES + '''</p></div>
</section>
<section class="strip" aria-label="Service times">
<ul><li><strong>Sunday School</strong> 9:00 AM</li><li><strong>Main Service</strong> Sunday 10:00 AM</li><li><strong>Children&rsquo;s Sunday School</strong> 10:00 AM</li><li><strong>Evening Service</strong> 6:00 PM</li><li><strong>Prayer &amp; Bible Study</strong> Wednesday 7:00 PM</li></ul>
</section>
''' + WELCOME_A + PATHWAYS_A + MINISTRY_GRID + BELIEFS_SNIPPET + '''
<section class="band"><img src="/assets/church3.jpg" alt="''' + IMG['wide'][1] + '''"><p>You have a place in the sanctuary this Sunday.</p></section>
''' + DIRECTIONS_CLOSE

A_VISIT = '''
<section><h1>Plan Your Visit</h1>
<img class="feature" src="/assets/front.png" alt="''' + IMG['front'][1] + '''">
<p>We would love to have you join us. Here is everything you need to walk through our doors for the first time.</p></section>
<section><h2>Service times</h2>''' + sched_table() + '''</section>
<section><h2>Where to find us</h2><p>11275 W. Township Rd. 116, Fostoria, OH 44830</p>
<p><a class="btn btn-primary" href="''' + MAPS_DIR + '''" rel="noopener">Google Maps Directions</a></p></section>
<section><h2>Children &amp; nursery</h2><p>A nursery is available for tots during Sunday programming. Young children have their own Sunday School class at 10:00 AM while adults and teens meet at 9:00 AM.</p></section>
<section><h2>Your first Sunday</h2><ul><li>Come as you are &mdash; you will be welcomed like family.</li><li>Sunday School for adults and teens begins at 9:00 AM.</li><li>Main service is at 10:00 AM, with nursery and young children&rsquo;s class at that hour.</li><li>Questions? Call us at <a href="tel:+14193482171">(419) 348-2171</a>.</li></ul></section>'''

A_BELIEFS = '''
<section class="quiet"><h1>What We Believe</h1>
<p class="lede">Bible believing. Gospel driven. Growing together in God&rsquo;s Word.</p>
<dl><dt>The Bible</dt><dd>We believe the Bible is God&rsquo;s Word, and we teach from the King James Version.</dd>
<dt>The Gospel</dt><dd>Everything we do centers on the good news of Jesus Christ.</dd>
<dt>Growing together</dt><dd>As a church family we grow together in God&rsquo;s Word, week by week.</dd></dl>
<p>Come and sit under the Word with us &mdash; Sundays at 9:00 and 10:00 AM.</p></section>
<img class="feature" src="/assets/church2.jpg" alt="''' + IMG['close'][1] + '''">'''

A_MINISTRIES = '''
<section><h1>Ministries</h1><p>There is a place for every member of your family at Faith Chapel Church.</p></section>
<section class="cards"><div class="card"><h2>Adults &amp; Teens Sunday School</h2><p class="time">9:00 AM</p><p>Open the Word together before worship.</p></div>
<div class="card"><h2>Morning Worship</h2><p class="time">10:00 AM</p><p>The whole church gathers to sing, pray, and hear the preaching of God&rsquo;s Word.</p></div>
<div class="card"><h2>Young Children&rsquo;s Sunday School</h2><p class="time">10:00 AM</p><p>Age-appropriate teaching during the main service.</p></div>
<div class="card"><h2>Nursery</h2><p class="time">Tots</p><p>Loving care for your littlest ones during Sunday programming.</p></div>
<div class="card"><h2>Prayer &amp; Bible Study</h2><p class="time">Wednesday 7:00 PM</p><p>Midweek prayer and study to carry you through the week.</p></div></section>
<img class="feature" src="/assets/church3.jpg" alt="''' + IMG['wide'][1] + '''">'''

A_EVENTS = '''
<section><h1>Events &amp; Announcements</h1>
<p>Our week has a steady rhythm &mdash; these gatherings happen every single week.</p>''' + sched_table() + '''</section>
<section><h2>Announcements</h2><p>Special events are announced in our services. Join us any Sunday to hear what is coming up next.</p></section>'''

A_CONTACT = '''
<section><h1>Contact</h1>
<p>We would love to hear from you or better yet, see you this Sunday.</p>
<p class="big-tel"><a href="tel:+14193482171">Call the Church<br>(419) 348-2171</a></p>
<p><strong>Address:</strong> 11275 W. Township Rd. 116, Fostoria, OH 44830</p>
<p><a class="btn btn-primary" href="''' + MAPS_DIR + '''" rel="noopener">Get Directions on Google Maps</a></p>
<p><a class="btn btn-ghost" href="/visit/">Plan Your Visit</a></p></section>'''


# ---------------- Variant B — Sunday Starts Here ----------------

B_HOME = '''
<section class="topbar" aria-label="Quick contact"><a href="tel:+14193482171">(419) 348-2171</a></section>
<section class="split-hero">
<div class="photo"><img src="/assets/front.png" alt="''' + IMG['front'][1] + '''"></div>
<div class="panel">
<p class="eyebrow">SUNDAY STARTS HERE</p>
<h1>Faith Chapel Church</h1>
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
<section><h1>Ministries</h1><p>Six weekly ways to grow at Faith Chapel Church.</p></section>
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
<table><caption>Every week at Faith Chapel Church</caption><tbody>
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
        ('', 'Faith Chapel Church — Fostoria, Ohio', 'Bible believing, gospel driven church family in Fostoria, Ohio. Sunday services at 9:00 and 10:00 AM.', A_HOME),
        ('visit', 'Plan Your Visit — Faith Chapel Church', 'Service times, directions, nursery info, and what to expect on your first visit to Faith Chapel Church.', A_VISIT),
        ('beliefs', 'What We Believe — Faith Chapel Church', 'Bible believing. Gospel driven. Teaching from the KJV Bible.', A_BELIEFS),
        ('ministries', 'Ministries — Faith Chapel Church', 'Sunday School, children’s classes, nursery, and midweek prayer and Bible study.', A_MINISTRIES),
        ('events', 'Events & Announcements — Faith Chapel Church', 'Our weekly schedule of gatherings at Faith Chapel Church.', A_EVENTS),
        ('contact', 'Contact — Faith Chapel Church', 'Call Faith Chapel Church at (419) 348-2171 or visit us in Fostoria, Ohio.', A_CONTACT),
    ],
    'b': [
        ('', 'Faith Chapel Church — Sunday Starts Here | Fostoria, OH', 'Sunday School 9:00 AM, worship 10:00 AM, evening service 6:00 PM. Plan your visit to Faith Chapel Church in Fostoria, Ohio.', B_HOME),
        ('visit', 'Plan Your Visit — Faith Chapel Church', 'Your first-Sunday checklist: times, kids, location, and what to expect.', B_VISIT),
        ('beliefs', 'What We Believe — Faith Chapel Church', 'Bible believing. Gospel driven. KJV foundation.', B_BELIEFS),
        ('ministries', 'Ministries — Faith Chapel Church', 'Six weekly ministries for every age at Faith Chapel Church.', B_MINISTRIES),
        ('events', 'Events & Announcements — Faith Chapel Church', 'The weekly rhythm of Faith Chapel Church gatherings.', B_EVENTS),
        ('contact', 'Contact — Faith Chapel Church', 'Tap to call Faith Chapel Church: (419) 348-2171.', B_CONTACT),
    ],
    'c': [
        ('', 'Faith Chapel Church — Rooted in the Word', 'Rooted in the Word. Centered on the Gospel. A church family for Fostoria, Ohio.', C_HOME),
        ('visit', 'Plan Your Visit — Faith Chapel Church', 'When to come, where we are, and how your family fits in.', C_VISIT),
        ('beliefs', 'What We Believe — Faith Chapel Church', 'Rooted in the Word. Centered on the Gospel. Taught from the KJV Bible.', C_BELIEFS),
        ('ministries', 'Ministries — Faith Chapel Church', 'A measured weekly rhythm of ministry at Faith Chapel Church.', C_MINISTRIES),
        ('events', 'Events & Announcements — Faith Chapel Church', 'Every week at Faith Chapel Church, in one timetable.', C_EVENTS),
        ('contact', 'Contact — Faith Chapel Church', 'Phone, address, and directions to Faith Chapel Church.', C_CONTACT),
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
