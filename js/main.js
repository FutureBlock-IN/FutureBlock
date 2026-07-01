function initMarquee() {
  /* Marquee is CSS-driven; no JS initialization required */
}

document.addEventListener('DOMContentLoaded', function () {
  if (typeof initTechStagger === 'function') initTechStagger();
  if (typeof initTechAccordion === 'function') initTechAccordion();
  initParticles('hero-canvas');
  initParticles('service-hero-canvas');
  initNavbar();
  initScrollAnimations();
  initStatsCounter();
  initMarquee();
  initFaq();
  if (typeof initContactForm === 'function') initContactForm();
});
