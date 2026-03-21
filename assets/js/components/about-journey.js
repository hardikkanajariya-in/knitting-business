/* ============================================
   ABOUT-JOURNEY.JS — Winding Road Scroll Timeline
   Road draws on scroll · Lottie milestone cards
   ============================================ */

const JOURNEY_STRENGTH_ICONS = {
  factory: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 20V8l5 3V8l5 3V4h8a2 2 0 012 2v14H2z"/><path d="M6 20v-2h3v2M13 20v-2h3v2"/></svg>`,
  gauge: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="13" r="9"/><path d="M12 13l3-5M7 17h10"/></svg>`,
  layers: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`,
  leaf: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 8C8 10 5.9 16.17 3.82 21.34M17 8A5 5 0 0121 3M17 8c-4 0-8 4-10 8"/></svg>`,
  handshake: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 14l6-6 4 4 6-6M22 10l-6 6-4-4-6 6"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/></svg>`,
  lightbulb: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 21h6M12 3a6 6 0 014 10.46V17H8v-3.54A6 6 0 0112 3z"/></svg>`,
  bolt: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
};

/* Road path: S-curves left→right, slightly lowered to avoid clashing
   with the navbar and create a more balanced first-frame composition. */
const ROAD_PATH_D = 'M 500 70 Q 280 170, 500 270 Q 720 370, 500 470 Q 280 570, 500 670 Q 720 770, 500 870 Q 500 935, 500 990';

const ROAD_MARKERS = [
  { x: 28, y: 17 },
  { x: 72, y: 37 },
  { x: 28, y: 57 },
  { x: 72, y: 77 },
  { x: 50, y: 94 },
];

