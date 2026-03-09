function initHomeInteractiveFX() {
  if (typeof initHomeWebGL === 'function') {
    initHomeWebGL();
  }
  initHeroPointerParallax();
  initMagneticButtons();
  initHomeFloatingScroll();
  initInteractiveCards();
  initHomeSectionScrollFX();
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function initHeroPointerParallax() {
  const hero = document.querySelector('.hero-a-immersive');
  if (!hero || hero.dataset.pointerInit === 'true' || prefersReducedMotion()) return;

  hero.dataset.pointerInit = 'true';

  const scene = hero.querySelector('.hero-a-scene');
  const layeredItems = hero.querySelectorAll('[data-depth]');

  const onMove = (event) => {
    const rect = hero.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const rx = (0.5 - py) * 8;
    const ry = (px - 0.5) * 10;
    const shiftX = (px - 0.5) * 30;
    const shiftY = (py - 0.5) * 24;

    hero.style.setProperty('--mouse-x', `${px * 100}%`);
    hero.style.setProperty('--mouse-y', `${py * 100}%`);
    hero.style.setProperty('--rotate-x', `${rx}deg`);
    hero.style.setProperty('--rotate-y', `${ry}deg`);
    hero.style.setProperty('--float-shift-x', `${shiftX}px`);
    hero.style.setProperty('--float-shift-y', `${shiftY}px`);

    if (scene) {
      scene.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    }

    layeredItems.forEach((item) => {
      const depth = parseFloat(item.dataset.depth || '0');
      const x = (px - 0.5) * depth * 120;
      const y = (py - 0.5) * depth * 90;
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

    gsap.utils.toArray('.hero-a-floating').forEach((card, index) => {
      gsap.to(card, {
        y: index % 2 === 0 ? -14 : 14,
        duration: 3.4 + index * 0.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });

    gsap.to('.hero-a-glow--blue', {
      yPercent: -18,
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      }
    });

    gsap.to('.hero-a-glow--red', {
      yPercent: 16,
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      }
    });
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

function initHomeSectionScrollFX() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.utils.toArray('.home-process-step').forEach((step) => {
    if (step.dataset.stepTrigger === 'true') return;
    step.dataset.stepTrigger = 'true';

    ScrollTrigger.create({
      trigger: step,
      start: 'top 70%',
      end: 'bottom 40%',
      toggleClass: { targets: step, className: 'is-active' }
    });
  });

  gsap.utils.toArray('.home-showcase-card img').forEach((img) => {
    if (img.dataset.parallaxInit === 'true') return;
    img.dataset.parallaxInit = 'true';

    gsap.to(img, {
      yPercent: 10,
      ease: 'none',
      scrollTrigger: {
        trigger: img.closest('.home-showcase-card'),
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      }
    });
  });

  const spotlight = document.querySelector('.home-spotlight-shell');
  if (spotlight && spotlight.dataset.floatInit !== 'true') {
    spotlight.dataset.floatInit = 'true';
    gsap.to('.home-spotlight-panel', {
      y: (index) => index % 2 === 0 ? -10 : 10,
      duration: 3.6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.15,
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
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}