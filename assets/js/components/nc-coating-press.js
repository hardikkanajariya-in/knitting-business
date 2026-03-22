const NC_ICONS = {
  layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',
  ruler:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="6" y2="9"/><line x1="3" y1="15" x2="6" y2="15"/><line x1="18" y1="9" x2="21" y2="9"/><line x1="18" y1="15" x2="21" y2="15"/></svg>',
  grid:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
  chart:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>',
  width:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12H3"/><path d="M21 12l-4-4"/><path d="M21 12l-4 4"/><path d="M3 12l4-4"/><path d="M3 12l4 4"/></svg>'
};

const NC_LAYER_COLORS = ['#8B7355', '#B8860B', '#1C6DD0', '#2ecc71', '#9b59b6'];

const NC_SECTIONS = [
  { id: 'nc-hero', label: 'Hero' },
  { id: 'nc-process', label: 'Process' },
  { id: 'nc-products', label: 'Products' },
  { id: 'nc-capabilities', label: 'Specs' },
  { id: 'nc-innovation', label: 'Innovation' },
  { id: 'nc-partnership', label: 'Alliance' },
  { id: 'nc-content-block', label: 'Factory' }
];

function renderNCLayerIndicator() {
  const dotsHTML = NC_SECTIONS.map((s, i) => `
    <div class="nc-layer-dot${i === 0 ? ' active' : ''}" data-nc-layer="${s.id}">
      <span class="nc-layer-dot-label">${s.label}</span>
    </div>
  `).join('');

  return `
    <nav class="nc-layer-indicator" aria-label="Page sections">
      <div class="nc-layer-indicator-line">
        <div class="nc-layer-indicator-progress"></div>
      </div>
      ${dotsHTML}
    </nav>
  `;
}

function renderNCHero(nc) {
  const banner = nc.banner;
  const stats  = nc.heroStats || [];
  const words  = banner.title.split(' ');

  const statsHTML = stats.map((s, i) => `
    <div class="nc-hero-stat" data-aos="fade-up" data-aos-delay="${400 + i * 100}">
      <div class="nc-hero-stat-value" data-nc-counter="${s.value}">${s.value}</div>
      <div class="nc-hero-stat-label">${s.label}</div>
    </div>
  `).join('');

  return `
    <section class="nc-hero" id="nc-hero">
      <div class="nc-hero-ring" aria-hidden="true"></div>
      <div class="nc-hero-ring nc-hero-ring--inner" aria-hidden="true"></div>

      <div class="nc-hero-annotations" aria-hidden="true">
        <span class="nc-hero-anno nc-hero-anno--1" data-aos="fade" data-aos-delay="700">Coating &amp; Lamination</span>
        <span class="nc-hero-anno nc-hero-anno--2" data-aos="fade" data-aos-delay="800">Since 1984</span>
        <span class="nc-hero-anno nc-hero-anno--3" data-aos="fade" data-aos-delay="900">ISO Certified</span>
      </div>

      <div class="nc-hero-content">
        <div class="nc-hero-eyebrow" data-aos="fade-right" data-aos-delay="100">
          <span class="nc-hero-eyebrow-line"></span>
          NirChem <span class="nc-dot"></span> A Division of Nirbhay Knitting
        </div>

        <h1 class="nc-hero-title" data-aos="fade-up" data-aos-delay="200">
          <span class="nc-hero-title-line">${words[0]}</span>
          <span class="nc-hero-title-line nc-hero-title-accent">${words.slice(1).join(' ')}</span>
        </h1>

        <div class="nc-hero-desc" data-aos="fade-up" data-aos-delay="300">
          <p>${banner.subtitle}</p>
        </div>

        <a href="#nc-process" class="nc-hero-cta" data-aos="fade-up" data-aos-delay="350">
          Explore Our Process
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
        </a>

        ${stats.length ? `<div class="nc-hero-stats">${statsHTML}</div>` : ''}
      </div>

      <div class="nc-hero-scroll" aria-hidden="true">
        <div class="nc-hero-mouse"><div class="nc-hero-mouse-dot"></div></div>
        <span class="nc-hero-scroll-label">Scroll</span>
      </div>
    </section>
  `;
}

