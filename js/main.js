/**
 * FAITH BAPTIST CHURCH - MAIN JAVASCRIPT
 * Theme: Grace Church Replicated Architecture • Red, White, and Blue (USA)
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNav();
  initGalleryLightbox();
  initDynamicYear();
  initVerseRotator();
});

// Sticky Header functionality
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('is-sticky');
    } else {
      header.classList.remove('is-sticky');
    }
  });
}

// Mobile Navigation Toggle & Drawer
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (!toggleBtn || !navMenu) return;

  // Create close button inside mobile nav if not present
  if (!navMenu.querySelector('.nav-menu-close')) {
    const closeBtn = document.createElement('button');
    closeBtn.className = 'nav-menu-close';
    closeBtn.setAttribute('aria-label', 'Close Menu');
    closeBtn.innerHTML = '&times;';
    navMenu.prepend(closeBtn);

    closeBtn.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
    });
  }

  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('is-open');
  });

  // Handle dropdown clicks on mobile
  const dropdownItems = navMenu.querySelectorAll('.nav-item.has-dropdown');
  dropdownItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 1080) {
        e.preventDefault();
        item.classList.toggle('active-dropdown');
      }
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('is-open') && !navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
      navMenu.classList.remove('is-open');
    }
  });
}

// Photo Gallery Lightbox
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (!galleryItems.length) return;

  let modal = document.querySelector('.lightbox-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'lightbox-modal';
    modal.innerHTML = `
      <div class="lightbox-content">
        <button class="lightbox-close" aria-label="Close Lightbox">&times;</button>
        <img class="lightbox-img" src="" alt="Church Photo">
      </div>
    `;
    document.body.appendChild(modal);
  }

  const modalImg = modal.querySelector('.lightbox-img');
  const closeBtn = modal.querySelector('.lightbox-close');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) {
        modalImg.src = img.src;
        modalImg.alt = img.alt || 'Faith Baptist Church';
        modal.classList.add('is-open');
      }
    });
  });

  const closeModal = () => modal.classList.remove('is-open');
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

// Toast notification helper
function showToast(message, type = 'info') {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  const icon = type === 'success' ? '✓' : 'ℹ';
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

// Dynamic Copyright Year
function initDynamicYear() {
  const yearEl = document.querySelector('.current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// Daily KJV Scripture Rotator
const SCRIPTURES = [
  {
    verse: "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast.",
    ref: "Ephesians 2:8-9 (KJV)"
  },
  {
    verse: "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.",
    ref: "Proverbs 3:5-6 (KJV)"
  },
  {
    verse: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
    ref: "John 3:16 (KJV)"
  },
  {
    verse: "Thy word is a lamp unto my feet, and a light unto my path.",
    ref: "Psalm 119:105 (KJV)"
  },
  {
    verse: "I can do all things through Christ which strengtheneth me.",
    ref: "Philippians 4:13 (KJV)"
  }
];

function initVerseRotator() {
  const verseText = document.getElementById('daily-verse-text');
  const verseRef = document.getElementById('daily-verse-ref');
  const btnNext = document.getElementById('btn-next-verse');
  if (!verseText || !verseRef) return;

  let currentIndex = 0;

  function updateVerse(index) {
    const item = SCRIPTURES[index];
    verseText.style.opacity = '0';
    verseRef.style.opacity = '0';
    setTimeout(() => {
      verseText.textContent = `"${item.verse}"`;
      verseRef.innerHTML = `<span>📖</span> ${item.ref}`;
      verseText.style.opacity = '1';
      verseRef.style.opacity = '1';
    }, 200);
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % SCRIPTURES.length;
      updateVerse(currentIndex);
    });
  }
}
