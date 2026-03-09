/* Timeline Component — Journey / Milestones */
function renderTimeline(data) {
  const items = data.milestones.map((m, i) => {
    const delay = i * 100;
    return `
      <div class="timeline-item" data-aos="fade-up" data-aos-delay="${delay}">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <div class="timeline-year">${m.year}</div>
          <h3 class="timeline-title">${m.title}</h3>
          <p class="timeline-desc">${m.description}</p>
        </div>
      </div>
    `;
  }).join('');

  return `
    <section class="timeline-section section">
      <div class="container">
        <div class="section-header" data-aos="fade-up">
          <p class="text-sm font-semibold uppercase tracking-widest mb-2" style="color: var(--text-tertiary);">${data.subtitle || ''}</p>
          <h2 class="section-title">${data.title}</h2>
          ${data.description ? `<p class="section-subtitle mt-3">${data.description}</p>` : ''}
        </div>
        <div class="timeline-wrapper">
          <div class="timeline-line"></div>
          ${items}
        </div>
      </div>
    </section>
  `;
}
