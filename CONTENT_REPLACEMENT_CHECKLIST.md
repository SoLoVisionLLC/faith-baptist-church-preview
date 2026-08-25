# Faith Baptist Church - Website Content Replacement Checklist

This document is a comprehensive, easy-to-follow checklist of all placeholder content, staff information, photos, audio files, and external links currently used across the website that should be reviewed and replaced with the church's real content when available.

---

## 🏛️ 1. Church Leadership & Staff

- [ ] **Pastor's Full Name & Biography**
  - **Current Placeholder:** `Pastor David Miller`
  - **Real Content Needed:** Exact name, short bio, years in ministry, and personal testimony of the pastor.
  - **Files to Update:**
    - [`index.html`](file:///Users/jeremysmith/Sandbox/Faith%20Baptist%20Church/Faith%20Baptist%20Church%20v1%20-%20Google/index.html)
    - [`about.html`](file:///Users/jeremysmith/Sandbox/Faith%20Baptist%20Church/Faith%20Baptist%20Church%20v1%20-%20Google/about.html)
    - [`sermons.html`](file:///Users/jeremysmith/Sandbox/Faith%20Baptist%20Church/Faith%20Baptist%20Church%20v1%20-%20Google/sermons.html)
    - [`js/sermon-player.js`](file:///Users/jeremysmith/Sandbox/Faith%20Baptist%20Church/Faith%20Baptist%20Church%20v1%20-%20Google/js/sermon-player.js)

- [ ] **Pastor's Official Photograph**
  - **Current Image:** Generated high-quality portrait [`assets/images/pastor_pulpit.jpg`](file:///Users/jeremysmith/Sandbox/Faith%20Baptist%20Church/Faith%20Baptist%20Church%20v1%20-%20Google/assets/images/pastor_pulpit.jpg)
  - **Real Content Needed:** High-resolution headshot or pulpit photo of the actual pastor and/or pastor and his wife.
  - **How to Update:** Place real image into `assets/images/` and replace `assets/images/pastor_pulpit.jpg`.

- [ ] **Deacons, Youth Leaders & Nursery Directors (Optional)**
  - **Current Status:** Not explicitly listed on the leadership section.
  - **Real Content Needed:** Names, titles, and photos of deacons, choir director, and nursery director if the church wishes to list them on [`about.html`](file:///Users/jeremysmith/Sandbox/Faith%20Baptist%20Church/Faith%20Baptist%20Church%20v1%20-%20Google/about.html).

---

## 🎙️ 2. Sermons, Media & Audio Files

- [ ] **Real Audio Sermon MP3 Files**
  - **Current Status:** Interactive player contains sample playlist with Web Audio synthesis & structured metadata.
  - **Real Content Needed:** Real sermon MP3 audio files or podcast feed URL (e.g. from SermonAudio, Spotify, Subsplash, or Libsyn).
  - **Files to Update:**
    - [`js/sermon-player.js`](file:///Users/jeremysmith/Sandbox/Faith%20Baptist%20Church/Faith%20Baptist%20Church%20v1%20-%20Google/js/sermon-player.js) (Update `SERMONS_DATA` array with real MP3 URLs, sermon titles, sermon dates, and KJV scriptures).
    - [`sermons.html`](file:///Users/jeremysmith/Sandbox/Faith%20Baptist%20Church/Faith%20Baptist%20Church%20v1%20-%20Google/sermons.html)

- [ ] **Sermon Series Titles & Descriptions**
  - **Current Series Placeholders:** `"Galatians: Grace Over Law"`, `"Pillars of Faith"`, `"Faith in Action"`, `"Wednesday Prayer & Study"`
  - **Real Content Needed:** Current active sermon series being preached through at Faith Baptist Church.

- [ ] **Live Stream Link / YouTube / Facebook Channel**
  - **Current Links:** Placeholder `#` on social icon buttons.
  - **Real Content Needed:** Link to the church's official Facebook Page, YouTube Channel, or live stream page.
  - **Files to Update:** Footers of all HTML pages (`index.html`, `about.html`, `ministries.html`, `sermons.html`, `events.html`, `give.html`, `visit.html`, `contact.html`).

---

## 👶 3. Nursery, Sunday School & Family Ministries

- [ ] **Nursery Age Range & Policies**
  - **Current Text:** "Infants & Toddlers (Tots Nursery) available during Sunday 10:00 AM service".
  - **Real Content Needed:** Confirm exact nursery age cutoff (e.g., birth to 3 years old, or birth to 4 years old) and check-in procedures.
  - **Files to Update:**
    - [`ministries.html`](file:///Users/jeremysmith/Sandbox/Faith%20Baptist%20Church/Faith%20Baptist%20Church%20v1%20-%20Google/ministries.html)
    - [`visit.html`](file:///Users/jeremysmith/Sandbox/Faith%20Baptist%20Church/Faith%20Baptist%20Church%20v1%20-%20Google/visit.html)
    - [`index.html`](file:///Users/jeremysmith/Sandbox/Faith%20Baptist%20Church/Faith%20Baptist%20Church%20v1%20-%20Google/index.html)

- [ ] **Sunday School Class Breakdown**
  - **Current Classes:** Adult & Teen Sunday School (9:00 AM), Young Kids Class (10:00 AM).
  - **Real Content Needed:** Verify teacher names, age groups (e.g. Primary, Juniors, Teens, Adult Auditorium Class).
  - **Files to Update:** [`ministries.html`](file:///Users/jeremysmith/Sandbox/Faith%20Baptist%20Church/Faith%20Baptist%20Church%20v1%20-%20Google/ministries.html)

- [ ] **Real Photos of Nursery Room & Classrooms**
  - **Current Status:** Real church exterior and sanctuary photos are included. Classroom and nursery photos are high-quality realistic representations.
  - **Real Content Needed:** Photos of the church's actual nursery room, Sunday School classrooms, and fellowship hall when available.
  - **How to Update:** Save new photos into `assets/images/` and replace `tots_nursery.jpg` and `sunday_school_class.jpg`.

---

## 📅 4. Events, Calendar & Special Services

- [ ] **Special Calendar Events & Annual Dates**
  - **Current Event Placeholders:**
    - Monthly Family Fellowship Potluck (1st Sunday)
    - Evening Hymn Sing (Last Sunday of month)
    - Annual Fall Bible Conference (Fall 2026)
  - **Real Content Needed:** Specific upcoming dates for Vacation Bible School (VBS), Revival Meetings, Missions Conference, Summer Camp, Thanksgiving Dinner, Christmas Program.
  - **Files to Update:**
    - [`events.html`](file:///Users/jeremysmith/Sandbox/Faith%20Baptist%20Church/Faith%20Baptist%20Church%20v1%20-%20Google/events.html)
    - [`index.html`](file:///Users/jeremysmith/Sandbox/Faith%20Baptist%20Church/Faith%20Baptist%20Church%20v1%20-%20Google/index.html)

- [ ] **RSVP Email Destination**
  - **Current Behavior:** RSVP displays visual confirmation modal and prompts for visitor email.
  - **Real Content Needed:** Connect to church office email (e.g. `office@faithbaptistfostoria.org` or pastor's email).

---

## 💳 5. Online Giving & Financial Accounts

- [ ] **Merchant / Giving Platform Integration**
  - **Current Status:** Interactive demonstration portal with instant receipt generator.
  - **Real Content Needed:** Direct link or embedded widget from the church's online giving provider (e.g., Tithe.ly, Subsplash, PayPal, Faithlife Giving, or Stripe).
  - **Files to Update:**
    - [`give.html`](file:///Users/jeremysmith/Sandbox/Faith%20Baptist%20Church/Faith%20Baptist%20Church%20v1%20-%20Google/give.html)
    - [`js/interactive-giving.js`](file:///Users/jeremysmith/Sandbox/Faith%20Baptist%20Church/Faith%20Baptist%20Church%20v1%20-%20Google/js/interactive-giving.js)

- [ ] **Designated Giving Funds**
  - **Current Funds:** General Fund, Faith Promise Missions, Building & Grounds, Tots Nursery & Youth.
  - **Real Content Needed:** Confirm the exact designations the church treasury recognizes.

- [ ] **Tax Exempt / 501(c)(3) Notice (Optional)**
  - **Current Status:** Standard nonprofit wording included.
  - **Real Content Needed:** Add church EIN number or official mailing address for tax receipts if desired.

---

## 📍 6. Contact Information & Online Forms

- [ ] **Church Contact Email Address**
  - **Current Status:** Phone `(419) 348-2171` and physical address `11275 W. Twp. Rd. 116, Fostoria, Ohio 44830` are confirmed real data.
  - **Real Content Needed:** Official contact email address (e.g., `pastor@faithbaptistfostoria.org` or `info@faithbaptistfostoria.org`).
  - **Files to Update:**
    - [`contact.html`](file:///Users/jeremysmith/Sandbox/Faith%20Baptist%20Church/Faith%20Baptist%20Church%20v1%20-%20Google/contact.html)
    - All HTML footers.

- [ ] **Form Submission Target (Prayer Requests & Visit Passes)**
  - **Current Behavior:** Forms validate and store submissions in browser `localStorage` with instant user feedback.
  - **Real Content Needed:** Hook forms up to Formspree, Formkeep, Netlify Forms, PHP mailer, or Supabase edge function to send incoming prayer requests directly to the pastor's inbox.
  - **Files to Update:** [`js/visit-planner.js`](file:///Users/jeremysmith/Sandbox/Faith%20Baptist%20Church/Faith%20Baptist%20Church%20v1%20-%20Google/js/visit-planner.js)

---

## 📷 7. Church Photo Gallery Updates

- [ ] **Congregation & Fellowship Photos**
  - **Current Images Used:**
    - `hero_landscape.png` / `ChatGPT Image Aug 25, 2026, 06_37_20 PM.png` (Active Hero Background — Landscape church image)
    - `793a0944-867c-4811-85da-ecd4b9fbdb78.jpg` (Real customer outdoor church sign & entrance photo)
    - `church_exterior_front.jpg` (Real customer church front photo)
    - `church_sanctuary_cross.jpg` (Real customer sanctuary & cross photo)
    - `church_building_portrait.png` (Real customer portrait building image)
    - `fellowship_family.jpg` (Supplementary photo)
    - `worship_choir.jpg` (Supplementary photo)
  - **Real Content Needed:** Additional pictures of church members, choir, baptisms, outdoor church picnics, and youth activities as the church provides them.
  - **How to Update:** Place images into `assets/images/` and update the gallery items in [`index.html`](file:///Users/jeremysmith/Sandbox/Faith%20Baptist%20Church/Faith%20Baptist%20Church%20v1%20-%20Google/index.html#gallery).

---

## 📖 8. Statement of Faith / Constitution (Optional)

- [ ] **Extended Articles of Faith**
  - **Current Content:** Covers The Holy Scriptures (KJV), Salvation by Grace through Faith, and The Local Church.
  - **Real Content Needed:** If the church has a specific written Constitution or 10-point Statement of Faith (e.g., Baptist Distinctives, Creation, Second Coming), this can be added to [`about.html#beliefs`](file:///Users/jeremysmith/Sandbox/Faith%20Baptist%20Church/Faith%20Baptist%20Church%20v1%20-%20Google/about.html#beliefs).
