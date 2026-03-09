/* Content Block Component — Large image/video placeholder */
function renderContentBlock(data) {
  return `
    <div class="content-block" data-aos="fade-up">
      <div class="content-block-image">
        <img
          src="${data.image}"
          alt="${data.title}"
          width="1280"
          height="560"
          loading="lazy"
          onerror="this.parentElement.innerHTML='<div class=\\'img-placeholder\\' style=\\'height:100%;min-height:300px;aspect-ratio:16/7;\\'>Factory Image</div>'"
        >
      </div>
      <div class="content-block-overlay">
        <h3 class="content-block-title">${data.title}</h3>
        <p class="content-block-desc">${data.description}</p>
      </div>
    </div>
  `;
}
