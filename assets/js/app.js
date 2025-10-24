// App interactions for SwaMedia
(function(){
  const yearEl = document.getElementById('year');
  if(yearEl){ yearEl.textContent = new Date().getFullYear().toString(); }

  // Mobile nav toggle
  const toggle = document.querySelector('.nav__toggle');
  const list = document.querySelector('.nav__list');
  if(toggle && list){
    toggle.addEventListener('click', () => {
      const isOpen = list.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    // close when clicking outside
    document.addEventListener('click', (e) => {
      if(!list.contains(e.target) && !toggle.contains(e.target)){
        list.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Scroll-to-top visibility
  const scrollTopBtn = document.querySelector('.scrolltop');
  const onScroll = () => {
    if(!scrollTopBtn) return;
    if(window.scrollY > 280){
      scrollTopBtn.classList.add('scrolltop--show');
    } else {
      scrollTopBtn.classList.remove('scrolltop--show');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Reveal on scroll
  const revealEls = document.querySelectorAll('[data-reveal]');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }
})();
