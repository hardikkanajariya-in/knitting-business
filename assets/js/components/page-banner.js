function renderPageBanner(data) {
  const hasBg = data.backgroundImage ? true : false;

  return `
    <section class="page-banner${hasBg ? '' : ' no-bg'}">
      ${hasBg ? `
        <div class="page-banner-bg">
          <img
            src="${data.backgroundImage}"
            alt="${data.title}"
            width="1920"
            height="600"
            onerror="this.style.display='none'"
          >
        </div>
        <div class="page-banner-overlay"></div>
      ` : ''}
      <div class="page-banner-content">
        <h1 class="page-banner-title" data-aos="fade-up">${data.title}</h1>
        ${data.subtitle ? `<p class="page-banner-subtitle" data-aos="fade-up" data-aos-delay="100">${data.subtitle}</p>` : ''}
        ${data.description ? `<p class="page-banner-desc" data-aos="fade-up" data-aos-delay="200">${data.description}</p>` : ''}
      </div>
    </section>
  `;
}
