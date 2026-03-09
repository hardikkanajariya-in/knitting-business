/* ============================================
   MAIN.JS — Core Infrastructure
   Content loader, theme, menu, scroll, animations
   ============================================ */

// --- Image CDN Fallback ---
// Maps local paths to Pexels CDN URLs. If local images aren't downloaded,
// images automatically load from CDN. Run download-images.ps1 to go fully local.
const IMAGE_CDN_FALLBACK = {
  'assets/img/hero/hero-bg.jpg': 'https://images.pexels.com/photos/36327501/pexels-photo-36327501.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'assets/img/hero/hero-split.jpg': 'https://images.pexels.com/photos/6525848/pexels-photo-6525848.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'assets/img/hero/hero-automotive-interior.jpg': 'https://images.pexels.com/photos/1104768/pexels-photo-1104768.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'assets/img/hero/about-bg.jpg': 'https://images.pexels.com/photos/8246487/pexels-photo-8246487.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'assets/img/hero/nk-bg.jpg': 'https://images.pexels.com/photos/36327502/pexels-photo-36327502.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'assets/img/hero/nc-bg.jpg': 'https://images.pexels.com/photos/4149333/pexels-photo-4149333.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'assets/img/hero/sustainability-bg.jpg': 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'assets/img/products/raised.jpg': 'https://images.pexels.com/photos/925706/pexels-photo-925706.jpeg?auto=compress&cs=tinysrgb&w=800',
  'assets/img/products/3d.jpg': 'https://images.pexels.com/photos/4863009/pexels-photo-4863009.jpeg?auto=compress&cs=tinysrgb&w=800',
  'assets/img/products/fr.jpg': 'https://images.pexels.com/photos/6717035/pexels-photo-6717035.jpeg?auto=compress&cs=tinysrgb&w=800',
  'assets/img/products/coated.jpg': 'https://images.pexels.com/photos/236748/pexels-photo-236748.jpeg?auto=compress&cs=tinysrgb&w=800',
  'assets/img/products/synthetic-leather.jpg': 'https://images.pexels.com/photos/3778766/pexels-photo-3778766.jpeg?auto=compress&cs=tinysrgb&w=800',
  'assets/img/products/genuine-leather.jpg': 'https://images.pexels.com/photos/3894048/pexels-photo-3894048.jpeg?auto=compress&cs=tinysrgb&w=800',
  'assets/img/products/direct-coating.jpg': 'https://images.pexels.com/photos/32613926/pexels-photo-32613926.jpeg?auto=compress&cs=tinysrgb&w=800',
  'assets/img/products/others.jpg': 'https://images.pexels.com/photos/14786437/pexels-photo-14786437.jpeg?auto=compress&cs=tinysrgb&w=800',
  'assets/img/factory/nk-factory.jpg': 'https://images.pexels.com/photos/8246480/pexels-photo-8246480.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'assets/img/factory/nc-factory.jpg': 'https://images.pexels.com/photos/3544567/pexels-photo-3544567.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'assets/img/factory/team-factory.jpg': 'https://images.pexels.com/photos/31090804/pexels-photo-31090804.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'assets/img/team/rajeev-kumar.jpg': 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400',
  'assets/img/team/prathit-kamdar.jpg': 'https://images.pexels.com/photos/7580937/pexels-photo-7580937.jpeg?auto=compress&cs=tinysrgb&w=400',
};

// Capture-phase error listener: intercepts failed image loads before inline onerror handlers
document.addEventListener('error', function(e) {
  if (e.target.tagName === 'IMG') {
    const src = e.target.getAttribute('src');
    const cdnUrl = IMAGE_CDN_FALLBACK[src];
    if (cdnUrl && !e.target.dataset.cdnAttempted) {
      e.target.dataset.cdnAttempted = 'true';
      e.target.onerror = null;
      e.target.src = cdnUrl;
    }
  }
}, true);

// --- Content Cache ---
let _contentCache = null;

async function loadContent() {
  if (_contentCache) return _contentCache;
  const basePath = getBasePath();
  const res = await fetch(basePath + 'data/content.json');
  _contentCache = await res.json();
  return _contentCache;
}

