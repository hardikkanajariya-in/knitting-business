/* Team Hero Component — Split layout (text + factory photo) */
function renderTeamHero(data) {
  return `
    <section class="team-hero">
      <div class="container">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div data-aos="fade-right">
            <p class="text-sm font-semibold uppercase tracking-widest mb-2" style="color: var(--text-tertiary);">Meet the Team</p>
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight" style="color: var(--text-primary); letter-spacing: -0.02em;">${data.title}</h1>
            ${data.subtitle ? `<p class="text-lg md:text-xl mt-4 font-medium" style="color: var(--text-secondary);">${data.subtitle}</p>` : ''}
            ${data.description ? `<p class="mt-4 text-base leading-relaxed" style="color: var(--text-tertiary);">${data.description}</p>` : ''}
          </div>
          <div class="team-hero-image" data-aos="fade-left">
            <img
              src="${data.factoryImage}"
              alt="Our Team & Factory"
              width="800"
              height="600"
              loading="lazy"
              onerror="this.parentElement.innerHTML='<div class=\\'img-placeholder\\' style=\\'height:100%;min-height:300px;\\'>Factory / Team Photo</div>'"
            >
          </div>
        </div>
      </div>
    </section>
  `;
}
