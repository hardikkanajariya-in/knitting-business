function renderHeader(data) {
  const nav = data.navigation;
  const site = data.site;
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const pageLogos = site.pageLogos || {};
  const pageLogosDark = site.pageLogosDark || {};
  const headerLogo = pageLogos[currentPage] || site.logo;
  const headerLogoDark = pageLogosDark[currentPage] || site.logoDark || headerLogo;
  const hasDarkVariant = headerLogoDark !== headerLogo;

  const navLinks = nav.map(item => {
    const isActive = currentPage === item.href || (currentPage === '' && item.href === 'index.html');
    const logoHtml = item.navLogo ? `<span class="nav-link-logo">${item.navLogoDark ? `<img src="${item.navLogo}" alt="" class="nav-logo-img logo-dark"><img src="${item.navLogoDark}" alt="" class="nav-logo-img logo-light">` : `<img src="${item.navLogo}" alt="" class="nav-logo-img">`}</span>` : '';
    return `<a href="${item.href}" class="nav-link${isActive ? ' active' : ''}${item.navLogo ? ' has-nav-logo' : ''}" ${item.title ? `title="${item.title}"` : ''}>${logoHtml}<span class="nav-link-label">${item.label}</span></a>`;
  }).join('');

  const mobileLinks = nav.map(item => {
    const isActive = currentPage === item.href || (currentPage === '' && item.href === 'index.html');
    return `<a href="${item.href}" class="mobile-link${isActive ? ' active' : ''}">${item.label}</a>`;
  }).join('');

  const logoMarkup = hasDarkVariant ? `
            <img
              src="${headerLogo}"
              alt="${site.name}"
              class="header-logo-image logo-dark"
              width="720"
              height="180"
              loading="eager"
            >
            <img
              src="${headerLogoDark}"
              alt="${site.name}"
              class="header-logo-image logo-light"
              width="720"
              height="180"
              loading="eager"
            >
  ` : `
            <img
              src="${headerLogo}"
              alt="${site.name}"
              class="header-logo-image"
              width="720"
              height="180"
              loading="eager"
              onerror="this.style.display='none'; this.nextElementSibling.style.display='inline-flex'"
            >
  `;

  return `
    <header class="site-header" role="banner">
      <div class="container header-inner">
        <a href="index.html" class="header-logo" aria-label="${site.name} — Home">
          <span class="header-logo-mark">
            ${logoMarkup}
            <span class="header-logo-fallback" style="display:none;">${site.name}</span>
          </span>
          <span class="header-logo-company-name">Nirbhay Knitting Pvt. Ltd.</span>
        </a>

        <nav class="nav-desktop" role="navigation" aria-label="Main navigation">
          ${navLinks}
        </nav>

        <div class="header-actions">
          <button class="theme-toggle" onclick="toggleTheme()" aria-label="Toggle light/dark theme">
            <svg class="theme-icon-moon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
            </svg>
            <svg class="theme-icon-sun" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="display:none;">
              <circle cx="12" cy="12" r="5"/>
              <path stroke-linecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
          </button>

          <button class="hamburger" aria-label="Toggle mobile menu" aria-expanded="false">
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
          </button>
        </div>
      </div>

      <nav class="nav-mobile" role="navigation" aria-label="Mobile navigation">
        ${mobileLinks}
      </nav>
    </header>
  `;
}
