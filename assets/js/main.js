const IMAGE_CDN_FALLBACK = {
  'assets/img/hero/hero-bg.jpg': 'https://images.pexels.com/photos/36327501/pexels-photo-36327501.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'assets/img/hero/about-bg.jpg': 'https://images.pexels.com/photos/8246487/pexels-photo-8246487.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'assets/img/hero/nc-bg.jpg': 'https://images.pexels.com/photos/4149333/pexels-photo-4149333.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'assets/img/products/raised.jpg': 'https://images.pexels.com/photos/925706/pexels-photo-925706.jpeg?auto=compress&cs=tinysrgb&w=800',
  'assets/img/products/3d.jpg': 'https://images.pexels.com/photos/4863009/pexels-photo-4863009.jpeg?auto=compress&cs=tinysrgb&w=800',
  'assets/img/products/fr.jpg': 'https://images.pexels.com/photos/6717035/pexels-photo-6717035.jpeg?auto=compress&cs=tinysrgb&w=800',
  'assets/img/products/coated.jpg': 'https://images.pexels.com/photos/236748/pexels-photo-236748.jpeg?auto=compress&cs=tinysrgb&w=800',
  'assets/img/products/synthetic-leather.jpg': 'https://images.pexels.com/photos/3778766/pexels-photo-3778766.jpeg?auto=compress&cs=tinysrgb&w=800',
  'assets/img/products/genuine-leather.jpg': 'https://images.pexels.com/photos/3894048/pexels-photo-3894048.jpeg?auto=compress&cs=tinysrgb&w=800',
  'assets/img/products/direct-coating.jpg': 'https://images.pexels.com/photos/32613926/pexels-photo-32613926.jpeg?auto=compress&cs=tinysrgb&w=800',
  'assets/img/products/others.jpg': 'https://images.pexels.com/photos/14786437/pexels-photo-14786437.jpeg?auto=compress&cs=tinysrgb&w=800',
  'assets/img/factory/Pailung 1.jpg': 'https://images.pexels.com/photos/8246480/pexels-photo-8246480.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'assets/img/factory/stenter.jpg': 'https://images.pexels.com/photos/3544567/pexels-photo-3544567.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'assets/img/factory/Main Entry.JPG': 'https://images.pexels.com/photos/31090804/pexels-photo-31090804.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'assets/img/team/rajeev-kumar.jpg': 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400',
  'assets/img/team/prathit-kamdar.jpg': 'https://images.pexels.com/photos/7580937/pexels-photo-7580937.jpeg?auto=compress&cs=tinysrgb&w=400',
};

const VIDEO_CDN_FALLBACK = {
  'assets/video/hero-automotive-interior.mp4': 'https://videos.pexels.com/video-files/6872084/6872084-uhd_2560_1440_25fps.mp4',
  'assets/video/textile-factory.mp4': 'https://videos.pexels.com/video-files/5304551/5304551-hd_1920_1080_30fps.mp4',
};
document.addEventListener('error', function (e) {
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

document.addEventListener('error', function (e) {
  if (e.target.tagName !== 'VIDEO' && e.target.tagName !== 'SOURCE') return;

  const video = e.target.tagName === 'VIDEO' ? e.target : e.target.parentElement;
  const source = video?.querySelector('source');
  if (!video || !source) return;

  const src = source.getAttribute('src');
  const cdnUrl = VIDEO_CDN_FALLBACK[src];

  if (cdnUrl && !video.dataset.cdnAttempted) {
    video.dataset.cdnAttempted = 'true';
    source.src = cdnUrl;
    video.load();

    video.playbackRate = 0.6;
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => { });
    }
  }
}, true);
let _contentCache = null;

async function loadContent() {
  if (_contentCache) return _contentCache;
  const basePath = getBasePath();
  const res = await fetch(basePath + 'data/content.json');
  _contentCache = await res.json();
  return _contentCache;
}

function getBasePath() {
  const path = window.location.pathname;
  const depth = (path.match(/\//g) || []).length - 1;
  if (path.includes('/pages/')) return '../';
  return '';
}
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
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.nav-mobile');

  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });
  mobileNav.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}
function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

