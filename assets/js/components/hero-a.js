/* Hero A Component — Split Layout with Corner Geometric Elements (Apex-inspired) */
function renderHeroA(data) {
  const hasVideo = data.heroVideo;
  const metrics = Array.isArray(data.metrics) ? data.metrics : [];
  const floatingCards = Array.isArray(data.floatingCards) ? data.floatingCards : [];
  const secondaryCta = data.secondaryCta;

  const metricsMarkup = metrics.length ? `
    <div class="hero-a-metrics" data-depth="0.08">
      ${metrics.map(metric => `
        <div class="hero-a-metric-pill">
          <div class="hero-a-metric-value">${metric.value}</div>
          <div class="hero-a-metric-label">${metric.label}</div>
        </div>
      `).join('')}
    </div>
  ` : '';

  const floatingMarkup = floatingCards.map((card, index) => `
    <article class="hero-a-floating hero-a-floating--${index + 1}" data-depth="${0.12 + (index * 0.05)}" data-tilt-card>
      <div class="hero-a-floating-eyebrow">${card.eyebrow || ''}</div>
      <h3 class="hero-a-floating-title">${card.title || ''}</h3>
      ${card.description ? `<p class="hero-a-floating-desc">${card.description}</p>` : ''}
      ${Array.isArray(card.tags) && card.tags.length ? `
        <div class="hero-a-floating-tags">
          ${card.tags.map(tag => `<span class="hero-a-floating-tag">${tag}</span>`).join('')}
        </div>
      ` : ''}
    </article>
  `).join('');

  return `
    <section class="hero-a hero-a-immersive" data-home-interactive>
      <!-- Full-width background media -->
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
        <div class="hero-a-grid"></div>
        <div class="hero-a-glow hero-a-glow--blue"></div>
        <div class="hero-a-glow hero-a-glow--red"></div>
        <div class="hero-a-spotlight"></div>
        <div class="hero-a-noise"></div>
      </div>

      <!-- Corner geometric elements — TL (70%) and BR (30%) only -->
      <div class="hero-a-corner hero-a-corner--tl" aria-hidden="true"></div>
      <div class="hero-a-corner hero-a-corner--br" aria-hidden="true"></div>

      <!-- Content -->
      <div class="container relative z-10">
        <div class="hero-a-content-wrapper">
          <div class="hero-a-scene">
            <div class="hero-a-content" data-depth="0.03">
              <p class="hero-a-subtitle">${data.subtitle}</p>
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
              <a href="#home-journey" class="hero-a-scroll-cue" aria-label="Scroll to journey section">
                <span class="hero-a-scroll-label">Scroll to explore</span>
                <span class="hero-a-scroll-dot"></span>
              </a>
            </div>

            <div class="hero-a-floating-wrap" aria-hidden="true">
              ${floatingMarkup}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