function renderNCProcessFlow(stages) {
  if (!stages || !stages.length) return '';

  const STAGE_ICONS = [
    `<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 32V14l12-6 12 6v18"/><path d="M14 32V20h12v12"/><path d="M20 8v6"/><circle cx="20" cy="26" r="2"/></svg>`,
    `<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="6" y="12" width="28" height="20" rx="2"/><path d="M6 20h28"/><path d="M14 12V8h12v4"/><circle cx="20" cy="26" r="3"/></svg>`,
    `<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 34V10a4 4 0 014-4h16a4 4 0 014 4v24"/><path d="M12 16h16M12 22h16M12 28h10"/><path d="M4 34h32"/></svg>`,
    `<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="14" cy="20" r="8"/><circle cx="26" cy="20" r="8"/><path d="M14 12v-2M26 12v-2M14 28v2M26 28v2"/></svg>`,
    `<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="20" cy="20" r="14"/><path d="M20 6v4M20 30v4M6 20h4M30 20h4"/><circle cx="20" cy="20" r="5"/><path d="M24 16l4-4M16 16l-4-4"/></svg>`
  ];

  const stagesHTML = stages.map((stage, i) => `
    <div class="nc-stage" data-aos="fade-up" data-aos-delay="${i * 80}">
      <div class="nc-stage-dot"></div>

      <div class="nc-stage-number">${stage.number}</div>

      <div class="nc-stage-body">
        <div style="display:flex;align-items:flex-start;gap:1rem;">
          <div class="nc-stage-icon-wrap">
            ${STAGE_ICONS[i] || STAGE_ICONS[0]}
          </div>
          <div>
            <h3 class="nc-stage-title">${stage.title}</h3>
            <p class="nc-stage-desc">${stage.description}</p>
          </div>
        </div>
        ${stage.gauge ? `
          <div class="nc-gauge">
            <span class="nc-gauge-label">${stage.gauge.label}</span>
            <div class="nc-gauge-track">
              <div class="nc-gauge-bar" data-fill="${stage.gauge.fill}"></div>
            </div>
            <span class="nc-gauge-value">${stage.gauge.value}</span>
          </div>
        ` : ''}
      </div>
    </div>
  `).join('');

  return `
    <section class="nc-process" id="nc-process">
      <div class="nc-process-header" data-aos="fade-up">
        <h2>The Coating Process</h2>
        <p>Follow the material as it moves through five precision-controlled stages.</p>
      </div>
      <div class="nc-stages">
        <div class="nc-precision-line">
          <div class="nc-precision-line-fill" data-nc-precision-fill></div>
        </div>
        ${stagesHTML}
      </div>
    </section>
  `;
}

function renderNCProducts(products) {
  if (!products || !products.length) return '';

  const cardsHTML = products.map((p, i) => {
    const layerColors = NC_LAYER_COLORS.slice(0, Math.max(2, (i % 4) + 2));
    const stripHTML = layerColors.map(c =>
      `<div class="nc-swatch-strip-segment" style="background:${c}"></div>`
    ).join('');

    return `
      <div class="nc-swatch" data-aos="fade-up" data-aos-delay="${i * 100}">
        <div class="nc-swatch-image">
          <img src="${p.image}" alt="${p.name}" width="600" height="450" loading="lazy"
               onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
          <div class="nc-swatch-fallback" style="display:none">${p.name}</div>
          ${p.badge ? `<span class="nc-swatch-badge">${p.badge}</span>` : ''}
        </div>
        <div class="nc-swatch-body">
          <h3 class="nc-swatch-name">${p.name}</h3>
          <p class="nc-swatch-desc">${p.description}</p>
        </div>
        <div class="nc-swatch-strip" aria-hidden="true">${stripHTML}</div>
      </div>
    `;
  }).join('');

  return `
    <section class="nc-products" id="nc-products">
      <div class="nc-products-header" data-aos="fade-up">
        <h2>What We Create</h2>
        <p>Coating, laminating, and chemistry-backed solutions for industrial surfaces</p>
      </div>
      <div class="nc-product-grid">
        ${cardsHTML}
      </div>
    </section>
  `;
}