function getBasePath() {
  // Determine base path relative to current HTML file
  const path = window.location.pathname;
  const depth = (path.match(/\//g) || []).length - 1;
  if (path.includes('/pages/')) return '../';
  return '';
}

// --- Theme System ---
function initTheme() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (saved === 'dark' || (!saved && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  updateThemeIcon();
}

function toggleTheme() {
  const html = document.documentElement;
  html.classList.toggle('dark');
  const isDark = html.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  updateThemeIcon();
}

function updateThemeIcon() {
  const isDark = document.documentElement.classList.contains('dark');
  const icons = document.querySelectorAll('.theme-icon-sun, .theme-icon-moon');
  icons.forEach(icon => {
    if (icon.classList.contains('theme-icon-sun')) {
      icon.style.display = isDark ? 'block' : 'none';
    }
    if (icon.classList.contains('theme-icon-moon')) {
      icon.style.display = isDark ? 'none' : 'block';
    }
  });
}

// --- Mobile Menu ---
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.nav-mobile');

  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  // Close on link click
  mobileNav.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

// --- Lenis Smooth Scroll ---
function initLenis() {
  if (typeof Lenis === 'undefined') return;

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
  });

  // Sync with GSAP ScrollTrigger
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  } else {
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  window._lenis = lenis;
}

// --- AOS Init ---
function initAOS() {
  if (typeof AOS === 'undefined') return;
  AOS.init({
    duration: 800,
    once: true,
    offset: 80,
    easing: 'ease-out-cubic',
  });
}

// --- GSAP Animations ---
function initGSAP() {
  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Header scroll effect
  const header = document.querySelector('.site-header');
  if (header) {
    ScrollTrigger.create({
      start: 'top -80',
      onUpdate: (self) => {
        if (self.scroll() > 80) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    });
  }

  // Reveal animations
  gsap.utils.toArray('.reveal-up').forEach(el => {
    gsap.to(el, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      }
    });
  });

  gsap.utils.toArray('.reveal-left').forEach(el => {
    gsap.to(el, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      }
    });
  });

  gsap.utils.toArray('.reveal-right').forEach(el => {
    gsap.to(el, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      }
    });
  });

  gsap.utils.toArray('.reveal-scale').forEach(el => {
    gsap.to(el, {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      }
    });
  });
}

// --- Hero A Animations ---
function initHeroAAnimations() {
  if (typeof gsap === 'undefined') return;

  const heroA = document.querySelector('.hero-a');
  if (!heroA) return;

  if (heroA.dataset.introInit !== 'true') {
    heroA.dataset.introInit = 'true';

    const tl = gsap.timeline({ delay: 0.2 });

    tl.from('.hero-a-bg', {
      scale: 1.12,
      opacity: 0,
      duration: 1.3,
      ease: 'power2.out',
    })
    .from('.hero-a-kicker', {
      y: 24,
      opacity: 0,
      duration: 0.55,
      ease: 'power3.out',
    }, '-=0.7')
    .from('.hero-a-title', {
      y: 34,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
    }, '-=0.35')
    .from('.hero-a-desc', {
      y: 24,
      opacity: 0,
      duration: 0.65,
      ease: 'power3.out',
    }, '-=0.45')
    .from('.hero-a-cta-row > *', {
      y: 20,
      opacity: 0,
      duration: 0.45,
      stagger: 0.1,
      ease: 'power3.out',
    }, '-=0.3')
    .from('.hero-a-stats-bar', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
    }, '-=0.2')
    .from('.hero-a-scroll-thread', {
      y: 18,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.out',
    }, '-=0.3');
  }

  if (typeof ScrollTrigger !== 'undefined' && heroA.dataset.scrollIntroInit !== 'true') {
    heroA.dataset.scrollIntroInit = 'true';

    gsap.to('.hero-a-bg', {
      yPercent: 12,
      scale: 1.08,
      ease: 'none',
      scrollTrigger: {
        trigger: heroA,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    gsap.to('.hero-a-copy', {
      yPercent: -10,
      opacity: 0.72,
      ease: 'none',
      scrollTrigger: {
        trigger: heroA,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    gsap.to('.hero-a-scroll-thread', {
      y: 24,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: heroA,
        start: 'top top',
        end: '60% top',
        scrub: true,
      }
    });
  }
}

// --- Hero B Animations ---
function initHeroBAnimations() {
  if (typeof gsap === 'undefined') return;

  const heroB = document.querySelector('.hero-b');
  if (!heroB) return;

  const tl = gsap.timeline({ delay: 0.3 });

  // Parallax on background
  gsap.to('.hero-b-bg img', {
    y: '20%',
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-b',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    }
  });

  tl.from('.hero-b-title', {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  })
  .from('.hero-b-subtitle', {
    y: 40,
    opacity: 0,
    duration: 0.7,
    ease: 'power3.out',
  }, '-=0.4')
  .from('.hero-b-desc', {
    y: 30,
    opacity: 0,
    duration: 0.6,
    ease: 'power3.out',
  }, '-=0.3')
  .from('.hero-b .btn-primary-light', {
    y: 20,
    opacity: 0,
    duration: 0.5,
    ease: 'power3.out',
  }, '-=0.2');
}

// --- Journey / Timeline Animations (Pinned Stack) ---
function initTimelineAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const section = document.querySelector('.jrny-section');
  if (!section) return;

  const pin = section.querySelector('.jrny-pin');
  const slides = section.querySelectorAll('.jrny-slide');
  const dots = section.querySelectorAll('.jrny-dot');
  const progressFill = section.querySelector('.jrny-progress-fill');
  const count = slides.length;
  if (!count) return;

  // Show first slide immediately
  slides[0].classList.add('is-active');
  if (dots[0]) dots[0].classList.add('is-active');

  // Create ScrollTrigger for pinning and slide control
  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: () => '+=' + (count * 100) + '%',
    pin: pin,
    pinType: 'transform',
    scrub: true,
    snap: {
      snapTo: 1 / (count - 1),
      duration: { min: 0.2, max: 0.5 },
      ease: 'power1.inOut',
    },
    onUpdate: (self) => {
      const progress = self.progress;
      const rawIndex = progress * (count - 1);
      const activeIndex = Math.round(rawIndex);

      // Update slides with CSS transition-driven visibility
      slides.forEach((slide, i) => {
        slide.classList.toggle('is-active', i === activeIndex);
      });

      // Update dots
      dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i <= activeIndex);
      });

      // Update progress fill
      if (progressFill) {
        progressFill.style.height = (progress * 100) + '%';
      }
    }
  });

  // No GSAP tweens on slide content — all handled by CSS transitions

  // Background glows parallax
  const glows = section.querySelectorAll('.jrny-bg-glow');
  glows.forEach((glow, i) => {
    gsap.to(glow, {
      y: i % 2 === 0 ? -30 : 30,
      x: i % 2 === 0 ? 15 : -15,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      }
    });
  });
}

