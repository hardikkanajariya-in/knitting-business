/* ============================================================
   NC - "The Cross-Section"  Animation Engine
   GSAP + ScrollTrigger powered animations
   ============================================================ */

/* ----------------------------------------------------------
   Layer Indicator - scroll-driven sidebar tracking
   ---------------------------------------------------------- */
function _initNCLayerIndicator() {
  const dots = document.querySelectorAll('.nc-layer-dot[data-nc-layer]');
  const progressBar = document.querySelector('.nc-layer-indicator-progress');
  if (!dots.length) return;

  /* Click to scroll */
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetId = dot.dataset.ncLayer;
      const target = document.getElementById(targetId);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* Scroll tracking */
  const sections = Array.from(dots).map(d => document.getElementById(d.dataset.ncLayer)).filter(Boolean);
  if (!sections.length) return;

  ScrollTrigger.create({
    trigger: document.body,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      if (progressBar) progressBar.style.height = (self.progress * 100) + '%';

      const scrollY = window.scrollY + window.innerHeight * 0.4;
      let activeIdx = 0;

      sections.forEach((sec, i) => {
        if (sec.offsetTop <= scrollY) activeIdx = i;
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === activeIdx);
      });
    }
  });
}


/* ----------------------------------------------------------
   Precision Line - fill on scroll through process section
   ---------------------------------------------------------- */
function _initNCPrecisionLine() {
  const fill = document.querySelector('[data-nc-precision-fill]');
  const processSection = document.querySelector('.nc-process');
  if (!fill || !processSection) return;

  gsap.to(fill, {
    height: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: processSection,
      start: 'top 70%',
      end: 'bottom 30%',
      scrub: 0.3
    }
  });

  /* Activate stages as line passes them */
  const stages = processSection.querySelectorAll('.nc-stage');
  stages.forEach(stage => {
    ScrollTrigger.create({
      trigger: stage,
      start: 'top 60%',
      end: 'bottom 40%',
      toggleClass: { targets: stage, className: 'nc-stage-active' }
    });
  });
}


/* ----------------------------------------------------------
   Process Stage Gauges - fill on scroll
   ---------------------------------------------------------- */
function _initNCGauges() {
  const gaugeBars = document.querySelectorAll('.nc-gauge-bar[data-fill]');
  gaugeBars.forEach(bar => {
    const fill = bar.dataset.fill;
    ScrollTrigger.create({
      trigger: bar,
      start: 'top 85%',
      once: true,
      onEnter: () => { bar.style.width = fill + '%'; }
    });
  });
}


/* ----------------------------------------------------------
   Capability Gauges - fill on scroll
   ---------------------------------------------------------- */
function _initNCCapGauges() {
  const capBars = document.querySelectorAll('.nc-cap-gauge-bar[data-fill]');
  capBars.forEach(bar => {
    const fill = bar.dataset.fill;
    ScrollTrigger.create({
      trigger: bar,
      start: 'top 85%',
      once: true,
      onEnter: () => { bar.style.width = fill + '%'; }
    });
  });
}


/* ----------------------------------------------------------
   Stat Counters - numeric animation
   ---------------------------------------------------------- */
function _initNCStatCounters() {
  const statValues = document.querySelectorAll('.nc-hero-stat-value');
  statValues.forEach(el => _animateStatOnScroll(el));

  const capValues = document.querySelectorAll('.nc-cap-value[data-nc-counter]');
  capValues.forEach(el => _animateStatOnScroll(el));
}

function _animateStatOnScroll(el) {
  const text = el.textContent.trim();
  const match = text.match(/^([\d,.]+)(\+?)(.*)/);
  if (!match) return;

  const target = parseFloat(match[1].replace(/,/g, ''));
  const hasSuffix = match[2] + match[3];
  if (isNaN(target)) return;

  const isDecimal = match[1].includes('.');
  el.textContent = '0' + hasSuffix;

  ScrollTrigger.create({
    trigger: el,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 1.8,
        ease: 'power2.out',
        onUpdate: () => {
          const display = isDecimal
            ? obj.val.toFixed(1)
            : Math.round(obj.val).toLocaleString();
          el.textContent = display + hasSuffix;
        }
      });
    }
  });
}


/* ----------------------------------------------------------
   Stage entrance stagger (GSAP-powered)
   ---------------------------------------------------------- */
function _initNCStageEntrance() {
  const stages = document.querySelectorAll('.nc-stage');
  stages.forEach(stage => {
    const number = stage.querySelector('.nc-stage-number');
    const title = stage.querySelector('.nc-stage-title');
    const desc = stage.querySelector('.nc-stage-desc');
    const gauge = stage.querySelector('.nc-gauge');
    const lottie = stage.querySelector('.nc-stage-lottie-wrap');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stage,
        start: 'top 75%',
        once: true
      }
    });

    if (number) {
      tl.from(number, { x: -20, opacity: 0, duration: 0.5, ease: 'power2.out' });
    }
    if (lottie) {
      tl.from(lottie, { scale: 0.7, opacity: 0, duration: 0.4, ease: 'back.out(1.5)' }, '-=0.3');
    }
    if (title) {
      tl.from(title, { y: 15, opacity: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2');
    }
    if (desc) {
      tl.from(desc, { y: 10, opacity: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2');
    }
    if (gauge) {
      tl.from(gauge, { y: 10, opacity: 0, duration: 0.3, ease: 'power2.out' }, '-=0.2');
    }
  });
}


/* ----------------------------------------------------------
   Product card stagger entrance
   ---------------------------------------------------------- */
function _initNCProductEntrance() {
  const cards = document.querySelectorAll('.nc-swatch');
  if (!cards.length) return;

  gsap.from(cards, {
    y: 40,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.nc-product-grid',
      start: 'top 80%',
      once: true
    }
  });
}


/* ----------------------------------------------------------
   Content block parallax
   ---------------------------------------------------------- */
function _initNCParallax() {
  const bgImg = document.querySelector('.nc-content-block-bg');
  if (!bgImg) return;

  gsap.to(bgImg, {
    yPercent: 15,
    ease: 'none',
    scrollTrigger: {
      trigger: '.nc-content-block',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.5
    }
  });
}


/* ----------------------------------------------------------
   Master init
   ---------------------------------------------------------- */
function initNCCoatingAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  requestAnimationFrame(() => {
    _initNCLayerIndicator();
    _initNCPrecisionLine();
    _initNCGauges();
    _initNCCapGauges();
    _initNCStatCounters();
    _initNCStageEntrance();
    _initNCProductEntrance();
    _initNCParallax();
  });
}
