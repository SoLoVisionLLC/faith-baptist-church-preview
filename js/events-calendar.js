/**
 * FAITH BAPTIST CHURCH - EVENTS & INTERACTIVE FULL MONTH CALENDAR
 */

// Countdown timer & RSVP
function initServiceCountdown() {
  const daysEl = document.getElementById('countdown-days');
  const hoursEl = document.getElementById('countdown-hours');
  const minsEl = document.getElementById('countdown-mins');
  const secsEl = document.getElementById('countdown-secs');
  const serviceLabelEl = document.getElementById('countdown-service-name');

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  function getNextService() {
    const now = new Date();
    const day = now.getDay();

    let target = new Date(now);
    let serviceName = "Sunday Morning Worship";

    if (day === 0) { // Sunday
      const sunMorn = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0, 0);
      const sunEve = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 0, 0);
      if (now < sunMorn) {
        target = sunMorn;
        serviceName = "Sunday Morning Worship & Tots Nursery";
      } else if (now < sunEve) {
        target = sunEve;
        serviceName = "Sunday Evening Fellowship Service";
      } else {
        target = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3, 19, 0, 0);
        serviceName = "Wednesday Prayer & Bible Study";
      }
    } else if (day < 3) {
      const diff = 3 - day;
      target = new Date(now.getFullYear(), now.getMonth(), now.getDate() + diff, 19, 0, 0);
      serviceName = "Wednesday Prayer & Bible Study";
    } else if (day === 3) {
      const wedService = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 19, 0, 0);
      if (now < wedService) {
        target = wedService;
        serviceName = "Wednesday Prayer & Bible Study";
      } else {
        target = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 4, 10, 0, 0);
        serviceName = "Sunday Morning Worship";
      }
    } else {
      const diff = 7 - day;
      target = new Date(now.getFullYear(), now.getMonth(), now.getDate() + diff, 10, 0, 0);
      serviceName = "Sunday Morning Worship";
    }

    return { target, serviceName };
  }

  function update() {
    const { target, serviceName } = getNextService();
    const now = new Date();
    const diff = target - now;

    if (serviceLabelEl) {
      serviceLabelEl.textContent = serviceName;
    }

    if (diff <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minsEl.textContent = "00";
      secsEl.textContent = "00";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = days < 10 ? `0${days}` : days;
    hoursEl.textContent = hours < 10 ? `0${hours}` : hours;
    minsEl.textContent = mins < 10 ? `0${mins}` : mins;
    secsEl.textContent = secs < 10 ? `0${secs}` : secs;
  }

  update();
  setInterval(update, 1000);
}

