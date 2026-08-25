/**
 * FAITH BAPTIST CHURCH - PLAN A VISIT ASSISTANT & PRAYER DESK
 */

function initVisitPlanner() {
  const visitForm = document.getElementById('plan-visit-form');
  if (visitForm) {
    visitForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('visitor-name')?.value || 'Friend';
      const service = document.getElementById('visitor-service')?.value || 'Sunday Morning 10:00 AM';
      const kids = document.getElementById('visitor-kids')?.value || '0';

      const summaryModal = document.createElement('div');
      summaryModal.className = 'lightbox-modal is-open';
      summaryModal.innerHTML = `
        <div class="lightbox-content" style="background:#ffffff; color:#0f2744; padding:2.5rem; border-radius:16px; max-width:500px; text-align:center; border-top: 6px solid #1d4ed8;">
          <div style="width:60px; height:60px; background:#eff6ff; color:#1d4ed8; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 1.5rem auto;">
            <svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
          </div>
          <h3 style="font-family:'Cinzel', serif; font-size:1.6rem; color:#0f2744; margin-bottom:0.5rem;">We Can't Wait To Meet You, ${name}!</h3>
          <p style="color:#64748b; font-size:0.95rem; margin-bottom:1.5rem;">Your VIP Visit pass has been registered for <strong>${service}</strong>.</p>
          
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:1.25rem; text-align:left; margin-bottom:1.5rem; font-size:0.92rem;">
            <p style="margin-bottom:0.5rem;">📍 <strong>Location:</strong> 11275 W. Twp. Rd. 116, Fostoria, OH 44830</p>
            <p style="margin-bottom:0.5rem;">🕒 <strong>Recommended Arrival:</strong> 15 minutes early for easy parking and welcome greeter</p>
            <p style="margin-bottom:0.5rem;">👶 <strong>Tots Nursery & Kids Classes:</strong> Available and fully staffed during Sunday 10:00 AM</p>
            <p style="margin-bottom:0;">📖 <strong>What to Bring:</strong> Just yourself! We preach from the King James Bible and have copies available for you.</p>
          </div>

          <button id="btn-close-visit-modal" class="btn btn-navy" style="width:100%;">Got It • See You There!</button>
        </div>
      `;

      document.body.appendChild(summaryModal);

      document.getElementById('btn-close-visit-modal').addEventListener('click', () => {
        summaryModal.remove();
        visitForm.reset();
      });

      summaryModal.addEventListener('click', (ev) => {
        if (ev.target === summaryModal) summaryModal.remove();
      });
    });
  }

  // Prayer Request Form Handler
  const prayerForm = document.getElementById('prayer-request-form');
  if (prayerForm) {
    prayerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('prayer-name')?.value || 'Anonymous';
      const request = document.getElementById('prayer-text')?.value;
      const isConfidential = document.getElementById('prayer-confidential')?.checked;

      if (!request) {
        if (typeof showToast === 'function') {
          showToast('Please type your prayer request so our team can pray for you.', 'info');
        }
        return;
      }

      // Save to localStorage for demo persistence
      try {
        const prayers = JSON.parse(localStorage.getItem('fbc_prayers') || '[]');
        prayers.push({ name, request, isConfidential, timestamp: new Date().toISOString() });
        localStorage.setItem('fbc_prayers', JSON.stringify(prayers));
      } catch (err) {
        console.log(err);
      }

      if (typeof showToast === 'function') {
        showToast('Your prayer request has been received. Our Pastor & prayer team are lifting this up.', 'success');
      } else {
        alert('Your prayer request has been received.');
      }

      prayerForm.reset();
    });
  }
}

document.addEventListener('DOMContentLoaded', initVisitPlanner);
