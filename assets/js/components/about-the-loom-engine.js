function initAboutJourneyV5Animations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const cinema = document.getElementById('loom-cinema');
  if (!cinema || cinema.dataset.v5animated === 'true') return;
  cinema.dataset.v5animated = 'true';

  const scenes = gsap.utils.toArray('.loom-scene');
  const playBtn = document.getElementById('loom-play-btn');
  const skipBtn = document.getElementById('loom-skip-btn');
  const progressFill = document.getElementById('loom-progress-fill');
  const timeDisplay = document.getElementById('loom-time-display');
  const progressBar = document.getElementById('loom-progress-bar');
  const totalScenes = scenes.length;

  let isAutoPlaying = true;
  let currentSceneIdx = 0;
  let autoScrollTween = null;
  let sceneTimer = null;
  let isPaused = false;
  let progressTween = null;
  const SCENE_DURATION = 4500;

  
  function typewrite(el, callback) {
    if (!el) { callback && callback(); return; }
    const text = el.dataset.fullText || '';
    if (!text) { callback && callback(); return; }
    el.textContent = '';
    let i = 0;
    const speed = 35;

    function tick() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        setTimeout(tick, speed);
      } else {
        el.classList.add('done');
        callback && callback();
      }
    }
    tick();
  }

  
  function animateShuttle(scene) {
    const shuttle = scene.querySelector('.loom-shuttle');
    if (!shuttle) return;
    gsap.fromTo(shuttle,
      { x: -60 },
      { x: scene.offsetWidth + 60, duration: 3, ease: 'power2.inOut' }
    );
  }

  
  function activateScene(idx) {
    if (idx < 0 || idx >= totalScenes) return;
    currentSceneIdx = idx;

    scenes.forEach((s, i) => {
      s.classList.toggle('is-active', i === idx);
    });

    
    if (timeDisplay) {
      timeDisplay.textContent = `Scene ${idx + 1} / ${totalScenes}`;
    }

    
    if (progressFill) {
      const startPct = idx / totalScenes * 100;
      const endPct = (idx + 1) / totalScenes * 100;
      if (progressTween) progressTween.kill();
      progressFill.style.width = startPct + '%';
      const hold = scene.classList.contains('loom-opening') ? 7000 : SCENE_DURATION;
      if (isAutoPlaying && !isPaused) {
        progressTween = gsap.to(progressFill, {
          width: endPct + '%',
          duration: hold / 1000,
          ease: 'none',
        });
      } else {
        progressFill.style.width = endPct + '%';
      }
    }

    const scene = scenes[idx];

    
    const tw = scene.querySelector('.loom-typewriter');
    if (tw && !tw.classList.contains('done')) {
      typewrite(tw);
    }

    
    animateShuttle(scene);

    
    const player = scene.querySelector('dotlottie-player');
    if (player && typeof player.play === 'function') {
      try { player.play(); } catch (_) {}
    }

    
    if (scene.classList.contains('loom-opening')) {
      animateOpening(scene);
    }

    
    if (scene.classList.contains('loom-closing')) {
      animateClosing(scene);
    }
  }

  function animateOpening(scene) {
    const tl = gsap.timeline();
    tl.to(scene.querySelector('.loom-opening-eyebrow'),
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.3);
    tl.to(scene.querySelector('.loom-opening-title'),
      { opacity: 1, duration: 1.2, ease: 'power3.out' }, 0.6);
    tl.to(scene.querySelector('.loom-opening-line'),
      { opacity: 1, width: 60, duration: 0.6, ease: 'power3.out' }, 1.2);
    tl.to(scene.querySelector('.loom-opening-subtitle'),
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 1.5);
    const para = scene.querySelector('.loom-opening-paragraph');
    if (para) {
      tl.to(para, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 2.0);
    }
    const stats = scene.querySelectorAll('.loom-open-stat');
    const dividers = scene.querySelectorAll('.loom-open-stat-divider');
    stats.forEach((s, i) => {
      tl.to(s, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 2.4 + i * 0.15);
    });
    dividers.forEach((d, i) => {
      tl.to(d, { opacity: 1, scaleY: 1, duration: 0.3, ease: 'power3.out' }, 2.5 + i * 0.15);
    });
  }

  function animateClosing(scene) {
    const tl = gsap.timeline();
    tl.to(scene.querySelector('.loom-closing-title'),
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.3);
    tl.to(scene.querySelector('.loom-closing-subtitle'),
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.8);
    tl.to(scene.querySelector('.loom-closing-cta'),
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 1.2);
  }

  
  function scrollToScene(idx, smooth = true) {
    if (idx < 0 || idx >= totalScenes) return;
    const target = scenes[idx];
    if (!target) return;

    if (autoScrollTween) {
      autoScrollTween.kill();
    }

    const y = target.offsetTop;
    if (smooth) {
      autoScrollTween = gsap.to(window, {
        scrollTo: { y: y, autoKill: false },
        duration: 1.2,
        ease: 'power3.inOut',
        onComplete: () => {
          activateScene(idx);
        }
      });
    } else {
      window.scrollTo(0, y);
      activateScene(idx);
    }
  }

  function advanceScene() {
    if (isPaused) return;
    const next = currentSceneIdx + 1;
    if (next < totalScenes) {
      scrollToScene(next);
      scheduleNext();
    } else {
      stopAutoPlay();
    }
  }

  function scheduleNext() {
    clearTimeout(sceneTimer);
    if (!isPaused && isAutoPlaying) {
      const scene = scenes[currentSceneIdx];
      const hold = scene && scene.classList.contains('loom-opening') ? 7000 : SCENE_DURATION;
      sceneTimer = setTimeout(advanceScene, hold);
    }
  }

  function startAutoPlay() {
    isAutoPlaying = true;
    isPaused = false;
    if (playBtn) playBtn.innerHTML = LOOM_ICONS.pause;
    if (progressTween && progressTween.paused()) {
      progressTween.resume();
    } else {
      activateScene(currentSceneIdx);
    }
    scrollToScene(currentSceneIdx);
    scheduleNext();
  }

  function stopAutoPlay() {
    isAutoPlaying = false;
    isPaused = true;
    clearTimeout(sceneTimer);
    if (autoScrollTween) autoScrollTween.kill();
    if (progressTween) progressTween.pause();
    if (playBtn) playBtn.innerHTML = LOOM_ICONS.play;
  }

  function togglePlay() {
    if (isAutoPlaying && !isPaused) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  }

  
  if (playBtn) playBtn.addEventListener('click', togglePlay);

  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
      clearTimeout(sceneTimer);
      const next = Math.min(currentSceneIdx + 1, totalScenes - 1);
      scrollToScene(next);
      if (isAutoPlaying && !isPaused) scheduleNext();
    });
  }

  
  if (progressBar) {
    progressBar.addEventListener('click', (e) => {
      const rect = progressBar.getBoundingClientRect();
      const pct = (e.clientX - rect.left) / rect.width;
      const idx = Math.round(pct * (totalScenes - 1));
      clearTimeout(sceneTimer);
      scrollToScene(idx);
      if (isAutoPlaying && !isPaused) scheduleNext();
    });
  }

  
  let scrollDetectTimer;
  function onManualScroll() {
    clearTimeout(scrollDetectTimer);
    scrollDetectTimer = setTimeout(() => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      let closest = 0;
      let minDist = Infinity;
      scenes.forEach((s, i) => {
        const center = s.offsetTop + s.offsetHeight / 2;
        const dist = Math.abs(scrollY + vh / 2 - center);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });

      if (closest !== currentSceneIdx) {
        activateScene(closest);
      }
    }, 100);
  }

  window.addEventListener('scroll', onManualScroll, { passive: true });

  
  let userScrolling = false;
  window.addEventListener('wheel', () => {
    if (isAutoPlaying && !isPaused) {
      stopAutoPlay();
    }
  }, { passive: true });

  window.addEventListener('touchmove', () => {
    if (isAutoPlaying && !isPaused) {
      stopAutoPlay();
    }
  }, { passive: true });

  
  document.addEventListener('keydown', (e) => {
    if (!cinema.getBoundingClientRect) return;
    const rect = cinema.getBoundingClientRect();
    if (rect.top > window.innerHeight || rect.bottom < 0) return;

    if (e.key === ' ' || e.code === 'Space') {
      e.preventDefault();
      togglePlay();
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      clearTimeout(sceneTimer);
      scrollToScene(Math.min(currentSceneIdx + 1, totalScenes - 1));
      if (isAutoPlaying && !isPaused) scheduleNext();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      clearTimeout(sceneTimer);
      scrollToScene(Math.max(currentSceneIdx - 1, 0));
      if (isAutoPlaying && !isPaused) scheduleNext();
    }
  });

  
  if (!gsap.plugins || !gsap.plugins.scrollTo) {
    
    if (typeof ScrollToPlugin === 'undefined') {
      
      const originalScrollToScene = scrollToScene;
      scrollToScene = function(idx, smooth) {
        if (idx < 0 || idx >= totalScenes) return;
        const target = scenes[idx];
        if (!target) return;
        target.scrollIntoView({ behavior: smooth ? 'smooth' : 'instant' });
        setTimeout(() => activateScene(idx), smooth ? 600 : 0);
      };
    }
  }

  
  
  setTimeout(() => {
    activateScene(0);
    scheduleNext();
  }, 800);
}
