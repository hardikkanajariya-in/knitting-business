function initHomeInteractiveFX() {
  initHomeSectionScrollFX();
  initParallaxCards();

  if (canUseHoverFX()) {
    initMagneticButtons();
    initInteractiveCards();
  }
}

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

function isTouchDevice() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }

  return window.matchMedia('(hover: none), (pointer: coarse)').matches;
}

function canUseHoverFX() {
  return !prefersReducedMotion() && !isTouchDevice();
}

function safelyRegisterScrollPlugin() {
  if (typeof registerScrollPlugin === 'function') {
    registerScrollPlugin();
  }

  return typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
}

function revealMotionFallbackContent() {
  document
    .querySelectorAll('[data-parallax-card], .home-process-step, .home-spotlight-shell, .home-final-cta-card')
    .forEach((element) => {
      element.classList.add('is-revealed');
      element.classList.add('is-active');
      element.style.opacity = '';
      element.style.transform = '';
    });

  const progressFill = document.querySelector('.home-process-progress-fill');
  if (progressFill) {
    progressFill.style.height = '100%';
  }
}

function initMagneticButtons() {
  if (!canUseHoverFX()) return;

  document.querySelectorAll('.magnetic-btn').forEach((button) => {
    if (button.dataset.magneticInit === 'true') return;
    button.dataset.magneticInit = 'true';

    let frameId = 0;
    let rect = null;
    let latestEvent = null;

    const resetButton = () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
        frameId = 0;
      }

      rect = null;
      latestEvent = null;
      button.style.removeProperty('--magnetic-x');
      button.style.removeProperty('--magnetic-y');
    };

    button.addEventListener('mouseenter', () => {
      rect = button.getBoundingClientRect();
    });

    button.addEventListener('mousemove', (event) => {
      latestEvent = event;

      if (frameId) return;

      frameId = requestAnimationFrame(() => {
        frameId = 0;

        if (!rect || !latestEvent) {
          rect = button.getBoundingClientRect();
        }

        const x = latestEvent.clientX - rect.left - rect.width / 2;
        const y = latestEvent.clientY - rect.top - rect.height / 2;

        button.style.setProperty('--magnetic-x', `${x * 0.12}px`);
        button.style.setProperty('--magnetic-y', `${y * 0.18}px`);
      });
    });

    button.addEventListener('mouseleave', resetButton);
    button.addEventListener('blur', resetButton);
  });
}

function initParallaxCards() {
  if (prefersReducedMotion()) {
    document.querySelectorAll('[data-parallax-card]').forEach((element) => {
      element.classList.add('is-revealed');
    });
    return;
  }

  if (!safelyRegisterScrollPlugin()) {
    document.querySelectorAll('[data-parallax-card]').forEach((element) => {
      element.classList.add('is-revealed');
    });
    return;
  }

  gsap.utils.toArray('[data-parallax-card]').forEach((card) => {
    if (card.dataset.parallaxRevealInit === 'true') return;
    card.dataset.parallaxRevealInit = 'true';

    const delay = Number.parseFloat(card.dataset.delay || '0');

    ScrollTrigger.create({
      trigger: card,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.delayedCall(Number.isFinite(delay) ? delay : 0, () => {
          card.classList.add('is-revealed');
        });
      },
    });
  });
}

function initHomeSectionScrollFX() {
  const processSteps = gsapSafeArray('.home-process-step');
  const progressFill = document.querySelector('.home-process-progress-fill');
  const spotlightShell = document.querySelector('.home-spotlight-shell');
  const ctaCard = document.querySelector('.home-final-cta-card');

  if (prefersReducedMotion()) {
    revealMotionFallbackContent();
    return;
  }

  if (!safelyRegisterScrollPlugin()) {
    revealMotionFallbackContent();
    return;
  }

  if (processSteps.length && progressFill) {
    processSteps.forEach((step, index) => {
      if (step.dataset.stepTrigger === 'true') return;
      step.dataset.stepTrigger = 'true';

      ScrollTrigger.create({
        trigger: step,
        start: 'top 70%',
        end: 'bottom 40%',
        toggleClass: { targets: step, className: 'is-active' },
        onEnter: () => updateProcessProgress(progressFill, index, processSteps.length),
        onEnterBack: () => updateProcessProgress(progressFill, index, processSteps.length),
        onLeaveBack: () => updateProcessProgress(progressFill, index - 1, processSteps.length),
      });
    });
  } else {
    processSteps.forEach((step) => step.classList.add('is-active'));
  }

  initSpotlightFloatFX(spotlightShell);
  initRevealScaleFX(spotlightShell, 'spotlightScaleInit', 'top 85%', {
    scale: 0.92,
    opacity: 0.6,
    duration: 0.8,
    ease: 'power2.out',
  });
  initRevealScaleFX(ctaCard, 'ctaScaleInit', 'top 90%', {
    scale: 0.88,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
  });
}

