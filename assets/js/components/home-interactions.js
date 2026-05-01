function initHomeInteractiveFX() {
  initMagneticButtons();
  initInteractiveCards();
  initHomeSectionScrollFX();
  initParallaxCards();
  if (!('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    initParallaxBackgrounds();
  }
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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

function initParallaxBackgrounds() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  if (prefersReducedMotion()) return;
  document.querySelectorAll('[data-scroll-gallery]').forEach((row) => {
    if (row.dataset.galleryInit === 'true') return;
    row.dataset.galleryInit = 'true';

    const track = row.querySelector('.home-ind-track');
    if (!track) return;
    const dir = row.dataset.scrollGallery;
    track.style.animation = 'none';

    const totalW = track.scrollWidth / 3;
    const duration = dir === 'left' ? 35 : 40;
    if (dir === 'right') gsap.set(track, { x: -totalW });
    gsap.to(track, {
      x: dir === 'left' ? -totalW : 0,
      duration,
      ease: 'none',
      repeat: -1,
    });
  });
}

function initHomeSectionScrollFX() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  const processSteps = gsap.utils.toArray('.home-process-step');
  const progressFill = document.querySelector('.home-process-progress-fill');

  let activeCount = 0;

  processSteps.forEach((step, i) => {
    if (step.dataset.stepTrigger === 'true') return;
    step.dataset.stepTrigger = 'true';

    ScrollTrigger.create({
      trigger: step,
      start: 'top 70%',
      end: 'bottom 40%',
      toggleClass: { targets: step, className: 'is-active' },
      onToggle: (self) => {
        if (progressFill && processSteps.length > 0) {
          // Increment or decrement based on toggle state instead of querying DOM
          activeCount += self.isActive ? 1 : -1;
          const pct = (activeCount / processSteps.length) * 100;
          progressFill.style.height = Math.min(pct, 100) + '%';
        }
      }
    });
  });
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
  const showcaseShell = document.querySelector('.home-spotlight-shell');
  if (showcaseShell && showcaseShell.dataset.scaleInit !== 'true') {
    showcaseShell.dataset.scaleInit = 'true';

    ScrollTrigger.create({
      trigger: showcaseShell,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.from(showcaseShell, {
          scale: 0.92,
          opacity: 0.6,
          duration: 0.8,
          ease: 'power2.out',
        });
      }
    });
  }
  const ctaCard = document.querySelector('.home-final-cta-card');
  if (ctaCard && ctaCard.dataset.scaleInit !== 'true') {
    ctaCard.dataset.scaleInit = 'true';

    ScrollTrigger.create({
      trigger: ctaCard,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.from(ctaCard, {
          scale: 0.88,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
        });
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
