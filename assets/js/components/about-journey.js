const ABOUT_JOURNEY_POSITIONS = [
  { side: 'left', top: '19%', left: '7.5%' },
  { side: 'right', top: '33%', left: '67.5%' },
  { side: 'left', top: '50.5%', left: '6%' },
  { side: 'right', top: '59.5%', left: '68.5%' },
  { side: 'left', top: '81.5%', left: '10%' },
];

function renderAboutJourney(section) {
  if (!section) return '';

  const milestones = (section.milestones || []).slice(0, 5).map((milestone, index) => {
    const pos = ABOUT_JOURNEY_POSITIONS[index] || ABOUT_JOURNEY_POSITIONS[ABOUT_JOURNEY_POSITIONS.length - 1];
    return `
      <article class="journey-road-milestone journey-road-milestone--${pos.side}" style="--card-top: ${pos.top}; --card-left: ${pos.left};">
        <div class="journey-road-milestone-card">
          ${pos.side === 'right' ? `<img class="journey-road-milestone-icon" src="${milestone.icon}" alt="${milestone.title} icon">` : ''}
          <div class="journey-road-milestone-copy">
            <div class="journey-road-year">${milestone.year}</div>
            <h3 class="journey-road-milestone-title">${milestone.title}</h3>
            <p class="journey-road-milestone-desc">${milestone.description}</p>
          </div>
          ${pos.side === 'left' ? `<img class="journey-road-milestone-icon" src="${milestone.icon}" alt="${milestone.title} icon">` : ''}
        </div>
      </article>
    `;
  }).join('');

  return `
    <section class="journey-road" id="journey-road">
      <div class="container">
        <div class="journey-road-shell">
          <header class="journey-road-heading">
            <p class="journey-road-eyebrow">${section.eyebrow || ''}</p>
            <h1 class="journey-road-title">${section.title || ''}</h1>
          </header>

          <div class="journey-road-grid">
            <div class="journey-road-copy">
              <h2 class="journey-road-copy-title">${section.storyTitle || ''}</h2>
              <div class="journey-road-copy-body">
                ${(section.paragraphs || []).map((paragraph) => `<p>${paragraph}</p>`).join('')}
              </div>
            </div>

            <div class="journey-road-visual">
              <img class="journey-road-lineart journey-road-lineart--left" src="${section.decor?.leftLines || ''}" alt="" aria-hidden="true">
              <img class="journey-road-lineart journey-road-lineart--right" src="${section.decor?.rightLines || ''}" alt="" aria-hidden="true">
              <img class="journey-road-decor journey-road-decor--top" src="${section.decor?.topThreads || ''}" alt="" aria-hidden="true">
              <img class="journey-road-decor journey-road-decor--bottom" src="${section.decor?.bottomThreads || ''}" alt="" aria-hidden="true">

              <div class="journey-road-stage">
                <div class="journey-road-artwork">
                  ${renderAboutJourneyArtwork()}
                </div>

                <div class="journey-road-milestones">
                  ${milestones}
                </div>

                <div class="journey-road-vehicles" aria-hidden="true">
                  <img class="journey-road-car journey-road-car--1" src="${section.decor?.carPrimary || ''}" alt="">
                  <img class="journey-road-car journey-road-car--2" src="${section.decor?.carSecondary || ''}" alt="">
                  <img class="journey-road-car journey-road-car--3" src="${section.decor?.carSecondary || ''}" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderAboutJourneyArtwork() {
  return `
    <svg class="journey-road-svg" viewBox="0 0 620 760" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="journeyRoadSurface" x1="210" y1="40" x2="415" y2="720" gradientUnits="userSpaceOnUse">
          <stop stop-color="#4B5563"/>
          <stop offset="1" stop-color="#1F2937"/>
        </linearGradient>
        <linearGradient id="journeyRoadEdge" x1="180" y1="0" x2="440" y2="760" gradientUnits="userSpaceOnUse">
          <stop stop-color="#F8FAFC"/>
          <stop offset="1" stop-color="#CBD5E1"/>
        </linearGradient>
      </defs>

      <path class="journey-road-draw" d="M295 78C277 117 210 137 220 198C230 259 365 268 355 337C344 406 205 419 221 493C237 567 376 571 358 651C348 696 319 722 304 739" stroke="rgba(15,23,42,0.16)" stroke-width="148" stroke-linecap="round"/>
      <path class="journey-road-surface journey-road-outline journey-road-draw" d="M295 78C277 117 210 137 220 198C230 259 365 268 355 337C344 406 205 419 221 493C237 567 376 571 358 651C348 696 319 722 304 739" stroke="url(#journeyRoadEdge)" stroke-width="132" stroke-linecap="round"/>
      <path class="journey-road-surface journey-road-outline journey-road-draw" d="M295 78C277 117 210 137 220 198C230 259 365 268 355 337C344 406 205 419 221 493C237 567 376 571 358 651C348 696 319 722 304 739" stroke="url(#journeyRoadSurface)" stroke-width="118" stroke-linecap="round"/>
      <path class="journey-road-lane journey-road-draw" d="M295 78C277 117 210 137 220 198C230 259 365 268 355 337C344 406 205 419 221 493C237 567 376 571 358 651C348 696 319 722 304 739" stroke="#F8FAFC" stroke-width="5"/>

      <path class="journey-road-draw" d="M280 145H183" stroke="#1F2937" stroke-width="2.5" stroke-linecap="round"/>
      <circle class="journey-road-draw" cx="281" cy="145" r="6.5" fill="#fff" stroke="#1F2937" stroke-width="2"/>

      <path class="journey-road-draw" d="M382 262H473" stroke="#1F2937" stroke-width="2.5" stroke-linecap="round"/>
      <circle class="journey-road-draw" cx="382" cy="262" r="6.5" fill="#fff" stroke="#1F2937" stroke-width="2"/>

      <path class="journey-road-draw" d="M250 396H147" stroke="#1F2937" stroke-width="2.5" stroke-linecap="round"/>
      <circle class="journey-road-draw" cx="250" cy="396" r="6.5" fill="#fff" stroke="#1F2937" stroke-width="2"/>

      <path class="journey-road-draw" d="M372 505H465" stroke="#1F2937" stroke-width="2.5" stroke-linecap="round"/>
      <circle class="journey-road-draw" cx="372" cy="505" r="6.5" fill="#fff" stroke="#1F2937" stroke-width="2"/>

      <path class="journey-road-draw" d="M286 654H196" stroke="#1F2937" stroke-width="2.5" stroke-linecap="round"/>
      <circle class="journey-road-draw" cx="286" cy="654" r="6.5" fill="#fff" stroke="#1F2937" stroke-width="2"/>
    </svg>
  `;
}

function initAboutJourneyAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const section = document.querySelector('.journey-road');
  if (!section || section.dataset.animated === 'true') return;

  section.dataset.animated = 'true';

  const stage = section.querySelector('.journey-road-stage');
  const introTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      once: true,
    }
  });

  introTimeline
    .from('.journey-road-eyebrow', { y: 24, opacity: 0, duration: 0.45, ease: 'power3.out' })
    .from('.journey-road-title', { y: 40, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.15')
    .from('.journey-road-copy-title', { x: -36, opacity: 0, duration: 0.65, ease: 'power3.out' }, '-=0.35')
    .from('.journey-road-copy-body p', { x: -24, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out' }, '-=0.35')
    .from('.journey-road-decor--top, .journey-road-decor--bottom', { y: 24, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }, '-=0.45');

  gsap.utils.toArray('.journey-road-draw').forEach((shape) => {
    if (typeof shape.getTotalLength !== 'function') return;

    const length = shape.getTotalLength();
    gsap.set(shape, { strokeDasharray: length, strokeDashoffset: length });
    gsap.to(shape, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: stage,
        start: 'top 82%',
        end: 'bottom 32%',
        scrub: 1,
      }
    });
  });

  gsap.from('.journey-road-milestone', {
    y: 30,
    opacity: 0,
    duration: 0.7,
    stagger: 0.14,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: stage,
      start: 'top 72%',
      toggleActions: 'play none none none',
    }
  });

  gsap.from('.journey-road-car', {
    y: 24,
    scale: 0.86,
    opacity: 0,
    duration: 0.55,
    stagger: 0.12,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: stage,
      start: 'top 72%',
      toggleActions: 'play none none none',
    }
  });

  gsap.to('.journey-road-decor--top', {
    yPercent: -8,
    ease: 'none',
    scrollTrigger: {
      trigger: stage,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    }
  });

  gsap.to('.journey-road-decor--bottom', {
    yPercent: 10,
    ease: 'none',
    scrollTrigger: {
      trigger: stage,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    }
  });
}