function gsapSafeArray(selector) {
  if (typeof gsap !== 'undefined' && gsap.utils && typeof gsap.utils.toArray === 'function') {
    return gsap.utils.toArray(selector);
  }

  return Array.from(document.querySelectorAll(selector));
}

function updateProcessProgress(progressFill, activeIndex, totalSteps) {
  if (!progressFill || totalSteps <= 0) return;

  const safeIndex = Math.max(-1, Math.min(activeIndex, totalSteps - 1));
  const percent = safeIndex < 0 ? 0 : ((safeIndex + 1) / totalSteps) * 100;

  progressFill.style.height = `${Math.max(0, Math.min(percent, 100))}%`;
}

function initSpotlightFloatFX(spotlightShell) {
  if (!spotlightShell || spotlightShell.dataset.floatInit === 'true' || !canUseHoverFX()) return;

  spotlightShell.dataset.floatInit = 'true';

  gsap.utils.toArray('.home-spotlight-panel').forEach((panel, index) => {
    const tween = gsap.to(panel, {
      y: index % 2 === 0 ? -8 : 8,
      duration: 3.6 + index * 0.3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      paused: true,
    });

    ScrollTrigger.create({
      trigger: panel,
      start: 'top bottom',
      end: 'bottom top',
      onEnter: () => tween.play(),
      onEnterBack: () => tween.play(),
      onLeave: () => tween.pause(),
      onLeaveBack: () => tween.pause(),
    });
  });
}

function initRevealScaleFX(element, datasetKey, start, fromVars) {
  if (!element || element.dataset[datasetKey] === 'true') return;

  element.dataset[datasetKey] = 'true';

  ScrollTrigger.create({
    trigger: element,
    start,
    once: true,
    onEnter: () => {
      gsap.from(element, fromVars);
    },
  });
}

function initInteractiveCards() {
  if (!canUseHoverFX()) return;

  document.querySelectorAll('[data-tilt-card]').forEach((card) => {
    if (card.dataset.tiltInit === 'true') return;
    card.dataset.tiltInit = 'true';

    let frameId = 0;
    let rect = null;
    let latestEvent = null;

    const resetCard = () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
        frameId = 0;
      }

      rect = null;
      latestEvent = null;
      card.style.removeProperty('--tilt-rotate-x');
      card.style.removeProperty('--tilt-rotate-y');
      card.style.removeProperty('--tilt-y');
    };

    card.addEventListener('mouseenter', () => {
      rect = card.getBoundingClientRect();
      card.style.setProperty('--tilt-y', '-6px');
    });

    card.addEventListener('mousemove', (event) => {
      latestEvent = event;

      if (frameId) return;

      frameId = requestAnimationFrame(() => {
        frameId = 0;

        if (!rect || !latestEvent) {
          rect = card.getBoundingClientRect();
        }

        const px = (latestEvent.clientX - rect.left) / rect.width;
        const py = (latestEvent.clientY - rect.top) / rect.height;
        const rotateY = (px - 0.5) * 12;
        const rotateX = (0.5 - py) * 10;

        card.style.setProperty('--tilt-rotate-x', `${rotateX}deg`);
        card.style.setProperty('--tilt-rotate-y', `${rotateY}deg`);
        card.style.setProperty('--tilt-y', '-6px');
      });
    });

    card.addEventListener('mouseleave', resetCard);
    card.addEventListener('blur', resetCard);
  });
}
