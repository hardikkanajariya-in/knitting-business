function _initNCLayerIndicator() {
  const dots = document.querySelectorAll('.nc-layer-dot[data-nc-layer]');
  const progressBar = document.querySelector('.nc-layer-indicator-progress');
  if (!dots.length) return;

  
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetId = dot.dataset.ncLayer;
      const target = document.getElementById(targetId);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  
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

function _initNCStageEntrance() {
  
  const stages = document.querySelectorAll('.nc-stage');
  stages.forEach(stage => {
    const icon = stage.querySelector('.nc-stage-icon-wrap');
    const body   = stage.querySelector('.nc-stage-body');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stage,
        start: 'top 75%',
        once: true
      }
    });

    if (icon) {
      tl.from(icon, { scale: 0.7, opacity: 0, duration: 0.4, ease: 'back.out(1.5)' });
    }
    if (body) {
      tl.from(body, { y: 20, opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2');
    }
  });
}

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
    _initNCParallax();
  });
}
