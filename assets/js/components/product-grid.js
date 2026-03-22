function renderProductGrid(items) {
  const cards = items.map((item, i) => {
    const delay = i * 100;
    return `
      <div class="product-card" data-aos="fade-up" data-aos-delay="${delay}">
        <div class="product-card-image">
          <img
            src="${item.image}"
            alt="${item.name}"
            width="600"
            height="450"
            loading="lazy"
            onerror="this.parentElement.innerHTML='<div class=\\'img-placeholder\\' style=\\'height:100%;aspect-ratio:4/3;\\'>Product Image</div>'"
          >
        </div>
        <div class="product-card-body">
          <h3 class="product-card-title">${item.name}</h3>
          <p class="product-card-desc">${item.description}</p>
        </div>
      </div>
    `;
  }).join('');

  return `<div class="product-grid">${cards}</div>`;
}
