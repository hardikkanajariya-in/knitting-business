/* Footer Component */
function renderFooter(data) {
  const footer = data.footer;
  const site = data.site;
  const socialLinks = site.socialLinks || [];

  const quickLinks = footer.quickLinks.map(link =>
    `<a href="${link.href}" class="footer-link">${link.label}</a>`
  ).join('');

  const socialIcons = socialLinks.map(social =>
    `<a href="${social.url}" class="footer-social-icon" aria-label="${social.name}" target="_blank" rel="noopener noreferrer">
      ${getSocialIcon(social.icon)}
    </a>`
  ).join('');

  return `
    <footer class="site-footer" role="contentinfo">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-col footer-col--brand">
            <a href="index.html" class="footer-brand" aria-label="${site.name} — Home">
              <span class="footer-brand-logo">
                <img
                  src="${site.logo}"
                  alt="${site.name}"
                  class="footer-brand-image"
                  width="720"
                  height="180"
                  loading="lazy"
                  onerror="this.style.display='none'; this.nextElementSibling.style.display='inline-flex'"
                >
                <span class="footer-brand-fallback" style="display:none;">${site.name}</span>
              </span>
            </a>
            <p class="footer-text">${footer.tagline}</p>
            ${socialIcons ? `
            <div class="footer-social">
              ${socialIcons}
            </div>
            ` : ''}
          </div>

          <div class="footer-col footer-col--links">
            <h4 class="footer-heading">Quick Links</h4>
            <div class="footer-links-list">
              ${quickLinks}
            </div>
          </div>

          <div class="footer-col footer-col--contact">
            <h4 class="footer-heading">Contact</h4>
            <p class="footer-text">${footer.contactInfo.address}</p>
            <div class="footer-contact-links">
              <a href="mailto:${footer.contactInfo.email}" class="footer-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                ${footer.contactInfo.email}
              </a>
              <a href="tel:${footer.contactInfo.phone.replace(/\s/g, '')}" class="footer-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                ${footer.contactInfo.phone}
              </a>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p class="footer-copyright">${footer.copyright}</p>
        </div>
      </div>
    </footer>
  `;
}
