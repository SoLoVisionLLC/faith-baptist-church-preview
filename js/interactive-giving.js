/**
 * FAITH BAPTIST CHURCH - INTERACTIVE GIVING & TITHING PORTAL
 */

function initGivingPortal() {
  const amountBtns = document.querySelectorAll('.btn-amount');
  const customInput = document.getElementById('giving-custom-amount');
  const fundSelect = document.getElementById('giving-fund-select');
  const freqToggle = document.getElementById('giving-frequency-select');
  const submitBtn = document.getElementById('btn-submit-giving');
  const givingForm = document.getElementById('church-giving-form');

  let selectedAmount = 50; // default

  if (amountBtns.length) {
    amountBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        amountBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedAmount = parseFloat(btn.getAttribute('data-amount')) || 0;
        if (customInput) customInput.value = '';
      });
    });
  }

  if (customInput) {
    customInput.addEventListener('input', () => {
      if (customInput.value) {
        amountBtns.forEach(b => b.classList.remove('active'));
        selectedAmount = parseFloat(customInput.value) || 0;
      }
    });
  }

  if (givingForm) {
    givingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const finalAmount = customInput && customInput.value ? parseFloat(customInput.value) : selectedAmount;
      if (!finalAmount || finalAmount <= 0) {
        if (typeof showToast === 'function') {
          showToast('Please select or enter a valid gift amount.', 'info');
        } else {
          alert('Please enter a valid gift amount.');
        }
        return;
      }

      const fund = fundSelect ? fundSelect.options[fundSelect.selectedIndex].text : 'General Tithes & Offerings';
      const frequency = freqToggle ? freqToggle.value : 'One-Time Gift';

      // Simulation Modal Receipt
      const receiptModal = document.createElement('div');
      receiptModal.className = 'lightbox-modal is-open';
      receiptModal.innerHTML = `
        <div class="lightbox-content" style="background:#ffffff; color:#0f2744; padding:2.5rem; border-radius:16px; max-width:480px; text-align:center; border-top: 6px solid #b91c1c;">
          <div style="width:60px; height:60px; background:#eff6ff; color:#1d4ed8; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 1.5rem auto;">
            <svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
          </div>
          <h3 style="font-family:'Cinzel', serif; font-size:1.6rem; color:#0f2744; margin-bottom:0.5rem;">Thank You For Your Faithfulness!</h3>
          <p style="color:#64748b; font-size:0.95rem; margin-bottom:1.5rem;">"Every man according as he purposeth in his heart, so let him give; not grudgingly, or of necessity: for God loveth a cheerful giver." — 2 Cor 9:7 (KJV)</p>
          
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:1.25rem; text-align:left; margin-bottom:1.5rem; font-size:0.92rem;">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
              <span style="color:#64748b;">Gift Amount:</span>
              <strong style="color:#b91c1c; font-size:1.1rem;">$${finalAmount.toFixed(2)}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
              <span style="color:#64748b;">Designated Fund:</span>
              <strong style="color:#0f2744;">${fund}</strong>
            </div>
            <div style="display:flex; justify-content:space-between;">
              <span style="color:#64748b;">Schedule:</span>
              <strong style="color:#0f2744;">${frequency}</strong>
            </div>
          </div>

          <p style="font-size:0.85rem; color:#94a3b8; margin-bottom:1.5rem;">Note: This is a demonstration portal. In production, this securely connects directly to your church's Tithe.ly, Subsplash, or merchant processor.</p>

          <button id="btn-close-receipt" class="btn btn-navy" style="width:100%;">Close Receipt</button>
        </div>
      `;

      document.body.appendChild(receiptModal);

      document.getElementById('btn-close-receipt').addEventListener('click', () => {
        receiptModal.remove();
      });

      receiptModal.addEventListener('click', (ev) => {
        if (ev.target === receiptModal) receiptModal.remove();
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', initGivingPortal);
