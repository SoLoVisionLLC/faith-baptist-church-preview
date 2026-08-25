/**
 * FAITH BAPTIST CHURCH - EVENTS & LIVE SERVICE COUNTDOWN
 * Real-time calculation to next Sunday service (10:00 AM) or Wednesday Prayer (7:00 PM)
 */

function initServiceCountdown() {
  const daysEl = document.getElementById('countdown-days');
  const hoursEl = document.getElementById('countdown-hours');
  const minsEl = document.getElementById('countdown-mins');
  const secsEl = document.getElementById('countdown-secs');
  const serviceLabelEl = document.getElementById('countdown-service-name');

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  function getNextService() {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 3 = Wednesday, ..., 6 = Saturday

    // Service targets
    // Sunday Morning: day 0 at 10:00 AM
    // Sunday Evening: day 0 at 18:00 (6:00 PM)
    // Wednesday Prayer: day 3 at 19:00 (7:00 PM)

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
        // Next Wednesday
        target = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3, 19, 0, 0);
        serviceName = "Wednesday Prayer & Bible Study";
      }
    } else if (day < 3) { // Mon or Tue -> Wednesday 7pm
      const diff = 3 - day;
      target = new Date(now.getFullYear(), now.getMonth(), now.getDate() + diff, 19, 0, 0);
      serviceName = "Wednesday Prayer & Bible Study";
    } else if (day === 3) { // Wednesday
      const wedService = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 19, 0, 0);
      if (now < wedService) {
        target = wedService;
        serviceName = "Wednesday Prayer & Bible Study";
      } else {
        // Next Sunday
        target = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 4, 10, 0, 0);
        serviceName = "Sunday Morning Worship";
      }
    } else { // Thu, Fri, Sat -> Next Sunday 10am
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

// RSVP Modal & Add-To-Calendar
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

document.addEventListener('DOMContentLoaded', () => {
  initServiceCountdown();
  initEventRSVP();
});
