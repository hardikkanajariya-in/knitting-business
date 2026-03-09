/* Hero A Component — Cinematic Full-Bleed Centered Hero */
function renderHeroA(data) {
  const hasVideo = data.heroVideo;
  const metrics = Array.isArray(data.metrics) ? data.metrics : [];
  const secondaryCta = data.secondaryCta;

  const metricsMarkup = metrics.length ? `
    <div class="hero-a-stats-bar">
      <div class="container hero-a-stats-inner">
        ${metrics.map((metric, index) => `
          <div class="hero-a-stat">
            <span class="hero-a-stat-value">${metric.value}</span>
            <span class="hero-a-stat-label">${metric.label}</span>
          </div>
          ${index < metrics.length - 1 ? '<span class="hero-a-stat-divider" aria-hidden="true"></span>' : ''}
        `).join('')}
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
          <div class="hero-a-glow hero-a-glow--blue"></div>
          <div class="hero-a-glow hero-a-glow--red"></div>
          <div class="hero-a-noise"></div>
        </div>

        <div class="container hero-a-shell">
          <div class="hero-a-layout">
            <div class="hero-a-copy">
              <p class="hero-a-kicker">${data.subtitle}</p>
              <h1 class="hero-a-title">${data.title}</h1>
              <p class="hero-a-desc">${data.description}</p>
              <div class="hero-a-cta-row">
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

        ${metricsMarkup}
      </div>
    </section>
  `;
}
