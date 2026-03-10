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
          <div data-aos="fade-up">
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
          </div>

          <div data-aos="fade-up" data-aos-delay="100">
            <h4 class="footer-heading">Quick Links</h4>
            ${quickLinks}
          </div>

          <div data-aos="fade-up" data-aos-delay="200">
            <h4 class="footer-heading">Contact</h4>
            <p class="footer-text mb-2">${footer.contactInfo.address}</p>
            <a href="mailto:${footer.contactInfo.email}" class="footer-link">${footer.contactInfo.email}</a>
            <a href="tel:${footer.contactInfo.phone.replace(/\s/g, '')}" class="footer-link">${footer.contactInfo.phone}</a>
          </div>

          ${socialIcons ? `
          <div data-aos="fade-up" data-aos-delay="300">
            <h4 class="footer-heading">Follow Us</h4>
            <div class="footer-social">
              ${socialIcons}
            </div>
          </div>
          ` : ''}
        </div>

        <div class="footer-bottom">
          <p class="footer-copyright">${footer.copyright}</p>
        </div>
      </div>
    </footer>
  `;
}
