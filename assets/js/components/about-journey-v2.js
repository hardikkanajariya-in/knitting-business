/* ============================================
   ABOUT-JOURNEY-V2.JS — "Thread of Time"
   Cinematic 3D Parallax Scroll Storytelling
   Floating particles · Depth layers · Morphing threads
   ============================================ */

function renderAboutJourneyV2(section) {
  if (!section) return '';

  const milestones = section.milestones || [];

  const milestonesHTML = milestones.map((m, i) => {
    const isLeft = i % 2 === 0;
    const lottieSrc = m.lottie || '';
    return `
      <div class="tot-milestone tot-milestone--${isLeft ? 'left' : 'right'}" data-index="${i}">
        <div class="tot-milestone-inner">
          <div class="tot-milestone-glow"></div>
          <div class="tot-milestone-card">
            <div class="tot-milestone-lottie-ring">
              ${lottieSrc ? `<dotlottie-player
                src="${lottieSrc}"
                background="transparent"
                speed="0.8"
                loop
                class="tot-milestone-lottie"
              ></dotlottie-player>` : `<div class="tot-milestone-lottie-placeholder"></div>`}
            </div>
            <div class="tot-milestone-content">
              <div class="tot-milestone-year-badge">${m.year}</div>
              <h3 class="tot-milestone-title">${m.title}</h3>
              <p class="tot-milestone-desc">${m.description}</p>
            </div>
          </div>
          <div class="tot-milestone-connector">
            <svg viewBox="0 0 100 2" preserveAspectRatio="none">
              <line x1="0" y1="1" x2="100" y2="1" stroke="currentColor" stroke-width="2" stroke-dasharray="6 4"/>
            </svg>
          </div>
        </div>
      </div>
    `;
  }).join('');

  return `
    <section class="tot-section" id="thread-of-time">
      <!-- Particle canvas for depth -->
      <canvas class="tot-particles" aria-hidden="true"></canvas>

      <!-- Parallax depth layers -->
      <div class="tot-depth-layer tot-depth-back" aria-hidden="true">
        <div class="tot-nebula tot-nebula-1"></div>
        <div class="tot-nebula tot-nebula-2"></div>
        <div class="tot-nebula tot-nebula-3"></div>
      </div>

      <div class="tot-depth-layer tot-depth-mid" aria-hidden="true">
        <div class="tot-grid-lines"></div>
      </div>

      <!-- Central thread SVG -->
      <div class="tot-thread-container" aria-hidden="true">
        <svg class="tot-thread-svg" viewBox="0 0 200 2000" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="threadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#3b82f6" stop-opacity="0"/>
              <stop offset="15%" stop-color="#3b82f6" stop-opacity="1"/>
              <stop offset="85%" stop-color="#8b5cf6" stop-opacity="1"/>
              <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0"/>
            </linearGradient>
            <filter id="threadBlur">
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <path class="tot-thread-path-bg" d="M 100 0 Q 60 200, 100 400 Q 140 600, 100 800 Q 60 1000, 100 1200 Q 140 1400, 100 1600 Q 80 1800, 100 2000"
            fill="none" stroke="rgba(59,130,246,0.08)" stroke-width="40" stroke-linecap="round"/>
          <path class="tot-thread-path" d="M 100 0 Q 60 200, 100 400 Q 140 600, 100 800 Q 60 1000, 100 1200 Q 140 1400, 100 1600 Q 80 1800, 100 2000"
            fill="none" stroke="url(#threadGrad)" stroke-width="3" stroke-linecap="round" filter="url(#threadBlur)"/>
          <path class="tot-thread-path-glow" d="M 100 0 Q 60 200, 100 400 Q 140 600, 100 800 Q 60 1000, 100 1200 Q 140 1400, 100 1600 Q 80 1800, 100 2000"
            fill="none" stroke="url(#threadGrad)" stroke-width="8" stroke-linecap="round" opacity="0.3"/>
        </svg>

        <!-- Traveler orb -->
        <div class="tot-traveler">
          <div class="tot-traveler-core"></div>
          <div class="tot-traveler-ring"></div>
          <div class="tot-traveler-ring tot-traveler-ring--2"></div>
        </div>
      </div>

      <!-- Header -->
      <header class="tot-header">
        <div class="tot-header-inner">
          <span class="tot-eyebrow">${section.eyebrow || ''}</span>
          <h2 class="tot-heading">${section.title || ''}</h2>
          ${section.storyTitle ? `<p class="tot-subheading">${section.storyTitle}</p>` : ''}
          <div class="tot-scroll-hint">
            <span>Scroll to explore</span>
            <div class="tot-scroll-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
            </div>
          </div>
        </div>
      </header>

      <!-- Milestone cards -->
      <div class="tot-milestones-track">
        ${milestonesHTML}
      </div>

      <!-- Progress bar -->
      <div class="tot-progress" aria-hidden="true">
        <div class="tot-progress-fill"></div>
        <div class="tot-progress-labels">
          ${milestones.map((m, i) => `<span class="tot-progress-label" data-index="${i}">${m.year}</span>`).join('')}
        </div>
      </div>
    </section>
  `;
}

