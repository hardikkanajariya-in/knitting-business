function renderHomePremiumSections(data) {
  const premium = data.home.premium;

  return `
    ${renderHomeStatsBand(premium.statsBand)}
    ${renderHomeTrustStrip(premium.trustStrip)}
    ${renderHomeIndustries(premium.industries)}
    ${renderHomeSpotlight(premium.spotlight)}
    ${renderHomeCertificate(premium.isoCertificate)}
  `;
}

function getIndustryIcon(icon) {
  const icons = {
    car: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8 17h.01M16 17h.01M3 11l1.5-5A2 2 0 016.4 4.5h11.2a2 2 0 011.9 1.5L21 11M3 11v6a1 1 0 001 1h1a1 1 0 001-1v-1h12v1a1 1 0 001 1h1a1 1 0 001-1v-6M3 11h18"/></svg>',
    train: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M4 15V5a3 3 0 013-3h10a3 3 0 013 3v10M4 15l-2 5h20l-2-5M4 15h16M9 19l-1 3M15 19l1 3M8 9h8M8 5h8"/><circle cx="8" cy="12" r="1"/><circle cx="16" cy="12" r="1"/></svg>',
    plane: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 2L2 8l10 2 10-2-10-6zM12 22V10M2 8v6l10 8 10-8V8"/></svg>',
    sofa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M5 11V7a3 3 0 016 0v4M13 11V7a3 3 0 016 0v4M4 11a2 2 0 00-2 2v2a2 2 0 002 2h16a2 2 0 002-2v-2a2 2 0 00-2-2M6 17v2M18 17v2"/></svg>',
    shoe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3 18h18v-2c0-2-1.5-3-3-3h-1l-2-4c-.5-1-1.5-2-3-2s-2 .5-3 2L4 13c-1 0-1 1-1 2v3z"/></svg>',
    anchor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="5" r="3"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v13M5 12H2a10 10 0 0020 0h-3"/></svg>',
    layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4l8 4-8 4-8-4 8-4zM4 12l8 4 8-4M4 16l8 4 8-4"/></svg>',
    shirt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 4l3 2 3-2 4 3-2 4v9H7v-9L5 7l4-3z"/></svg>',
    flask: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10 2v5l-5 9a3 3 0 002.6 4.5h8.8A3 3 0 0019 16l-5-9V2M9 9h6M8 14c1.2-.8 2.3-1.2 4-1.2s2.8.4 4 1.2"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    luggage: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 20V7a2 2 0 012-2h8a2 2 0 012 2v13M6 20h12M6 20H4M18 20h2M9 5V3a1 1 0 011-1h4a1 1 0 011 1v2M10 9h4M10 13h4"/></svg>'
  };
  return icons[icon] || icons.car;
}

function renderHomeIndustries(section) {
  if (!section) return '';

  const items = section.items || [];
  const buildTrack = (arr) => [...arr, ...arr, ...arr].map(item => `
    <div class="home-ind-card">
      <div class="home-ind-img">
        <img src="${item.image}" alt="${item.name}" width="600" height="400" loading="lazy"
             onerror="this.parentElement.classList.add('home-ind-img--fallback')">
      </div>
      <div class="home-ind-overlay"></div>
      <div class="home-ind-content">
        <span class="home-ind-tag">${item.tag || ''}</span>
        <span class="home-ind-icon">${getIndustryIcon(item.icon)}</span>
        <h3 class="home-ind-name">${item.name}</h3>
      </div>
    </div>
  `).join('');

  return `
    <section class="home-industries" data-parallax-section>
      <div class="home-industries-bg" aria-hidden="true">
        <div class="home-industries-shape home-industries-shape--1"></div>
        <div class="home-industries-shape home-industries-shape--2"></div>
      </div>
      <div class="container">
        <div class="home-industries-header reveal-up">
          <p class="home-section-eyebrow">${section.subtitle || ''}</p>
          <h2 class="home-section-title">${section.title || ''}</h2>
        </div>
      </div>
      <div class="home-ind-gallery">
        <div class="home-ind-row" data-scroll-gallery="left">
          <div class="home-ind-track">${buildTrack(items)}</div>
        </div>
      </div>
    </section>
  `;
}

function renderHomeStatsBand(stats) {
  if (!stats || !stats.length) return '';

  return `
    <section class="home-stats-band" data-parallax-section>
      <div class="home-stats-band-bg" aria-hidden="true">
        <div class="home-stats-band-glow home-stats-band-glow--1"></div>
        <div class="home-stats-band-glow home-stats-band-glow--2"></div>
      </div>
      <div class="container">
        <div class="home-stats-band-grid">
          ${stats.map((stat, i) => `
            <div class="home-stats-band-item" data-parallax-card data-delay="${i * 0.1}">
              <div class="home-stats-band-value stat-value">${stat.value}</div>
              <div class="home-stats-band-label">${stat.label}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderHomeTrustStrip(section) {
  const marquee = [...section.items, ...section.items]
    .map(item => `<span class="home-trust-pill">${item}</span>`)
    .join('');

  return `
    <section class="home-trust-strip" data-parallax-section>
      <div class="container home-trust-shell">
        <p class="home-trust-label">${section.label}</p>
      </div>
      <div class="home-trust-marquee" data-scroll-marquee>
        <div class="home-trust-track">${marquee}</div>
      </div>
    </section>
  `;
}

function renderHomeSpotlight(section) {
  if (!section) return '';

  return `
    <section class="home-spotlight section" data-parallax-section>
      <div class="container">
        <div class="home-spotlight-shell">
          <div class="home-spotlight-glow home-spotlight-glow--1" aria-hidden="true"></div>
          <div class="home-spotlight-glow home-spotlight-glow--2" aria-hidden="true"></div>
          <div class="home-spotlight-copy reveal-up">
            <p class="home-section-eyebrow">${section.eyebrow || ''}</p>
            <h2 class="home-section-title">${section.title || ''}</h2>
            <p class="home-section-desc">${section.description || ''}</p>
          </div>

          <div class="home-spotlight-panels">
            ${(section.panels || []).map((panel, i) => `
              <article class="home-spotlight-panel" data-tilt-card data-parallax-card data-delay="${i * 0.12}">
                <div class="home-spotlight-badge">${panel.badge || ''}</div>
                <h3 class="home-spotlight-title">${panel.title || ''}</h3>
                <p class="home-spotlight-desc">${panel.description || ''}</p>
              </article>
            `).join('')}
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderHomeCertificate(section) {
  if (!section?.image) return '';

  return `
    <section class="home-certificate section" data-parallax-section>
      <div class="container">
        <div class="home-certificate-shell" data-parallax-card data-delay="0.08">
          <div class="home-certificate-copy reveal-up">
            <p class="home-section-eyebrow">${section.eyebrow || 'Certification'}</p>
            <h2 class="home-section-title">${section.title || section.label || ''}</h2>
            <p class="home-section-desc">${section.description || ''}</p>
          </div>
          <div class="home-certificate-card reveal-up">
            <img
              src="${section.image}"
              alt="${section.label || 'ISO Certificate'}"
              class="home-certificate-image"
              loading="lazy"
            >
          </div>
        </div>
      </div>
    </section>
  `;
}
