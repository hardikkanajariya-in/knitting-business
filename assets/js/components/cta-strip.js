/* CTA Strip Component */
function renderCTAStrip(data) {
  const socialLinks = data.site.socialLinks || [];
  const socialIcons = socialLinks.map(social =>
    `<a href="${social.url}" class="cta-strip-icon" aria-label="${social.name}" target="_blank" rel="noopener noreferrer">
      ${getSocialIcon(social.icon)}
    </a>`
  ).join('');

  return `
    <section class="cta-strip" data-aos="fade-up">
      <div class="container">
        <h2 class="cta-strip-title">Start a Material Discussion</h2>
        <div class="mt-6">
          <a href="contact.html" class="btn-primary btn-primary-light">
            Contact Our Team
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </div>
        ${socialIcons ? `
        <div class="cta-strip-icons mt-6">
          ${socialIcons}
        </div>
        ` : ''}
      </div>
    </section>
  `;
}
