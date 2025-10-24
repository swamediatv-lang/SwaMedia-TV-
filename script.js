document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const siteNav = document.getElementById('siteNav');
  const siteHeader = document.querySelector('.site-header');

  if (menuToggle && siteNav) {
    const openMenu = () => {
      siteNav.classList.add('open');
      menuToggle.classList.add('active');
      menuToggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('no-scroll');
    };
    const closeMenu = () => {
      siteNav.classList.remove('open');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('no-scroll');
    };
    const toggleMenu = () => {
      if (siteNav.classList.contains('open')) closeMenu(); else openMenu();
    };

    menuToggle.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked (mobile UX)
    siteNav.addEventListener('click', (e) => {
      const target = e.target;
      if (target instanceof Element && target.closest('a')) {
        if (siteNav.classList.contains('open')) {
          closeMenu();
        }
      }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const clickInsideMenu = siteNav.contains(target);
      const clickOnToggle = menuToggle === target || menuToggle.contains(target);
      if (siteNav.classList.contains('open') && !clickInsideMenu && !clickOnToggle) {
        closeMenu();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && siteNav.classList.contains('open')) {
        closeMenu();
      }
    });

    // Reset on resize (avoid stuck state)
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900 && siteNav.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  // Reveal on scroll
  const revealEls = Array.from(document.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

    revealEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: reveal all
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  // Header shrink on scroll
  const updateHeaderState = () => {
    if (!siteHeader) return;
    const isScrolled = window.scrollY > 8;
    siteHeader.classList.toggle('scrolled', isScrolled);
  };
  updateHeaderState();
  window.addEventListener('scroll', () => {
    // Use rAF to avoid jank
    window.requestAnimationFrame(updateHeaderState);
  }, { passive: true });

  // Progressive image performance for cards
  document.querySelectorAll('.card-grid img').forEach((img) => {
    if (img.getAttribute('loading') !== 'lazy') img.setAttribute('loading', 'lazy');
    if (img.getAttribute('decoding') !== 'async') img.setAttribute('decoding', 'async');
  });
});
