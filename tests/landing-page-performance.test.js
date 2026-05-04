const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

test('home page avoids unnecessary runtime libraries and page-specific scripts', () => {
  const indexHtml = read('index.html');

  assert.ok(!indexHtml.includes('copy-protection.js'), 'home page should not load copy protection');
  assert.ok(!indexHtml.includes('lenis.min.js'), 'home page should not load Lenis');
  assert.ok(!indexHtml.includes('aos.css'), 'home page should not load AOS CSS');
  assert.ok(!indexHtml.includes('aos.js'), 'home page should not load AOS JS');
  assert.ok(!indexHtml.includes('gsap.min.js'), 'home page should not eagerly load GSAP');
  assert.ok(!indexHtml.includes('ScrollTrigger.min.js'), 'home page should not eagerly load ScrollTrigger');
  assert.ok(!indexHtml.includes('dotlottie-player'), 'home page should not load DotLottie runtime');
  assert.ok(!indexHtml.includes('product-grid.js'), 'home page should not load product grid script');
  assert.ok(!indexHtml.includes('page-banner.js'), 'home page should not load page banner script');
  assert.ok(!indexHtml.includes('content-block.js'), 'home page should not load content block script');
  assert.ok(!indexHtml.includes('cta-strip.js'), 'home page should not load CTA strip script');
  assert.ok(!indexHtml.includes('team-card.js'), 'home page should not load team card script');
  assert.ok(!indexHtml.includes('contact-form.js'), 'home page should not load contact form script');
});

test('copy protection is removed from source and landing page logic no longer contains the temporary video switcher', () => {
  const htmlFiles = [
    'index.html',
    'about.html',
    'contact.html',
    'nc.html',
    'sustainability.html',
    'textile.html',
  ];

  for (const file of htmlFiles) {
    assert.ok(!read(file).includes('copy-protection.js'), `${file} should not load copy protection`);
  }

  assert.ok(
    !fs.existsSync(path.join(root, 'assets/js/copy-protection.js')),
    'copy protection source should be deleted'
  );

  const mainJs = read('assets/js/main.js');
  assert.ok(!mainJs.includes('initVideoSwitcher'), 'temporary video switcher should be removed');
  const styleCss = read('assets/css/style.css');
  assert.ok(!styleCss.includes('.video-switcher'), 'temporary video switcher CSS should be removed');
  assert.ok(!styleCss.includes('user-select: none'), 'global text selection should not be disabled');
  assert.ok(!styleCss.includes('pointer-events: none;\n}'), 'global image interaction should not be disabled');
  assert.ok(!styleCss.includes('@media print'), 'printing should not be globally blocked');
});

test('home page prerenders the hero and hydrates remaining content from inline JSON', () => {
  const indexHtml = read('index.html');

  assert.ok(indexHtml.includes('data-static-page="home"'), 'home page should mark prerendered home content');
  assert.ok(indexHtml.includes('class="hero-b"'), 'home page should prerender the hero markup');
  assert.ok(indexHtml.includes('id="site-content-data"'), 'home page should inline the initial content payload');
  assert.ok(indexHtml.includes('data-home-premium-root'), 'home page should keep a dedicated mount for deferred sections');
});
