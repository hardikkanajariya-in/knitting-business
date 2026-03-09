/* Hero A Component — Split Layout with Corner Geometric Elements (Apex-inspired) */
function renderHeroA(data) {
  const hasVideo = data.heroVideo;
  const metrics = Array.isArray(data.metrics) ? data.metrics : [];
  const floatingCards = Array.isArray(data.floatingCards) ? data.floatingCards : [];
  const secondaryCta = data.secondaryCta;
  const materialTags = Array.from(new Set(
    floatingCards.flatMap(card => Array.isArray(card.tags) ? card.tags : [])
  )).slice(0, 6);

  const metricsMarkup = metrics.length ? `
    <div class="hero-a-metrics">
      ${metrics.map((metric, index) => `
        <div class="hero-a-metric-pill">
          <div class="hero-a-metric-index">0${index + 1}</div>
          <div>
            <div class="hero-a-metric-value">${metric.value}</div>
            <div class="hero-a-metric-label">${metric.label}</div>
          </div>
        </div>
      `).join('')}
    </div>
  ` : '';

  const floatingMarkup = floatingCards.slice(0, 3).map((card, index) => `
    <div class="hero-a-asset hero-a-asset--${index + 1}" data-depth="${0.12 + (index * 0.04)}">
      <div class="hero-a-asset-float">
        <div class="hero-a-spool" aria-hidden="true">
          <span class="hero-a-spool-ring hero-a-spool-ring--outer"></span>
          <span class="hero-a-spool-ring hero-a-spool-ring--mid"></span>
          <span class="hero-a-spool-ring hero-a-spool-ring--inner"></span>
          <span class="hero-a-spool-core"></span>
          <span class="hero-a-spool-thread hero-a-spool-thread--a"></span>
          <span class="hero-a-spool-thread hero-a-spool-thread--b"></span>
        </div>

        <article class="hero-a-asset-card">
          <div class="hero-a-asset-eyebrow">${card.eyebrow || 'Material system'}</div>
          <h3 class="hero-a-asset-title">${card.title || ''}</h3>
          ${card.description ? `<p class="hero-a-asset-desc">${card.description}</p>` : ''}
          ${Array.isArray(card.tags) && card.tags.length ? `
            <div class="hero-a-asset-tags">
              ${card.tags.map(tag => `<span class="hero-a-asset-tag">${tag}</span>`).join('')}
            </div>
          ` : ''}
        </article>
      </div>
    </div>
  `).join('');

  const materialStrip = materialTags.length ? `
    <div class="hero-a-spec-strip" data-depth="0.05" aria-hidden="true">
      <div class="hero-a-spec-strip-inner">
        ${materialTags.map(tag => `<span class="hero-a-spec-pill">${tag}</span>`).join('')}
      </div>
    </div>
  ` : '';

  return `
    <section class="hero-a hero-a-immersive hero-a-pin-stage" data-home-interactive>
      <div class="hero-a-pin-wrap">
        <div class="hero-a-bg">
          ${hasVideo ? `
            <video class="hero-a-bg-video" autoplay muted loop playsinline poster="${data.splitImage}">
              <source src="${data.heroVideo}" type="video/mp4">
            </video>
          ` : `
            <img class="hero-a-bg-img" src="${data.splitImage}" alt="" width="1920" height="1080"
                 onerror="this.style.display='none'">
          `}
          <div class="hero-a-bg-overlay"></div>
        </div>

        <div class="hero-a-atmosphere" aria-hidden="true">
          <canvas class="hero-a-webgl"></canvas>
          <div class="hero-a-grid"></div>
          <div class="hero-a-glow hero-a-glow--blue"></div>
          <div class="hero-a-glow hero-a-glow--red"></div>
          <div class="hero-a-spotlight"></div>
          <div class="hero-a-noise"></div>
        </div>

        <div class="container hero-a-shell">
          <div class="hero-a-layout">
            <div class="hero-a-copy">
              <p class="hero-a-kicker">${data.subtitle}</p>
              <h1 class="hero-a-title">${data.title}</h1>
              <p class="hero-a-desc">${data.description}</p>
              <div class="hero-a-cta-row mt-8 flex flex-wrap gap-4">
                <a href="${data.cta.href}" class="btn-primary magnetic-btn">
                  ${data.cta.label}
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </a>
                ${secondaryCta ? `
                  <a href="${secondaryCta.href}" class="btn-outline magnetic-btn hero-a-btn-secondary">
                    ${secondaryCta.label}
                  </a>
                ` : ''}
              </div>
              ${metricsMarkup}
            </div>

            <div class="hero-a-visual-stage" aria-hidden="true">
              <div class="hero-a-visual-core" data-depth="0.08">
                <div class="hero-a-visual-core-float">
                  <span class="hero-a-visual-halo hero-a-visual-halo--outer"></span>
                  <span class="hero-a-visual-halo hero-a-visual-halo--mid"></span>
                  <span class="hero-a-visual-hub"></span>
                  <span class="hero-a-visual-thread hero-a-visual-thread--one"></span>
                  <span class="hero-a-visual-thread hero-a-visual-thread--two"></span>
                </div>
              </div>

              ${floatingMarkup}
              ${materialStrip}
            </div>
          </div>

          <a href="#home-journey" class="hero-a-scroll-thread" aria-label="Scroll to Begin">
            <span class="hero-a-scroll-thread__label">Scroll to Begin</span>
            <span class="hero-a-scroll-thread__track">
              <span class="hero-a-scroll-thread__reel"></span>
              <span class="hero-a-scroll-thread__line"></span>
              <span class="hero-a-scroll-thread__tail"></span>
            </span>
          </a>
        </div>
      </div>
    </section>
  `;
}