// --- Stat Counter Animation ---
function initStatCounters() {
  if (typeof gsap === 'undefined') return;

  gsap.utils.toArray('.stat-value').forEach(el => {
    const text = el.textContent;
    const num = parseInt(text.replace(/[^0-9]/g, ''));

    if (!isNaN(num) && num > 0) {
      const suffix = text.replace(/[0-9]/g, '');
      const obj = { val: 0 };

      gsap.to(obj, {
        val: num,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          el.textContent = Math.round(obj.val) + suffix;
        }
      });
    }
  });
}

// --- Page Initialization ---
async function initPage(pageKey) {
  const data = await loadContent();

  // Render global components
  const headerEl = document.getElementById('site-header');
  const footerEl = document.getElementById('site-footer');

  if (headerEl && typeof renderHeader === 'function') {
    headerEl.innerHTML = renderHeader(data);
  }

  if (footerEl && typeof renderFooter === 'function') {
    footerEl.innerHTML = renderFooter(data);
  }

  // Render page content
  const contentEl = document.getElementById('page-content');
  if (contentEl) {
    let html = '';

    switch (pageKey) {
      case 'home':
        html = renderHomePage(data);
        break;
      case 'about':
        html = renderAboutPage(data);
        break;
      case 'nk':
        html = renderNKPage(data);
        break;
      case 'nc':
        html = renderNCPage(data);
        break;
      case 'sustainability':
        html = renderSustainabilityPage(data);
        break;
      case 'team':
        html = renderTeamPage(data);
        break;
      case 'contact':
        html = renderContactPage(data);
        break;
    }

    contentEl.innerHTML = html;
  }

  // Add hero-overlay-mode to header if page has a full-bleed dark hero
  const header = document.querySelector('.site-header');
  const visibleHeroA = document.querySelector('.hero-a:not([style*="display: none"])');
  const visibleHeroB = document.querySelector('.hero-b:not([style*="display: none"])');
  if (header) {
    header.classList.toggle('hero-overlay-mode', Boolean(visibleHeroA || visibleHeroB));
  }

  // Initialize all interactions
  initTheme();
  initMobileMenu();
  initLenis();
  initAOS();
  initGSAP();

  // Page-specific animations
  switch (pageKey) {
    case 'home':
      initHeroVariantToggle();
      const activeVariant = document.querySelector('.hero-a[style=""]') ||
                           document.querySelector('.hero-a:not([style*="display: none"])');
      if (activeVariant) initHeroAAnimations();
      else initHeroBAnimations();
      initTimelineAnimations();
      initStatCounters();
      if (typeof initHomeInteractiveFX === 'function') {
        initHomeInteractiveFX();
      }
      break;
    case 'about':
      if (typeof initAboutJourneyAnimations === 'function') {
        initAboutJourneyAnimations();
      }
      initStatCounters();
      break;
    case 'nk':
    case 'nc':
      break;
    case 'sustainability':
      initStatCounters();
      break;
  }

  // Page load transition
  document.body.classList.add('loaded');
  const pageTransition = document.querySelector('.page-transition');
  if (pageTransition) {
    requestAnimationFrame(() => pageTransition.classList.add('loaded'));
  }
}

