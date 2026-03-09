/* Timeline Component — Full-Viewport Pinned Stack Journey */
function renderTimeline(data) {
  const milestones = data.milestones || [];
  const count = milestones.length;

  /* Stacked milestone slides — absolutely positioned, layered */
  const slides = milestones.map((m, i) => `
    <div class="jrny-slide" data-slide="${i}" style="--si:${i}; --total:${count}">
      <div class="jrny-slide-inner">
        <!-- Left — giant year + icon -->
        <div class="jrny-slide-left">
          <span class="jrny-slide-year">${m.year}</span>
          <div class="jrny-slide-icon">
            <span class="jrny-slide-icon-ring"></span>
            ${getTimelineIcon(m.icon)}
          </div>
          <span class="jrny-slide-step">0${i + 1} / 0${count}</span>
        </div>

        <!-- Right — text content -->
        <div class="jrny-slide-right">
          <div class="jrny-slide-tag">${m.year}</div>
          <h3 class="jrny-slide-title">${m.title}</h3>
          <p class="jrny-slide-desc">${m.description}</p>
          <div class="jrny-slide-line" aria-hidden="true"></div>
        </div>
      </div>
    </div>
  `).join('');

  /* Progress dots */
  const dots = milestones.map((m, i) => `
    <button class="jrny-dot" data-dot="${i}" aria-label="Go to ${m.year}">
      <span class="jrny-dot-fill"></span>
      <span class="jrny-dot-year">${m.year}</span>
    </button>
  `).join('');

  return `
    <section class="jrny-section section" id="home-journey">
      <!-- Background effects -->
      <div class="jrny-bg" aria-hidden="true">
        <div class="jrny-bg-grid"></div>
        <div class="jrny-bg-grain"></div>
        <div class="jrny-bg-orb jrny-bg-orb--1"></div>
        <div class="jrny-bg-orb jrny-bg-orb--2"></div>
        <div class="jrny-bg-sweep jrny-bg-sweep--1"></div>
        <div class="jrny-bg-sweep jrny-bg-sweep--2"></div>
        <div class="jrny-bg-glow jrny-bg-glow--1"></div>
        <div class="jrny-bg-glow jrny-bg-glow--2"></div>
      </div>

      <!-- Pinned viewport container -->
      <div class="jrny-pin">
        <!-- Header — always visible -->
        <div class="jrny-header">
          <p class="jrny-header-kicker">${data.subtitle || ''}</p>
          <h2 class="jrny-header-title">${data.title}</h2>
        </div>

        <!-- Stacked slides -->
        <div class="jrny-stack">
          ${slides}
        </div>

        <!-- Progress bar + dots (right side) -->
        <div class="jrny-progress">
          <div class="jrny-progress-track">
            <div class="jrny-progress-fill"></div>
          </div>
          <div class="jrny-dots">
            ${dots}
          </div>
        </div>
      </div>
    </section>
  `;
}

function getTimelineIcon(icon) {
  const icons = {
    factory: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3 21h18M5 21V10l6 3V8l6 3V6l4 2v13M9 21v-4m6 4v-4"/></svg>',
    lightbulb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 18h6M10 22h4M12 2a7 7 0 00-4 12.744C8.63 15.37 9 16.18 9 17h6c0-.82.37-1.63 1-2.256A7 7 0 0012 2z"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 21c7 0 14-7 14-14-7 0-14 7-14 14zm0 0c0-4 4-8 8-8"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12h18M12 3a15.3 15.3 0 010 18M12 3a15.3 15.3 0 000 18M4.93 7h14.14M4.93 17h14.14"/></svg>',
    rocket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M14 3c4 0 7 3 7 7-5 2-8 5-10 10-4 0-7-3-7-7 5-2 8-5 10-10zM5 19l-2 2m5-4l-4 1 1-4"/></svg>',
  };
  return icons[icon] || icons.factory;
}
