/* ============================================================
   NC — "The Coating Press"  Render Components
   All render functions for the NirChem award-winning page
   ============================================================ */

/* ---------- Capability Icons (inline SVG) ---------- */
const NC_ICONS = {
  layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',
  ruler:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3h5v5"/><path d="M8 3H3v5"/><path d="M12 22v-6"/><path d="M3 16v5h5"/><path d="M21 16v5h-5"/><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="6" y2="9"/><line x1="3" y1="15" x2="6" y2="15"/><line x1="18" y1="9" x2="21" y2="9"/><line x1="18" y1="15" x2="21" y2="15"/></svg>',
  grid:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
  width:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12H3"/><path d="M21 12l-4-4"/><path d="M21 12l-4 4"/><path d="M3 12l4-4"/><path d="M3 12l4 4"/></svg>',
  chart:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>'
};

const NC_LAYER_COLORS = ['#8B7355', '#B8860B', '#1C6DD0', '#2ecc71', '#9b59b6'];
const NC_LAYER_NAMES  = ['Substrate', 'Primer', 'Coating', 'Laminate', 'Finish'];


/* ============================================================
   1. HERO — "The Line"
   ============================================================ */
function renderNCHero(nc) {
  const banner = nc.banner;
  const stats  = nc.heroStats || [];

  const statsHTML = stats.map(s => `
    <div class="nc-hero-stat" data-aos="fade-up" data-aos-delay="300">
      <div class="nc-hero-stat-value">${s.value}</div>
      <div class="nc-hero-stat-label">${s.label}</div>
    </div>
  `).join('');

  return `
    <section class="nc-hero">
      ${banner.backgroundImage ? `
        <div class="nc-hero-bg-image">
          <img src="${banner.backgroundImage}" alt="${banner.title}" width="1920" height="1080"
               onerror="this.style.display='none'">
        </div>
      ` : ''}
      <div class="nc-hero-overlay"></div>

      <div class="nc-hero-content">
        <div class="nc-hero-eyebrow" data-aos="fade-down" data-aos-delay="100">
          NirChem <span class="nc-dot"></span> A Division of Nirbhay Knitting
        </div>

        ${nc.divisionLogo ? `
          <div class="nc-hero-logo" data-aos="fade-up" data-aos-delay="150">
            <img src="${nc.divisionLogo}"
                 alt="${nc.divisionLogoAlt || 'NirChem'}"
                 width="280" height="80" loading="eager"
                 onerror="this.parentElement.style.display='none'">
          </div>
        ` : ''}

        <h1 class="nc-hero-title" data-aos="fade-up" data-aos-delay="200">
          ${banner.title}
        </h1>
        <p class="nc-hero-subtitle" data-aos="fade-up" data-aos-delay="250">
          ${banner.subtitle}
        </p>

        ${stats.length ? `<div class="nc-hero-stats">${statsHTML}</div>` : ''}
      </div>

      ${_renderRollerSVG()}

      <div class="nc-hero-scroll" aria-hidden="true">
        <span>Explore the Process</span>
        <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </div>
    </section>
  `;
}

/* Roller SVG (bottom of hero) */
function _renderRollerSVG() {
  const grooveLines = Array.from({ length: 20 }, (_, i) => {
    const x = (i + 1) * 5;
    return `<line x1="${x}%" y1="30" x2="${x}%" y2="90"
             class="nc-roller-groove nc-roller-spin"
             stroke-dasharray="6 4"/>`;
  }).join('');

  return `
    <div class="nc-roller-wrap" aria-hidden="true">
      <svg class="nc-roller" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <rect x="0" y="25" width="1200" height="10" rx="5" class="nc-roller-cylinder"/>
        <rect x="0" y="85" width="1200" height="10" rx="5" class="nc-roller-cylinder"/>
        <rect x="0" y="52" width="1200" height="16" rx="2"
              fill="rgba(255,255,255,0.04)" stroke="none"/>
        ${grooveLines}
      </svg>
    </div>
  `;
}


/* ============================================================
   2. PROCESS FLOW — "The Run"
   ============================================================ */
function renderNCProcessFlow(stages) {
  if (!stages || !stages.length) return '';

  const stagesHTML = stages.map((stage, i) => {
    const layersUpTo = NC_LAYER_COLORS.slice(0, stage.layerIndex + 1);
    const crossSection = layersUpTo.map((color, li) => `
      <div class="nc-layer" data-layer="${li}" style="background:${color}"></div>
    `).join('');

    return `
      <div class="nc-stage" data-aos="fade-up" data-aos-delay="${i * 80}">
        <div class="nc-stage-visual">
          <div class="nc-stage-card">
            <dotlottie-player src="${stage.lottie}" background="transparent"
              speed="1" loop autoplay class="nc-stage-lottie"
              aria-label="${stage.title} animation"></dotlottie-player>
            <div class="nc-cross-section" aria-label="Cross-section showing ${stage.layerIndex + 1} layers">
              ${crossSection}
            </div>
          </div>
        </div>

        <div class="nc-stage-center">
          <div class="nc-stage-badge">${stage.number}</div>
        </div>

        <div class="nc-stage-text">
          <h3 class="nc-stage-title">${stage.title}</h3>
          <p class="nc-stage-desc">${stage.description}</p>
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
    `;
  }).join('');

  return `
    <section class="nc-process">
      <svg class="nc-flow-line" aria-hidden="true">
        <line class="nc-flow-line-track" x1="50%" y1="0" x2="50%" y2="100%"/>
        <line class="nc-flow-line-active" x1="50%" y1="0" x2="50%" y2="100%"
              data-nc-flow-line/>
      </svg>

      <div class="nc-process-header" data-aos="fade-up">
        <h2>The Coating Process</h2>
        <p>Follow the material as it moves through five precision-controlled stages — from raw substrate to finished, coated product.</p>
      </div>

      <div class="nc-stages">
        ${stagesHTML}
      </div>
    </section>
  `;
}


