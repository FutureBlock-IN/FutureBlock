function initParticles(canvasId, config) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return null;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    canvas.style.display = 'none';
    return null;
  }

  const defaults = {
    count: 100,
    goldRatio: 0.5,
    maxSpeed: 0.25,
    connectDistance: 130,
    repelDistance: 90,
    goldColor: 'rgba(200,168,90,0.5)',
    whiteColor: 'rgba(255,255,255,0.15)',
    lineColor: 'rgba(200,168,90,0.1)',
    radius: 1.5
  };

  const cfg = Object.assign({}, defaults, config || {});
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId = null;
  let mouse = { x: -1000, y: -1000 };
  let width = 0;
  let height = 0;
  let dpr = 1;
  let resizeTimer = null;

  function createParticle() {
    const isGold = Math.random() < cfg.goldRatio;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * cfg.maxSpeed;
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      color: isGold ? cfg.goldColor : cfg.whiteColor
    };
  }

  function initParticleArray() {
    particles = [];
    for (let i = 0; i < cfg.count; i++) {
      particles.push(createParticle());
    }
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    dpr = window.devicePixelRatio || 1;
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    initParticleArray();
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < cfg.repelDistance && dist > 0) {
        const force = (cfg.repelDistance - dist) / cfg.repelDistance;
        p.vx -= (dx / dist) * force * 0.15;
        p.vy -= (dy / dist) * force * 0.15;
      }

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (speed > cfg.maxSpeed) {
        p.vx = (p.vx / speed) * cfg.maxSpeed;
        p.vy = (p.vy / speed) * cfg.maxSpeed;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, cfg.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const cdx = p.x - p2.x;
        const cdy = p.y - p2.y;
        const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
        if (cdist < cfg.connectDistance) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = cfg.lineColor;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    animationId = requestAnimationFrame(draw);
  }

  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  }

  function onMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  }

  function onMouseLeave() {
    mouse.x = -1000;
    mouse.y = -1000;
  }

  function pause() {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  }

  function resume() {
    if (!animationId) {
      animationId = requestAnimationFrame(draw);
    }
  }

  function onVisibilityChange() {
    if (document.hidden) {
      pause();
    } else {
      resume();
    }
  }

  resize();
  draw();

  window.addEventListener('resize', onResize);
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mouseleave', onMouseLeave);
  document.addEventListener('visibilitychange', onVisibilityChange);

  return {
    destroy: function () {
      pause();
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    }
  };
}
