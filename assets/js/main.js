// Mobile nav toggle
(function(){
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');
  if(!toggle || !nav) return;
  function setExpanded(expanded){
    toggle.setAttribute('aria-expanded', String(expanded));
    nav.classList.toggle('is-open', expanded);
    toggle.setAttribute('aria-label', expanded ? 'Close menu' : 'Open menu');
  }
  toggle.addEventListener('click', ()=>{
    const next = toggle.getAttribute('aria-expanded') !== 'true';
    setExpanded(next);
  });
  // Close when clicking outside on mobile
  document.addEventListener('click', (e)=>{
    if(window.innerWidth > 768) return;
    const isInside = nav.contains(e.target) || toggle.contains(e.target);
    if(!isInside && nav.classList.contains('is-open')) setExpanded(false);
  });
})();

// IntersectionObserver reveal animations
(function(){
  const els = document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window) || els.length === 0){
    els.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries, obs)=>{
    entries.forEach(entry =>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  els.forEach(el => io.observe(el));
})();

// Dynamic year
(function(){
  const el = document.getElementById('year');
  if(el) el.textContent = String(new Date().getFullYear());
})();
