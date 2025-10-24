// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.getElementById('mobileMenu');
const menuClose = document.querySelector('.menu-close');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.hasAttribute('open');
    if (isOpen) {
      mobileMenu.removeAttribute('open');
      mobileMenu.setAttribute('hidden', '');
      menuToggle.setAttribute('aria-expanded', 'false');
    } else {
      mobileMenu.setAttribute('open', '');
      mobileMenu.removeAttribute('hidden');
      menuToggle.setAttribute('aria-expanded', 'true');
    }
  });
}

if (menuClose && mobileMenu && menuToggle) {
  menuClose.addEventListener('click', () => {
    mobileMenu.removeAttribute('open');
    mobileMenu.setAttribute('hidden', '');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
}

// Close menu on ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu?.hasAttribute('open')) {
    mobileMenu.removeAttribute('open');
    mobileMenu.setAttribute('hidden', '');
    menuToggle?.setAttribute('aria-expanded', 'false');
  }
});

// Scroll reveal effects
const revealEls = document.querySelectorAll('.reveal-on-scroll');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach((el) => io.observe(el));

// Set year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