/* ── PARTICLE SYSTEM ── */
function initTotParticles(canvas) {
  if (!canvas) return null;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId = null;
  let w, h;

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }

  function createParticles() {
    particles = [];
    const count = Math.min(80, Math.floor((w * h) / 15000));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.15 + 0.05,
        r: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        hue: Math.random() > 0.5 ? 220 : 260,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y > h + 10) { p.y = -10; p.x = Math.random() * w; }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${p.opacity})`;
      ctx.fill();
    }

    // Draw faint connections between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `hsla(220, 60%, 60%, ${0.06 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    animId = requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();

  const ro = new ResizeObserver(() => { resize(); createParticles(); });
  ro.observe(canvas);

  return {
    destroy() {
      if (animId) cancelAnimationFrame(animId);
      ro.disconnect();
    }
  };
}

/* ── GSAP SCROLL ANIMATIONS ── */
function initAboutJourneyV2Animations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const section = document.querySelector('.tot-section');
  if (!section || section.dataset.v2animated === 'true') return;
  section.dataset.v2animated = 'true';

  // Particle canvas
  const canvas = section.querySelector('.tot-particles');
  const particleSystem = initTotParticles(canvas);

  // Thread path animation
  const threadPath = section.querySelector('.tot-thread-path');
  const threadGlow = section.querySelector('.tot-thread-path-glow');
  const traveler = section.querySelector('.tot-traveler');
  const milestones = gsap.utils.toArray('.tot-milestone');
  const progressFill = section.querySelector('.tot-progress-fill');
  const progressLabels = gsap.utils.toArray('.tot-progress-label');

  // Calculate thread path length for draw-on effect
  let threadLen = 0;
  if (threadPath && typeof threadPath.getTotalLength === 'function') {
    threadLen = threadPath.getTotalLength();
    gsap.set(threadPath, { strokeDasharray: threadLen, strokeDashoffset: threadLen });
    if (threadGlow) gsap.set(threadGlow, { strokeDasharray: threadLen, strokeDashoffset: threadLen });
  }

  // Initial state for milestones
  milestones.forEach((m, i) => {
    gsap.set(m, {
      opacity: 0,
      y: 60,
      rotateX: 15,
      scale: 0.9,
      transformPerspective: 1200,
    });
  });

  // Header entrance
  gsap.from('.tot-header-inner', {
    y: 50,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out',
    delay: 0.3,
  });

  // Parallax depth layers
  gsap.to('.tot-depth-back', {
    yPercent: -20,
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    }
  });

  gsap.to('.tot-depth-mid', {
    yPercent: -10,
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.5,
    }
  });

  // Nebula floating animations
  gsap.to('.tot-nebula-1', {
    x: 30, y: -20, scale: 1.1,
    duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut'
  });
  gsap.to('.tot-nebula-2', {
    x: -20, y: 30, scale: 0.95,
    duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut'
  });
  gsap.to('.tot-nebula-3', {
    x: 15, y: -15, scale: 1.05,
    duration: 12, repeat: -1, yoyo: true, ease: 'sine.inOut'
  });

  // Main timeline: scroll-driven milestone reveals
  const count = milestones.length;
  const sectionHeight = window.innerHeight * (count + 1.5);

  const master = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${sectionHeight}`,
      pin: false,
      scrub: 0.6,
      onUpdate: (self) => {
        // Update progress bar
        if (progressFill) {
          progressFill.style.width = `${self.progress * 100}%`;
        }

        // Update progress labels
        const activeIdx = Math.min(count - 1, Math.floor(self.progress * count));
        progressLabels.forEach((l, i) => {
          l.classList.toggle('is-active', i <= activeIdx);
        });

        // Move traveler along thread
        if (traveler && threadPath && threadLen) {
          const drawn = self.progress * threadLen;
          const pt = threadPath.getPointAtLength(drawn);
          const svgRect = threadPath.closest('svg').getBoundingClientRect();
          const sectionRect = section.getBoundingClientRect();
          const scaleX = svgRect.width / 200;
          const scaleY = svgRect.height / 2000;
          traveler.style.left = `${svgRect.left - sectionRect.left + pt.x * scaleX}px`;
          traveler.style.top = `${svgRect.top - sectionRect.top + pt.y * scaleY}px`;
        }
      }
    }
  });

  // Thread draw animation
  if (threadLen) {
    master.to(threadPath, {
      strokeDashoffset: 0,
      ease: 'none',
      duration: 1,
    }, 0);
    if (threadGlow) {
      master.to(threadGlow, {
        strokeDashoffset: 0,
        ease: 'none',
        duration: 1,
      }, 0);
    }
  }

  // Each milestone reveals with 3D perspective animation
  milestones.forEach((m, i) => {
    const start = (i / count) * 0.85;
    const lottiePlayer = m.querySelector('dotlottie-player');

    // Card reveal
    master.to(m, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.12,
      ease: 'power2.out',
      onStart: () => {
        if (lottiePlayer && typeof lottiePlayer.play === 'function') {
          lottiePlayer.play();
        }
      }
    }, start);

    // Milestone glow pulse
    const glow = m.querySelector('.tot-milestone-glow');
    if (glow) {
      master.fromTo(glow, 
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.08, ease: 'power2.out' },
        start
      );
    }
  });

  // Grid lines parallax
  gsap.to('.tot-grid-lines', {
    backgroundPositionY: '-200px',
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    }
  });
}

/* ── STRENGTHS V2 ── */
function renderAboutStrengthsV2(strengths) {
  if (!strengths || !strengths.length) return '';

  const ICONS = {
    factory: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 20V8l5 3V8l5 3V4h8a2 2 0 012 2v14H2z"/><path d="M6 20v-2h3v2M13 20v-2h3v2"/></svg>`,
    gauge: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="13" r="9"/><path d="M12 13l3-5M7 17h10"/></svg>`,
    layers: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`,
    leaf: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 8C8 10 5.9 16.17 3.82 21.34M17 8A5 5 0 0121 3M17 8c-4 0-8 4-10 8"/></svg>`,
    handshake: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 14l6-6 4 4 6-6M22 10l-6 6-4-4-6 6"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/></svg>`,
    lightbulb: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 21h6M12 3a6 6 0 014 10.46V17H8v-3.54A6 6 0 0112 3z"/></svg>`,
    bolt: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
  };

  const cards = strengths.map((s, i) => {
    const icon = ICONS[s.icon] || ICONS.factory;
    return `
      <div class="tot-strength-card" data-aos="fade-up" data-aos-delay="${i * 80}" style="--card-index: ${i}">
        <div class="tot-strength-card-inner">
          <div class="tot-strength-icon-wrap">
            <div class="tot-strength-icon">${icon}</div>
            <div class="tot-strength-icon-glow"></div>
          </div>
          <h3 class="tot-strength-title">${s.title}</h3>
          <p class="tot-strength-desc">${s.description}</p>
        </div>
        <div class="tot-strength-shine"></div>
      </div>
    `;
  }).join('');

  return `
    <section class="tot-strengths-section">
      <div class="container">
        <div class="tot-strengths-header" data-aos="fade-up">
          <span class="tot-eyebrow">Competitive Strengths</span>
          <h2 class="tot-strengths-heading">What Sets Us Apart</h2>
          <p class="tot-strengths-sub">Built on manufacturing depth, sustainability discipline, and innovation capability</p>
        </div>
        <div class="tot-strengths-grid">
          ${cards}
        </div>
      </div>
    </section>
  `;
}

