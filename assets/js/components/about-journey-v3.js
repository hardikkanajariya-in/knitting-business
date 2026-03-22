/* ============================================
   ABOUT-JOURNEY-V3.JS — "Fabric Layers"
   Horizontal 3D card stack · Woven fabric metaphor
   Perspective transforms · Glassmorphism panels
   ============================================ */

function renderAboutJourneyV3(section) {
  if (!section) return '';

  const milestones = section.milestones || [];

  const slides = milestones.map((m, i) => {
    const lottieSrc = m.lottie || '';
    const gradients = [
      'linear-gradient(135deg, #1e3a5f 0%, #0f1f33 100%)',
      'linear-gradient(135deg, #2d1b4e 0%, #1a0f2e 100%)',
      'linear-gradient(135deg, #1a3c34 0%, #0f2420 100%)',
      'linear-gradient(135deg, #3b1f1f 0%, #1f0f0f 100%)',
      'linear-gradient(135deg, #1b2d4e 0%, #0f1a2e 100%)',
    ];
    return `
      <div class="fl-slide" data-index="${i}" style="--slide-bg: ${gradients[i % gradients.length]}">
        <div class="fl-slide-inner">
          <!-- Woven texture overlay -->
          <div class="fl-weave-texture" aria-hidden="true"></div>
          
          <!-- Floating fiber lines -->
          <svg class="fl-fiber-lines" viewBox="0 0 800 600" preserveAspectRatio="none" aria-hidden="true">
            <path class="fl-fiber fl-fiber-1" d="M -50 100 Q 200 50, 400 120 Q 600 190, 850 80" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1.5"/>
            <path class="fl-fiber fl-fiber-2" d="M -50 300 Q 150 250, 400 330 Q 650 410, 850 280" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="2"/>
            <path class="fl-fiber fl-fiber-3" d="M -50 500 Q 250 450, 400 520 Q 550 590, 850 470" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
          </svg>

          <!-- Content -->
          <div class="fl-slide-content">
            <div class="fl-slide-left">
              <div class="fl-lottie-stage">
                ${lottieSrc ? `<dotlottie-player
                  src="${lottieSrc}"
                  background="transparent"
                  speed="0.7"
                  loop
                  class="fl-lottie-player"
                ></dotlottie-player>` : `<div class="fl-lottie-placeholder">
                  <svg viewBox="0 0 80 80" fill="none">
                    <circle cx="40" cy="40" r="35" stroke="rgba(255,255,255,0.15)" stroke-width="2" stroke-dasharray="8 6"/>
                    <circle cx="40" cy="40" r="15" fill="rgba(255,255,255,0.08)"/>
                  </svg>
                </div>`}
                <div class="fl-lottie-orbit" aria-hidden="true">
                  <div class="fl-orbit-dot"></div>
                </div>
              </div>
            </div>
            <div class="fl-slide-right">
              <div class="fl-year-chip">
                <span class="fl-year-num">${m.year}</span>
                <span class="fl-year-line"></span>
              </div>
              <h3 class="fl-slide-title">${m.title}</h3>
              <p class="fl-slide-desc">${m.description}</p>
              <div class="fl-slide-index">${String(i + 1).padStart(2, '0')}<span>/${String(milestones.length).padStart(2, '0')}</span></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  return `
    <section class="fl-section" id="fabric-layers">
      <!-- Background gradient layer -->
      <div class="fl-bg-gradient" aria-hidden="true"></div>

      <!-- Header -->
      <header class="fl-header">
        <div class="fl-header-content">
          <div class="fl-header-badge">
            <span class="fl-header-badge-dot"></span>
            <span>${section.eyebrow || ''}</span>
          </div>
          <h2 class="fl-header-title">${section.title || ''}</h2>
          ${section.storyTitle ? `<p class="fl-header-subtitle">${section.storyTitle}</p>` : ''}
        </div>
      </header>

      <!-- 3D Card Stack Container -->
      <div class="fl-stack-viewport">
        <div class="fl-stack-track">
          ${slides}
        </div>

        <!-- Navigation -->
        <div class="fl-nav">
          <button class="fl-nav-btn fl-nav-prev" aria-label="Previous milestone" disabled>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <div class="fl-nav-dots">
            ${milestones.map((_, i) => `<button class="fl-nav-dot${i === 0 ? ' is-active' : ''}" data-index="${i}" aria-label="Go to milestone ${i + 1}"></button>`).join('')}
          </div>
          <button class="fl-nav-btn fl-nav-next" aria-label="Next milestone">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>

        <!-- Scroll progress -->
        <div class="fl-scroll-progress">
          <div class="fl-scroll-progress-bar"></div>
        </div>
      </div>
    </section>
  `;
}

/* ── 3D CARD STACK ANIMATION ENGINE ── */
function initAboutJourneyV3Animations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const section = document.querySelector('.fl-section');
  if (!section || section.dataset.v3animated === 'true') return;
  section.dataset.v3animated = 'true';

  const viewport = section.querySelector('.fl-stack-viewport');
  const track = section.querySelector('.fl-stack-track');
  const slides = gsap.utils.toArray('.fl-slide');
  const dots = gsap.utils.toArray('.fl-nav-dot');
  const prevBtn = section.querySelector('.fl-nav-prev');
  const nextBtn = section.querySelector('.fl-nav-next');
  const progressBar = section.querySelector('.fl-scroll-progress-bar');
  const count = slides.length;
  if (!count || !viewport) return;

  let currentSlide = 0;

  // Set initial 3D stack positions — cards stacked with depth
  slides.forEach((slide, i) => {
    if (i === 0) slide.classList.add('is-active');
    gsap.set(slide, {
      zIndex: count - i,
      scale: 1 - i * 0.04,
      y: i * 12,
      opacity: i < 3 ? 1 : 0,
      rotateX: i * 1.5,
      transformOrigin: 'center top',
      transformPerspective: 1200,
    });
  });

  // Header entrance
  gsap.from('.fl-header-content', {
    y: 40,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
    }
  });

  // Fiber line animations on each slide
  slides.forEach(slide => {
    const fibers = slide.querySelectorAll('.fl-fiber');
    fibers.forEach((fiber, fi) => {
      const len = fiber.getTotalLength ? fiber.getTotalLength() : 1000;
      gsap.set(fiber, { strokeDasharray: len, strokeDashoffset: len });
    });
  });

  // Animate visible fibers
  function animateSlide(index) {
    const slide = slides[index];
    if (!slide) return;

    const fibers = slide.querySelectorAll('.fl-fiber');
    fibers.forEach((fiber, fi) => {
      const len = fiber.getTotalLength ? fiber.getTotalLength() : 1000;
      gsap.to(fiber, {
        strokeDashoffset: 0,
        duration: 2 + fi * 0.5,
        ease: 'power2.out',
        delay: fi * 0.2,
      });
    });

    // Play lottie
    const player = slide.querySelector('dotlottie-player');
    if (player && typeof player.play === 'function') {
      setTimeout(() => player.play(), 300);
    }
  }

  // Transition to slide
  function goToSlide(index) {
    if (index < 0 || index >= count || index === currentSlide) return;

    const direction = index > currentSlide ? 1 : -1;
    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });

    if (direction > 0) {
      // Going forward: current card flies up and fades
      for (let i = currentSlide; i < index; i++) {
        tl.to(slides[i], {
          y: -100,
          opacity: 0,
          scale: 0.9,
          rotateX: -10,
          duration: 0.5,
        }, i === currentSlide ? 0 : '<0.1');
      }
    } else {
      // Going backward: bring cards back
      for (let i = currentSlide - 1; i >= index; i--) {
        tl.to(slides[i], {
          y: (i - index) * 12,
          opacity: i === index ? 1 : (0.6 - (i - index) * 0.15),
          scale: 1 - (i - index) * 0.04,
          rotateX: (i - index) * 1.5,
          duration: 0.5,
        }, i === currentSlide - 1 ? 0 : '<0.1');
      }
    }

    // Reposition remaining cards
    slides.forEach((slide, i) => {
      if (i < index) return;
      const offset = i - index;
      slide.classList.toggle('is-active', offset === 0);
      tl.to(slide, {
        y: offset * 12,
        opacity: offset < 3 ? 1 : 0,
        scale: 1 - offset * 0.04,
        rotateX: offset * 1.5,
        zIndex: count - offset,
        duration: 0.5,
      }, direction > 0 ? 0.15 : 0.15);
    });

    currentSlide = index;

    // Update navigation
    dots.forEach((d, i) => d.classList.toggle('is-active', i === currentSlide));
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === count - 1;

    // Update progress
    if (progressBar) {
      progressBar.style.width = `${((currentSlide + 1) / count) * 100}%`;
    }

    // Animate fibers on new slide
    animateSlide(currentSlide);
  }

  // Navigation clicks
  if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
  dots.forEach(dot => {
    dot.addEventListener('click', () => goToSlide(parseInt(dot.dataset.index)));
  });

  // Scroll-driven transitions
  ScrollTrigger.create({
    trigger: viewport,
    start: 'top top',
    end: () => `+=${window.innerHeight * count}`,
    pin: true,
    pinSpacing: true,
    scrub: 0.5,
    onUpdate: (self) => {
      const progress = self.progress;
      const targetSlide = Math.min(count - 1, Math.floor(progress * count));

      if (targetSlide !== currentSlide) {
        goToSlide(targetSlide);
      }

      // Continuous progress update
      if (progressBar) {
        progressBar.style.width = `${progress * 100}%`;
      }
    }
  });

  // Animate first slide fibers on entry
  animateSlide(0);

  // Keyboard navigation
  section.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      goToSlide(currentSlide + 1);
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      goToSlide(currentSlide - 1);
    }
  });
  section.setAttribute('tabindex', '0');
}

/* ── STRENGTHS V3 ── */
function renderAboutStrengthsV3(strengths) {
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
      <div class="fl-strength-card" data-aos="fade-up" data-aos-delay="${i * 70}">
        <div class="fl-strength-number">${String(i + 1).padStart(2, '0')}</div>
        <div class="fl-strength-icon">${icon}</div>
        <h3 class="fl-strength-title">${s.title}</h3>
        <p class="fl-strength-desc">${s.description}</p>
        <div class="fl-strength-accent-line"></div>
      </div>
    `;
  }).join('');

  return `
    <section class="fl-strengths-section">
      <div class="container">
        <div class="fl-strengths-header" data-aos="fade-up">
          <div class="fl-header-badge">
            <span class="fl-header-badge-dot"></span>
            <span>Competitive Strengths</span>
          </div>
          <h2 class="fl-strengths-heading">What Sets Us Apart</h2>
          <p class="fl-strengths-sub">Built on manufacturing depth, sustainability discipline, and innovation capability</p>
        </div>
        <div class="fl-strengths-grid">
          ${cards}
        </div>
      </div>
    </section>
  `;
}

