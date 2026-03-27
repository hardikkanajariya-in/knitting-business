function renderFooter(data) {
  const footer = data.footer;
  const site = data.site;
  const socialLinks = site.socialLinks || [];

  const quickLinks = footer.quickLinks.map(link =>
    `<a href="${link.href}" class="footer-link">
      <svg class="footer-link-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      <span>${link.label}</span>
    </a>`
  ).join('');

  const socialIcons = socialLinks.map(social =>
    `<a href="${social.url}" class="footer-social-icon" aria-label="${social.name}" target="_blank" rel="noopener noreferrer">
      ${getSocialIcon(social.icon)}
    </a>`
  ).join('');

  return `
    <footer class="site-footer" role="contentinfo">
      
      <div class="footer-bg" aria-hidden="true">
        <div class="footer-glow footer-glow--1"></div>
        <div class="footer-glow footer-glow--2"></div>
        <svg class="footer-thread-decor" viewBox="0 0 1200 40" preserveAspectRatio="none">
          <path d="M0 20 Q150 0 300 20 Q450 40 600 20 Q750 0 900 20 Q1050 40 1200 20" fill="none" stroke="rgba(77,163,255,0.15)" stroke-width="1.5" stroke-dasharray="8 6"/>
          <path d="M0 28 Q200 8 400 28 Q600 48 800 28 Q1000 8 1200 28" fill="none" stroke="rgba(75,175,79,0.10)" stroke-width="1" stroke-dasharray="6 8"/>
        </svg>
      </div>

      
      <div class="footer-edge" aria-hidden="true"></div>

      <div class="container footer-container">
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
            <p class="footer-tagline">${footer.tagline}</p>
            <div class="footer-social">
              <a href="mailto:${footer.contactInfo.email}" class="footer-social-icon" aria-label="Email">
                <svg class="w-4 h-4" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </a>
              <a href="tel:${footer.contactInfo.phone.replace(/\s/g, '')}" class="footer-social-icon" aria-label="Phone">
                <svg class="w-4 h-4" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </a>
              ${socialLinks.map(social =>
                `<a href="${social.url}" class="footer-social-icon" aria-label="${social.name}" target="_blank" rel="noopener noreferrer">
                  ${getSocialIcon(social.icon)}
                </a>`
              ).join('')}
            </div>
          </div>

          
          <div class="footer-col footer-col--links">
            <h4 class="footer-heading">
              <span class="footer-heading-accent"></span>
              Quick Links
            </h4>
            <div class="footer-links-list">
              ${quickLinks}
            </div>
          </div>

          
          <div class="footer-col footer-col--contact">
            <h4 class="footer-heading">
              <span class="footer-heading-accent"></span>
              Contact
            </h4>
            <div class="footer-contact-card">
              <div class="footer-contact-item">
                <svg class="footer-contact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <p class="footer-contact-text">${footer.contactInfo.address}</p>
              </div>
              <a href="mailto:${footer.contactInfo.email}" class="footer-contact-item footer-contact-item--link">
                <svg class="footer-contact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <span class="footer-contact-text">${footer.contactInfo.email}</span>
              </a>
              <a href="tel:${footer.contactInfo.phone.replace(/\s/g, '')}" class="footer-contact-item footer-contact-item--link">
                <svg class="footer-contact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span class="footer-contact-text">${footer.contactInfo.phone}</span>
              </a>
            </div>
          </div>

          
          <div class="footer-col footer-col--partner">
            <h4 class="footer-heading">
              <span class="footer-heading-accent"></span>
              Partner With Us
            </h4>
            <p class="footer-partner-text">Let's discuss your next technical textile requirement.</p>
            ${window.location.pathname.endsWith('contact.html') ? '' : '<a href="contact.html" class="footer-partner-btn"><span>Start a Discussion</span><span class="footer-partner-btn-arrow"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span></a>'}
          </div>
        </div>

        
        <div class="footer-divider" aria-hidden="true"></div>
        <div class="footer-bottom">
          <p class="footer-copyright">${footer.copyright.replace(/\d{4}/, new Date().getFullYear())}</p>
          <p class="footer-credit">Designed By <a href="http://niftysolutions.co.in/" target="_blank" rel="noopener noreferrer">Nifty Solutions</a></p>
        </div>
      </div>
    </footer>
  `;
}
