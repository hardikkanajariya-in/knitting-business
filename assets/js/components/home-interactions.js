function initHomeInteractiveFX() {
  if (typeof initHomeWebGL === 'function') {
    initHomeWebGL();
  }
  initHeroPointerParallax();
  initMagneticButtons();
  initHomeFloatingScroll();
  initInteractiveCards();
  initHomeSectionScrollFX();
  initParallaxCards();
  // Skip heavy background parallax layers on touch / mobile
  if (!('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    initParallaxBackgrounds();
  }
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function initHeroPointerParallax() {
  const hero = document.querySelector('.hero-a-immersive');
  if (!hero || hero.dataset.pointerInit === 'true' || prefersReducedMotion()) return;

  hero.dataset.pointerInit = 'true';

  const scene = hero.querySelector('.hero-a-visual-stage');
  const layeredItems = hero.querySelectorAll('[data-depth]');

  const onMove = (event) => {
    const rect = hero.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const rx = (0.5 - py) * 6;
    const ry = (px - 0.5) * 8;
    const shiftX = (px - 0.5) * 24;
    const shiftY = (py - 0.5) * 18;

    hero.style.setProperty('--mouse-x', `${px * 100}%`);
    hero.style.setProperty('--mouse-y', `${py * 100}%`);
    hero.style.setProperty('--rotate-x', `${rx}deg`);
    hero.style.setProperty('--rotate-y', `${ry}deg`);
    hero.style.setProperty('--float-shift-x', `${shiftX}px`);
    hero.style.setProperty('--float-shift-y', `${shiftY}px`);

    if (scene) {
      scene.style.transform = `translate3d(${shiftX * 0.12}px, ${shiftY * 0.12}px, 0) rotateX(${rx}deg) rotateY(${ry}deg)`;
    }

    layeredItems.forEach((item) => {
      const depth = parseFloat(item.dataset.depth || '0');
      const x = (px - 0.5) * depth * 110;
      const y = (py - 0.5) * depth * 86;
      item.style.transform = `translate3d(${x}px, ${y}px, ${depth * 180}px)`;
    });
  };

  const reset = () => {
    hero.style.setProperty('--mouse-x', '50%');
    hero.style.setProperty('--mouse-y', '50%');
    hero.style.setProperty('--float-shift-x', '0px');
    hero.style.setProperty('--float-shift-y', '0px');
    if (scene) scene.style.transform = '';
    layeredItems.forEach((item) => {
      item.style.transform = '';
    });
  };

  hero.addEventListener('mousemove', onMove);
  hero.addEventListener('mouseleave', reset);
}

function initMagneticButtons() {
  if (prefersReducedMotion()) return;

  document.querySelectorAll('.magnetic-btn').forEach((button) => {
    if (button.dataset.magneticInit === 'true') return;
    button.dataset.magneticInit = 'true';

    button.addEventListener('mousemove', (event) => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      button.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px)`;
    });

    button.addEventListener('mouseleave', () => {
      button.style.transform = '';
    });
  });
}

function initHomeFloatingScroll() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const hero = document.querySelector('.hero-a-immersive');
  if (hero && hero.dataset.scrollFxInit !== 'true') {
    hero.dataset.scrollFxInit = 'true';

    const coreFloat = hero.querySelector('.hero-a-visual-core-float');
    const assetFloats = hero.querySelectorAll('.hero-a-asset-float');
    const blueGlow = hero.querySelector('.hero-a-glow--blue');
    const redGlow = hero.querySelector('.hero-a-glow--red');

    if (coreFloat) {
      gsap.to(coreFloat, {
        y: -12,
        rotation: 3,
        duration: 4.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }

    assetFloats.forEach((card, index) => {
      gsap.to(card, {
        y: index % 2 === 0 ? -16 : 16,
        x: index === 1 ? -8 : 8,
        duration: 3.8 + index * 0.45,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });

    if (blueGlow) {
      gsap.to(blueGlow, {
        yPercent: -18,
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      });
    }

    if (redGlow) {
      gsap.to(redGlow, {
        yPercent: 16,
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      });
    }
  }

  gsap.utils.toArray('.timeline-item').forEach((item) => {
    if (item.dataset.activeTrigger === 'true') return;
    item.dataset.activeTrigger = 'true';

    ScrollTrigger.create({
      trigger: item,
      start: 'top 65%',
      end: 'bottom 35%',
      toggleClass: { targets: item, className: 'is-active' }
    });
  });
}

/* --- Parallax Card Reveal System --- */
function initParallaxCards() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  if (prefersReducedMotion()) {
    document.querySelectorAll('[data-parallax-card]').forEach(el => el.classList.add('is-revealed'));
    return;
  }

  gsap.utils.toArray('[data-parallax-card]').forEach((card) => {
    if (card.dataset.parallaxRevealInit === 'true') return;
    card.dataset.parallaxRevealInit = 'true';

    const delay = parseFloat(card.dataset.delay || 0);

    ScrollTrigger.create({
      trigger: card,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.delayedCall(delay, () => {
          card.classList.add('is-revealed');
        });
      }
    });
  });
}

/* --- Parallax Background Effects --- */
function initParallaxBackgrounds() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  if (prefersReducedMotion()) return;

  // Stats band glows
  gsap.utils.toArray('.home-stats-band-glow').forEach((glow, i) => {
    if (glow.dataset.parallaxBgInit === 'true') return;
    glow.dataset.parallaxBgInit = 'true';

    gsap.to(glow, {
      y: i % 2 === 0 ? -40 : 40,
      x: i % 2 === 0 ? 20 : -20,
      ease: 'none',
      scrollTrigger: {
        trigger: '.home-stats-band',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      }
    });
  });

  // Industries background shapes
  gsap.utils.toArray('.home-industries-shape').forEach((shape, i) => {
    if (shape.dataset.parallaxBgInit === 'true') return;
    shape.dataset.parallaxBgInit = 'true';

    gsap.to(shape, {
      y: i % 2 === 0 ? -50 : 50,
      x: i % 2 === 0 ? 30 : -30,
      scale: 1.1,
      ease: 'none',
      scrollTrigger: {
        trigger: '.home-industries',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      }
    });
  });

  // Industries gallery scroll-speed variation
  document.querySelectorAll('[data-scroll-gallery]').forEach((row) => {
    if (row.dataset.galleryInit === 'true') return;
    row.dataset.galleryInit = 'true';

    const track = row.querySelector('.home-ind-track');
    if (!track) return;
    const dir = row.dataset.scrollGallery; // 'left' or 'right'

    // GSAP takes over from CSS animation
    track.style.animation = 'none';

    const totalW = track.scrollWidth / 3; // items are tripled
    const duration = dir === 'left' ? 35 : 40;

    // Set starting position
    if (dir === 'right') gsap.set(track, { x: -totalW });

    // Infinite loop tween
    const loop = gsap.to(track, {
      x: dir === 'left' ? -totalW : 0,
      duration,
      ease: 'none',
      repeat: -1,
    });

    // Modulate speed based on scroll velocity
    ScrollTrigger.create({
      trigger: '.home-industries',
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const v = Math.abs(self.getVelocity()) / 800;
        gsap.to(loop, { timeScale: 1 + Math.min(v, 3), duration: 0.3, overwrite: true });
      },
      onLeave: () => gsap.to(loop, { timeScale: 1, duration: 0.5 }),
      onLeaveBack: () => gsap.to(loop, { timeScale: 1, duration: 0.5 }),
    });
  });

  // Showcase background gradient
  const showcaseGradient = document.querySelector('.home-showcase-gradient');
  if (showcaseGradient && showcaseGradient.dataset.parallaxBgInit !== 'true') {
    showcaseGradient.dataset.parallaxBgInit = 'true';
    gsap.to(showcaseGradient, {
      y: -60,
      scale: 1.2,
      ease: 'none',
      scrollTrigger: {
        trigger: '.home-showcase',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      }
    });
  }

  // Process section glows
  gsap.utils.toArray('.home-process-glow').forEach((glow, i) => {
    if (glow.dataset.parallaxBgInit === 'true') return;
    glow.dataset.parallaxBgInit = 'true';

    gsap.to(glow, {
      y: i % 2 === 0 ? -35 : 35,
      ease: 'none',
      scrollTrigger: {
        trigger: '.home-process',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      }
    });
  });

  // Spotlight glows
  gsap.utils.toArray('.home-spotlight-glow').forEach((glow, i) => {
    if (glow.dataset.parallaxBgInit === 'true') return;
    glow.dataset.parallaxBgInit = 'true';

    gsap.to(glow, {
      y: i % 2 === 0 ? -30 : 30,
      x: i % 2 === 0 ? 15 : -15,
      ease: 'none',
      scrollTrigger: {
        trigger: '.home-spotlight',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      }
    });
  });

  // Final CTA glow
  const ctaGlow = document.querySelector('.home-final-cta-glow');
  if (ctaGlow && ctaGlow.dataset.parallaxBgInit !== 'true') {
    ctaGlow.dataset.parallaxBgInit = 'true';
    gsap.to(ctaGlow, {
      scale: 1.3,
      ease: 'none',
      scrollTrigger: {
        trigger: '.home-final-cta',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      }
    });
  }
}

function initHomeSectionScrollFX() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  // --- Process steps: activation + progress line ---
  const processSteps = gsap.utils.toArray('.home-process-step');
  const progressFill = document.querySelector('.home-process-progress-fill');

  processSteps.forEach((step, i) => {
    if (step.dataset.stepTrigger === 'true') return;
    step.dataset.stepTrigger = 'true';

    ScrollTrigger.create({
      trigger: step,
      start: 'top 70%',
      end: 'bottom 40%',
      toggleClass: { targets: step, className: 'is-active' },
      onUpdate: () => {
        if (progressFill && processSteps.length > 0) {
          let activeCount = 0;
          processSteps.forEach(s => {
            if (s.classList.contains('is-active')) activeCount++;
          });
          const pct = ((activeCount) / processSteps.length) * 100;
          progressFill.style.height = Math.min(pct, 100) + '%';
        }
      }
    });
  });

  // --- Showcase card image parallax ---
  gsap.utils.toArray('.home-showcase-card img').forEach((img) => {
    if (img.dataset.parallaxInit === 'true') return;
    img.dataset.parallaxInit = 'true';

    gsap.to(img, {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: {
        trigger: img.closest('.home-showcase-card'),
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      }
    });
  });

  // --- Spotlight panel float ---
  const spotlight = document.querySelector('.home-spotlight-shell');
  if (spotlight && spotlight.dataset.floatInit !== 'true') {
    spotlight.dataset.floatInit = 'true';

    gsap.utils.toArray('.home-spotlight-panel').forEach((panel, index) => {
      gsap.to(panel, {
        y: index % 2 === 0 ? -8 : 8,
        duration: 3.6 + index * 0.3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });
  }

  // --- Showcase shell parallax reveal ---
  const showcaseShell = document.querySelector('.home-spotlight-shell');
  if (showcaseShell && showcaseShell.dataset.scaleInit !== 'true') {
    showcaseShell.dataset.scaleInit = 'true';

    gsap.from(showcaseShell, {
      scale: 0.92,
      opacity: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: showcaseShell,
        start: 'top 85%',
        end: 'top 50%',
        scrub: 1,
      }
    });
  }

  // --- Final CTA card scale-up ---
  const ctaCard = document.querySelector('.home-final-cta-card');
  if (ctaCard && ctaCard.dataset.scaleInit !== 'true') {
    ctaCard.dataset.scaleInit = 'true';

    gsap.from(ctaCard, {
      scale: 0.88,
      opacity: 0,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: ctaCard,
        start: 'top 92%',
        end: 'top 55%',
        scrub: 1,
      }
    });
  }

  // --- Marquee scroll-speed variation ---
  const marqueeTrack = document.querySelector('.home-trust-track');
  if (marqueeTrack && marqueeTrack.dataset.scrollSpeedInit !== 'true') {
    marqueeTrack.dataset.scrollSpeedInit = 'true';

    ScrollTrigger.create({
      trigger: '.home-trust-strip',
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const speed = 1 + self.progress * 1.5;
        marqueeTrack.style.animationDuration = (24 / speed) + 's';
      }
    });
  }
}

function initInteractiveCards() {
  if (prefersReducedMotion()) return;

  document.querySelectorAll('[data-tilt-card]').forEach((card) => {
    if (card.dataset.tiltInit === 'true') return;
    card.dataset.tiltInit = 'true';

    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * 12;
      const rotateX = (0.5 - py) * 10;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}