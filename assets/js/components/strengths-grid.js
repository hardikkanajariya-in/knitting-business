const STRENGTHS_ICONS = {
  factory: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="24" y="6" width="18" height="36" rx="2" stroke="currentColor" stroke-width="1.5" fill="rgba(28,109,208,0.08)"/>
    <path d="M6 42V20l9 5V20l9 5V14h0" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
    <rect x="28" y="11" width="5" height="5" rx="1" fill="rgba(28,109,208,0.15)" stroke="currentColor" stroke-width="1"/>
    <rect x="35" y="11" width="5" height="5" rx="1" fill="rgba(28,109,208,0.15)" stroke="currentColor" stroke-width="1"/>
    <rect x="28" y="19" width="5" height="5" rx="1" fill="rgba(28,109,208,0.15)" stroke="currentColor" stroke-width="1"/>
    <rect x="35" y="19" width="5" height="5" rx="1" fill="rgba(28,109,208,0.15)" stroke="currentColor" stroke-width="1"/>
    <rect x="28" y="27" width="5" height="5" rx="1" fill="rgba(28,109,208,0.15)" stroke="currentColor" stroke-width="1"/>
    <rect x="35" y="27" width="5" height="5" rx="1" fill="rgba(28,109,208,0.15)" stroke="currentColor" stroke-width="1"/>
    <rect x="30" y="35" width="8" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/>
    <path d="M3 42h42" stroke="currentColor" stroke-width="1.5"/>
    <circle cx="11" cy="10" r="3" stroke="currentColor" stroke-width="1" fill="rgba(28,109,208,0.1)"/>
    <path d="M11 7v-3M8 10H5M14 10h3M11 13v3" stroke="currentColor" stroke-width="0.8" opacity="0.5"/>
  </svg>`,
  gauge: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 30a18 18 0 0136 0" stroke="currentColor" stroke-width="1.5" fill="none"/>
    <path d="M10 30a14 14 0 0128 0" stroke="currentColor" stroke-width="0.8" stroke-dasharray="3 3" opacity="0.3"/>
    <path d="M24 30l-6-12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <circle cx="24" cy="30" r="3" fill="currentColor" opacity="0.8"/>
    <path d="M12 30l-2 1M15.5 21l-2-1M24 16v-2M32.5 21l2-1M36 30l2 1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
    <text x="10" y="37" font-size="5" fill="currentColor" opacity="0.4" font-weight="600">0</text>
    <text x="34" y="37" font-size="5" fill="currentColor" opacity="0.4" font-weight="600">MAX</text>
    <path d="M28 22l3-2" stroke="rgba(28,109,208,0.4)" stroke-width="6" stroke-linecap="round" opacity="0.15"/>
  </svg>`,
  layers: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 6L4 16l20 10 20-10L24 6z" fill="rgba(28,109,208,0.08)" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M4 24l20 10 20-10" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M4 32l20 10 20-10" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M4 16l20 10 20-10" stroke="currentColor" stroke-width="0.8" stroke-dasharray="2 2" opacity="0.2"/>
    <circle cx="24" cy="16" r="3" fill="rgba(28,109,208,0.2)" stroke="currentColor" stroke-width="0.8"/>
  </svg>`,
  leaf: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 40C12 40 8 28 16 20s20-8 20-8-4 12-12 20-12 8-12 8z" fill="rgba(28,109,208,0.06)" stroke="currentColor" stroke-width="1.5"/>
    <path d="M16 36c4-6 10-12 20-20" stroke="currentColor" stroke-width="1" opacity="0.5"/>
    <path d="M18 30q4-2 7-6M14 34q3-1 5-4" stroke="currentColor" stroke-width="0.8" opacity="0.4"/>
    <circle cx="10" cy="42" r="2" stroke="currentColor" stroke-width="1" opacity="0.3"/>
    <path d="M10 44v-4M8 42h4" stroke="currentColor" stroke-width="0.6" opacity="0.3"/>
    <path d="M30 14c2 0 4 2 4 4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" opacity="0.5"/>
  </svg>`,
  handshake: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 20h6l8 4 6-4h4l8-4h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M18 24l4 4 6-6 4 4 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14 28l3 3 3-3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M17 31l3 3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
    <circle cx="8" cy="16" r="4" fill="rgba(28,109,208,0.08)" stroke="currentColor" stroke-width="1"/>
    <circle cx="40" cy="16" r="4" fill="rgba(28,109,208,0.08)" stroke="currentColor" stroke-width="1"/>
    <path d="M6 14l2 2 4-3" stroke="currentColor" stroke-width="0.8" opacity="0.5"/>
    <path d="M38 14l2 2 4-3" stroke="currentColor" stroke-width="0.8" opacity="0.5"/>
  </svg>`,
  lightbulb: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 6a12 12 0 018 20.92V32H16v-5.08A12 12 0 0124 6z" fill="rgba(28,109,208,0.06)" stroke="currentColor" stroke-width="1.5"/>
    <path d="M18 38h12M20 42h8M16 32h16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M24 14v8M20 18h8" stroke="currentColor" stroke-width="1" opacity="0.4"/>
    <path d="M15 10l-2-2M33 10l2-2M24 4V2M10 18H8M40 18h-2" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity="0.3"/>
    <circle cx="24" cy="18" r="4" stroke="currentColor" stroke-width="0.8" stroke-dasharray="2 2" opacity="0.2"/>
  </svg>`,
  bolt: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M26 4L10 26h12l-2 18L38 22H26l2-18z" fill="rgba(28,109,208,0.08)" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M20 26l6-10" stroke="currentColor" stroke-width="0.8" opacity="0.3"/>
    <path d="M26 22l-4 8" stroke="currentColor" stroke-width="0.8" opacity="0.3"/>
    <circle cx="24" cy="24" r="16" stroke="currentColor" stroke-width="0.6" stroke-dasharray="4 6" opacity="0.15"/>
  </svg>`,
};

function renderStrengthsGrid(strengths) {
  if (!strengths || !strengths.length) return '';

  return `
    <section class="sd-strengths-section">
      <div class="container">
        <div class="sd-strengths-header" data-aos="fade-up">
          <h2>What Sets Us Apart</h2>
          <p>Built on manufacturing depth, sustainability discipline, and innovation capability</p>
        </div>
        <div class="sd-patchwork">
          ${strengths.map((s, i) => `
            <div class="sd-patch" data-aos="fade-up" data-aos-delay="${i * 60}">
              <div class="sd-patch-icon-wrap">
                <div class="sd-patch-icon-bg"></div>
                <div class="sd-patch-icon">${STRENGTHS_ICONS[s.icon] || STRENGTHS_ICONS.factory}</div>
              </div>
              <div class="sd-patch-body">
                <div class="sd-patch-title">${s.title}</div>
                <div class="sd-patch-desc">${s.description}</div>
              </div>
              <div class="sd-patch-number">${String(i + 1).padStart(2, '0')}</div>
              <div class="sd-patch-shine"></div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

/* ── Strengths GSAP Animations ── */
function initStrengthsAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const patches = document.querySelectorAll('.sd-patch');
  if (!patches.length) return;

  /* Staggered card reveal */
  gsap.fromTo(patches,
    { y: 60, opacity: 0, scale: 0.92 },
    {
      y: 0, opacity: 1, scale: 1,
      duration: 0.7,
      stagger: 0.1,
      ease: 'back.out(1.4)',
      scrollTrigger: {
        trigger: '.sd-patchwork',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    }
  );

  /* Icon float animation */
  patches.forEach((patch, i) => {
    const icon = patch.querySelector('.sd-patch-icon');
    const iconBg = patch.querySelector('.sd-patch-icon-bg');
    if (!icon) return;

    gsap.to(icon, {
      y: -4,
      duration: 2 + (i * 0.3),
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    /* Icon bg pulse */
    if (iconBg) {
      gsap.to(iconBg, {
        scale: 1.15,
        opacity: 0.5,
        duration: 2.5 + (i * 0.2),
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }
  });

  /* Shine sweep on scroll */
  const shines = document.querySelectorAll('.sd-patch-shine');
  shines.forEach((shine, i) => {
    gsap.fromTo(shine,
      { x: '-100%' },
      {
        x: '200%',
        duration: 0.8,
        delay: i * 0.12,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: '.sd-patchwork',
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  /* Number counter reveal */
  const numbers = document.querySelectorAll('.sd-patch-number');
  gsap.fromTo(numbers,
    { opacity: 0, scale: 0.5 },
    {
      opacity: 0.06, scale: 1,
      duration: 0.5,
      stagger: 0.08,
      ease: 'back.out(3)',
      scrollTrigger: {
        trigger: '.sd-patchwork',
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    }
  );
}
