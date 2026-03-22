/* ============================================
   GLOBAL-BG.JS — Interactive Background Elements
   Colorful floating shapes across the entire site
   with mouse-reactive parallax & glow
   ============================================ */

function initGlobalBackground() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (document.querySelector('.global-bg-canvas')) return;

  const canvas = document.createElement('div');
  canvas.className = 'global-bg-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);

  const SHAPES = ['circle', 'square', 'diamond', 'ring', 'cross', 'triangle', 'dots', 'hexagon'];
  const COLORS = ['gbg-blue', 'gbg-purple', 'gbg-teal', 'gbg-pink', 'gbg-amber', 'gbg-green', 'gbg-red'];
  const FLOATS = ['gbgFloat1', 'gbgFloat2', 'gbgFloat3', 'gbgFloat4'];
  const ELEMENT_COUNT = 16;

  const elements = [];

  for (let i = 0; i < ELEMENT_COUNT; i++) {
    const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const size = 8 + Math.floor(Math.random() * 18); // 8-26px
    const x = Math.random() * 95; // % from left
    const y = Math.random() * 95; // % from top
    const float = FLOATS[Math.floor(Math.random() * FLOATS.length)];
    const duration = 12 + Math.random() * 20; // 12-32s
    const delay = -(Math.random() * 15); // negative delay for stagger
    const opacity = 0.3 + Math.random() * 0.3; // 0.3-0.6

    const el = document.createElement('div');
    el.className = `gbg-el gbg-el--${shape} ${color}`;

    if (shape === 'triangle') {
      const triSize = size * 0.9;
      const triColor = getTriangleColor(color);
      el.style.borderLeft = `${triSize / 2}px solid transparent`;
      el.style.borderRight = `${triSize / 2}px solid transparent`;
      el.style.borderBottom = `${triSize}px solid ${triColor}`;
    } else if (shape === 'dots') {
      el.style.width = size * 1.2 + 'px';
      el.style.height = size * 1.2 + 'px';
      const dotColor = getDotColor(color);
      for (let d = 0; d < 9; d++) {
        const dot = document.createElement('span');
        dot.style.background = dotColor;
        el.appendChild(dot);
      }
    } else if (shape === 'hexagon') {
      el.style.width = size + 'px';
      el.style.height = size + 'px';
    } else {
      el.style.width = size + 'px';
      el.style.height = size + 'px';
    }

    el.style.left = x + '%';
    el.style.top = y + '%';
    el.style.opacity = opacity;
    el.style.setProperty('--gbg-opacity', opacity);
    el.style.animation = `${float} ${duration}s ease-in-out ${delay}s infinite`;

    // Add a secondary pulse to some elements
    if (Math.random() > 0.6) {
      el.style.animation += `, gbgPulse ${3 + Math.random() * 4}s ease-in-out ${delay}s infinite`;
    }

    canvas.appendChild(el);
    elements.push({ el, x, y, size });
  }

  // ── Mouse-reactive parallax ──
  let mouseX = 0.5, mouseY = 0.5;
  let rafActive = false;

  function onMouseMove(e) {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;

    if (!rafActive) {
      rafActive = true;
      requestAnimationFrame(updateParallax);
    }
  }

  function updateParallax() {
    rafActive = false;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;

    elements.forEach((item, i) => {
      const depth = 0.3 + (i % 5) * 0.1; // parallax depth layer
      const dx = (mouseX - 0.5) * depth * 25;
      const dy = (mouseY - 0.5) * depth * 25;
      item.el.style.marginLeft = dx + 'px';
      item.el.style.marginTop = dy + 'px';

      // Proximity glow
      const elRect = item.el.getBoundingClientRect();
      const elCX = elRect.left + elRect.width / 2;
      const elCY = elRect.top + elRect.height / 2;
      const dist = Math.sqrt(
        Math.pow(elCX - (mouseX * window.innerWidth), 2) +
        Math.pow(elCY - (mouseY * window.innerHeight), 2)
      );

      if (dist < 150) {
        item.el.classList.add('gbg-near');
      } else {
        item.el.classList.remove('gbg-near');
      }
    });
  }

  // Only add mouse tracking on non-touch devices
  if (!('ontouchstart' in window) && navigator.maxTouchPoints === 0) {
    window.addEventListener('mousemove', onMouseMove, { passive: true });
  }

  // ── Scroll-based vertical shift ──
  let lastScroll = 0;
  function onScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    const delta = scrollY - lastScroll;
    lastScroll = scrollY;

    elements.forEach((item, i) => {
      const speed = 0.02 + (i % 4) * 0.008;
      const currentTop = parseFloat(item.el.style.top);
      // Subtle vertical drift based on scroll
      const shift = scrollY * speed * 0.1;
      item.el.style.transform = `translateY(${-shift}px)`;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
}

// Helper: get a visible fill color for triangles
function getTriangleColor(cls) {
  const map = {
    'gbg-blue': 'rgba(59, 130, 246, 0.45)',
    'gbg-purple': 'rgba(139, 92, 246, 0.4)',
    'gbg-teal': 'rgba(20, 184, 166, 0.4)',
    'gbg-pink': 'rgba(236, 72, 153, 0.35)',
    'gbg-amber': 'rgba(245, 158, 11, 0.4)',
    'gbg-green': 'rgba(34, 197, 94, 0.4)',
    'gbg-red': 'rgba(239, 68, 68, 0.35)',
  };
  return map[cls] || 'rgba(59, 130, 246, 0.4)';
}

function getDotColor(cls) {
  const map = {
    'gbg-blue': 'rgba(59, 130, 246, 0.6)',
    'gbg-purple': 'rgba(139, 92, 246, 0.55)',
    'gbg-teal': 'rgba(20, 184, 166, 0.55)',
    'gbg-pink': 'rgba(236, 72, 153, 0.5)',
    'gbg-amber': 'rgba(245, 158, 11, 0.55)',
    'gbg-green': 'rgba(34, 197, 94, 0.55)',
    'gbg-red': 'rgba(239, 68, 68, 0.5)',
  };
  return map[cls] || 'rgba(59, 130, 246, 0.55)';
}
