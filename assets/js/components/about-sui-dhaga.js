function renderAboutJourneyV4(section) {
  if (!section) return '';
  const milestones = section.milestones || [];

  const milestonesHTML = milestones.map((m, i) => {
    const crossCount = 12;
    const crosses = Array.from({ length: crossCount }, (_, ci) => {
      const angle = (ci / crossCount) * 360 + (i * 15);
      const r = 130;
      const x = 50 + r * Math.cos((angle * Math.PI) / 180) / 2.4;
      const y = 50 + r * Math.sin((angle * Math.PI) / 180) / 2.4;
      return `<div class="sd-cross" style="left:${x}%;top:${y}%;transition-delay:${ci * 80 + 200}ms"></div>`;
    }).join('');

    return `
      <div class="sd-milestone" data-index="${i}">
        <div class="sd-milestone-card">
          <div class="sd-hoop">
            <div class="sd-hoop-ring"></div>
            <div class="sd-hoop-fabric">
              ${m.image ? `<img src="${m.image}" alt="${m.title}" class="sd-hoop-img" loading="lazy">` : ''}
            </div>
            <div class="sd-cross-stitches">${crosses}</div>
          </div>
          <div class="sd-milestone-text">
            <div class="sd-year-tag">
              <span class="sd-tag-label">${m.year}</span>
              <span class="sd-tag-thread"></span>
            </div>
            <h3 class="sd-milestone-title">${m.title}</h3>
            <p class="sd-milestone-desc">${m.description}</p>
            <div class="sd-milestone-count">${String(i + 1).padStart(2, '0')}</div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  
  const spoolSVG = `<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="30" cy="8" rx="18" ry="5" stroke="currentColor" stroke-width="1.5" fill="none"/>
    <ellipse cx="30" cy="52" rx="18" ry="5" stroke="currentColor" stroke-width="1.5" fill="none"/>
    <line x1="12" y1="8" x2="12" y2="52" stroke="currentColor" stroke-width="1.5"/>
    <line x1="48" y1="8" x2="48" y2="52" stroke="currentColor" stroke-width="1.5"/>
    <ellipse cx="30" cy="30" rx="14" ry="18" stroke="currentColor" stroke-width="1" stroke-dasharray="4 3" opacity="0.4"/>
  </svg>`;

  return `
    <section class="sd-canvas" id="sui-dhaga">
      
      <div class="sd-scroll-indicator" id="sd-scroll-cue">
        <div class="sd-spool">${spoolSVG}</div>
        <span class="sd-scroll-text">Scroll to stitch</span>
        <div class="sd-scroll-thread"></div>
      </div>

      
      <div class="sd-needle-layer" id="sd-needle-layer">
        <svg class="sd-needle-svg" id="sd-needle-svg" preserveAspectRatio="none">
          <defs>
            <!-- Needle metal gradient -->
            <linearGradient id="needleGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#b8b8b8"/>
              <stop offset="18%" stop-color="#d8d8d8"/>
              <stop offset="35%" stop-color="#f0f0f0"/>
              <stop offset="50%" stop-color="#e0e0e0"/>
              <stop offset="65%" stop-color="#a0a0a0"/>
              <stop offset="85%" stop-color="#c0c0c0"/>
              <stop offset="100%" stop-color="#909090"/>
            </linearGradient>
            <linearGradient id="needleTipGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#d0d0d0"/>
              <stop offset="60%" stop-color="#f0f0f0"/>
              <stop offset="100%" stop-color="#ffffff"/>
            </linearGradient>
            <!-- Needle center groove -->
            <linearGradient id="needleGrooveGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="transparent"/>
              <stop offset="40%" stop-color="rgba(0,0,0,0.08)"/>
              <stop offset="50%" stop-color="rgba(0,0,0,0.15)"/>
              <stop offset="60%" stop-color="rgba(0,0,0,0.08)"/>
              <stop offset="100%" stop-color="transparent"/>
            </linearGradient>
            <!-- Thread fiber texture -->
            <filter id="threadFiber" x="-5%" y="-50%" width="110%" height="200%">
              <feTurbulence type="fractalNoise" baseFrequency="0.04 0.8" numOctaves="4" seed="3" result="noise"/>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G"/>
            </filter>
            <!-- Thread twist pattern -->
            <pattern id="threadTwist" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(25)">
              <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>
            </pattern>
            <!-- Thread shadow for depth -->
            <filter id="threadDepth">
              <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" result="blur"/>
              <feOffset dx="1" dy="2" result="offset"/>
              <feFlood flood-color="rgba(0,0,0,0.3)" result="color"/>
              <feComposite in="color" in2="offset" operator="in" result="shadow"/>
              <feMerge>
                <feMergeNode in="shadow"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <!-- Thread shadow (bottom layer) -->
          <path class="sd-thread-shadow" id="sd-thread-shadow" d="" />
          <!-- Thread glow -->
          <path class="sd-thread-glow" id="sd-thread-glow" d="" />
          <!-- Main thread body -->
          <path class="sd-thread-path" id="sd-thread-path" d="" filter="url(#threadFiber)" />
          <!-- Thread twist overlay -->
          <path class="sd-thread-twist" id="sd-thread-twist" d="" />
          <!-- Thread specular highlight -->
          <path class="sd-thread-highlight" id="sd-thread-highlight" d="" />
          <!-- Needle group -->
          <g class="sd-needle-group" id="sd-needle-group" filter="url(#threadDepth)">
            <!-- Needle body -->
            <path class="sd-needle-body" d="M -2.8,-22 C -1.5,-30 -0.5,-34 0,-36 C 0.5,-34 1.5,-30 2.8,-22 L 2.8,12 Q 2.8,13 2.2,13 L -2.2,13 Q -2.8,13 -2.8,12 Z"/>
            <!-- Center groove line -->
            <rect class="sd-needle-groove" x="-0.4" y="-22" width="0.8" height="34" rx="0.4" fill="url(#needleGrooveGrad)"/>
            <!-- Eye hole -->
            <ellipse class="sd-needle-eye" cx="0" cy="-18" rx="1.2" ry="3.5"/>
            <!-- Eye inner shine -->
            <ellipse cx="0.3" cy="-18.5" rx="0.4" ry="1" fill="rgba(255,255,255,0.25)"/>
            <!-- Thread through eye -->
            <path class="sd-needle-thread-link" d="M 0,-14.5 Q -4,-10 -2,-4 Q 0,2 -3,8" stroke-width="1.8" fill="none" stroke="var(--sd-thread)" opacity="0.5" stroke-dasharray="3 2"/>
            <!-- Needle tip -->
            <polygon class="sd-needle-tip" points="-2.2,13 2.2,13 0,20"/>
            <!-- Tip glint -->
            <line x1="0" y1="15" x2="0" y2="19" stroke="rgba(255,255,255,0.5)" stroke-width="0.5"/>
          </g>
        </svg>
      </div>

      
      <div class="sd-stitch-marks" id="sd-stitch-marks"></div>

      
      <div class="sd-progress-track" id="sd-progress-track">
        <div class="sd-progress-thread">
          <div class="sd-progress-fill" id="sd-progress-fill"></div>
          ${milestones.map((_, i) => {
            const pct = (i / (milestones.length - 1)) * 100;
            return `<div class="sd-progress-dot" data-milestone="${i}" style="top:${pct}%"></div>`;
          }).join('')}
        </div>
      </div>

      
      <div class="sd-hero" id="sd-hero">
        
        <div class="sd-hero-decor">
          <svg class="sd-decor-bobbin sd-bobbin-1" viewBox="0 0 40 60" fill="none"><ellipse cx="20" cy="6" rx="14" ry="4" stroke="currentColor" stroke-width="1"/><ellipse cx="20" cy="54" rx="14" ry="4" stroke="currentColor" stroke-width="1"/><line x1="6" y1="6" x2="6" y2="54" stroke="currentColor" stroke-width="1"/><line x1="34" y1="6" x2="34" y2="54" stroke="currentColor" stroke-width="1"/><ellipse cx="20" cy="30" rx="10" ry="15" stroke="currentColor" stroke-width="0.7" stroke-dasharray="3 2" opacity="0.5"/></svg>
          <svg class="sd-decor-bobbin sd-bobbin-2" viewBox="0 0 40 60" fill="none"><ellipse cx="20" cy="6" rx="14" ry="4" stroke="currentColor" stroke-width="1"/><ellipse cx="20" cy="54" rx="14" ry="4" stroke="currentColor" stroke-width="1"/><line x1="6" y1="6" x2="6" y2="54" stroke="currentColor" stroke-width="1"/><line x1="34" y1="6" x2="34" y2="54" stroke="currentColor" stroke-width="1"/><ellipse cx="20" cy="30" rx="10" ry="15" stroke="currentColor" stroke-width="0.7" stroke-dasharray="3 2" opacity="0.5"/></svg>
          <svg class="sd-decor-thread sd-thread-1" viewBox="0 0 200 100" fill="none"><path d="M0 50 Q50 10 100 50 Q150 90 200 50" stroke="currentColor" stroke-width="1.5" stroke-dasharray="6 4"/></svg>
          <svg class="sd-decor-thread sd-thread-2" viewBox="0 0 200 100" fill="none"><path d="M0 30 Q60 80 120 30 Q180 -10 200 40" stroke="currentColor" stroke-width="1" stroke-dasharray="4 6"/></svg>
          
          <div class="sd-corner-stitch sd-corner-tl"></div>
          <div class="sd-corner-stitch sd-corner-tr"></div>
          <div class="sd-corner-stitch sd-corner-bl"></div>
          <div class="sd-corner-stitch sd-corner-br"></div>
        </div>

        <div class="sd-hero-content">
          <div class="sd-hero-eyebrow">${section.eyebrow || 'NK'}</div>
          <h2 class="sd-hero-title">
            ${(section.title || 'Our Journey').replace(/(\S+)$/,
              '<span class="sd-embroidered">$1</span>')}
          </h2>
          <p class="sd-hero-subtitle">${section.storyTitle || ''}</p>
          <p class="sd-hero-paragraph">${(section.paragraphs && section.paragraphs[0]) || 'From a single knitting unit in Halol to an integrated textile powerhouse — our journey is stitched with dedication, innovation, and relentless quality.'}</p>

          
          <div class="sd-hero-stats">
            <div class="sd-stat">
              <span class="sd-stat-value" data-count="125">125 MT</span>
              <span class="sd-stat-label">Monthly Capacity</span>
              <div class="sd-stat-stitch"></div>
            </div>
            <div class="sd-stat">
              <span class="sd-stat-value">35,000+</span>
              <span class="sd-stat-label">Sq. Ft. Facility</span>
              <div class="sd-stat-stitch"></div>
            </div>
            <div class="sd-stat">
              <span class="sd-stat-value sd-stat-accent">Zero</span>
              <span class="sd-stat-label">Discharge Certified</span>
              <div class="sd-stat-stitch"></div>
            </div>
            <div class="sd-stat">
              <span class="sd-stat-value">2022</span>
              <span class="sd-stat-label">Interplast Partnership</span>
              <div class="sd-stat-stitch"></div>
            </div>
          </div>

          <div class="sd-hero-spool">${spoolSVG}</div>
        </div>
      </div>

      
      <div class="sd-milestones" id="sd-milestones">
        ${milestonesHTML}
      </div>
    </section>
  `;
}

function initAboutJourneyV4Animations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const canvas = document.querySelector('.sd-canvas');
  if (!canvas || canvas.dataset.v4animated === 'true') return;
  canvas.dataset.v4animated = 'true';

  const milestones = gsap.utils.toArray('.sd-milestone');
  const threadPath = document.getElementById('sd-thread-path');
  const threadGlow = document.getElementById('sd-thread-glow');
  const threadHighlight = document.getElementById('sd-thread-highlight');
  const threadShadow = document.getElementById('sd-thread-shadow');
  const threadTwist = document.getElementById('sd-thread-twist');
  const needleGroup = document.getElementById('sd-needle-group');
  const progressFill = document.getElementById('sd-progress-fill');
  const stitchMarks = document.getElementById('sd-stitch-marks');
  const scrollCue = document.getElementById('sd-scroll-cue');
  const progressDots = gsap.utils.toArray('.sd-progress-dot');
  const count = milestones.length;
  if (!count) return;

  
  function buildThreadPath() {
    const points = [];
    const svgEl = document.getElementById('sd-needle-svg');
    if (!svgEl) return;
    const canvasRect = canvas.getBoundingClientRect();

    
    const hero = document.getElementById('sd-hero');
    if (hero) {
      const hr = hero.getBoundingClientRect();
      points.push({
        x: hr.left + hr.width / 2 - canvasRect.left,
        y: hr.top + hr.height - canvasRect.top
      });
    }

    
    milestones.forEach(m => {
      const hoop = m.querySelector('.sd-hoop');
      if (hoop) {
        const r = hoop.getBoundingClientRect();
        points.push({
          x: r.left + r.width / 2 - canvasRect.left,
          y: r.top + r.height / 2 - canvasRect.top
        });
      }
    });

    if (points.length < 2) return;

    svgEl.setAttribute('viewBox', `0 0 ${canvas.scrollWidth} ${canvas.scrollHeight}`);
    svgEl.style.width = canvas.scrollWidth + 'px';
    svgEl.style.height = canvas.scrollHeight + 'px';

    
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const midY = (prev.y + curr.y) / 2;
      const cpx1 = prev.x + (curr.x - prev.x) * 0.2;
      const cpx2 = curr.x - (curr.x - prev.x) * 0.2;
      d += ` C ${cpx1} ${midY}, ${cpx2} ${midY}, ${curr.x} ${curr.y}`;
    }

    threadPath.setAttribute('d', d);
    threadGlow.setAttribute('d', d);
    if (threadHighlight) threadHighlight.setAttribute('d', d);
    if (threadShadow) threadShadow.setAttribute('d', d);
    if (threadTwist) threadTwist.setAttribute('d', d);

    const pathLen = threadPath.getTotalLength();
    gsap.set(threadPath, { strokeDasharray: pathLen, strokeDashoffset: pathLen });
    gsap.set(threadGlow, { strokeDasharray: pathLen, strokeDashoffset: pathLen });
    if (threadHighlight) {
      gsap.set(threadHighlight, { strokeDasharray: pathLen, strokeDashoffset: pathLen });
    }
    if (threadShadow) {
      gsap.set(threadShadow, { strokeDasharray: pathLen, strokeDashoffset: pathLen });
    }
    if (threadTwist) {
      gsap.set(threadTwist, { strokeDasharray: pathLen, strokeDashoffset: pathLen });
    }

    
    stitchMarks.innerHTML = '';
    const stitchSpacing = 14;
    const stitchCount = Math.floor(pathLen / stitchSpacing);
    for (let i = 0; i < stitchCount; i++) {
      const t = i / stitchCount;
      const pt = threadPath.getPointAtLength(t * pathLen);
      const pt2 = threadPath.getPointAtLength(Math.min(pathLen, t * pathLen + 2));
      const angle = Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * (180 / Math.PI) + 90;
      const stitch = document.createElement('div');
      stitch.className = 'sd-stitch';
      stitch.style.left = pt.x + 'px';
      stitch.style.top = pt.y + 'px';
      stitch.style.setProperty('--stitch-angle', angle + 'deg');
      stitch.dataset.dist = String(t);
      stitchMarks.appendChild(stitch);
    }

    return pathLen;
  }

  let pathLength = 0;

  
  function rebuildPath() {
    pathLength = buildThreadPath() || 0;
  }

  
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      rebuildPath();
      initScrollAnimations();
    });
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      rebuildPath();
      ScrollTrigger.refresh();
    }, 200);
  });

  function initScrollAnimations() {
    
    gsap.from('.sd-hero-eyebrow', {
      y: 20, opacity: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '.sd-hero', start: 'top 80%' }
    });
    gsap.from('.sd-hero-title', {
      y: 40, opacity: 0, duration: 1, delay: 0.2, ease: 'power3.out',
      scrollTrigger: { trigger: '.sd-hero', start: 'top 80%' }
    });
    gsap.from('.sd-hero-subtitle', {
      y: 30, opacity: 0, duration: 0.8, delay: 0.4, ease: 'power3.out',
      scrollTrigger: { trigger: '.sd-hero', start: 'top 80%' }
    });

    
    ScrollTrigger.create({
      trigger: '.sd-milestones',
      start: 'top 90%',
      onEnter: () => scrollCue && scrollCue.classList.add('is-hidden'),
      onLeaveBack: () => scrollCue && scrollCue.classList.remove('is-hidden'),
    });

    
    if (pathLength > 0) {
      ScrollTrigger.create({
        trigger: canvas,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
        onUpdate: (self) => {
          const progress = self.progress;

          
          const offset = pathLength * (1 - progress);
          gsap.set(threadPath, { strokeDashoffset: offset });
          gsap.set(threadGlow, { strokeDashoffset: offset });
          if (threadHighlight) gsap.set(threadHighlight, { strokeDashoffset: offset });
          if (threadShadow) gsap.set(threadShadow, { strokeDashoffset: offset });
          if (threadTwist) gsap.set(threadTwist, { strokeDashoffset: offset });

          
          const pt = threadPath.getPointAtLength(progress * pathLength);
          const pt2 = threadPath.getPointAtLength(Math.min(pathLength, progress * pathLength + 1));
          const angle = Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * (180 / Math.PI) + 90;
          gsap.set(needleGroup, {
            x: pt.x,
            y: pt.y,
            rotation: angle,
          });

          
          const stitches = stitchMarks.children;
          for (let i = 0; i < stitches.length; i++) {
            const dist = parseFloat(stitches[i].dataset.dist);
            if (dist <= progress) {
              stitches[i].classList.add('is-visible');
            }
          }

          
          if (progressFill) {
            progressFill.style.height = (progress * 100) + '%';
          }

          
          const currentMs = Math.min(count - 1, Math.floor(progress * count));
          progressDots.forEach((dot, di) => {
            dot.classList.toggle('is-active', di <= currentMs);
          });
        }
      });
    }

    
    milestones.forEach((m, i) => {
      ScrollTrigger.create({
        trigger: m,
        start: 'top 65%',
        onEnter: () => {
          m.classList.add('is-revealed');
        },
      });
    });
  }
}

function renderAboutStoryV4(story) {
  if (!story) return '';
  return `
    <section class="sd-story-section">
      <div class="sd-story-container">
        <div class="sd-story-image-frame" data-aos="fade-right">
          <div class="sd-story-image-wrapper">
            <img src="assets/img/factory/Main Entry.JPG" alt="Nirbhay manufacturing facility" loading="lazy">
          </div>
          <div class="sd-story-badge">
            <span class="sd-story-badge-val">40+</span>
            <span class="sd-story-badge-label">Years of<br>Excellence</span>
          </div>
        </div>
        <div class="sd-story-text-block" data-aos="fade-left">
          <div class="sd-tag-eyebrow">Our Story</div>
          <h2>${story.title}</h2>
          ${(story.paragraphs || []).map(p => '<p>' + p + '</p>').join('')}
        </div>
      </div>
    </section>
  `;
}

function renderFactoryGalleryV4(gallery) {
  if (!gallery || !gallery.images || !gallery.images.length) return '';
  return `
    <section class="sd-gallery-section">
      <div class="container">
        <div class="sd-gallery-header" data-aos="fade-up">
          <h2>${gallery.title}</h2>
          ${gallery.subtitle ? '<p>' + gallery.subtitle + '</p>' : ''}
        </div>
        <div class="sd-swatch-grid">
          ${gallery.images.map((img, i) => `
            <figure class="sd-swatch" data-aos="zoom-in" data-aos-delay="${i * 100}">
              <img src="${img.src}" alt="${img.alt}" loading="lazy">
              ${img.caption ? '<div class="sd-swatch-overlay"><span class="sd-swatch-caption">' + img.caption + '</span></div>' : ''}
            </figure>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}
