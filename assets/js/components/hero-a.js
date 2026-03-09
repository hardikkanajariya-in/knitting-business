/* Hero A Component — Split Layout with Corner Geometric Elements (Apex-inspired) */
function renderHeroA(data) {
  const hasVideo = data.heroVideo;
  return `
    <section class="hero-a">
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

      <!-- Corner geometric elements -->
      <div class="hero-a-corner hero-a-corner--tl" aria-hidden="true"></div>
      <div class="hero-a-corner hero-a-corner--tr" aria-hidden="true"></div>
      <div class="hero-a-corner hero-a-corner--bl" aria-hidden="true"></div>
      <div class="hero-a-corner hero-a-corner--br" aria-hidden="true"></div>

      <!-- Diagonal accent line -->
      <div class="hero-a-diagonal" aria-hidden="true"></div>

      <!-- Content -->
      <div class="container relative z-10">
        <div class="hero-a-content-wrapper">
          <div class="hero-a-content">
            <p class="hero-a-subtitle">${data.subtitle}</p>
            <h1 class="hero-a-title">${data.title}</h1>
            <p class="hero-a-desc">${data.description}</p>
            <div class="mt-8 flex flex-wrap gap-4">
              <a href="${data.cta.href}" class="btn-primary">
                ${data.cta.label}
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
