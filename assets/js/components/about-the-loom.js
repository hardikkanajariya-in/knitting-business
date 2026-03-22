const LOOM_ICONS = {
  play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
  pause: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>',
  sound: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/></svg>',
  skip: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 5v14l8-7zM13 5v14l8-7z"/></svg>',
  shuttle: `<svg viewBox="0 0 60 18" fill="none">
    <path d="M2 9C2 5 6 2 15 2h30c9 0 13 3 13 7s-4 7-13 7H15C6 16 2 13 2 9z"
      fill="rgba(212,167,69,0.6)" stroke="rgba(212,167,69,0.8)" stroke-width="0.5"/>
    <ellipse cx="30" cy="9" rx="6" ry="4" fill="rgba(255,255,255,0.08)"/>
    <line x1="18" y1="9" x2="42" y2="9" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/>
  </svg>`,
  factory: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 20V8l5 3V8l5 3V4h8a2 2 0 012 2v14H2z"/><path d="M6 20v-2h3v2M13 20v-2h3v2"/></svg>',
  gauge: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="13" r="9"/><path d="M12 13l3-5M7 17h10"/></svg>',
  layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
  leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 8C8 10 5.9 16.17 3.82 21.34M17 8A5 5 0 0121 3M17 8c-4 0-8 4-10 8"/></svg>',
  handshake: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 14l6-6 4 4 6-6M22 10l-6 6-4-4-6 6"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/></svg>',
  lightbulb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 21h6M12 3a6 6 0 014 10.46V17H8v-3.54A6 6 0 0112 3z"/></svg>',
  bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
};

