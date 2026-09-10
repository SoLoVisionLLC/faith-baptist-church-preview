/* Organic motion is optional; all copy and photographs work without this file. */
(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const sections = [...document.querySelectorAll('[data-c-reveal]')];
  let revealObserver;

  const revealAll = () => {
    sections.forEach((section) => section.classList.add('c-revealed'));
    revealObserver?.disconnect();
  };

  if (!reducedMotion.matches && 'IntersectionObserver' in window) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('c-revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px 40px 0px', threshold: 0 });

    sections.forEach((section) => {
      if (section.getBoundingClientRect().top > window.innerHeight) {
        section.classList.add('c-reveal-ready');
        revealObserver.observe(section);
      }
    });
  }

  reducedMotion.addEventListener('change', (event) => {
    if (event.matches) revealAll();
  });
  window.addEventListener('beforeprint', revealAll);

  document.querySelectorAll('.c-menu').forEach((menu) => {
    menu.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menu.open) {
        menu.open = false;
        menu.querySelector('summary').focus();
      }
    });
  });

  const gallery = document.getElementById('c-gallery');
  if (!gallery) return;
  const photographs = [...gallery.querySelectorAll('.place-photo')];
  const controls = document.querySelector('.c-gallery-controls');
  const previous = controls.querySelector('[data-gallery-prev]');
  const next = controls.querySelector('[data-gallery-next]');
  const status = controls.querySelector('.c-gallery-status');
  let selected = 0;
  let scrollFrame;

  const offsetFor = (index) => photographs[index].offsetLeft - photographs[0].offsetLeft;
  const update = () => {
    selected = photographs.reduce((nearest, photograph, index) => (
      Math.abs(offsetFor(index) - gallery.scrollLeft) < Math.abs(offsetFor(nearest) - gallery.scrollLeft)
        ? index : nearest
    ), 0);
    previous.disabled = selected === 0;
    next.disabled = selected === photographs.length - 1;
    const label = `${selected + 1} / ${photographs.length}`;
    if (status.textContent !== label) status.textContent = label;
  };

  const goTo = (index) => {
    const target = Math.max(0, Math.min(index, photographs.length - 1));
    gallery.scrollTo({
      left: offsetFor(target),
      behavior: reducedMotion.matches ? 'instant' : 'smooth',
    });
  };

  previous.addEventListener('click', () => goTo(selected - 1));
  next.addEventListener('click', () => goTo(selected + 1));
  gallery.addEventListener('keydown', (event) => {
    if (event.target !== gallery || gallery.scrollWidth <= gallery.clientWidth) return;
    const targets = { ArrowLeft: selected - 1, ArrowRight: selected + 1, Home: 0, End: photographs.length - 1 };
    if (!(event.key in targets)) return;
    event.preventDefault();
    goTo(targets[event.key]);
  });
  gallery.addEventListener('scroll', () => {
    cancelAnimationFrame(scrollFrame);
    scrollFrame = requestAnimationFrame(update);
  }, { passive: true });
  if ('ResizeObserver' in window) new ResizeObserver(update).observe(gallery);
  controls.hidden = false;
  update();
})();