function renderNCCapabilities(capabilities) {
  if (!capabilities || !capabilities.length) return '';

  const cardsHTML = capabilities.map((cap, i) => {
    const iconSVG = NC_ICONS[cap.icon] || NC_ICONS.layers;
    return `
      <div class="nc-cap-card" data-aos="fade-up" data-aos-delay="${i * 80}">
        <div class="nc-cap-icon">${iconSVG}</div>
        <div class="nc-cap-title">${cap.title}</div>
        <div class="nc-cap-value" data-nc-counter="${cap.value}">${cap.value}</div>
        <div class="nc-cap-unit">${cap.unit}</div>
        ${cap.gaugeFill ? `
          <div class="nc-cap-gauge">
            <div class="nc-cap-gauge-bar" data-fill="${cap.gaugeFill}"></div>
          </div>
        ` : ''}
      </div>
    `;
  }).join('');

  return `
    <section class="nc-capabilities" id="nc-capabilities">
      <div class="nc-capabilities-header" data-aos="fade-up">
        <h2>Technical Capabilities</h2>
        <p>Engineering precision across every coating parameter</p>
      </div>
      <div class="nc-cap-grid">
        ${cardsHTML}
      </div>
    </section>
  `;
}

function renderNCInnovation(innovation) {
  if (!innovation) return '';

  return `
    <section class="nc-innovation" id="nc-innovation">
      <div class="nc-innovation-inner" data-aos="fade-up">
        <div class="nc-innovation-visual">
          <img src="${innovation.image}" alt="${innovation.title}"
               width="800" height="800" loading="lazy"
               onerror="this.style.display='none'">
        </div>
        <div class="nc-innovation-content">
          <div class="nc-innovation-badge">
            <span class="nc-pulse-dot"></span>
            ${innovation.badge}
          </div>
          <h2 class="nc-innovation-title">${innovation.title}</h2>
          <p class="nc-innovation-desc">${innovation.description}</p>
          ${innovation.detail ? `
            <div class="nc-innovation-panel">
              <p>${innovation.detail}</p>
            </div>
          ` : ''}
        </div>
      </div>
    </section>
  `;
}

function renderNCPartnership(nc) {
  const p = nc.partnership;
  if (!p) return '';

  const capsHTML = (p.capabilities || []).map(c =>
    `<li>${c}</li>`
  ).join('');

  return `
    <section class="nc-partnership" id="nc-partnership">
      <div class="nc-partnership-inner" data-aos="fade-up">
        <div class="nc-partner-logos">
          <div class="nc-partner-logo">
            <img src="${nc.divisionLogo}" alt="NirChem" width="140" height="42" loading="lazy"
                 onerror="this.parentElement.innerHTML='<span class=nc-partner-interplast>NirChem</span>'">
          </div>
          <span class="nc-partner-plus">+</span>
          <div class="nc-partner-logo">
            <span class="nc-partner-interplast">Interplast Kimya</span>
          </div>
        </div>
        <div class="nc-partnership-content">
          <h2>${p.title}</h2>
          <p>${p.description}</p>
          ${capsHTML ? `<ul class="nc-partner-caps">${capsHTML}</ul>` : ''}
        </div>
      </div>
    </section>
  `;
}

function renderNCContentBlock(block) {
  if (!block) return '';
  return `
    <section class="nc-content-block" id="nc-content-block">
      <div class="nc-content-block-inner" data-aos="fade-up">
        <img class="nc-content-block-bg" src="${block.image}" alt="${block.title}"
             width="1280" height="560" loading="lazy"
             onerror="this.style.display='none'">
        <div class="nc-content-block-overlay">
          <h3>${block.title}</h3>
          <p>${block.description}</p>
        </div>
      </div>
    </section>
  `;
}