function renderAboutJourneyV5(section) {
  if (!section) return '';
  const milestones = section.milestones || [];

  const warpLines = Array.from({ length: 20 }, (_, i) =>
    `<div class="loom-warp-line" style="left:${5 + i * 4.7}%;opacity:${0.3 + Math.random() * 0.7}"></div>`
  ).join('');

  const scenesHTML = milestones.map((m, i) => `
    <div class="loom-scene loom-ms-scene" data-scene-idx="${i}">
      ${warpLines ? '<div class="loom-warp-bg">' + warpLines + '</div>' : ''}
      <div class="loom-shuttle-track" style="top:${40 + i * 4}%">
        <div class="loom-shuttle">${LOOM_ICONS.shuttle}</div>
        <div class="loom-shuttle-thread"></div>
      </div>
      <div class="loom-scene-content">
        <div class="loom-ms-layout">
          <div class="loom-ms-visual">
            <div class="loom-ms-lottie-frame">
              <div class="loom-ms-ring loom-ms-ring-1"></div>
              <div class="loom-ms-ring loom-ms-ring-2"></div>
              <div class="loom-ms-ring loom-ms-ring-3"></div>
              <div class="loom-ms-orbiter"></div>
              ${m.lottie ? `<dotlottie-player
                src="${m.lottie}" background="transparent"
                speed="0.5" loop class="loom-ms-lottie-player"
              ></dotlottie-player>` : '<div class="loom-ms-lottie-player"></div>'}
            </div>
          </div>
          <div class="loom-ms-text">
            <div class="loom-ms-year">${m.year}</div>
            <h3 class="loom-ms-title"><span class="loom-typewriter" data-full-text="${escapeAttr(m.title)}"></span></h3>
            <p class="loom-ms-desc">${m.description}</p>
            <div class="loom-ms-counter">${String(i + 1).padStart(2, '0')}</div>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  return `
    <section class="loom-cinema" id="loom-cinema">
      
      <div class="loom-scene loom-opening" data-scene-idx="opening">
        <div class="loom-warp-bg">${warpLines}</div>
        
        <div class="loom-opening-rings">
          <div class="loom-pulse-ring loom-pulse-ring-1"></div>
          <div class="loom-pulse-ring loom-pulse-ring-2"></div>
          <div class="loom-pulse-ring loom-pulse-ring-3"></div>
        </div>
        <div class="loom-scene-content">
          <div class="loom-opening-eyebrow">${section.eyebrow || 'NK'}</div>
          <h2 class="loom-opening-title">${section.title || 'Our Journey'}</h2>
          <div class="loom-opening-line"></div>
          <p class="loom-opening-subtitle">${section.storyTitle || 'A story woven through decades of excellence and innovation'}</p>
          <p class="loom-opening-paragraph">${(section.paragraphs && section.paragraphs[0]) || 'From a single knitting unit to an integrated textile powerhouse, our story is woven through decades of innovation, sustainability, and relentless quality.'}</p>
          
          <div class="loom-opening-stats">
            <div class="loom-open-stat">
              <span class="loom-open-stat-value">125 MT</span>
              <span class="loom-open-stat-label">Monthly Capacity</span>
            </div>
            <div class="loom-open-stat-divider"></div>
            <div class="loom-open-stat">
              <span class="loom-open-stat-value">35,000+</span>
              <span class="loom-open-stat-label">Sq. Ft. Facility</span>
            </div>
            <div class="loom-open-stat-divider"></div>
            <div class="loom-open-stat">
              <span class="loom-open-stat-value">Zero</span>
              <span class="loom-open-stat-label">Discharge Certified</span>
            </div>
            <div class="loom-open-stat-divider"></div>
            <div class="loom-open-stat">
              <span class="loom-open-stat-value">2022</span>
              <span class="loom-open-stat-label">Interplast Partnership</span>
            </div>
          </div>
        </div>
      </div>

      
      ${scenesHTML}

      
      <div class="loom-scene loom-closing" data-scene-idx="closing">
        <div class="loom-warp-bg">${warpLines}</div>
        <h2 class="loom-closing-title">The Loom Continues</h2>
        <p class="loom-closing-subtitle">Every thread we weave carries forward a legacy of quality, sustainability, and innovation.</p>
        <a href="contact.html" class="loom-closing-cta">Begin Your Thread &rarr;</a>
      </div>

      
      <div class="loom-controls" id="loom-controls">
        <div class="loom-ctrl-label">
          <span class="loom-rec-dot"></span>
          <span>STORY MODE</span>
        </div>
        <button class="loom-ctrl-btn" id="loom-play-btn" title="Play / Pause" aria-label="Play or Pause autoplay">
          ${LOOM_ICONS.pause}
        </button>
        <button class="loom-ctrl-btn" id="loom-skip-btn" title="Skip to next" aria-label="Skip to next scene">
          ${LOOM_ICONS.skip}
        </button>
        <div class="loom-ctrl-progress" id="loom-progress-bar">
          <div class="loom-ctrl-progress-fill" id="loom-progress-fill"></div>
        </div>
        <div class="loom-ctrl-time" id="loom-time-display">Scene 1 / ${milestones.length + 2}</div>
      </div>
    </section>
  `;
}

function escapeAttr(str) {
  return (str || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderAboutStoryV5(story) {
  if (!story) return '';
  return `
    <div class="loom-scene loom-story-scene" data-scene-idx="story">
      <div class="loom-scene-content">
        <div class="loom-story-grid">
          <div class="loom-story-img-wrap">
            <img src="assets/img/factory/Main Entry.JPG" alt="Nirbhay Knitting facility" loading="lazy">
            <div class="loom-story-stat">
              <div class="loom-story-stat-val">40+</div>
              <div class="loom-story-stat-lbl">Years of Excellence</div>
            </div>
          </div>
          <div class="loom-story-text-block">
            <div class="loom-story-eyebrow">Our Story</div>
            <h2>${story.title}</h2>
            ${(story.paragraphs || []).map(p => '<p>' + p + '</p>').join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderFactoryGalleryV5(gallery) {
  if (!gallery || !gallery.images || !gallery.images.length) return '';
  return `
    <div class="loom-gallery-scene">
      <div class="container">
        <div class="loom-gallery-header">
          <h2>${gallery.title}</h2>
          ${gallery.subtitle ? '<p>' + gallery.subtitle + '</p>' : ''}
        </div>
        <div class="loom-filmstrip">
          ${gallery.images.map((img, i) => `
            <figure class="loom-film-frame">
              <img src="${img.src}" alt="${img.alt}" loading="lazy">
              ${img.caption ? '<div class="loom-film-caption">' + img.caption + '</div>' : ''}
            </figure>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}
