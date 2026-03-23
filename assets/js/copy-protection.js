/**
 * Copy Protection — makes it harder (not impossible) to copy page source/content.
 * Disables: right-click, text selection, keyboard shortcuts (Ctrl+U/S/C/A, F12),
 * drag, print, view-source, and console tampering.
 */
(function () {
  'use strict';

  /* ── 1. Disable right-click context menu ──────────────────────── */
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    return false;
  });

  /* ── 2. Disable text selection via mouse ──────────────────────── */
  document.addEventListener('selectstart', function (e) {
    e.preventDefault();
    return false;
  });

  /* ── 3. Disable drag ──────────────────────────────────────────── */
  document.addEventListener('dragstart', function (e) {
    e.preventDefault();
    return false;
  });

  /* ── 4. Block dangerous keyboard shortcuts ────────────────────── */
  document.addEventListener('keydown', function (e) {
    // F12 — DevTools
    if (e.key === 'F12') { e.preventDefault(); return false; }

    // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C — DevTools panels
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' ||
        e.key === 'J' || e.key === 'j' ||
        e.key === 'C' || e.key === 'c')) {
      e.preventDefault(); return false;
    }

    // Ctrl+U — View source
    if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) {
      e.preventDefault(); return false;
    }

    // Ctrl+S — Save page
    if (e.ctrlKey && (e.key === 'S' || e.key === 's')) {
      e.preventDefault(); return false;
    }

    // Ctrl+A — Select all
    if (e.ctrlKey && (e.key === 'A' || e.key === 'a')) {
      e.preventDefault(); return false;
    }

    // Ctrl+C — Copy
    if (e.ctrlKey && (e.key === 'C' || e.key === 'c') && !e.shiftKey) {
      e.preventDefault(); return false;
    }

    // Ctrl+P — Print
    if (e.ctrlKey && (e.key === 'P' || e.key === 'p')) {
      e.preventDefault(); return false;
    }

    // Ctrl+Shift+U — View source (some browsers)
    if (e.ctrlKey && e.shiftKey && (e.key === 'U' || e.key === 'u')) {
      e.preventDefault(); return false;
    }
  });

  /* ── 5. Disable copy / cut / paste events ─────────────────────── */
  ['copy', 'cut', 'paste'].forEach(function (evt) {
    document.addEventListener(evt, function (e) {
      e.preventDefault();
      return false;
    });
  });

  /* ── 6. Disable print via Ctrl+P and window.print ─────────────── */
  window.addEventListener('beforeprint', function (e) {
    document.body.style.display = 'none';
  });
  window.addEventListener('afterprint', function () {
    document.body.style.display = '';
  });

  /* ── 7. DevTools detection via debugger + timing ──────────────── */
  (function detectDevTools() {
    var threshold = 160;
    var check = function () {
      var w = window.outerWidth - window.innerWidth > threshold;
      var h = window.outerHeight - window.innerHeight > threshold;
      if (w || h) {
        document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;color:#334155;"><h2>Developer tools are not allowed on this site.</h2></div>';
      }
    };
    setInterval(check, 1500);
  })();

  /* ── 8. Disable "Save As" for images ──────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    var imgs = document.querySelectorAll('img');
    imgs.forEach(function (img) {
      img.setAttribute('draggable', 'false');
      img.addEventListener('contextmenu', function (e) { e.preventDefault(); });
    });

    // Observe for dynamically added images
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        m.addedNodes.forEach(function (node) {
          if (node.nodeType === 1) {
            var newImgs = node.tagName === 'IMG' ? [node] : node.querySelectorAll ? node.querySelectorAll('img') : [];
            newImgs.forEach ? newImgs.forEach(function (i) {
              i.setAttribute('draggable', 'false');
              i.addEventListener('contextmenu', function (e) { e.preventDefault(); });
            }) : void 0;
          }
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  });

  /* ── 9. Override console methods to hinder console-based copying ─ */
  (function () {
    var noop = function () {};
    try {
      Object.defineProperty(window, 'console', {
        get: function () {
          return {
            log: noop, warn: noop, error: noop, info: noop, debug: noop,
            dir: noop, table: noop, trace: noop, assert: noop,
            clear: noop, count: noop, group: noop, groupEnd: noop,
            time: noop, timeEnd: noop
          };
        },
        set: noop,
        configurable: false
      });
    } catch (_) {
      // In case defineProperty fails, silently proceed
    }
  })();

  /* ── 10. Prevent iframe embedding ─────────────────────────────── */
  if (window.top !== window.self) {
    window.top.location = window.self.location;
  }

  /* ── 11. Disable view-source protocol ─────────────────────────── */
  if (window.location.protocol === 'view-source:') {
    window.location.href = 'about:blank';
  }
})();