function renderAboutJourney(section) {
  if (!section) return '';

  const markerDots = ROAD_MARKERS.map((m, i) => `
    <div class="jrny-road-marker" data-index="${i}" style="top:${m.y}%;left:${m.x}%;">
      <div class="jrny-road-marker-dot"></div>
      <div class="jrny-road-marker-ring"></div>
    </div>
  `).join('');

  /* Cards positioned next to road markers — alternating left/right of the road */
  const cards = (section.milestones || []).map((milestone, index) => {
    const side = index % 2 === 0 ? 'left' : 'right';
    const lottieSrc = milestone.lottie || '';
    return `
      <div class="jrny-road-node jrny-road-node--${side}" data-index="${index}">
        <div class="jrny-road-card">
          <div class="jrny-road-lottie-wrap">
            ${lottieSrc ? `<dotlottie-player
              src="${lottieSrc}"
              background="transparent"
              speed="1"
              loop
              class="jrny-road-lottie"
            ></dotlottie-player>` : ''}
          </div>
          <div class="jrny-road-card-body">
            <span class="jrny-road-year">${milestone.year}</span>
            <h3 class="jrny-road-card-title">${milestone.title}</h3>
            <p class="jrny-road-card-desc">${milestone.description}</p>
          </div>
        </div>
      </div>
    `;
  }).join('');

  return `
    <section class="jrny-tl-section" id="journey-road">
      <div class="jrny-tl-bg-shapes" aria-hidden="true">
        <div class="jrny-tl-bg-orb jrny-tl-bg-orb--1"></div>
        <div class="jrny-tl-bg-orb jrny-tl-bg-orb--2"></div>
        <div class="jrny-tl-bg-orb jrny-tl-bg-orb--3"></div>
      </div>

      <!-- Tech-savvy decorative elements -->
      <div class="jrny-decor-shapes" aria-hidden="true">
        <!-- Circuit board trace -->
        <div class="jrny-decor-shape jrny-decor-circuit">
          <svg viewBox="0 0 200 200" fill="none">
            <path d="M20 100 H60 L80 60 H140 L160 100 H180" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M40 140 H80 L100 100 H120 L140 140 H180" stroke-width="1.5" stroke-linecap="round"/>
            <circle cx="60" cy="100" r="4"/>
            <circle cx="140" cy="100" r="4"/>
            <circle cx="80" cy="60" r="3"/>
            <circle cx="100" cy="100" r="3"/>
            <circle cx="80" cy="140" r="3"/>
            <circle cx="140" cy="140" r="3"/>
          </svg>
        </div>
        <!-- Hexagonal grid cluster -->
        <div class="jrny-decor-shape jrny-decor-hexgrid">
          <svg viewBox="0 0 180 160" fill="none">
            <polygon points="45,10 75,10 90,36 75,62 45,62 30,36"/>
            <polygon points="90,36 120,36 135,62 120,88 90,88 75,62"/>
            <polygon points="45,62 75,62 90,88 75,114 45,114 30,88"/>
            <polygon points="90,88 120,88 135,114 120,140 90,140 75,114"/>
            <circle cx="60" cy="36" r="2.5"/>
            <circle cx="105" cy="62" r="2.5"/>
            <circle cx="60" cy="88" r="2.5"/>
            <circle cx="105" cy="114" r="2.5"/>
          </svg>
        </div>
        <!-- Data nodes with connections -->
        <div class="jrny-decor-shape jrny-decor-nodes">
          <svg viewBox="0 0 160 160" fill="none">
            <line x1="30" y1="30" x2="80" y2="60" stroke-width="1" stroke-dasharray="4 3"/>
            <line x1="80" y1="60" x2="130" y2="40" stroke-width="1" stroke-dasharray="4 3"/>
            <line x1="80" y1="60" x2="60" y2="120" stroke-width="1" stroke-dasharray="4 3"/>
            <line x1="60" y1="120" x2="130" y2="130" stroke-width="1" stroke-dasharray="4 3"/>
            <line x1="130" y1="40" x2="130" y2="130" stroke-width="1" stroke-dasharray="4 3"/>
            <circle cx="30" cy="30" r="6"/><circle cx="30" cy="30" r="3" class="jrny-node-core"/>
            <circle cx="80" cy="60" r="8"/><circle cx="80" cy="60" r="4" class="jrny-node-core"/>
            <circle cx="130" cy="40" r="6"/><circle cx="130" cy="40" r="3" class="jrny-node-core"/>
            <circle cx="60" cy="120" r="6"/><circle cx="60" cy="120" r="3" class="jrny-node-core"/>
            <circle cx="130" cy="130" r="7"/><circle cx="130" cy="130" r="3.5" class="jrny-node-core"/>
          </svg>
        </div>
        <!-- Chip / PCB outline -->
        <div class="jrny-decor-shape jrny-decor-chip">
          <svg viewBox="0 0 120 120" fill="none">
            <rect x="25" y="25" width="70" height="70" rx="6" stroke-width="1.5"/>
            <line x1="40" y1="25" x2="40" y2="10" stroke-width="1.5" stroke-linecap="round"/>
            <line x1="60" y1="25" x2="60" y2="10" stroke-width="1.5" stroke-linecap="round"/>
            <line x1="80" y1="25" x2="80" y2="10" stroke-width="1.5" stroke-linecap="round"/>
            <line x1="40" y1="95" x2="40" y2="110" stroke-width="1.5" stroke-linecap="round"/>
            <line x1="60" y1="95" x2="60" y2="110" stroke-width="1.5" stroke-linecap="round"/>
            <line x1="80" y1="95" x2="80" y2="110" stroke-width="1.5" stroke-linecap="round"/>
            <line x1="25" y1="45" x2="10" y2="45" stroke-width="1.5" stroke-linecap="round"/>
            <line x1="25" y1="60" x2="10" y2="60" stroke-width="1.5" stroke-linecap="round"/>
            <line x1="25" y1="75" x2="10" y2="75" stroke-width="1.5" stroke-linecap="round"/>
            <line x1="95" y1="45" x2="110" y2="45" stroke-width="1.5" stroke-linecap="round"/>
            <line x1="95" y1="60" x2="110" y2="60" stroke-width="1.5" stroke-linecap="round"/>
            <line x1="95" y1="75" x2="110" y2="75" stroke-width="1.5" stroke-linecap="round"/>
            <rect x="42" y="42" width="36" height="36" rx="3" stroke-width="1" stroke-dasharray="3 2"/>
          </svg>
        </div>
        <!-- Radar / pulse rings -->
        <div class="jrny-decor-shape jrny-decor-radar">
          <svg viewBox="0 0 140 140" fill="none">
            <circle cx="70" cy="70" r="15" stroke-width="1" class="jrny-radar-ring jrny-radar-ring--1"/>
            <circle cx="70" cy="70" r="30" stroke-width="1" class="jrny-radar-ring jrny-radar-ring--2"/>
            <circle cx="70" cy="70" r="45" stroke-width="1" class="jrny-radar-ring jrny-radar-ring--3"/>
            <circle cx="70" cy="70" r="60" stroke-width="0.8" class="jrny-radar-ring jrny-radar-ring--4"/>
            <circle cx="70" cy="70" r="5" class="jrny-node-core"/>
            <line x1="70" y1="70" x2="110" y2="40" stroke-width="1.5" stroke-linecap="round" class="jrny-radar-sweep"/>
          </svg>
        </div>
        <!-- Binary data stream -->
        <div class="jrny-decor-shape jrny-decor-binary">
          <div class="jrny-binary-col"><span>0</span><span>1</span><span>1</span><span>0</span><span>1</span><span>0</span><span>0</span><span>1</span></div>
          <div class="jrny-binary-col"><span>1</span><span>0</span><span>0</span><span>1</span><span>0</span><span>1</span><span>1</span><span>0</span></div>
          <div class="jrny-binary-col"><span>0</span><span>1</span><span>0</span><span>0</span><span>1</span><span>1</span><span>0</span><span>1</span></div>
        </div>
        <!-- Floating brackets / code snippet -->
        <div class="jrny-decor-shape jrny-decor-code">
          <span>&lt;/&gt;</span>
        </div>
        <!-- Dot matrix grid -->
        <div class="jrny-decor-shape jrny-decor-matrix">
          <svg viewBox="0 0 100 100" fill="none">
            ${Array.from({length: 25}, (_, i) => `<circle cx="${(i % 5) * 22 + 12}" cy="${Math.floor(i / 5) * 22 + 12}" r="2"/>`).join('')}
          </svg>
        </div>
      </div>

      <!-- Auto-scroll indicator -->
      <div class="jrny-autoscroll-indicator" aria-hidden="true">
        <span>Auto scrolling</span>
        <div class="jrny-autoscroll-chevrons">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
      </div>

      <div class="jrny-road-viewport">
        <!-- LEFT COLUMN: Fixed header -->
        <div class="jrny-left-col">
          <header class="jrny-tl-header">
            <p class="jrny-tl-eyebrow">${section.eyebrow || ''}</p>
            <h1 class="jrny-tl-heading">${section.title || ''}</h1>
            ${section.storyTitle ? `<p class="jrny-tl-subheading">${section.storyTitle}</p>` : ''}
          </header>
        </div>

        <!-- RIGHT COLUMN: Road + cards -->
        <div class="jrny-right-col">
          <div class="jrny-road-track">
            <svg class="jrny-road-svg" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <filter id="roadGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>
              <path d="${ROAD_PATH_D}" class="jrny-road-shadow"/>
              <path d="${ROAD_PATH_D}" class="jrny-road-edge"/>
              <path d="${ROAD_PATH_D}" class="jrny-road-surface"/>
              <path d="${ROAD_PATH_D}" class="jrny-road-dashes"/>
              <path d="${ROAD_PATH_D}" class="jrny-road-glow"/>
            </svg>

            <div class="jrny-road-traveler"><div class="jrny-road-traveler-beacon"></div></div>
            ${markerDots}
          </div>

          <!-- Connector lines SVG overlay (within right col) -->
          <svg class="jrny-connectors-svg" aria-hidden="true"></svg>

          <div class="jrny-road-cards-layer">
            ${cards}
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderAboutStrengths(strengths) {
  if (!strengths || !strengths.length) return '';

  const cards = strengths.map(s => {
    const icon = JOURNEY_STRENGTH_ICONS[s.icon] || JOURNEY_STRENGTH_ICONS.factory;
    return `
      <div class="jrny-strength-card" data-aos="fade-up">
        <div class="jrny-strength-icon">${icon}</div>
        <h3 class="jrny-strength-title">${s.title}</h3>
        <p class="jrny-strength-desc">${s.description}</p>
      </div>
    `;
  }).join('');

  return `
    <section class="jrny-strengths-section">
      <div class="container">
        <div class="jrny-strengths-header" data-aos="fade-up">
          <p class="jrny-tl-eyebrow">Competitive Strengths</p>
          <h2 class="jrny-strengths-heading">What Sets Us Apart</h2>
          <p class="jrny-strengths-sub">Built on manufacturing depth, sustainability discipline, and innovation capability</p>
        </div>
        <div class="jrny-strengths-grid">
          ${cards}
        </div>
      </div>
    </section>
  `;
}

function renderAboutStory(story) {
  if (!story) return '';
  return `
    <section class="jrny-story-section">
      <div class="container">
        <div class="jrny-story-grid">
          <div class="jrny-story-visual" data-aos="fade-right">
            <div class="jrny-story-image-wrap">
              <img src="assets/img/factory/Main Entry.JPG" alt="Nirbhay manufacturing facility" class="jrny-story-image" loading="lazy">
              <div class="jrny-story-image-overlay"></div>
            </div>
          </div>
          <div class="jrny-story-copy" data-aos="fade-left">
            <h2 class="jrny-story-title">${story.title}</h2>
            ${(story.paragraphs || []).map(p => `<p>${p}</p>`).join('')}
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderFactoryGallery(gallery) {
  if (!gallery || !gallery.images || !gallery.images.length) return '';
  return `
    <section class="factory-gallery-section" data-parallax-section>
      <div class="container">
        <div class="factory-gallery-header" data-aos="fade-up">
          ${gallery.eyebrow ? `<p class="home-section-eyebrow">${gallery.eyebrow}</p>` : ''}
          <h2 class="factory-gallery-title">${gallery.title}</h2>
          ${gallery.subtitle ? `<p class="factory-gallery-subtitle">${gallery.subtitle}</p>` : ''}
        </div>
      </div>
      <div class="factory-gallery-grid">
        ${gallery.images.map((img, i) => `
          <figure class="factory-gallery-item" data-aos="fade-up" data-aos-delay="${i * 100}">
            <div class="factory-gallery-img-wrap">
              <img src="${img.src}" alt="${img.alt}" class="factory-gallery-img" loading="lazy">
            </div>
            ${img.caption ? `<figcaption class="factory-gallery-caption">${img.caption}</figcaption>` : ''}
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

function initFactoryGallery() {
  const items = document.querySelectorAll('.factory-gallery-item');
  const lightbox = document.getElementById('factory-lightbox');
  if (!items.length || !lightbox) return;

  const lbImg = lightbox.querySelector('.factory-lightbox-img');
  const imgs = Array.from(items).map(item => {
    const img = item.querySelector('img');
    return { src: img.src, alt: img.alt };
  });
  let current = 0;

  function open(index) {
    current = index;
    lbImg.src = imgs[current].src;
    lbImg.alt = imgs[current].alt;
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function next() { open((current + 1) % imgs.length); }
  function prev() { open((current - 1 + imgs.length) % imgs.length); }

  items.forEach((item, i) => item.addEventListener('click', () => open(i)));
  lightbox.querySelector('.factory-lightbox-close').addEventListener('click', close);
  lightbox.querySelector('.factory-lightbox-next').addEventListener('click', next);
  lightbox.querySelector('.factory-lightbox-prev').addEventListener('click', prev);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
  document.addEventListener('keydown', (e) => {
    if (lightbox.getAttribute('aria-hidden') !== 'false') return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });
}

function initAboutJourneyAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const section = document.querySelector('.jrny-tl-section');
  if (!section || section.dataset.animated === 'true') return;
  section.dataset.animated = 'true';

  const viewport = section.querySelector('.jrny-road-viewport');
  const rightCol = section.querySelector('.jrny-right-col');
  const track    = section.querySelector('.jrny-road-track');
  const roadSvg  = section.querySelector('.jrny-road-svg');
  const glowPath = section.querySelector('.jrny-road-glow');
  const traveler = section.querySelector('.jrny-road-traveler');
  const connSvg  = section.querySelector('.jrny-connectors-svg');
  const nodes    = gsap.utils.toArray('.jrny-road-node');
  const count    = nodes.length || 1;

  if (!viewport || !rightCol || !track || !roadSvg) return;

  const markers = gsap.utils.toArray('.jrny-road-marker');

  /* ── Position markers on the SVG road path ── */
  const surfacePath = roadSvg.querySelector('.jrny-road-surface') || glowPath;
  const markerPoints = [];
  if (surfacePath && typeof surfacePath.getTotalLength === 'function') {
    const pathTotalLen = surfacePath.getTotalLength();
    markers.forEach((m, i) => {
      const segMid = ((i + 0.5) / count) * pathTotalLen;
      const pt = surfacePath.getPointAtLength(segMid);
      const pctX = pt.x / 10;
      const pctY = pt.y / 10;
      m.style.left = pctX + '%';
      m.style.top  = pctY + '%';
      markerPoints.push({ x: pctX, y: pctY });
    });
  }

  /* ── Position cards at marker Y levels within right column ── */
  const trackH = track.offsetHeight;
  const trackTop = track.offsetTop;
  const rightColW = rightCol.offsetWidth;
  const rightColH = rightCol.offsetHeight;
  // track uses transform: translateX(-50%), so offsetLeft doesn't reflect visual position
  const trackW = track.offsetWidth;
  const trackLeft = track.offsetLeft - trackW / 2;

  // Setup connector overlay SVG (covers right column)
  if (connSvg) {
    connSvg.setAttribute('viewBox', `0 0 ${rightColW} ${rightColH}`);
  }

  // Position each card vertically centered on its marker Y, clamped within right column
  const headerHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height') || '64');
  const minCardTop = headerHeight + 16;
  nodes.forEach((node, i) => {
    if (!markerPoints[i]) return;
    const markerY = trackTop + (trackH * markerPoints[i].y / 100);
    const nodeH = node.offsetHeight || 240;
    let cardTop = markerY - nodeH / 2;
    cardTop = Math.max(minCardTop, Math.min(rightColH - nodeH - 12, cardTop));
    node.style.top = cardTop + 'px';
  });

  // Force reflow
  void rightCol.offsetHeight;

  // Draw sui-dhaaga connector lines from card edge to marker
  let connPathsHTML = '';
  nodes.forEach((node, i) => {
    if (!markerPoints[i]) return;
    const mp = markerPoints[i];
    const isLeft = i % 2 === 0;

    // Marker position within right-col
    const markerX = trackLeft + (trackW * mp.x / 100);
    const markerY = trackTop + (trackH * mp.y / 100);

    const cardTop = parseFloat(node.style.top) || 0;
    const cardCenterY = cardTop + node.offsetHeight / 2;
    const cardLeft = node.offsetLeft;
    const cardRight = cardLeft + node.offsetWidth;

    let ax, ay, bx, by;
    if (isLeft) {
      // Card on left side of road → connector from card right to marker
      ax = cardRight + 4;
      ay = cardCenterY;
      bx = markerX - 12;
      by = markerY;
    } else {
      // Card on right side of road → connector from marker to card left
      ax = markerX + 12;
      ay = markerY;
      bx = cardLeft - 4;
      by = cardCenterY;
    }

    const dx = bx - ax;
    const dy = by - ay;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const waveAmp = Math.max(10, dist * 0.05);
    const cp1x = ax + dx * 0.35;
    const cp1y = ay + dy * 0.35 - waveAmp;
    const cp2x = ax + dx * 0.65;
    const cp2y = ay + dy * 0.65 + waveAmp;

    connPathsHTML += `<path d="M ${ax} ${ay} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${bx} ${by}"
      fill="none" stroke="var(--accent-primary, #3b82f6)" stroke-width="1.5"
      stroke-dasharray="6 4" class="jrny-connector-path" data-index="${i}"/>`;
  });
  if (connSvg) connSvg.innerHTML = connPathsHTML;

  /* ── Header fade-in on load ── */
  gsap.from('.jrny-tl-header', {
    y: 30, opacity: 0, duration: 0.8, ease: 'power2.out', delay: 0.2
  });

  /* ── Initial states: first milestone visible, rest hidden ── */
  markers.forEach((m, i) => {
    gsap.set(m, { scale: i === 0 ? 1 : 0, opacity: i === 0 ? 1 : 0 });
  });
  nodes.forEach((n, i) => {
    gsap.set(n, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 20 });
  });

  const connPaths = connSvg ? gsap.utils.toArray('.jrny-connector-path') : [];
  connPaths.forEach((p, i) => {
    gsap.set(p, { opacity: i === 0 ? 0.5 : 0 });
  });

  // Glow path setup
  let glowLen = 0;
  if (glowPath && typeof glowPath.getTotalLength === 'function') {
    glowLen = glowPath.getTotalLength();
    const firstGlowOffset = glowLen - (glowLen * 1 / count);
    gsap.set(glowPath, { strokeDasharray: glowLen, strokeDashoffset: firstGlowOffset });
  }

  // Initial traveler & clip position
  if (traveler && glowPath && glowLen) {
    const initialDrawn = glowLen * (1 / count);
    const initPt = glowPath.getPointAtLength(initialDrawn);
    gsap.set(traveler, { left: (initPt.x / 10) + '%', top: (initPt.y / 10) + '%', opacity: 1 });
    const initClipBottom = Math.max(0, 100 - (initPt.y / 10) - 2);
    gsap.set(roadSvg, { clipPath: `inset(0% 0% ${initClipBottom}% 0%)` });
  }

  /* ── MASTER TIMELINE — continuous flow, cards overlap transitions ── */
  const master = gsap.timeline();
  const transitions = count - 1;
  const sliceDur = transitions > 0 ? 1 / transitions : 1;

  for (let i = 1; i < count; i++) {
    const marker = markers[i];
    const t = sliceDur * (i - 1);

    // Glow path draws continuously through entire slice
    if (glowLen) {
      const glowTarget = glowLen - (glowLen * (i + 1) / count);
      master.to(glowPath, {
        strokeDashoffset: glowTarget,
        duration: sliceDur * 0.85,
        ease: 'none',
      }, t);
    }

    // Previous card fades out over first half of slice
    master.to(nodes[i - 1], {
      opacity: 0, y: -10, duration: sliceDur * 0.5, ease: 'none',
    }, t);
    if (connPaths[i - 1]) {
      master.to(connPaths[i - 1], {
        opacity: 0, duration: sliceDur * 0.4, ease: 'none',
      }, t);
    }

    // Marker appears mid-slice
    if (marker) {
      master.to(marker, {
        scale: 1, opacity: 1, duration: sliceDur * 0.35, ease: 'none',
      }, t + sliceDur * 0.1);
    }

    // Next card fades in — overlaps with previous fade for continuous feel
    master.to(nodes[i], {
      opacity: 1, y: 0, duration: sliceDur * 0.55, ease: 'none',
    }, t + sliceDur * 0.3);

    if (connPaths[i]) {
      master.to(connPaths[i], {
        opacity: 0.5, duration: sliceDur * 0.45, ease: 'none',
      }, t + sliceDur * 0.35);
    }
  }

  /* ── PIN & SCRUB ── */
  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: () => `+=${window.innerHeight * count}`,
    pin: viewport,
    pinSpacing: true,
    scrub: 0.3,
    animation: master,
    onUpdate: (self) => {
      if (traveler && glowPath && glowLen) {
        const currentOffset = parseFloat(gsap.getProperty(glowPath, 'strokeDashoffset'));
        const drawnLen = Math.max(0, glowLen - currentOffset);
        const pt = glowPath.getPointAtLength(drawnLen);
        traveler.style.left = (pt.x / 10) + '%';
        traveler.style.top  = (pt.y / 10) + '%';
        traveler.style.opacity = drawnLen > 10 ? '1' : '0';
        const clipBottom = Math.max(0, 100 - (pt.y / 10) - 2);
        roadSvg.style.clipPath = `inset(0% 0% ${clipBottom}% 0%)`;
      }
      nodes.forEach((node, i) => {
        const threshold = i === 0 ? 0 : sliceDur * (i - 1 + 0.5);
        if (self.progress >= threshold && !node.dataset.lottieStarted) {
          node.dataset.lottieStarted = 'true';
          const player = node.querySelector('dotlottie-player');
          if (player && typeof player.play === 'function') player.play();
        }
      });
    }
  });
}

