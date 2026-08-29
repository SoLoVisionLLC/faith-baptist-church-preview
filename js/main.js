(() => {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#site-nav");
  const menuLabel = document.querySelector("[data-menu-label]");
  const countdown = document.querySelector("#countdown");
  const nextLabel = document.querySelector("#next-label");
  const mobileMenu = window.matchMedia("(max-width: 980px)");

  const syncMenuAccess = () => {
    if (!nav) return;
    const open = toggle?.getAttribute("aria-expanded") === "true";
    if (mobileMenu.matches && !open) {
      nav.inert = true;
      nav.setAttribute("aria-hidden", "true");
    } else {
      nav.inert = false;
      nav.removeAttribute("aria-hidden");
    }
  };

  const closeMenu = ({ restoreFocus = false } = {}) => {
    document.body.classList.remove("menu-open");
    nav?.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
    if (menuLabel) menuLabel.textContent = "Open menu";
    syncMenuAccess();
    if (restoreFocus) toggle?.focus();
  };

  toggle?.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    document.body.classList.toggle("menu-open", !open);
    nav?.classList.toggle("is-open", !open);
    toggle.setAttribute("aria-expanded", String(!open));
    if (menuLabel) menuLabel.textContent = open ? "Open menu" : "Close menu";
    syncMenuAccess();
    if (!open) nav?.querySelector("a")?.focus();
  });
  nav
    ?.querySelectorAll("a")
    .forEach((link) => link.addEventListener("click", closeMenu));
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu({ restoreFocus: true });
  });
  mobileMenu.addEventListener("change", () => closeMenu());
  syncMenuAccess();

  const updateHeader = () =>
    header?.classList.toggle("is-stuck", window.scrollY > 110);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const services = [
    { day: 0, hour: 9, minute: 0, name: "Sunday School" },
    { day: 0, hour: 10, minute: 0, name: "Sunday Morning Worship" },
    { day: 0, hour: 18, minute: 0, name: "Sunday Evening Service" },
    { day: 3, hour: 19, minute: 0, name: "Wednesday Prayer & Bible Study" },
  ];

  const nextService = (now) =>
    services
      .map((service) => {
        const date = new Date(now);
        const daysAhead = (service.day - now.getDay() + 7) % 7;
        date.setDate(now.getDate() + daysAhead);
        date.setHours(service.hour, service.minute, 0, 0);
        if (date <= now) date.setDate(date.getDate() + 7);
        return { ...service, date };
      })
      .sort((a, b) => a.date - b.date)[0];

  const renderCountdown = () => {
    if (!countdown || !nextLabel) return;
    const now = new Date();
    const next = nextService(now);
    const totalMinutes = Math.max(0, Math.floor((next.date - now) / 60000));
    const days = Math.floor(totalMinutes / 1440);
    const hours = Math.floor((totalMinutes % 1440) / 60);
    const minutes = totalMinutes % 60;
    const parts = [];
    if (days) parts.push(`${days}d`);
    if (hours || days) parts.push(`${hours}h`);
    parts.push(`${minutes}m`);
    nextLabel.textContent = next.name;
    countdown.textContent = `${next.date.toLocaleDateString(undefined, { weekday: "long" })} at ${next.date.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })} · ${parts.join(" ")} away`;
  };

  renderCountdown();
  window.setInterval(renderCountdown, 60000);

  document.querySelectorAll("details").forEach((details) => {
    details.addEventListener("toggle", () => {
      if (!details.open) return;
      document.querySelectorAll("details[open]").forEach((other) => {
        if (other !== details) other.open = false;
      });
    });
  });

  const year = document.querySelector("#year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
