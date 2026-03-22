/* ============================================================
   NC — "The Coating Press"  Animation Engine
   GSAP + ScrollTrigger powered animations
   ============================================================ */

/* ----------------------------------------------------------
   Flow Line — scroll-driven stroke animation
   ---------------------------------------------------------- */
function _initNCFlowLine() {
  const flowLine = document.querySelector('[data-nc-flow-line]');
  if (!flowLine) return;

  const processSection = document.querySelector('.nc-process');
  if (!processSection) return;

  /* Use GSAP to animate the stroke as a proxy: control the line's y2 */
  const totalH = processSection.scrollHeight;
  flowLine.setAttribute('y2', '0%');

  gsap.to(flowLine, {
    attr: { y2: '100%' },
    ease: 'none',
    scrollTrigger: {
      trigger: processSection,
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 0.5
    }
  });

  /* Glow pulse on the flow line */
  gsap.to(flowLine, {
    filter: 'drop-shadow(0 0 10px var(--nc-flow-glow))',
    duration: 1.5,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut'
  });
}


/* ----------------------------------------------------------
   Process Stage Gauges — fill on scroll
   ---------------------------------------------------------- */
function _initNCGauges() {
  const gaugeBars = document.querySelectorAll('.nc-gauge-bar[data-fill]');
  gaugeBars.forEach(bar => {
    const fill = bar.dataset.fill;
    ScrollTrigger.create({
      trigger: bar,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        bar.style.width = fill + '%';
      }
    });
  });
}


/* ----------------------------------------------------------
   Capability Gauges — fill on scroll
   ---------------------------------------------------------- */
function _initNCCapGauges() {
  const capBars = document.querySelectorAll('.nc-cap-gauge-bar[data-fill]');
  capBars.forEach(bar => {
    const fill = bar.dataset.fill;
    ScrollTrigger.create({
      trigger: bar,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        bar.style.width = fill + '%';
      }
    });
  });
}


/* ----------------------------------------------------------
   Cross-section Layer Reveal — progressive opacity
   ---------------------------------------------------------- */
function _initNCLayerReveal() {
  const stages = document.querySelectorAll('.nc-stage');
  stages.forEach(stage => {
    const layers = stage.querySelectorAll('.nc-layer');
    if (!layers.length) return;

    ScrollTrigger.create({
      trigger: stage,
      start: 'top 70%',
      once: true,
      onEnter: () => {
        layers.forEach((layer, i) => {
          setTimeout(() => {
            layer.classList.add('nc-layer-visible');
          }, i * 200);
        });
      }
    });
  });
}


/* ----------------------------------------------------------
   Hero & Capability Stat Counters
   ---------------------------------------------------------- */
function _initNCStatCounters() {
  /* Hero stat values — animate numbers if they contain digits */
  const statValues = document.querySelectorAll('.nc-hero-stat-value');
  statValues.forEach(el => {
    _animateStatOnScroll(el);
  });

  /* Capability values */
  const capValues = document.querySelectorAll('.nc-cap-value[data-nc-counter]');
  capValues.forEach(el => {
    _animateStatOnScroll(el);
  });
}

function _animateStatOnScroll(el) {
  const text = el.textContent.trim();
  const match = text.match(/^([\d,.]+)(\+?)(.*)/);
  if (!match) return; // non-numeric, skip

  const target  = parseFloat(match[1].replace(/,/g, ''));
  const hasSuffix = match[2] + match[3]; // e.g. "+" or "M+"
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
   Stage entrance stagger (GSAP-powered, supplements AOS)
   ---------------------------------------------------------- */
function _initNCStageEntrance() {
  const stages = document.querySelectorAll('.nc-stage');
  stages.forEach((stage, i) => {
    const card = stage.querySelector('.nc-stage-card');
    const badge = stage.querySelector('.nc-stage-badge');
    const textEls = stage.querySelectorAll('.nc-stage-title, .nc-stage-desc, .nc-gauge');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stage,
        start: 'top 75%',
        once: true
      }
    });

    if (badge) {
      tl.from(badge, {
        scale: 0, opacity: 0, duration: 0.4, ease: 'back.out(2)'
      });
    }
    if (card) {
      tl.from(card, {
        y: 30, opacity: 0, duration: 0.5, ease: 'power2.out'
      }, '-=0.2');
    }
    if (textEls.length) {
      tl.from(textEls, {
        y: 20, opacity: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out'
      }, '-=0.3');
    }
  });
}


/* ----------------------------------------------------------
   Master init — called from nc.html
   ---------------------------------------------------------- */
function initNCCoatingAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // Slight delay to let DOM settle after render
  requestAnimationFrame(() => {
    _initNCFlowLine();
    _initNCGauges();
    _initNCCapGauges();
    _initNCLayerReveal();
    _initNCStatCounters();
    _initNCStageEntrance();
  });
}
