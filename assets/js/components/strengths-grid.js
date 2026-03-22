/* ============================================
   STRENGTHS-GRID.JS — Shared "What Sets Us Apart"
   Central component used by both V4 and V5
   ============================================ */

const STRENGTHS_ICONS = {
  factory: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 20V8l5 3V8l5 3V4h8a2 2 0 012 2v14H2z"/><path d="M6 20v-2h3v2M13 20v-2h3v2"/></svg>',
  gauge: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="13" r="9"/><path d="M12 13l3-5M7 17h10"/></svg>',
  layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
  leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 8C8 10 5.9 16.17 3.82 21.34M17 8A5 5 0 0121 3M17 8c-4 0-8 4-10 8"/></svg>',
  handshake: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 14l6-6 4 4 6-6M22 10l-6 6-4-4-6 6"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/></svg>',
  lightbulb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 21h6M12 3a6 6 0 014 10.46V17H8v-3.54A6 6 0 0112 3z"/></svg>',
  bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
};

function renderStrengthsGrid(strengths) {
  if (!strengths || !strengths.length) return '';
  const centerIdx = Math.floor(strengths.length / 2);

  return `
    <section class="sd-strengths-section">
      <div class="container">
        <div class="sd-strengths-header" data-aos="fade-up">
          <h2>What Sets Us Apart</h2>
          <p>Built on manufacturing depth, sustainability discipline, and innovation capability</p>
        </div>
        <div class="sd-patchwork">
          ${strengths.map((s, i) => `
            <div class="sd-patch${i === centerIdx ? ' sd-patch--hero' : ''}" data-aos="fade-up" data-aos-delay="${i * 60}">
              <div class="sd-patch-icon">${STRENGTHS_ICONS[s.icon] || STRENGTHS_ICONS.factory}</div>
              <div class="sd-patch-title">${s.title}</div>
              <div class="sd-patch-desc">${s.description}</div>
              <div class="sd-patch-number">${String(i + 1).padStart(2, '0')}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}
