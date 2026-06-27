/* ============================================
   BIOLUMINESCENT PARTICLE SYSTEM
   ============================================ */

(function () {
  'use strict';

  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const COLORS = [
    { r: 0, g: 240, b: 255 },    // cyan
    { r: 77, g: 124, b: 255 },   // blue
    { r: 255, g: 46, b: 170 },   // magenta
    { r: 0, g: 255, b: 163 },    // green
  ];

  const CONFIG = {
    particleCount: 70,
    connectionDistance: 140,
    connectionOpacity: 0.04,
    baseSpeed: 0.15,
    pulseSpeed: 0.008,
    mouseRadius: 160,
    mouseRepelStrength: 0.4,
  };

  let particles = [];
  let mouse = { x: -1000, y: -1000 };
  let width, height;
  let animationId;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = Math.random() * 2.5 + 0.8;
      this.baseRadius = this.radius;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.opacity = Math.random() * 0.5 + 0.15;
      this.baseOpacity = this.opacity;
      this.vx = (Math.random() - 0.5) * CONFIG.baseSpeed;
      this.vy = (Math.random() - 0.5) * CONFIG.baseSpeed;
      this.pulsePhase = Math.random() * Math.PI * 2;
      this.pulseSpeed = CONFIG.pulseSpeed + Math.random() * 0.004;
      this.driftPhase = Math.random() * Math.PI * 2;
    }

    update(time) {
      // Pulse
      const pulse = Math.sin(time * this.pulseSpeed + this.pulsePhase);
      this.radius = this.baseRadius + pulse * 0.6;
      this.opacity = this.baseOpacity + pulse * 0.12;

      // Gentle drift
      const drift = Math.sin(time * 0.001 + this.driftPhase) * 0.02;
      this.x += this.vx + drift;
      this.y += this.vy + Math.cos(time * 0.0008 + this.driftPhase) * 0.015;

      // Mouse repel
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < CONFIG.mouseRadius && dist > 0) {
        const force = (1 - dist / CONFIG.mouseRadius) * CONFIG.mouseRepelStrength;
        this.x += (dx / dist) * force;
        this.y += (dy / dist) * force;
      }

      // Wrap around
      if (this.x < -20) this.x = width + 20;
      if (this.x > width + 20) this.x = -20;
      if (this.y < -20) this.y = height + 20;
      if (this.y > height + 20) this.y = -20;
    }

    draw() {
      const { r, g, b } = this.color;

      // Outer glow
      const gradient = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.radius * 6
      );
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${this.opacity * 0.4})`);
      gradient.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, ${this.opacity * 0.1})`);
      gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 6, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity})`;
      ctx.fill();
    }
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONFIG.connectionDistance) {
          const opacity = (1 - dist / CONFIG.connectionDistance) * CONFIG.connectionOpacity;
          const { r, g, b } = particles[i].color;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate(time) {
    ctx.clearRect(0, 0, width, height);

    drawConnections();

    for (const p of particles) {
      p.update(time);
      p.draw();
    }

    animationId = requestAnimationFrame(animate);
  }

  function init() {
    resize();
    particles = [];
    for (let i = 0; i < CONFIG.particleCount; i++) {
      particles.push(new Particle());
    }
    if (animationId) cancelAnimationFrame(animationId);
    animationId = requestAnimationFrame(animate);
  }

  // Event listeners
  window.addEventListener('resize', () => {
    resize();
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  // Reduce particles on mobile for performance
  if (window.innerWidth < 768) {
    CONFIG.particleCount = 35;
    CONFIG.connectionDistance = 100;
  }

  init();


  /* ============================================
     SCROLL REVEAL ANIMATIONS
     ============================================ */

  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  reveals.forEach((el) => revealObserver.observe(el));


  /* ============================================
     STAT COUNTER ANIMATION
     ============================================ */

  const statNumbers = document.querySelectorAll('.stat-number[data-target]');

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.innerHTML = current.toLocaleString() + (suffix ? `<span class="suffix">${suffix}</span>` : '');

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          statObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((el) => statObserver.observe(el));


  /* ============================================
     SMOOTH SCROLL FOR ANCHOR LINKS
     ============================================ */

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  /* ============================================
     DEMO MODAL
     ============================================ */

  const demoModal = document.getElementById('demo-modal');
  const demoIframe = document.getElementById('demo-iframe');
  const demoTitle = document.getElementById('demo-modal-title');
  const closeBtn = document.getElementById('close-demo');

  function openDemo(demoUrl, title) {
    if (!demoModal || !demoIframe) return;
    demoIframe.src = demoUrl;
    if (demoTitle && title) demoTitle.childNodes[0].textContent = title + ' ';
    demoModal.classList.add('active');
    demoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDemo() {
    if (!demoModal || !demoIframe) return;
    demoModal.classList.remove('active');
    demoModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // Stop the demo animation by clearing the iframe
    demoIframe.src = '';
  }

  // Attach click handler to all demo buttons
  document.querySelectorAll('.btn-demo[data-demo]').forEach((btn) => {
    btn.addEventListener('click', () => {
      openDemo(btn.dataset.demo, btn.dataset.title || 'Demo');
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeDemo);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && demoModal && demoModal.classList.contains('active')) {
      closeDemo();
    }
  });

  // Close on overlay click (outside the frame)
  if (demoModal) {
    demoModal.addEventListener('click', (e) => {
      if (e.target === demoModal) {
        closeDemo();
      }
    });
  }

})();