// --- Hero Variant Toggle (dev preview) ---
function initHeroVariantToggle() {
  const toggleBtns = document.querySelectorAll('.hero-variant-btn');
  const heroA = document.querySelector('.hero-a');
  const heroB = document.querySelector('.hero-b');

  if (!toggleBtns.length || !heroA || !heroB) return;

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const variant = btn.dataset.variant;

      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (variant === 'a') {
        heroA.style.display = '';
        heroB.style.display = 'none';
        const hdr = document.querySelector('.site-header');
        if (hdr) hdr.classList.add('hero-overlay-mode');
        initHeroAAnimations();
        if (typeof initHomeInteractiveFX === 'function') initHomeInteractiveFX();
      } else {
        heroA.style.display = 'none';
        heroB.style.display = '';
        const hdr = document.querySelector('.site-header');
        if (hdr) hdr.classList.add('hero-overlay-mode');
        initHeroBAnimations();
      }

      // Refresh ScrollTrigger
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    });
  });
}

// --- Render Page Functions ---
function renderHomePage(data) {
  const hero = data.home.hero;
  const journey = data.home.journey;

  return `
    ${typeof renderHeroA === 'function' ? renderHeroA(hero) : ''}
    ${typeof renderTimeline === 'function' ? renderTimeline(journey) : ''}
    ${typeof renderHomePremiumSections === 'function' ? renderHomePremiumSections(data) : ''}
  `;
}

