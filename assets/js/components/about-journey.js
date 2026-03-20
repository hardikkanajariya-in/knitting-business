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
              <img src="assets/img/factory/nk-factory.jpg" alt="Nirbhay manufacturing facility" class="jrny-story-image" loading="lazy">
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
    gsap.set(n, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 30 });
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

  /* ── MASTER TIMELINE — no dead scroll at start ── */
  const master = gsap.timeline();
  const sliceDur = 1 / count; // full timeline divided equally, no wasted start

  nodes.forEach((node, i) => {
    const marker = markers[i];
    const t = sliceDur * i;

    // Fade out previous card + connector
    if (i > 0) {
      master.to(nodes[i - 1], {
        opacity: 0, y: -20, duration: sliceDur * 0.15, ease: 'power2.in',
      }, t);
      if (connPaths[i - 1]) {
        master.to(connPaths[i - 1], {
          opacity: 0, duration: sliceDur * 0.15, ease: 'power2.in',
        }, t);
      }
    }

    // Glow draws to this milestone
    if (glowLen) {
      const glowTarget = glowLen - (glowLen * (i + 1) / count);
      master.to(glowPath, {
        strokeDashoffset: glowTarget,
        duration: sliceDur * 0.5,
        ease: 'power1.inOut',
      }, t);
    }

    // Marker pops in
    if (marker) {
      master.to(marker, {
        scale: 1, opacity: 1, duration: sliceDur * 0.2, ease: 'back.out(2)',
      }, t + sliceDur * 0.15);
    }

    // Card + connector fade in
    master.to(node, {
      opacity: 1, y: 0, duration: sliceDur * 0.35, ease: 'power3.out',
    }, t + sliceDur * 0.25);

    if (connPaths[i]) {
      master.to(connPaths[i], {
        opacity: 0.5, duration: sliceDur * 0.35, ease: 'power3.out',
      }, t + sliceDur * 0.25);
    }
  });

  /* ── PIN & SCRUB — starts immediately on first scroll ── */
  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: () => `+=${window.innerHeight * count}`,
    pin: viewport,
    pinSpacing: true,
    scrub: 0.8,
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
        const threshold = sliceDur * (i + 0.5);
        if (self.progress >= threshold && !node.dataset.lottieStarted) {
          node.dataset.lottieStarted = 'true';
          const player = node.querySelector('dotlottie-player');
          if (player && typeof player.play === 'function') player.play();
        }
      });
    }
  });
}
