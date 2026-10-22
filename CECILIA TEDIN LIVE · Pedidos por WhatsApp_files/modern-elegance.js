(() => {
  'use strict';
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motionPreference.matches || !('IntersectionObserver' in window)) return;

  const selector = '.hero-copy, .hero-image, .sectionhead, .card, .look-card, .editorial, .color-story, .wholesale-inner, .help, .brand-trust';
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('ct-in-view');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.06, rootMargin: '0px 0px 32px 0px' });

  const register = node => {
    if (!(node instanceof Element)) return;
    const elements = node.matches(selector) ? [node, ...node.querySelectorAll(selector)] : [...node.querySelectorAll(selector)];
    elements.forEach((element, index) => {
      if (element.dataset.ctMotion === 'ready') return;
      element.dataset.ctMotion = 'ready';
      element.style.setProperty('--ct-enter-delay', `${Math.min(index % 4, 3) * 55}ms`);
      observer.observe(element);
    });
  };

  register(document.body);
  document.documentElement.classList.add('ct-motion');
  ['products', 'lookbook-grid'].forEach(id => {
    const container = document.getElementById(id);
    if (!container) return;
    const updates = new MutationObserver(records => records.forEach(record => record.addedNodes.forEach(register)));
    updates.observe(container, { childList: true });
  });
  motionPreference.addEventListener?.('change', event => {
    if (event.matches) {
      document.documentElement.classList.remove('ct-motion');
      observer.disconnect();
    }
  });
})();
