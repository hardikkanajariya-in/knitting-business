function renderHeroB(data) {
  const hasVideo = Boolean(data.heroVideo);
  const posterImage = data.posterImage || data.backgroundImage || '';

  const titleWords = data.title.split(' ');
  const titleLine1 = titleWords.slice(0, 3).join(' ');
  const titleLine2 = titleWords.slice(3).join(' ');

  return `
    <section class="hero-b">
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

      <div class="hero-b-annotations" aria-hidden="true">
        <span class="hero-b-anno hero-b-anno--1">Technical Textiles</span>
        <span class="hero-b-anno hero-b-anno--2">Since 1984</span>
        <span class="hero-b-anno hero-b-anno--3">Zero Discharge</span>
      </div>

      <div class="hero-b-content">
        ${data.eyebrow ? `
          <div class="hero-b-eyebrow">
            <span class="hero-b-eyebrow-line"></span>
            ${data.eyebrow}
          </div>
        ` : ''}

        <h1 class="hero-b-title">
          <span class="hero-b-title-line">${titleLine1}</span>
          <span class="hero-b-title-line hero-b-title-accent">${titleLine2}</span>
        </h1>

        <div class="hero-b-desc">
          <p>${data.subtitle}</p>
        </div>

      </div>

      <div class="hero-b-scroll" aria-hidden="true">
        <div class="hero-b-mouse"><div class="hero-b-mouse-dot"></div></div>
        <span class="hero-b-scroll-label">Scroll</span>
      </div>
    </section>
  `;
}
