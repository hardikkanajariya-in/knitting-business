function renderHomePremiumSections(data) {
  const premium = data.home?.premium;
  if (!premium) return '';

  return `
    ${renderHomeTrustStrip(premium.trustStrip)}
    ${renderHomeShowcase(premium.showcase)}
    ${renderHomeProcess(premium.process)}
    ${renderHomeSpotlight(premium.spotlight)}
    ${renderHomeFinalCta(premium.finalCta)}
  `;
}

function renderHomeTrustStrip(section) {
  if (!section) return '';

  const marquee = [...(section.items || []), ...(section.items || [])]
    .map(item => `<span class="home-trust-pill">${item}</span>`)
    .join('');

  return `
    <section class="home-trust-strip">
      <div class="container home-trust-shell">
        <p class="home-trust-label">${section.label || ''}</p>
      </div>
      <div class="home-trust-marquee">
        <div class="home-trust-track">${marquee}</div>
      </div>
    </section>
  `;
}

function renderHomeShowcase(section) {
  if (!section) return '';

  return `
    <section class="home-showcase section">
      <div class="container">
        <div class="home-section-intro reveal-up">
          <p class="home-section-eyebrow">${section.eyebrow || ''}</p>
          <h2 class="home-section-title">${section.title || ''}</h2>
          <p class="home-section-desc">${section.description || ''}</p>
        </div>

        <div class="home-showcase-grid">
          ${(section.cards || []).map((card, index) => `
            <article class="home-showcase-card reveal-up" data-tilt-card data-depth="${0.06 + index * 0.01}">
              <div class="home-showcase-media">
                <img src="${card.image}" alt="${card.title}" width="1200" height="800" onerror="this.style.display='none'">
              </div>
              <div class="home-showcase-overlay"></div>
              <div class="home-showcase-content">
                <div class="home-showcase-category">${card.category || ''}</div>
                <h3 class="home-showcase-title">${card.title || ''}</h3>
                <p class="home-showcase-desc">${card.description || ''}</p>
                <a href="${card.href}" class="home-inline-link">
                  ${card.cta || 'Explore'}
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderHomeProcess(section) {
  if (!section) return '';

  return `
    <section class="home-process section">
      <div class="container home-process-grid">
        <div class="home-process-sticky reveal-left">
          <p class="home-section-eyebrow">${section.eyebrow || ''}</p>
          <h2 class="home-section-title">${section.title || ''}</h2>
          <p class="home-section-desc">${section.description || ''}</p>
          <div class="home-process-stats">
            ${(section.stats || []).map(stat => `
              <div class="home-process-stat">
                <div class="home-process-stat-value">${stat.value}</div>
                <div class="home-process-stat-label">${stat.label}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="home-process-steps">
          ${(section.steps || []).map((step, index) => `
            <article class="home-process-step reveal-right" data-process-step>
              <div class="home-process-step-index">0${index + 1}</div>
              <div>
                <h3 class="home-process-step-title">${step.title}</h3>
                <p class="home-process-step-desc">${step.description}</p>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderHomeSpotlight(section) {
  if (!section) return '';

  return `
    <section class="home-spotlight section">
      <div class="container">
        <div class="home-spotlight-shell reveal-scale">
          <div class="home-spotlight-copy">
            <p class="home-section-eyebrow">${section.eyebrow || ''}</p>
            <h2 class="home-section-title">${section.title || ''}</h2>
            <p class="home-section-desc">${section.description || ''}</p>
          </div>

          <div class="home-spotlight-panels">
            ${(section.panels || []).map(panel => `
              <article class="home-spotlight-panel" data-tilt-card>
                <div class="home-spotlight-badge">${panel.badge || ''}</div>
                <h3 class="home-spotlight-title">${panel.title || ''}</h3>
                <p class="home-spotlight-desc">${panel.description || ''}</p>
              </article>
            `).join('')}
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderHomeFinalCta(section) {
  if (!section) return '';

  return `
    <section class="home-final-cta section">
      <div class="container">
        <div class="home-final-cta-card reveal-up">
          <div>
            <p class="home-section-eyebrow">Let’s build together</p>
            <h2 class="home-section-title">${section.title || ''}</h2>
            <p class="home-section-desc">${section.description || ''}</p>
          </div>
          <div class="home-final-cta-actions">
            <a href="${section.primary?.href || '#'}" class="btn-primary magnetic-btn">${section.primary?.label || 'Contact us'}</a>
            <a href="${section.secondary?.href || '#'}" class="btn-outline magnetic-btn">${section.secondary?.label || 'Learn more'}</a>
          </div>
        </div>
      </div>
    </section>
  `;
}