// RSVP & Calendar export
function initEventRSVP() {
  const rsvpBtns = document.querySelectorAll('.btn-event-rsvp');
  rsvpBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const eventName = btn.getAttribute('data-event-title') || 'Church Event';
      const userEmail = prompt(`Please enter your email to RSVP for "${eventName}":`);
      if (userEmail && userEmail.includes('@')) {
        if (typeof showToast === 'function') {
          showToast(`RSVP Confirmed for ${eventName}! A reminder has been scheduled.`, 'success');
        } else {
          alert(`RSVP Confirmed for ${eventName}!`);
        }
      }
    });
  });

  const calBtns = document.querySelectorAll('.btn-add-cal');
  calBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const eventTitle = encodeURIComponent(btn.getAttribute('data-event-title') || 'Faith Baptist Church Service');
      const location = encodeURIComponent('11275 W. Twp. Rd. 116, Fostoria, Ohio 44830');
      const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&location=${location}&details=Bible-believing,+Gospel-driven+service+at+Faith+Baptist+Church.`;
      window.open(googleCalUrl, '_blank');
    });
  });
}

// ==========================================================================
// FULL MONTH INTERACTIVE CALENDAR ENGINE
// ==========================================================================
class ChurchMonthlyCalendar {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.currentDate = new Date(); // Today
    this.viewYear = this.currentDate.getFullYear();
    this.viewMonth = this.currentDate.getMonth(); // 0-11
    this.activeFilter = 'all';

    this.monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    this.initDOM();
    this.bindEvents();
    this.render();
  }

  initDOM() {
    this.monthTitleEl = document.getElementById('cal-month-title');
    this.daysGridEl = document.getElementById('cal-days-grid');
    this.prevBtn = document.getElementById('cal-btn-prev');
    this.nextBtn = document.getElementById('cal-btn-next');
    this.todayBtn = document.getElementById('cal-btn-today');
    this.filterBtns = document.querySelectorAll('.cal-filter-btn');

    // Create modal if needed
    let modal = document.querySelector('.cal-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'cal-modal';
      modal.innerHTML = `
        <div class="cal-modal-card">
          <button class="cal-modal-close" aria-label="Close">&times;</button>
          <span class="badge badge-red" id="modal-event-badge">Service</span>
          <h3 id="modal-event-title" style="font-family:'Cinzel', serif; font-size:1.4rem; color:#0f2744; margin:0.6rem 0 0.4rem 0;"></h3>
          <div style="font-size:0.92rem; color:#b91c1c; font-weight:700; margin-bottom:0.75rem;" id="modal-event-time"></div>
          <div style="font-size:0.88rem; color:#64748b; margin-bottom:1.25rem;" id="modal-event-loc">📍 11275 W. Twp. Rd. 116, Fostoria, OH</div>
          <p style="font-size:0.92rem; color:#334155; line-height:1.55; margin-bottom:1.5rem;" id="modal-event-desc"></p>
          <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
            <a href="#" id="modal-btn-gcal" target="_blank" class="btn btn-navy btn-sm" style="flex:1;">Google Calendar</a>
            <button id="modal-btn-rsvp" class="btn btn-red btn-sm" style="flex:1;">RSVP / Reminder</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }
    this.modal = modal;
    this.modal.querySelector('.cal-modal-close').addEventListener('click', () => {
      this.modal.classList.remove('is-open');
    });
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.modal.classList.remove('is-open');
    });
  }

  bindEvents() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        this.viewMonth--;
        if (this.viewMonth < 0) {
          this.viewMonth = 11;
          this.viewYear--;
        }
        this.render();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        this.viewMonth++;
        if (this.viewMonth > 11) {
          this.viewMonth = 0;
          this.viewYear++;
        }
        this.render();
      });
    }

    if (this.todayBtn) {
      this.todayBtn.addEventListener('click', () => {
        this.viewYear = this.currentDate.getFullYear();
        this.viewMonth = this.currentDate.getMonth();
        this.render();
      });
    }

    if (this.filterBtns) {
      this.filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          this.filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.activeFilter = btn.getAttribute('data-filter') || 'all';
          this.render();
        });
      });
    }
  }

  getEventsForDate(year, month, day, dayOfWeek) {
    const events = [];

    // Sunday Events (dayOfWeek === 0)
    if (dayOfWeek === 0) {
      events.push({
        title: "Sunday School (Adults & Teens)",
        time: "9:00 AM - 9:45 AM",
        category: "service",
        chipClass: "chip-service",
        desc: "Expository Bible discussion for teens and adults from the King James Bible."
      });
      events.push({
        title: "Morning Worship & Tots Nursery",
        time: "10:00 AM - 11:15 AM",
        category: "service",
        chipClass: "chip-service",
        desc: "Main Sunday worship service with traditional hymn singing, nursery for tots, and gospel preaching."
      });
      events.push({
        title: "Sunday Evening Service",
        time: "6:00 PM - 7:00 PM",
        category: "service",
        chipClass: "chip-service",
        desc: "Sunday evening fellowship, prayer, and scripture exposition."
      });

      // 1st Sunday of month: Fellowship Potluck
      if (day <= 7) {
        events.push({
          title: "Church Family Potluck",
          time: "11:30 AM",
          category: "fellowship",
          chipClass: "chip-fellowship",
          desc: "Monthly church family dinner and fellowship following the morning worship service."
        });
      }

      // Last Sunday of month: Hymn Sing
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      if (day > daysInMonth - 7) {
        events.push({
          title: "Evening Hymn Sing",
          time: "6:00 PM",
          category: "fellowship",
          chipClass: "chip-fellowship",
          desc: "Special evening service devoted to congregational hymn singing and praise testimonies."
        });
      }
    }

    // Wednesday Events (dayOfWeek === 3)
    if (dayOfWeek === 3) {
      events.push({
        title: "Wednesday Prayer & Bible Study",
        time: "7:00 PM - 8:00 PM",
        category: "prayer",
        chipClass: "chip-prayer",
        desc: "Corporate prayer for missionaries, sick members, and chapter-by-chapter Bible study."
      });
    }

    // Special Scheduled Event Examples
    if (month === 8 && day === 18) { // September 18
      events.push({
        title: "Fall Revival Bible Conference",
        time: "7:00 PM",
        category: "special",
        chipClass: "chip-special",
        desc: "Annual Fall Bible Conference with guest evangelist preaching from God's Word."
      });
    }
    if (month === 9 && day === 24) { // October 24
      events.push({
        title: "Youth & Teen Bonfire Rally",
        time: "5:30 PM",
        category: "youth",
        chipClass: "chip-youth",
        desc: "Outdoor bonfire, gospel devotional, games, and hot chocolate for teens and youth."
      });
    }

    // Apply Filter
    if (this.activeFilter === 'all') return events;
    return events.filter(e => e.category === this.activeFilter);
  }

  render() {
    if (this.monthTitleEl) {
      this.monthTitleEl.textContent = `${this.monthNames[this.viewMonth]} ${this.viewYear}`;
    }

    if (!this.daysGridEl) return;
    this.daysGridEl.innerHTML = '';

    const firstDayIndex = new Date(this.viewYear, this.viewMonth, 1).getDay(); // 0 = Sun
    const totalDays = new Date(this.viewYear, this.viewMonth + 1, 0).getDate();
    const prevMonthTotalDays = new Date(this.viewYear, this.viewMonth, 0).getDate();

    const isCurrentActualMonth = (this.currentDate.getFullYear() === this.viewYear && this.currentDate.getMonth() === this.viewMonth);
    const todayDate = this.currentDate.getDate();

    // 1. Prev month trailing days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const dayNum = prevMonthTotalDays - i;
      const cell = document.createElement('div');
      cell.className = 'cal-day-box is-other-month';
      cell.innerHTML = `<span class="cal-day-number">${dayNum}</span>`;
      this.daysGridEl.appendChild(cell);
    }

    // 2. Current month active days
    for (let day = 1; day <= totalDays; day++) {
      const dateObj = new Date(this.viewYear, this.viewMonth, day);
      const dayOfWeek = dateObj.getDay();
      const isToday = isCurrentActualMonth && (day === todayDate);

      const cell = document.createElement('div');
      cell.className = `cal-day-box ${isToday ? 'is-today' : ''}`;

      const numEl = document.createElement('span');
      numEl.className = 'cal-day-number';
      numEl.textContent = day;
      cell.appendChild(numEl);

      const eventsList = document.createElement('div');
      eventsList.className = 'cal-events-list';

      const events = this.getEventsForDate(this.viewYear, this.viewMonth, day, dayOfWeek);
      events.forEach(ev => {
        const chip = document.createElement('span');
        chip.className = `cal-chip ${ev.chipClass}`;
        chip.textContent = ev.title;
        chip.title = `${ev.title} (${ev.time})`;
        chip.addEventListener('click', (e) => {
          e.stopPropagation();
          this.openModal(ev, day, this.viewMonth, this.viewYear);
        });
        eventsList.appendChild(chip);
      });

      cell.appendChild(eventsList);
      this.daysGridEl.appendChild(cell);
    }

    // 3. Next month leading days to complete grid (multiples of 7)
    const totalRendered = firstDayIndex + totalDays;
    const remaining = (7 - (totalRendered % 7)) % 7;
    for (let j = 1; j <= remaining; j++) {
      const cell = document.createElement('div');
      cell.className = 'cal-day-box is-other-month';
      cell.innerHTML = `<span class="cal-day-number">${j}</span>`;
      this.daysGridEl.appendChild(cell);
    }
  }

  openModal(ev, day, month, year) {
    const formattedDate = `${this.monthNames[month]} ${day}, ${year}`;
    this.modal.querySelector('#modal-event-title').textContent = ev.title;
    this.modal.querySelector('#modal-event-time').textContent = `🕒 ${formattedDate} • ${ev.time}`;
    this.modal.querySelector('#modal-event-desc').textContent = ev.desc;
    this.modal.querySelector('#modal-event-badge').textContent = ev.category.toUpperCase();

    const gcalBtn = this.modal.querySelector('#modal-btn-gcal');
    const location = encodeURIComponent('11275 W. Twp. Rd. 116, Fostoria, Ohio 44830');
    const title = encodeURIComponent(ev.title);
    const details = encodeURIComponent(ev.desc);
    gcalBtn.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&location=${location}&details=${details}`;

    const rsvpBtn = this.modal.querySelector('#modal-btn-rsvp');
    rsvpBtn.onclick = () => {
      const email = prompt(`Please enter your email for a reminder about ${ev.title}:`);
      if (email && email.includes('@')) {
        if (typeof showToast === 'function') {
          showToast(`Reminder scheduled for ${ev.title}!`, 'success');
        }
        this.modal.classList.remove('is-open');
      }
    };

    this.modal.classList.add('is-open');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initServiceCountdown();
  initEventRSVP();
  window.churchMonthlyCal = new ChurchMonthlyCalendar('monthly-calendar-root');
});
