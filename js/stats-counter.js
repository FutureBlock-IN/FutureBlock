function countUp(element, target, duration) {
  const startTime = performance.now();
  const isDecimal = String(target).includes('.');
  const suffix = element.dataset.suffix || '';
  const prefix = element.dataset.prefix || '';

  function easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function tick(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOut(progress);
    const current = eased * target;

    if (isDecimal) {
      element.textContent = prefix + current.toFixed(1) + suffix;
    } else if (target >= 1000 && suffix === 'M+') {
      element.textContent = prefix + '$' + Math.floor(current) + suffix;
    } else if (suffix === '+') {
      element.textContent = prefix + Math.floor(current) + suffix;
    } else {
      element.textContent = prefix + Math.floor(current) + suffix;
    }

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      element.textContent = element.dataset.final || element.textContent;
    }
  }

  requestAnimationFrame(tick);
}

function initStatsCounter() {
  const stats = document.querySelectorAll('[data-count]');
  if (!stats.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.dataset.count);
          const duration = parseInt(el.dataset.duration, 10) || 1800;
          countUp(el, target, duration);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.3 }
  );

  stats.forEach(function (stat) {
    observer.observe(stat);
  });
}
