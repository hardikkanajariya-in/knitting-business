/* Hero A Component — Split Layout (Apex-inspired) */
function renderHeroA(data) {
  return `
    <section class="hero-a">
      <div class="container">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center min-h-[calc(100vh-var(--header-height))]">
          <div class="hero-a-content py-12 md:py-0">
            <p class="hero-a-subtitle">${data.subtitle}</p>
            <h1 class="hero-a-title mt-3">${data.title}</h1>
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
          <div class="hero-a-image-wrap hero-a-image-clip aspect-[4/3] md:aspect-auto md:h-[80vh]">
            <img
              src="${data.splitImage}"
              alt="${data.title}"
              width="800"
              height="600"
              onerror="this.parentElement.innerHTML='<div class=\\'img-placeholder\\' style=\\'height:100%;min-height:400px;\\'>Product Image</div>'"
            >
          </div>
        </div>
      </div>
    </section>
  `;
}