/* ── STORY V3 ── */
function renderAboutStoryV3(story) {
  if (!story) return '';
  return `
    <section class="fl-story-section">
      <div class="container">
        <div class="fl-story-layout">
          <div class="fl-story-media" data-aos="fade-right">
            <div class="fl-story-img-container">
              <img src="assets/img/factory/Main Entry.JPG" alt="Nirbhay manufacturing facility" class="fl-story-img" loading="lazy">
              <div class="fl-story-img-border"></div>
            </div>
            <div class="fl-story-floating-stat">
              <span class="fl-floating-value">40+</span>
              <span class="fl-floating-label">Years of Excellence</span>
            </div>
          </div>
          <div class="fl-story-text" data-aos="fade-left">
            <div class="fl-header-badge" style="margin-bottom: 1.5rem;">
              <span class="fl-header-badge-dot"></span>
              <span>Our Story</span>
            </div>
            <h2 class="fl-story-title">${story.title}</h2>
            ${(story.paragraphs || []).map(p => `<p class="fl-story-para">${p}</p>`).join('')}
          </div>
        </div>
      </div>
    </section>
  `;
}

/* ── FACTORY GALLERY V3 ── */
function renderFactoryGalleryV3(gallery) {
  if (!gallery || !gallery.images || !gallery.images.length) return '';
  return `
    <section class="fl-gallery-section" data-parallax-section>
      <div class="container">
        <div class="fl-gallery-header" data-aos="fade-up">
          ${gallery.eyebrow ? `<div class="fl-header-badge"><span class="fl-header-badge-dot"></span><span>${gallery.eyebrow}</span></div>` : ''}
          <h2 class="fl-gallery-title">${gallery.title}</h2>
          ${gallery.subtitle ? `<p class="fl-gallery-subtitle">${gallery.subtitle}</p>` : ''}
        </div>
      </div>
      <div class="fl-gallery-masonry">
        ${gallery.images.map((img, i) => `
          <figure class="fl-gallery-item${i === 0 ? ' fl-gallery-item--large' : ''}" data-aos="zoom-in" data-aos-delay="${i * 120}">
            <div class="fl-gallery-img-container">
              <img src="${img.src}" alt="${img.alt}" class="fl-gallery-img" loading="lazy">
              <div class="fl-gallery-hover-overlay">
                <div class="fl-gallery-hover-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                </div>
                ${img.caption ? `<span class="fl-gallery-hover-caption">${img.caption}</span>` : ''}
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