function renderAboutPage(data) {
  const about = data.about;
  return `
    ${typeof renderAboutJourney === 'function' ? renderAboutJourney(about.journeySection) : ''}
    <section class="section" style="background: var(--bg-secondary); padding-top: 2rem;">
      <div class="container">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          ${about.stats.map((stat, i) =>
            `<div class="stat-card" data-aos="fade-up" data-aos-delay="${i * 100}">
              <div class="stat-value">${stat.value}</div>
              <div class="stat-label">${stat.label}</div>
            </div>`
          ).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderNKPage(data) {
  const nk = data.nk;
  return `
    ${typeof renderPageBanner === 'function' ? renderPageBanner(nk.banner) : ''}
    <section class="section">
      <div class="container">
        <div class="section-header" data-aos="fade-up">
          <h2 class="section-title">Our Capabilities</h2>
          <p class="section-subtitle">Advanced fabric technologies for every application</p>
        </div>
        ${typeof renderProductGrid === 'function' ? renderProductGrid(nk.features) : ''}
      </div>
    </section>
    <section class="section" style="background: var(--bg-secondary);">
      <div class="container">
        ${typeof renderContentBlock === 'function' ? renderContentBlock(nk.contentBlock) : ''}
      </div>
    </section>
    ${typeof renderCTAStrip === 'function' ? renderCTAStrip(data) : ''}
  `;
}

function renderNCPage(data) {
  const nc = data.nc;
  return `
    ${typeof renderPageBanner === 'function' ? renderPageBanner(nc.banner) : ''}
    <section class="section">
      <div class="container">
        <div class="section-header" data-aos="fade-up">
          <h2 class="section-title">Our Products</h2>
          <p class="section-subtitle">Chemical solutions for premium surfaces</p>
        </div>
        ${typeof renderProductGrid === 'function' ? renderProductGrid(nc.products) : ''}
      </div>
    </section>
    <section class="section" style="background: var(--bg-secondary);">
      <div class="container">
        ${typeof renderContentBlock === 'function' ? renderContentBlock(nc.contentBlock) : ''}
      </div>
    </section>
    ${typeof renderCTAStrip === 'function' ? renderCTAStrip(data) : ''}
  `;
}

function renderSustainabilityPage(data) {
  const sus = data.sustainability;
  return `
    ${typeof renderPageBanner === 'function' ? renderPageBanner(sus.banner) : ''}
    <section class="section">
      <div class="container">
        <div class="max-w-3xl mx-auto">
          <h2 class="section-title mb-6" data-aos="fade-up">${sus.intro.title}</h2>
          ${sus.intro.paragraphs.map((p, i) =>
            `<p class="text-base md:text-lg leading-relaxed mb-4" style="color: var(--text-secondary);" data-aos="fade-up" data-aos-delay="${(i + 1) * 100}">${p}</p>`
          ).join('')}
        </div>
      </div>
    </section>
    <section class="section" style="background: var(--bg-secondary);">
      <div class="container">
        <div class="section-header" data-aos="fade-up">
          <h2 class="section-title">Our Pillars</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          ${sus.pillars.map((pillar, i) =>
            `<div class="pillar-card" data-aos="fade-up" data-aos-delay="${i * 100}">
              <div class="pillar-icon">${getPillarIcon(pillar.icon)}</div>
              <h3 class="pillar-title">${pillar.title}</h3>
              <p class="pillar-desc">${pillar.description}</p>
            </div>`
          ).join('')}
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          ${sus.stats.map((stat, i) =>
            `<div class="stat-card" data-aos="fade-up" data-aos-delay="${i * 100}">
              <div class="stat-value">${stat.value}</div>
              <div class="stat-label">${stat.label}</div>
            </div>`
          ).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderTeamPage(data) {
  const team = data.team;
  return `
    ${typeof renderTeamHero === 'function' ? renderTeamHero(team.hero) : ''}
    <section class="section">
      <div class="container">
        <div class="section-header" data-aos="fade-up">
          <h2 class="section-title">Leadership</h2>
          <p class="section-subtitle">Meet the minds driving our vision forward</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${Math.min(team.leadership.length, 4)} gap-8 max-w-4xl mx-auto">
          ${typeof renderTeamCards === 'function' ? renderTeamCards(team.leadership) : ''}
        </div>
      </div>
    </section>
  `;
}

function renderContactPage(data) {
  const contact = data.contact;
  return `
    <section class="section" style="padding-top: calc(var(--header-height) + 3rem);">
      <div class="container">
        <div class="section-header" data-aos="fade-up">
          <h2 class="section-title">${contact.title}</h2>
          <p class="section-subtitle">${contact.subtitle}</p>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div data-aos="fade-up" data-aos-delay="100">
            <p class="text-base mb-8" style="color: var(--text-secondary);">${contact.description}</p>
            <div class="space-y-4">
              <div class="flex items-start gap-3">
                <svg class="w-5 h-5 mt-0.5 flex-shrink-0" style="color: var(--text-tertiary);" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span style="color: var(--text-secondary); font-size: 0.9375rem;">${contact.address}</span>
              </div>
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5 flex-shrink-0" style="color: var(--text-tertiary);" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <a href="mailto:${contact.email}" class="hover:underline" style="color: var(--text-secondary); font-size: 0.9375rem;">${contact.email}</a>
              </div>
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5 flex-shrink-0" style="color: var(--text-tertiary);" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <a href="tel:${contact.phone.replace(/\s/g, '')}" class="hover:underline" style="color: var(--text-secondary); font-size: 0.9375rem;">${contact.phone}</a>
              </div>
            </div>
          </div>
          <div data-aos="fade-up" data-aos-delay="200">
            ${typeof renderContactForm === 'function' ? renderContactForm(contact.formFields) : ''}
          </div>
        </div>
      </div>
    </section>
  `;
}

// --- Utility: Pillar Icons ---
function getPillarIcon(icon) {
  const icons = {
    leaf: '<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>',
    bolt: '<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>',
    recycle: '<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>',
    people: '<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>',
  };
  return icons[icon] || icons.leaf;
}

// --- Social Icon SVGs ---
function getSocialIcon(name) {
  const icons = {
    linkedin: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>',
    instagram: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>',
    facebook: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>',
    twitter: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
  };
  return icons[name] || '';
}
