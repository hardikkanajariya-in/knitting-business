let _homeWebGLCleanup = null;

function initHomeWebGL() {
  const hero = document.querySelector('.hero-a-immersive');
  const canvas = hero?.querySelector('.hero-a-webgl');
  if (!hero || !canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  if (_homeWebGLCleanup) {
    _homeWebGLCleanup();
    _homeWebGLCleanup = null;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const colors = [
    'rgba(45, 110, 166, 0.52)',
    'rgba(255, 255, 255, 0.34)',
    'rgba(207, 61, 80, 0.5)',
    'rgba(140, 168, 195, 0.42)',
    'rgba(58, 73, 95, 0.34)',
  ];

  const threads = Array.from({ length: 8 }, (_, i) => ({
    amplitude: 28 + i * 4,
    yOffset: -110 + i * 34,
    zOffset: -40 + i * 10,
    color: colors[i % colors.length],
    speed: 0.0008 + i * 0.00012,
    thickness: 2 + (i % 3),
  }));

  const particles = Array.from({ length: 42 }, () => ({
    x: Math.random() * 2 - 1,
    y: Math.random() * 2 - 1,
    z: Math.random() * 180 + 30,
    r: Math.random() * 1.8 + 0.6,
    drift: Math.random() * 0.0006 + 0.0004,
  }));

  let width = 0;
  let height = 0;
  let dpr = 1;
  let pointerX = 0;
  let pointerY = 0;
  let rafId = 0;

  const resize = () => {
    const rect = hero.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const project = (x, y, z) => {
    const focal = 340;
    const scale = focal / (focal + z);
    return {
      x: width * 0.56 + x * scale + pointerX * 18,
      y: height * 0.5 + y * scale + pointerY * 14,
      scale,
    };
  };

  const onMove = (event) => {
    const rect = hero.getBoundingClientRect();
    pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
  };

  const drawThread = (thread, time) => {
    const samples = 28;
    ctx.beginPath();

    for (let i = 0; i < samples; i++) {
      const t = i / (samples - 1);
      const x = -width * 0.28 + t * width * 0.82;
      const wave = Math.sin(t * 7 + time * thread.speed * 1200 + thread.zOffset * 0.02) * thread.amplitude;
      const y = thread.yOffset + wave + Math.cos(t * 3 + time * 0.0014) * 18;
      const z = 100 + Math.sin(t * 5 + time * thread.speed * 800) * 70 + thread.zOffset;
      const p = project(x, y, z);
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }

    ctx.strokeStyle = thread.color;
    ctx.lineWidth = thread.thickness;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const drawParticles = (time) => {
    particles.forEach((particle) => {
      const x = particle.x * width * 0.48;
      const y = particle.y * height * 0.38 + Math.sin(time * particle.drift * 900 + particle.z) * 12;
      const p = project(x, y, particle.z);
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${0.12 + p.scale * 0.28})`;
      ctx.arc(p.x, p.y, particle.r * (1 + p.scale), 0, Math.PI * 2);
      ctx.fill();
    });
  };

  const render = (time) => {
    rafId = requestAnimationFrame(render);
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < threads.length; i++) {
      drawThread(threads[i], time);
    }

    drawParticles(time);
  };

  resize();
  hero.addEventListener('mousemove', onMove);
  hero.addEventListener('mouseleave', () => {
    pointerX = 0;
    pointerY = 0;
  });
  window.addEventListener('resize', resize);
  rafId = requestAnimationFrame(render);

  _homeWebGLCleanup = () => {
    cancelAnimationFrame(rafId);
    hero.removeEventListener('mousemove', onMove);
    window.removeEventListener('resize', resize);
    ctx.clearRect(0, 0, width, height);
  };
}
