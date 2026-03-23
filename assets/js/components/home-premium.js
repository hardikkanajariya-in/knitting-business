function renderHomePremiumSections(data) {
  const premium = data.home?.premium;
  if (!premium) return '';

  return `
    ${renderHomeStatsBand(premium.statsBand)}
    ${renderHomeTrustStrip(premium.trustStrip)}
    ${renderHomeIndustries(premium.industries)}
    ${renderHomeSpotlight(premium.spotlight)}
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
    flask: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10 2v5l-5 9a3 3 0 002.6 4.5h8.8A3 3 0 0019 16l-5-9V2M9 9h6M8 14c1.2-.8 2.3-1.2 4-1.2s2.8.4 4 1.2"/></svg>'
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

  const row1 = items.slice(0, Math.ceil(items.length / 2));
  const row2 = items.slice(Math.ceil(items.length / 2));
  const row2Padded = row2.length < 3 ? [...row2, ...items].slice(0, Math.max(3, row2.length)) : row2;

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
          <div class="home-ind-track">${buildTrack(row1)}</div>
        </div>
        <div class="home-ind-row" data-scroll-gallery="right">
          <div class="home-ind-track">${buildTrack(row2Padded)}</div>
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
  if (!section) return '';

  const marquee = [...(section.items || []), ...(section.items || [])]
    .map(item => `<span class="home-trust-pill">${item}</span>`)
    .join('');

  return `
    <section class="home-trust-strip" data-parallax-section>
      <div class="container home-trust-shell">
        <p class="home-trust-label">${section.label || ''}</p>
      </div>
      <div class="home-trust-marquee" data-scroll-marquee>
        <div class="home-trust-track">${marquee}</div>
      </div>
    </section>
  `;
}

function renderHomeShowcase(section) {
  if (!section) return '';

  return `
    <section class="home-showcase section" data-parallax-section>
      <div class="home-showcase-bg" aria-hidden="true">
        <div class="home-showcase-gradient"></div>
      </div>
      <div class="container">
        <div class="home-section-intro reveal-up">
          <p class="home-section-eyebrow">${section.eyebrow || ''}</p>
          <h2 class="home-section-title">${section.title || ''}</h2>
          <p class="home-section-desc">${section.description || ''}</p>
        </div>

        <div class="home-showcase-grid">
          ${(section.cards || []).map((card, index) => `
            <article class="home-showcase-card" data-tilt-card data-parallax-card data-depth="${0.06 + index * 0.01}" data-delay="${index * 0.12}">
              <div class="home-showcase-media">
                <img src="${card.image}" alt="${card.title}" width="1200" height="800" loading="lazy" onerror="this.style.display='none'">
              </div>
              <div class="home-showcase-overlay"></div>
              <div class="home-showcase-content">
                <div class="home-showcase-category">${card.category || ''}</div>
                <h3 class="home-showcase-title">${card.title || ''}</h3>
                <p class="home-showcase-desc">${card.description || ''}</p>
                <a href="${card.href}" class="home-inline-link magnetic-btn">
                  ${card.cta || 'Explore'}
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderHomeProcess(section) {
  if (!section) return '';

  return `
    <section class="home-process section" data-parallax-section>
      <div class="home-process-bg" aria-hidden="true">
        <div class="home-process-glow home-process-glow--1"></div>
        <div class="home-process-glow home-process-glow--2"></div>
      </div>
      <div class="container home-process-grid">
        <div class="home-process-sticky reveal-left">
          <p class="home-section-eyebrow">${section.eyebrow || ''}</p>
          <h2 class="home-section-title">${section.title || ''}</h2>
          <p class="home-section-desc">${section.description || ''}</p>
          <div class="home-process-stats">
            ${(section.stats || []).map(stat => `
              <div class="home-process-stat">
                <div class="home-process-stat-value stat-value">${stat.value}</div>
                <div class="home-process-stat-label">${stat.label}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="home-process-steps">
          <div class="home-process-progress" aria-hidden="true">
            <div class="home-process-progress-fill"></div>
          </div>
          ${(section.steps || []).map((step, index) => `
            <article class="home-process-step" data-process-step data-parallax-card data-delay="${index * 0.15}">
              <div class="home-process-step-index">0${index + 1}</div>
              <div>
                <h3 class="home-process-step-title">${step.title}</h3>
                <p class="home-process-step-desc">${step.description}</p>
              </div>
            </article>
          `).join('')}
        </div>
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

function renderHomeClientList(section) {
  if (!section) return '';

  const clients = section.clients || [];
  if (!clients.length) {
    return `
      <section class="home-client-list section" data-parallax-section>
        <div class="container">
          <div class="home-client-header reveal-up">
            <p class="home-section-eyebrow">${section.subtitle || ''}</p>
            <h2 class="home-section-title">${section.title || ''}</h2>
          </div>
          <div class="home-client-placeholder reveal-up" style="text-align:center;padding:3rem 1rem;opacity:0.5;font-style:italic;color:var(--text-secondary);">
            Client logos coming soon
          </div>
        </div>
      </section>
    `;
  }

  const logosHTML = [...clients, ...clients].map(c => `
    <div class="home-client-logo">
      <img src="${c.logo}" alt="${c.name}" width="160" height="80" loading="lazy"
           onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
      <div class="home-client-fallback" style="display:none">${c.name}</div>
    </div>
  `).join('');

  return `
    <section class="home-client-list section" data-parallax-section>
      <div class="container">
        <div class="home-client-header reveal-up">
          <p class="home-section-eyebrow">${section.subtitle || ''}</p>
          <h2 class="home-section-title">${section.title || ''}</h2>
        </div>
        <div class="home-client-marquee">
          <div class="home-client-track">${logosHTML}</div>
        </div>
      </div>
    </section>
  `;
}

function renderHomeFinalCta(section) {
  if (!section) return '';

  return `
    <section class="home-final-cta section" data-parallax-section>
      <div class="home-final-cta-bg" aria-hidden="true">
        <div class="home-final-cta-glow"></div>
      </div>
      <div class="container">
        <div class="home-final-cta-card">
          <div>
            <p class="home-section-eyebrow">Let’s build together</p>
            <h2 class="home-section-title">${section.title || ''}</h2>
            <p class="home-section-desc">${section.description || ''}</p>
          </div>
          <div class="home-final-cta-actions">
            <a href="${section.primary?.href || '#'}" class="btn-primary magnetic-btn">${section.primary?.label || 'Contact us'}</a>
            <a href="${section.secondary?.href || '#'}" class="btn-outline magnetic-btn">${section.secondary?.label || 'Learn more'}</a>
          </div>
        </div>
      </div>
    </section>
  `;
}
