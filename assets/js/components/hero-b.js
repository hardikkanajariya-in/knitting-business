/* Hero B Component — Full-width Overlay (Avant Garde-inspired) */
function renderHeroB(data) {
  const hasVideo = Boolean(data.heroVideo);
  const secondaryCta = data.secondaryCta;
  const posterImage = data.posterImage || data.backgroundImage || '';

  return `
    <section class="hero-b" style="display: none;">
      <div class="hero-b-bg">
        ${hasVideo ? `
          <video class="hero-b-bg-video" autoplay muted loop playsinline poster="${posterImage}" data-video-src="${data.heroVideo}">
            <source src="${data.heroVideo}" type="video/mp4">
          </video>
        ` : `
          <img
            src="${data.backgroundImage}"
            alt="${data.title}"
            width="1920"
            height="1080"
            onerror="this.style.display='none';this.parentElement.style.background='var(--bg-tertiary)'"
          >
        `}
      </div>
      <div class="hero-b-overlay"></div>
      <div class="container hero-b-content py-24 md:py-32">
        <div class="max-w-3xl">
          ${data.eyebrow ? `<p class="hero-b-eyebrow">${data.eyebrow}</p>` : ''}
          <h1 class="hero-b-title">${data.title}</h1>
          <p class="hero-b-subtitle">${data.subtitle}</p>
          <p class="hero-b-desc">${data.description}</p>
          <div class="mt-8 flex flex-wrap gap-4">
            <a href="${data.cta.href}" class="btn-primary btn-primary-light">
              ${data.cta.label}
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
            ${secondaryCta ? `
              <a href="${secondaryCta.href}" class="btn-outline hero-b-btn-secondary">
                ${secondaryCta.label}
              </a>
            ` : ''}
          </div>
        </div>
      </div>
    </section>
  `;
}