function initLenis() {
  if (typeof Lenis === 'undefined') return;
  if (isTouchDevice()) {
    window._lenis = null;
    return;
  }

  const lenis = new Lenis({
    lerp: 0.12,
    duration: 0.6,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.2,
    touchMultiplier: 1.5,
  });
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
function initAOS() {
  if (typeof AOS === 'undefined') return;
  const page = document.body.dataset.page;
  if (page === 'home') return;
  AOS.init({
    duration: 600,
    once: true,
    offset: 60,
    easing: 'ease-out-cubic',
    throttleDelay: 50,
  });
}
function initGSAP() {
  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);
  const header = document.querySelector('.site-header');
  if (header) {
    ScrollTrigger.create({
      start: 'top -80',
      onEnter: () => header.classList.add('scrolled'),
      onLeaveBack: () => header.classList.remove('scrolled'),
    });
  }
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

  ScrollTrigger.refresh();
}
function initHeroBAnimations() {
  if (typeof gsap === 'undefined') return;

  const heroB = document.querySelector('.hero-b');
  if (!heroB) return;

  const heroBgMedia = heroB.querySelector('.hero-b-bg img, .hero-b-bg video');
  const heroContent = heroB.querySelector('.hero-b-content');

  /* Slow down hero video playback */
  const heroVideo = heroB.querySelector('.hero-b-bg video');
  if (heroVideo) {
    heroVideo.playbackRate = 0.6;
    heroVideo.addEventListener('loadeddata', () => { heroVideo.playbackRate = 0.6; });
    heroVideo.addEventListener('play', () => { heroVideo.playbackRate = 0.6; });
  }

  const tl = gsap.timeline({ delay: 0.3 });
  if (typeof ScrollTrigger !== 'undefined' && heroB.dataset.scrollFxInit !== 'true') {
    heroB.dataset.scrollFxInit = 'true';

    if (heroBgMedia) {
      gsap.to(heroBgMedia, {
        y: '20%',
        ease: 'none',
        scrollTrigger: {
          trigger: heroB,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
    }

    if (heroContent) {
      gsap.to(heroContent, {
        yPercent: -10,
        opacity: 0.78,
        ease: 'none',
        scrollTrigger: {
          trigger: heroB,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
    }
  }

  tl.from('.hero-b-eyebrow', {
    y: 24,
    opacity: 0,
    duration: 0.55,
    ease: 'power3.out',
    clearProps: 'opacity,y',
  })
    .from('.hero-b-title-line', {
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
      clearProps: 'opacity,y',
    }, '-=0.28')
    .from('.hero-b-desc', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
      clearProps: 'opacity,y',
    }, '-=0.3')
    .from('.hero-b-cta-row > *', {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power3.out',
      clearProps: 'opacity,y',
    }, '-=0.2')
    .from('.hero-b-anno', {
      opacity: 0,
      duration: 0.6,
      stagger: 0.12,
      ease: 'power2.out',
      clearProps: 'opacity',
    }, '-=0.3')
    .from('.hero-b-scroll', {
      opacity: 0,
      y: 10,
      duration: 0.5,
      ease: 'power2.out',
      clearProps: 'opacity,y',
    }, '-=0.2');
}

/* ── Temporary Video Switcher ── */
function initVideoSwitcher() {
  const toggle = document.getElementById('videoSwitcherToggle');
  const panel = document.getElementById('videoSwitcherPanel');
  const close = document.getElementById('videoSwitcherClose');
  const optionsContainer = document.getElementById('videoSwitcherOptions');
  if (!toggle || !panel || !optionsContainer) return;

  const videos = [
    { src: 'assets/video/hero-video-hd.mp4', label: 'Current — Industrial Machinery' },
    { src: 'assets/video/option-1-textile-spools.mp4', label: 'Option 1 — Textile Spools' },
    { src: 'assets/video/option-2-highspeed-production.mp4', label: 'Option 2 — High Speed Production' },
    { src: 'assets/video/option-3-production-machine.mp4', label: 'Option 3 — Production Machine' },
    { src: 'assets/video/option-4-machinery-operation.mp4', label: 'Option 4 — Machinery Operation' },
    { src: 'assets/video/option-5-machine-closeup.mp4', label: 'Option 5 — Machine Close-up' },
    { src: 'assets/video/option-6-factory-operating.mp4', label: 'Option 6 — Factory Operating' },
    { src: 'assets/video/option-7-factory-production.mp4', label: 'Option 7 — Factory Production' },
    { src: 'assets/video/option-8-weaving-machine.mp4', label: 'Option 8 — Weaving Machine' },
    { src: 'assets/video/option-9-thread-machine.mp4', label: 'Option 9 — Thread Machine' },
    { src: 'assets/video/hero-video.mp4', label: 'Original — Local Low-Res' },
  ];

  const heroVideo = document.querySelector('.hero-b-bg-video');
  const currentSrc = heroVideo ? heroVideo.querySelector('source')?.src || heroVideo.src : '';

  videos.forEach((v, i) => {
    const card = document.createElement('div');
    card.className = 'video-switcher-card' + (currentSrc.includes(v.src) ? ' active' : '');
    card.innerHTML = `
      <video src="${v.src}" muted loop playsinline preload="metadata"></video>
      <div class="video-switcher-card-label">${v.label}</div>
    `;

    const thumb = card.querySelector('video');
    card.addEventListener('mouseenter', () => { thumb.currentTime = 0; thumb.play().catch(() => { }); });
    card.addEventListener('mouseleave', () => { thumb.pause(); });

    card.addEventListener('click', () => {
      if (!heroVideo) return;
      document.querySelectorAll('.video-switcher-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const source = heroVideo.querySelector('source');
      if (source) source.src = v.src;
      heroVideo.src = v.src;
      heroVideo.load();
      heroVideo.play().catch(() => { });
      heroVideo.playbackRate = 0.6;
      heroVideo.addEventListener('loadeddata', () => { heroVideo.playbackRate = 0.6; }, { once: true });
    });

    optionsContainer.appendChild(card);
  });

  toggle.addEventListener('click', () => panel.classList.toggle('open'));
  close.addEventListener('click', () => panel.classList.remove('open'));
}

function initStatCounters() {
  if (typeof gsap === 'undefined') return;

  gsap.utils.toArray('.stat-value').forEach(el => {
    const text = el.textContent;
    const num = parseInt(text.replace(/[^0-9]/g, ''));

    if (!isNaN(num) && num > 0) {
      const hasCommas = text.includes(',');
      const suffix = text.replace(/^[\d,]+/, '');
      const obj = { val: 0 };

      gsap.to(obj, {
        val: num,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 95%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          const rounded = Math.round(obj.val);
          const formatted = hasCommas ? rounded.toLocaleString('en-IN') : String(rounded);
          el.textContent = formatted + suffix;
        }
      });
    }
  });
}
function initScrollToTop() {
  if (document.getElementById('scroll-to-top')) return;

  const btn = document.createElement('button');
  btn.id = 'scroll-to-top';
  btn.className = 'scroll-to-top';
  btn.setAttribute('aria-label', 'Scroll to top');
  btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>';
  btn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  document.body.appendChild(btn);

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      btn.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.35);
      ticking = false;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
async function initPage(pageKey) {
  document.body.dataset.page = pageKey;
  const data = await loadContent();
  const headerEl = document.getElementById('site-header');
  const footerEl = document.getElementById('site-footer');

  if (headerEl && typeof renderHeader === 'function') {
    headerEl.innerHTML = renderHeader(data);
  }

  if (footerEl && typeof renderFooter === 'function') {
    footerEl.innerHTML = renderFooter(data);
  }
  const contentEl = document.getElementById('page-content');
  if (contentEl) {
    let html = '';

    switch (pageKey) {
      case 'home':
        html = renderHomePage(data);
        break;
      case 'sustainability':
        html = renderSustainabilityPage(data);
        break;
      case 'contact':
        html = renderContactPage(data);
        break;
      case 'textile':
        html = renderTextilePage(data);
        break;
    }

    contentEl.innerHTML = html;
  }
  const header = document.querySelector('.site-header');
  const visibleHeroB = document.querySelector('.hero-b');
  const pageBanner = document.querySelector('.page-banner:not(.no-bg)');
  if (header) {
    header.classList.toggle('hero-overlay-mode', Boolean(visibleHeroB || pageBanner));
  }
  initTheme();
  initMobileMenu();
  initLenis();
  initAOS();
  initGSAP();
  initScrollToTop();
  if (typeof initGlobalBackground === 'function') {
    initGlobalBackground();
  }
  switch (pageKey) {
    case 'home':
      initHeroBAnimations();
      initStatCounters();
      if (typeof initHomeInteractiveFX === 'function') {
        initHomeInteractiveFX();
      }
      break;
    case 'sustainability':
      initStatCounters();
      break;
  }
  document.body.classList.add('loaded');
  const pageTransition = document.querySelector('.page-transition');
  if (pageTransition) {
    requestAnimationFrame(() => pageTransition.classList.add('loaded'));
  }
}
function renderHomePage(data) {
  const heroVariantB = data.home.heroVariantB;

  return `
    ${typeof renderHeroB === 'function' ? renderHeroB(heroVariantB) : ''}
    ${typeof renderHomePremiumSections === 'function' ? renderHomePremiumSections(data) : ''}
  `;
}

function renderTextilePage(data) {
  const textile = data.textile;

  const waterFreeSVG = `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 4C24 4 10 20 10 30a14 14 0 0028 0C38 20 24 4 24 4z" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <line x1="8" y1="42" x2="40" y2="6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`;

  const scippIcons = [
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3v1m0 16v1m-8-9H3m18 0h-1m-2.636-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"/></svg>`,
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`,
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l.146.146A1.5 1.5 0 0116.5 18h-9a1.5 1.5 0 01-1.182-2.415l.146-.146z"/></svg>`,
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 21h18M6 21V3h4v18M14 21V8h4v13M10 7H6M18 12h-4"/><path d="M3 3h2M3 7h1M3 11h1M3 15h1M3 19h1" stroke-linecap="round"/></svg>`,
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`
  ];

  return `
    ${typeof renderPageBanner === 'function' ? renderPageBanner(textile.banner) : ''}

    <section class="tx-wf-strip">
      <div class="tx-wf-strip-inner">
        <div class="tx-wf-strip-icon">${waterFreeSVG}</div>
        <div class="tx-wf-strip-content">
          <h2 class="tx-wf-strip-title">100% Water-Free Manufacturing</h2>
          <p class="tx-wf-strip-text">${textile.intro}</p>
        </div>
      </div>
    </section>

    <section class="section" style="background:var(--bg-card);">
      <div class="container">
        <div class="section-header"><h2 class="section-title">Our Fabrics</h2></div>
        ${textile.products.map((p, i) => `
          <div class="tx-alt-row${p.image ? ' has-image' : ''}" data-aos="fade-up" data-aos-delay="${i * 80}">
            <div class="tx-alt-body">
              <div class="tx-alt-num">${String(i + 1).padStart(2, '0')}</div>
              <h3 class="tx-alt-title">${p.name}</h3>
              <p class="tx-alt-desc">${p.description}</p>
            </div>
            ${p.image ? `
              <div class="tx-alt-image${p.isIcon ? ' is-icon' : ''}${p.imageZoom === false ? ' no-zoom' : ''}"${p.imagePosition ? ` style="--tx-image-position: ${p.imagePosition};"` : ''}>
                <img src="${p.image}" alt="${p.name}" loading="lazy">
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>
    </section>

    ${textile.scipp ? `
    <section class="section tx-scipp-section" style="background:var(--bg-secondary);">
      <div class="container">
        <div class="section-header" data-aos="fade-up">
          <h2 class="section-title">${textile.scipp.title}</h2>
        </div>
        <div class="tx-scipp-grid">
          ${textile.scipp.items.map((item, i) => `
            <div class="tx-scipp-card" data-aos="fade-up" data-aos-delay="${i * 100}">
              <div class="tx-scipp-icon">${scippIcons[i] || ''}</div>
              <div class="tx-scipp-letter">${item.letter}</div>
              <h3 class="tx-scipp-label">${item.label}</h3>
              <p class="tx-scipp-desc">${item.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
    ` : ''}

    ${textile.clients ? `
    <section class="section tx-clients-section" style="background:var(--bg-card);">
      <div class="container">
        <div class="section-header" data-aos="fade-up">
          <h2 class="section-title">${textile.clients.title}</h2>
        </div>
        <div class="tx-clients-marquee">
          <div class="tx-clients-track">
            ${[...textile.clients.logos, ...textile.clients.logos].map(logo => `
              <div class="tx-client-logo">
                <img src="${logo.image}" alt="${logo.name}" loading="lazy" title="${logo.name}">
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>
    ` : ''}
  `;
}

function renderSustainabilityPage(data) {
  const sus = data.sustainability;
  return `
    ${typeof renderPageBanner === 'function' ? renderPageBanner(sus.banner) : ''}
    <section class="section">
      <div class="container">
        <div class="max-w-3xl mx-auto">
          <h2 class="section-title mb-6">${sus.intro.title}</h2>
          ${sus.intro.paragraphs.map((p, i) =>
    `<p class="text-base md:text-lg leading-relaxed mb-4" style="color: var(--text-secondary);">${p}</p>`
  ).join('')}
        </div>
      </div>
    </section>
    <section class="section" style="background: var(--bg-secondary);">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Our Pillars</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          ${sus.pillars.map((pillar, i) =>
    `<div class="pillar-card">
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
    `<div class="stat-card">
              <div class="stat-value">${stat.value}</div>
              <div class="stat-label">${stat.label}</div>
            </div>`
  ).join('')}
        </div>
      </div>
    </section>
    ${data.nc && data.nc.innovation ? `
    <section class="section" style="background: var(--bg-secondary);">
      <div class="container">
        <div class="max-w-4xl mx-auto">
          <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:1rem;">
            <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--accent);animation:pulse 2s infinite;"></span>
            <span style="font-size:0.875rem;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:var(--accent);">${data.nc.innovation.badge}</span>
          </div>
          <h2 class="section-title mb-4">${data.nc.innovation.title}</h2>
          <p class="text-base md:text-lg leading-relaxed mb-4" style="color:var(--text-secondary);">${data.nc.innovation.description}</p>
          ${data.nc.innovation.detail ? `<p class="text-base leading-relaxed" style="color:var(--text-secondary);">${data.nc.innovation.detail}</p>` : ''}
        </div>
      </div>
    </section>
    ` : ''}
  `;
}

function renderContactPage(data) {
  const contact = data.contact;
  return `
    ${typeof renderPageBanner === 'function' ? renderPageBanner({ title: contact.title, subtitle: contact.subtitle, backgroundImage: 'assets/img/factory/stenter.jpg' }) : ''}

    <section class="contact-section section">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-info">
            <h3 class="contact-info-title">Get In Touch</h3>
            <p class="contact-info-desc">${contact.description}</p>

            <div class="contact-cards">
              <div class="contact-card">
                <div class="contact-card-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <h4 class="contact-card-label">Office Address</h4>
                  <p class="contact-card-value">${contact.address}</p>
                </div>
              </div>

              <div class="contact-card">
                <div class="contact-card-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </div>
                <div>
                  <h4 class="contact-card-label">Email</h4>
                  <a href="mailto:${contact.email}" class="contact-card-link">${contact.email}</a>
                </div>
              </div>

              <div class="contact-card">
                <div class="contact-card-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div>
                  <h4 class="contact-card-label">Phone</h4>
                  <a href="tel:${contact.phone.replace(/\s/g, '')}" class="contact-card-link">${contact.phone}</a>
                </div>
              </div>
            </div>
          </div>

          <div class="contact-form-panel">
            <h3 class="contact-form-heading">Send Us a Message</h3>
            <p class="contact-form-subtext">Fill the form below and we will get back to you shortly.</p>
            ${typeof renderContactForm === 'function' ? renderContactForm(contact.formFields) : ''}
          </div>
        </div>
      </div>
    </section>
  `;
}
function getPillarIcon(icon) {
  const icons = {
    leaf: '<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>',
    bolt: '<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>',
    recycle: '<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>',
    people: '<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>',
  };
  return icons[icon] || icons.leaf;
}
function getSocialIcon(name) {
  const icons = {
    linkedin: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>',
    instagram: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>',
    facebook: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>',
    twitter: '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
  };
  return icons[name] || '';
}