/* ============================================================
   3. PRODUCTS — "Material Catalog"
   ============================================================ */
function renderNCProducts(products) {
  if (!products || !products.length) return '';

  const cardsHTML = products.map((p, i) => {
    const layerColors = NC_LAYER_COLORS.slice(0, Math.max(2, (i % 4) + 2));
    const layerDivs   = layerColors.map(c =>
      `<div class="nc-swatch-layer" style="background:${c}"></div>`
    ).join('');

    return `
      <div class="nc-swatch" data-aos="fade-up" data-aos-delay="${i * 100}">
        <div class="nc-swatch-image">
          <img src="${p.image}" alt="${p.name}" width="600" height="450" loading="lazy"
               onerror="this.parentElement.innerHTML='<div style=&quot;height:100%;aspect-ratio:4/3;display:flex;align-items:center;justify-content:center;background:var(--nc-surface);color:var(--nc-text-muted);font-size:0.85rem&quot;>${p.name}</div>'">
          <div class="nc-swatch-image-overlay"></div>
          ${p.badge ? `<span class="nc-swatch-badge">${p.badge}</span>` : ''}
        </div>
        <div class="nc-swatch-body">
          <h3 class="nc-swatch-name">${p.name}</h3>
          <p class="nc-swatch-desc">${p.description}</p>
        </div>
        <div class="nc-swatch-layers" aria-hidden="true">${layerDivs}</div>
      </div>
    `;
  }).join('');

  return `
    <section class="nc-products">
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


/* ============================================================
   4. CAPABILITIES — "The Spec Sheet"
   ============================================================ */
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
    <section class="nc-capabilities">
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


/* ============================================================
   5. INNOVATION — "The Lab"
   ============================================================ */
function renderNCInnovation(innovation) {
  if (!innovation) return '';

  return `
    <section class="nc-innovation">
      <div class="nc-innovation-inner" data-aos="fade-up">
        <div class="nc-innovation-visual">
          <img src="${innovation.image}" alt="${innovation.title}"
               width="800" height="600" loading="lazy"
               onerror="this.parentElement.innerHTML='<div style=&quot;height:100%;display:flex;align-items:center;justify-content:center;background:var(--nc-surface-alt);color:var(--nc-text-muted);font-size:0.85rem&quot;>Innovation Lab</div>'">
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


/* ============================================================
   6. PARTNERSHIP — "Interplast Kimya"
   ============================================================ */
function renderNCPartnership(nc) {
  const p = nc.partnership;
  if (!p) return '';

  const capsHTML = (p.capabilities || []).map(c =>
    `<li>${c}</li>`
  ).join('');

  return `
    <section class="nc-partnership">
      <div class="nc-partnership-inner" data-aos="fade-up">
        <div class="nc-partnership-brand">
          <div class="nc-partner-logos">
            <div class="nc-partner-logo">
              <img src="${nc.divisionLogo}" alt="NirChem" width="160" height="48" loading="lazy"
                   onerror="this.parentElement.innerHTML='<span style=&quot;font-weight:700;color:var(--nc-text-primary)&quot;>NirChem</span>'">
            </div>
            <span class="nc-partner-plus">+</span>
            <div class="nc-partner-logo">
              <span style="font-weight:700;color:var(--nc-text-primary);font-size:0.95rem">Interplast Kimya</span>
            </div>
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


/* ============================================================
   7. CONTENT BLOCK (Enhanced with NC styling)
   ============================================================ */
function renderNCContentBlock(block) {
  if (!block) return '';
  return `
    <section class="nc-content-block">
      <div class="nc-content-block-inner" data-aos="fade-up">
        <img src="${block.image}" alt="${block.title}" width="1280" height="560" loading="lazy"
             onerror="this.parentElement.innerHTML='<div style=&quot;aspect-ratio:16/7;display:flex;align-items:center;justify-content:center;background:var(--nc-surface-alt);color:var(--nc-text-muted)&quot;>Factory Image</div>'">
        <div class="nc-content-block-overlay">
          <h3>${block.title}</h3>
          <p>${block.description}</p>
        </div>
      </div>
    </section>
  `;
}
