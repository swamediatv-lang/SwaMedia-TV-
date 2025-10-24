// SwaMedia Scripts
(function () {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear().toString();
  }

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  function setMenu(open) {
    document.body.classList.toggle('nav-open', open);
    if (menuToggle) menuToggle.setAttribute('aria-expanded', String(open));
  }
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => setMenu(!document.body.classList.contains('nav-open')));
    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setMenu(false);
    });
    // Close when clicking outside list (on overlay)
    document.addEventListener('click', (e) => {
      const open = document.body.classList.contains('nav-open');
      if (!open) return;
      const t = e.target;
      if (!(t instanceof Element)) return;
      if (!t.closest('.nav-links') && !t.closest('.menu-toggle')) setMenu(false);
    });
    // Close after clicking a nav link
    navLinks.addEventListener('click', (e) => {
      const target = e.target;
      if (target instanceof Element && target.closest('a')) setMenu(false);
    });
  }

  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((el, idx) => {
    el.style.transitionDelay = `${Math.min(idx * 60, 240)}ms`;
    observer.observe(el);
  });
})();
