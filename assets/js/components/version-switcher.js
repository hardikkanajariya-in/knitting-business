/* ============================================
   VERSION-SWITCHER.JS
   Floating dropdown to switch between about
   page design versions (inline toggle).
   ============================================ */

function renderVersionSwitcher() {
  const versions = [
    { id: 'sui-dhaga', label: 'Sui Dhaga', subtitle: 'Needle & Thread' },
    { id: 'the-loom', label: 'The Loom', subtitle: 'Auto-Scroll Cinema' },
  ];

  const activeId = _getActiveVersionId();

  const items = versions.map(v => {
    const isCurrent = v.id === activeId;
    return `
      <button type="button"
         class="vs-item${isCurrent ? ' vs-item-active' : ''}"
         data-version="${v.id}"
         ${isCurrent ? 'aria-current="true"' : ''}>
        <span class="vs-item-label">${v.label}</span>
        <span class="vs-item-sub">${v.subtitle}</span>
        ${isCurrent ? '<span class="vs-item-badge">Current</span>' : ''}
      </button>`;
  }).join('');

  return `
    <div class="version-switcher" id="version-switcher">
      <button class="vs-trigger" id="vs-trigger" aria-expanded="false" aria-haspopup="true" title="Switch design version">
        <svg class="vs-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="3" y="3" width="7" height="7" rx="1.5"/>
          <rect x="14" y="3" width="7" height="7" rx="1.5"/>
          <rect x="3" y="14" width="7" height="7" rx="1.5"/>
          <rect x="14" y="14" width="7" height="7" rx="1.5"/>
        </svg>
        <span class="vs-trigger-label">Versions</span>
      </button>
      <div class="vs-dropdown" id="vs-dropdown">
        <div class="vs-dropdown-header">Design Versions</div>
        ${items}
      </div>
    </div>`;
}

function _getActiveVersionId() {
  const el = document.querySelector('.nk-version-active');
  if (el) return el.id.replace('version-', '');
  return 'sui-dhaga';
}

function switchVersion(targetId) {
  const allVersions = document.querySelectorAll('.nk-version');
  allVersions.forEach(v => {
    v.style.display = 'none';
    v.classList.remove('nk-version-active');
  });

  const target = document.getElementById('version-' + targetId);
  if (target) {
    target.style.display = '';
    target.classList.add('nk-version-active');
  }

  /* Refresh ScrollTrigger for new content */
  if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();

  /* Re-init V5 engine when switching to The Loom */
  if (targetId === 'the-loom' && typeof initAboutJourneyV5Animations === 'function') {
    initAboutJourneyV5Animations();
  }
  /* Re-init V4 when switching back to Sui Dhaga */
  if (targetId === 'sui-dhaga' && typeof initAboutJourneyV4Animations === 'function') {
    initAboutJourneyV4Animations();
  }

  /* Re-init AOS for newly visible elements */
  if (typeof AOS !== 'undefined') AOS.refresh();

  /* Update switcher UI */
  _refreshSwitcherUI(targetId);

  /* Scroll to top */
  window.scrollTo({ top: 0, behavior: 'instant' });

  /* Toggle loom-cinema class on body for V5 styling */
  document.body.classList.toggle('loom-cinema', targetId === 'the-loom');
}

function _refreshSwitcherUI(activeId) {
  const items = document.querySelectorAll('#vs-dropdown .vs-item');
  items.forEach(item => {
    const id = item.dataset.version;
    const isCurrent = id === activeId;
    item.classList.toggle('vs-item-active', isCurrent);
    item.setAttribute('aria-current', isCurrent ? 'true' : 'false');
    const badge = item.querySelector('.vs-item-badge');
    if (isCurrent && !badge) {
      item.insertAdjacentHTML('beforeend', '<span class="vs-item-badge">Current</span>');
    } else if (!isCurrent && badge) {
      badge.remove();
    }
  });
}

function initVersionSwitcher() {
  const trigger = document.getElementById('vs-trigger');
  const dropdown = document.getElementById('vs-dropdown');
  const switcher = document.getElementById('version-switcher');
  if (!trigger || !dropdown) return;

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = switcher.classList.toggle('vs-open');
    trigger.setAttribute('aria-expanded', isOpen);
  });

  /* Handle version item clicks */
  dropdown.addEventListener('click', (e) => {
    const item = e.target.closest('.vs-item');
    if (!item) return;
    e.stopPropagation();
    const versionId = item.dataset.version;
    if (versionId && versionId !== _getActiveVersionId()) {
      switchVersion(versionId);
    }
    switcher.classList.remove('vs-open');
    trigger.setAttribute('aria-expanded', 'false');
  });

  document.addEventListener('click', (e) => {
    if (!switcher.contains(e.target)) {
      switcher.classList.remove('vs-open');
      trigger.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && switcher.classList.contains('vs-open')) {
      switcher.classList.remove('vs-open');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.focus();
    }
  });
}