/* ============================================
   AUTO-SCROLL for About Journey Section
   Stops Lenis, manually drives scroll + forces
   ScrollTrigger.update() each frame so the
   scrubbed animation stays in sync.
   ============================================ */

function initJourneyAutoScroll(options = {}) {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const section = document.querySelector('.jrny-tl-section');
  if (!section || section.dataset.autoScrollInit === 'true') return;
  section.dataset.autoScrollInit = 'true';

  const isAboutPage = document.body.dataset.page === 'about';
  const startDelay = options.delay || (isAboutPage ? 0.6 : 0.2);

  // Show decorative shapes with stagger
  const decorShapes = section.querySelectorAll('.jrny-decor-shape');
  function revealDecor() {
    decorShapes.forEach((shape, i) => {
      setTimeout(() => shape.classList.add('is-visible'), i * 120);
    });
  }

  // Wait for ScrollTrigger to fully compute pin positions
  setTimeout(() => {
    ScrollTrigger.refresh();
    setTimeout(setupAutoScroll, 60);
  }, 200);

  function setupAutoScroll() {
    const journeyTrigger = ScrollTrigger.getAll().find(st => {
      const trig = st.trigger || (st.vars && st.vars.trigger);
      const hasPin = st.pin || (st.vars && st.vars.pin);
      return trig === section && hasPin;
    });

    if (!journeyTrigger) {
      revealDecor();
      return;
    }

    let active = false;
    let done = false;
    let rafId = null;

    function performAutoScroll() {
      if (journeyTrigger.progress > 0.08 || active) return;
      active = true;

      const indicator = section.querySelector('.jrny-autoscroll-indicator');
      section.classList.add('is-autoscrolling');
      revealDecor();
      if (indicator) indicator.classList.add('is-visible');

      const startPos = journeyTrigger.start;
      const endPos = journeyTrigger.end;
      const totalDist = endPos - startPos;

      // Stop Lenis so it doesn't fight our scroll
      const lenisWasActive = window._lenis && !window._lenis.isStopped;
      if (window._lenis) window._lenis.stop();

      // Jump to section start
      window.scrollTo(0, startPos);
      ScrollTrigger.update();

      function cleanup() {
        if (done) return;
        done = true;
        active = false;
        if (rafId) cancelAnimationFrame(rafId);
        section.classList.remove('is-autoscrolling');
        if (indicator) indicator.classList.remove('is-visible');
        removeInterruptListeners();
        // Re-enable Lenis
        if (lenisWasActive && window._lenis) {
          setTimeout(() => window._lenis.start(), 200);
        }
      }

      // Linear scroll — each rAF moves scroll position and
      // EXPLICITLY calls ScrollTrigger.update() because Lenis
      // is stopped (Lenis normally drives ST updates via its
      // scroll callback; with Lenis stopped, ST won't update
      // from native scroll events alone).
      const scrollDuration = 10000;
      const t0 = performance.now();

      function tick(now) {
        if (done) return;
        const elapsed = now - t0;
        let t = Math.min(elapsed / scrollDuration, 1);

        // Mostly linear, gentle ease-out in last 10%
        if (t > 0.9) {
          const tail = (t - 0.9) / 0.1;
          t = 0.9 + 0.1 * (1 - Math.pow(1 - tail, 2));
        }

        const pos = Math.round(startPos + totalDist * t);
        window.scrollTo(0, pos);
        // THIS IS CRITICAL: force ScrollTrigger to read the new scroll position
        ScrollTrigger.update();

        if (t < 1) {
          rafId = requestAnimationFrame(tick);
        } else {
          cleanup();
        }
      }

      // Start on the next frame so the initial scrollTo settles
      rafId = requestAnimationFrame(tick);

      // ── Interrupt handling ──
      let interruptReady = false;

      function interruptAutoScroll() {
        if (!interruptReady || done) return;
        cleanup();
      }

      function handleKeyInterrupt(e) {
        if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', 'Escape', ' '].includes(e.key)) {
          interruptAutoScroll();
        }
      }

      function removeInterruptListeners() {
        window.removeEventListener('wheel', interruptAutoScroll);
        window.removeEventListener('touchstart', interruptAutoScroll);
        window.removeEventListener('keydown', handleKeyInterrupt);
      }

      setTimeout(() => {
        if (done) return;
        interruptReady = true;
        window.addEventListener('wheel', interruptAutoScroll, { passive: true });
        window.addEventListener('touchstart', interruptAutoScroll, { passive: true });
        window.addEventListener('keydown', handleKeyInterrupt);
      }, 400);
    }

    if (isAboutPage) {
      setTimeout(performAutoScroll, startDelay * 1000);
    } else {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        once: true,
        onEnter: () => setTimeout(performAutoScroll, startDelay * 1000),
      });
    }
  }
}
