/* Timeline Component — Journey / Milestones */
function renderTimeline(data) {
  const items = data.milestones.map((m, i) => {
    return `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <article class="timeline-card" data-tilt-card>
            <div class="timeline-card-header">
              <div class="timeline-icon-wrap">${getTimelineIcon(m.icon)}</div>
              <div class="timeline-step">0${i + 1}</div>
            </div>
            <div class="timeline-year">${m.year}</div>
            <h3 class="timeline-title">${m.title}</h3>
            <p class="timeline-desc">${m.description}</p>
          </article>
        </div>
      </div>
    `;
  }).join('');

  return `
    <section class="timeline-section section" id="home-journey">
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

function getTimelineIcon(icon) {
  const icons = {
    factory: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path stroke-linecap="round" stroke-linejoin="round" d="M3 21h18M5 21V10l6 3V8l6 3V6l4 2v13M9 21v-4m6 4v-4"/></svg>',
    lightbulb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path stroke-linecap="round" stroke-linejoin="round" d="M9 18h6M10 22h4M12 2a7 7 0 00-4 12.744C8.63 15.37 9 16.18 9 17h6c0-.82.37-1.63 1-2.256A7 7 0 0012 2z"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path stroke-linecap="round" stroke-linejoin="round" d="M5 21c7 0 14-7 14-14-7 0-14 7-14 14zm0 0c0-4 4-8 8-8"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12h18M12 3a15.3 15.3 0 010 18M12 3a15.3 15.3 0 000 18M4.93 7h14.14M4.93 17h14.14"/></svg>',
    rocket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path stroke-linecap="round" stroke-linejoin="round" d="M14 3c4 0 7 3 7 7-5 2-8 5-10 10-4 0-7-3-7-7 5-2 8-5 10-10zM5 19l-2 2m5-4l-4 1 1-4"/></svg>',
  };

  return icons[icon] || icons.factory;
}