/* ── STORY V2 ── */
function renderAboutStoryV2(story) {
  if (!story) return '';
  return `
    <section class="tot-story-section">
      <div class="container">
        <div class="tot-story-grid">
          <div class="tot-story-visual" data-aos="fade-right">
            <div class="tot-story-image-wrap">
              <img src="assets/img/factory/Main Entry.JPG" alt="Nirbhay manufacturing facility" class="tot-story-image" loading="lazy">
              <div class="tot-story-image-frame"></div>
              <div class="tot-story-image-glow"></div>
            </div>
          </div>
          <div class="tot-story-copy" data-aos="fade-left">
            <h2 class="tot-story-title">${story.title}</h2>
            ${(story.paragraphs || []).map(p => `<p>${p}</p>`).join('')}
          </div>
        </div>
      </div>
    </section>
  `;
}

/* ── FACTORY GALLERY V2 ── */
function renderFactoryGalleryV2(gallery) {
  if (!gallery || !gallery.images || !gallery.images.length) return '';
  return `
    <section class="tot-gallery-section" data-parallax-section>
      <div class="container">
        <div class="tot-gallery-header" data-aos="fade-up">
          ${gallery.eyebrow ? `<span class="tot-eyebrow">${gallery.eyebrow}</span>` : ''}
          <h2 class="tot-gallery-title">${gallery.title}</h2>
          ${gallery.subtitle ? `<p class="tot-gallery-subtitle">${gallery.subtitle}</p>` : ''}
        </div>
      </div>
      <div class="tot-gallery-grid">
        ${gallery.images.map((img, i) => `
          <figure class="tot-gallery-item" data-aos="fade-up" data-aos-delay="${i * 100}">
            <div class="tot-gallery-img-wrap">
              <img src="${img.src}" alt="${img.alt}" class="tot-gallery-img" loading="lazy">
              <div class="tot-gallery-overlay">
                <span class="tot-gallery-caption">${img.caption || ''}</span>
              </div>
            </div>
          </figure>
        `).join('')}
      </div>
      <div class="factory-gallery-lightbox" id="factory-lightbox" aria-hidden="true">
        <button class="factory-lightbox-close" aria-label="Close gallery">&times;</button>
        <button class="factory-lightbox-prev" aria-label="Previous image">&#8249;</button>
        <img class="factory-lightbox-img" src="" alt="">
        <button class="factory-lightbox-next" aria-label="Next image">&#8250;</button>
      </div>
    </section>
  `;
}
