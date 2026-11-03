/**
 * RegineLand Group — Shared Components v1.0
 * Provides single-source, unified Header and Footer across all HTML pages.
 * Supports English and Italian (it/), automatic active page detection,
 * relative URL routing, transparent/solid header modes, and responsive menus.
 */
(function() {
  'use strict';

  // 1. Language & Environment Detection
  var isItalian = document.documentElement.lang === 'it' ||
                  window.location.pathname.indexOf('/it/') !== -1 ||
                  window.location.pathname.indexOf('\\it\\') !== -1;
  var lang = isItalian ? 'it' : 'en';

  // 2. Page Detection
  var bodyPage = document.body ? document.body.getAttribute('data-page') : null;
  var pathname = window.location.pathname.toLowerCase().replace(/\\/g, '/');
  var filename = pathname.substring(pathname.lastIndexOf('/') + 1) || 'index.html';
  
  var page = bodyPage;
  if (!page) {
    if (filename === '' || filename === 'index.html') page = 'home';
    else if (filename.indexOf('about') !== -1) page = 'about';
    else if (filename.indexOf('sectors') !== -1) page = 'sectors';
    else if (filename.indexOf('brands') !== -1) page = 'brands';
    else if (filename.indexOf('network') !== -1) page = 'network';
    else if (filename.indexOf('resources') !== -1) page = 'resources';
    else if (filename.indexOf('contact') !== -1) page = 'contact';
    else page = 'home';
  }

  // 3. Flags SVG Definitions
  var FLAGS = {
    it: '<svg class="flag-icon" viewBox="0 0 640 480" width="16" height="12" aria-hidden="true"><rect width="213.3" height="480" fill="#009246"/><rect x="213.3" width="213.3" height="480" fill="#fff"/><rect x="426.7" width="213.3" height="480" fill="#ce2b37"/></svg>',
    uk: '<svg class="flag-icon" viewBox="0 0 640 480" width="16" height="12" aria-hidden="true"><path fill="#012169" d="M0 0h640v480H0z"/><path fill="#fff" d="m75 0 245 180L565 0h75v60L435 240l205 180v60h-75L320 300 75 480H0v-60l205-180L0 60V0h75z"/><path fill="#c8102e" d="m424 288 216 156v36h-48L376 324l48-36zM640 0v12L420 180l48 36L640 48V0zM0 480v-12l220-168-48-36L0 432v48zm0-480 264 192-48 36L0 72V0z"/><path fill="#fff" d="M260 0h120v480H260zM0 180h640v120H0z"/><path fill="#c8102e" d="M284 0h72v480h-72zM0 204h640v72H0z"/></svg>',
    india: '<svg class="flag-icon" viewBox="0 0 640 480" width="16" height="12" aria-hidden="true"><rect width="640" height="160" fill="#f93"/><rect y="160" width="640" height="160" fill="#fff"/><rect y="320" width="640" height="160" fill="#128807"/><circle cx="320" cy="240" r="48" fill="none" stroke="#008" stroke-width="8"/><circle cx="320" cy="240" r="12" fill="#008"/></svg>',
    uae: '<svg class="flag-icon" viewBox="0 0 640 480" width="16" height="12" aria-hidden="true"><rect width="640" height="160" fill="#00732f"/><rect y="160" width="640" height="160" fill="#fff"/><rect y="320" width="640" height="160" fill="#000"/><rect width="180" height="480" fill="#f00"/></svg>'
  };

  // 4. Content Dictionaries (Single Source of Truth)
  var CONTENT = {
    en: {
      tagline: 'Global Trade & Logistics',
      langBannerLabel: 'Also available in:',
      altLangName: 'Italiano',
      altLangCode: 'it',
      currentLangName: 'English',
      ariaNav: 'Main navigation',
      ariaLang: 'Language selection',
      menu: [
        { id: 'nav-home', label: 'Home', href: 'index.html', page: 'home' },
        {
          id: 'nav-about', label: 'About ▾', href: 'about.html', page: 'about',
          dropdown: [
            { id: 'nav-history', label: 'Our History & Vision', href: 'about.html#history' },
            { id: 'nav-network-link', label: 'Global Network', href: 'about.html#network' },
            { id: 'nav-group', label: 'Group & Partnerships', href: 'about.html#group' },
            { divider: true },
            { id: 'nav-team', label: 'Leadership Team', href: 'about.html#team' }
          ]
        },
        {
          id: 'nav-sectors', label: 'Sectors ▾', href: 'sectors.html', page: 'sectors',
          dropdown: [
            { id: 'nav-healthcare', label: '🏥 Healthcare & Medical', href: 'sectors.html#healthcare' },
            { id: 'nav-agrifood', label: '🌾 Agri-Food & Beverages', href: 'sectors.html#agrifood' },
            { id: 'nav-cargo', label: '📦 General Cargo & Industrial', href: 'sectors.html#cargo' },
            { id: 'nav-logistics-link', label: '🚢 Integrated Logistics', href: 'sectors.html#logistics' },
            { id: 'nav-industries', label: '🌐 Our Industries Worldwide', href: 'sectors.html#industries' }
          ]
        },
        { id: 'nav-brands', label: 'Brands', href: 'brands.html', page: 'brands' },
        { id: 'nav-network', label: 'Global Network', href: 'network.html', page: 'network' },
        { id: 'nav-resources', label: 'Resources', href: 'resources.html', page: 'resources' },
        { id: 'nav-contact', label: 'Contact', href: 'contact.html', page: 'contact' }
      ],
      ctaText: 'Request a Quote',
      ctaHref: 'contact.html#quote',
      // Footer
      footerDesc: 'Your trusted bridge for global trade — connecting Indian manufacturers and producers with European and worldwide markets through certified excellence.',
      colCompany: 'Company',
      companyLinks: [
        { label: 'About RegineLand', href: 'about.html', id: 'footer-about' },
        { label: 'History & Vision', href: 'about.html#history', id: 'footer-history' },
        { label: 'Global Network', href: 'network.html', id: 'footer-network' },
        { label: 'Group & Partnerships', href: 'about.html#group', id: 'footer-group' },
        { label: 'Our Brands & Industries', href: 'brands.html', id: 'footer-brands' },
        { label: 'Resources & Insights', href: 'resources.html', id: 'footer-resources' }
      ],
      colSectors: 'Sectors',
      sectorLinks: [
        { label: 'Healthcare & Medical', href: 'sectors.html#healthcare', id: 'footer-healthcare' },
        { label: 'Agri-Food & Beverages', href: 'sectors.html#agrifood', id: 'footer-agrifood' },
        { label: 'General Cargo', href: 'sectors.html#cargo', id: 'footer-cargo' },
        { label: 'Integrated Logistics', href: 'sectors.html#logistics', id: 'footer-logistics' },
        { label: 'Our Industries Worldwide', href: 'sectors.html#industries', id: 'footer-industries' }
      ],
      colOffices: 'Offices',
      officeLinks: [
        { label: 'India (HQ)', href: 'network.html#india', id: 'footer-india', flag: 'india' },
        { label: 'United Kingdom', href: 'network.html#uk', id: 'footer-uk', flag: 'uk' },
        { label: 'Italy', href: 'network.html#italy', id: 'footer-italy', flag: 'it' },
        { label: 'UAE', href: 'network.html#uae', id: 'footer-uae', flag: 'uae' },
        { label: 'All Offices &rarr;', href: 'network.html', id: 'footer-all-offices' }
      ],
      colContactTitle: 'Global HQ — India',
      contactAddr: 'Poovakulam, Kottayam Dist., Kerala, India',
      contactPhone: '+91 12 3456 7890',
      contactEmail: 'info@regineland.com',
      langSwitchLabel: 'Versione Italiana &rarr;',
      legalCopy: 'RegineLand Group. All rights reserved. Registered in India &amp; UK.',
      privacyLabel: 'Privacy Policy',
      privacyHref: 'resources.html#compliance',
      termsLabel: 'Terms of Service',
      termsHref: 'resources.html#terms',
      complianceLabel: 'Compliance',
      complianceHref: 'contact.html'
    },
    it: {
      tagline: 'Commercio & Logistica Globale',
      langBannerLabel: 'Disponibile anche in:',
      altLangName: 'English',
      altLangCode: 'en',
      currentLangName: 'Italiano',
      ariaNav: 'Navigazione principale',
      ariaLang: 'Selezione lingua',
      menu: [
        { id: 'nav-home', label: 'Home', href: 'index.html', page: 'home' },
        {
          id: 'nav-about', label: 'Chi Siamo ▾', href: 'about.html', page: 'about',
          dropdown: [
            { id: 'nav-history', label: 'Storia & Visione', href: 'about.html#history' },
            { id: 'nav-network-link', label: 'Rete Globale', href: 'about.html#network' },
            { id: 'nav-group', label: 'Gruppo & Partner', href: 'about.html#group' }
          ]
        },
        {
          id: 'nav-sectors', label: 'Settori ▾', href: 'sectors.html', page: 'sectors',
          dropdown: [
            { id: 'nav-healthcare', label: '🏥 Sanitario & Dispositivi Medici', href: 'sectors.html#healthcare' },
            { id: 'nav-agrifood', label: '🌾 Agroalimentare & Bevande', href: 'sectors.html#agrifood' },
            { id: 'nav-cargo', label: '📦 Merci Generali & Industriali', href: 'sectors.html#cargo' },
            { id: 'nav-logistics', label: '🚢 Logistica Integrata', href: 'sectors.html#logistics' },
            { id: 'nav-industries', label: '🌐 Le Nostre Industrie nel Mondo', href: 'sectors.html#industries' }
          ]
        },
        { id: 'nav-brands', label: 'Brand', href: '../brands.html', page: 'brands' },
        { id: 'nav-network', label: 'Rete Globale', href: 'network.html', page: 'network' },
        { id: 'nav-resources', label: 'Risorse', href: 'resources.html', page: 'resources' },
        { id: 'nav-contact', label: 'Contatti', href: 'contact.html', page: 'contact' }
      ],
      ctaText: 'Richiedi un Preventivo',
      ctaHref: 'contact.html#preventivo',
      // Footer
      footerDesc: 'Il vostro partner di fiducia per il commercio internazionale tra India, Europa e il mondo attraverso l\'eccellenza certificata.',
      colCompany: 'Azienda',
      companyLinks: [
        { label: 'Chi Siamo', href: 'about.html', id: 'footer-about' },
        { label: 'Storia & Visione', href: 'about.html#history', id: 'footer-history' },
        { label: 'Rete Globale', href: 'network.html', id: 'footer-network' },
        { label: 'Gruppo & Partner', href: 'about.html#group', id: 'footer-group' },
        { label: 'Le Nostre Industrie', href: 'sectors.html#industries', id: 'footer-brands' },
        { label: 'Risorse & Notizie', href: 'resources.html', id: 'footer-resources' }
      ],
      colSectors: 'Settori',
      sectorLinks: [
        { label: 'Sanitario & Medico', href: 'sectors.html#healthcare', id: 'footer-healthcare' },
        { label: 'Agroalimentare & Beverage', href: 'sectors.html#agrifood', id: 'footer-agrifood' },
        { label: 'Merci Generali', href: 'sectors.html#cargo', id: 'footer-cargo' },
        { label: 'Logistica Integrata', href: 'sectors.html#logistics', id: 'footer-logistics' },
        { label: 'Nostre Industrie nel Mondo', href: 'sectors.html#industries', id: 'footer-industries' }
      ],
      colOffices: 'Uffici',
      officeLinks: [
        { label: 'India (HQ)', href: 'network.html#india', id: 'footer-india', flag: 'india' },
        { label: 'Regno Unito', href: 'network.html#uk', id: 'footer-uk', flag: 'uk' },
        { label: 'Italia', href: 'network.html#italy', id: 'footer-italy', flag: 'it' },
        { label: 'Emirati Arabi', href: 'network.html#uae', id: 'footer-uae', flag: 'uae' },
        { label: 'Tutti gli Uffici &rarr;', href: 'network.html', id: 'footer-all-offices' }
      ],
      colContactTitle: 'Sede Italia',
      contactAddr: 'Via Dante 14, Milano 20121, Italia',
      contactPhone: '+39 02 1234 5678',
      contactEmail: 'italy@regineland.com',
      langSwitchLabel: 'English Version &rarr;',
      legalCopy: 'RegineLand Group. Tutti i diritti riservati.',
      privacyLabel: 'Informativa Privacy',
      privacyHref: 'resources.html#compliance',
      termsLabel: 'Termini di Servizio',
      termsHref: 'resources.html#terms',
      complianceLabel: 'Conformità',
      complianceHref: 'contact.html'
    }
  };

  // Determine alternate language target URL
  function getAlternateLangUrl() {
    var pageMap = {
      home: 'index.html',
      about: 'about.html',
      sectors: 'sectors.html',
      brands: isItalian ? 'brands.html' : 'sectors.html#industries',
      network: 'network.html',
      resources: 'resources.html',
      contact: 'contact.html'
    };
    var targetFile = pageMap[page] || 'index.html';
    if (isItalian) {
      return '../' + targetFile;
    } else {
      return 'it/' + targetFile;
    }
  }

  // Generate Header HTML
  function renderHeader(data) {
    var altUrl = getAlternateLangUrl();
    var isHome = (page === 'home');
    
    var langBanner = [
      '<div class="lang-banner" id="lang-banner" role="navigation" aria-label="' + data.ariaLang + '">',
        '<div class="lang-banner-inner">',
          '<span class="lang-banner-label">' + data.langBannerLabel + '</span>',
          '<div class="lang-banner-links">'
    ];

    if (isItalian) {
      langBanner.push(
        '<a href="#" id="lang-it" class="lang-link active" aria-current="page">' + FLAGS.it + 'Italiano</a>',
        '<span class="lang-divider" aria-hidden="true">|</span>',
        '<a href="' + altUrl + '" id="lang-en" hreflang="en" class="lang-link">' + FLAGS.uk + 'English</a>'
      );
    } else {
      langBanner.push(
        '<a href="' + altUrl + '" id="lang-it" hreflang="it" class="lang-link">' + FLAGS.it + 'Italiano</a>',
        '<span class="lang-divider" aria-hidden="true">|</span>',
        '<a href="#" id="lang-en" class="lang-link active" aria-current="page">' + FLAGS.uk + 'English</a>'
      );
    }

    langBanner.push(
          '</div>',
        '</div>',
      '</div>'
    );

    // Navbar
    var nav = [
      '<nav class="navbar" id="navbar" aria-label="' + data.ariaNav + '">',
        '<a href="index.html" class="nav-logo" id="nav-logo" aria-label="RegineLand Group — Home">',
          '<span class="logo-main">RegineLand</span>',
          '<span class="logo-tagline">' + data.tagline + '</span>',
        '</a>',
        '<ul class="nav-menu" id="nav-menu" role="list">'
    ];

    data.menu.forEach(function(item) {
      var isActive = (item.page === page);
      var activeClass = isActive ? ' active' : '';

      if (item.dropdown) {
        nav.push(
          '<li class="nav-item">',
            '<a href="' + item.href + '" class="nav-link' + activeClass + '" id="' + item.id + '">' + item.label + '</a>',
            '<div class="nav-dropdown">'
        );
        item.dropdown.forEach(function(sub) {
          if (sub.divider) {
            nav.push('<div class="nav-dropdown-divider"></div>');
          } else {
            nav.push('<a href="' + sub.href + '" id="' + sub.id + '">' + sub.label + '</a>');
          }
        });
        nav.push('</div></li>');
      } else {
        nav.push('<li><a href="' + item.href + '" class="nav-link' + activeClass + '" id="' + item.id + '">' + item.label + '</a></li>');
      }
    });

    var altLangCode = isItalian ? 'EN' : 'IT';
    var altLangTitle = isItalian ? 'English Version' : 'Versione Italiana';

    nav.push(
        '</ul>',
        '<div class="nav-actions">',
          '<a href="' + altUrl + '" class="nav-lang" id="nav-lang-toggle" hreflang="' + data.altLangCode + '" title="' + altLangTitle + '">' + altLangCode + '</a>',
          '<a href="' + data.ctaHref + '" class="btn btn-gold btn-sm" id="nav-cta">' + data.ctaText + '</a>',
        '</div>',
        '<button class="nav-toggle" id="nav-toggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="nav-menu">',
          '<span class="hamburger-line"></span>',
          '<span class="hamburger-line"></span>',
          '<span class="hamburger-line"></span>',
        '</button>',
      '</nav>'
    );

    return langBanner.join('\n') + '\n' + nav.join('\n');
  }

  // Generate Footer HTML
  function renderFooter(data) {
    var altUrl = getAlternateLangUrl();
    var certs = ['ISO 9001', 'ISO 13485', 'CE Ready', 'FSSAI', 'GDP Pharma'];

    var html = [
      '<div class="container">',
        '<div class="footer-top">',
          '<div class="footer-grid" id="footer-grid">',
            '<div class="footer-brand" id="footer-brand">',
              '<a href="index.html" class="nav-logo footer-logo" aria-label="RegineLand Group Home">',
                '<span class="logo-main">RegineLand</span>',
                '<span class="logo-tagline">' + data.tagline + '</span>',
              '</a>',
              '<p class="footer-desc">' + data.footerDesc + '</p>',
              '<div class="footer-certifications" aria-label="Certifications">'
    ];

    certs.forEach(function(c) {
      html.push('<span class="footer-cert-badge">' + c + '</span>');
    });

    html.push(
              '</div>',
            '</div>',
            // Col 1: Company
            '<div class="footer-col" id="footer-col-company">',
              '<h4 class="footer-col-title">' + data.colCompany + '</h4>',
              '<nav class="footer-links" aria-label="' + data.colCompany + '">'
    );

    data.companyLinks.forEach(function(l) {
      html.push('<a href="' + l.href + '" id="' + l.id + '">' + l.label + '</a>');
    });

    html.push(
              '</nav>',
            '</div>',
            // Col 2: Sectors
            '<div class="footer-col" id="footer-col-sectors">',
              '<h4 class="footer-col-title">' + data.colSectors + '</h4>',
              '<nav class="footer-links" aria-label="' + data.colSectors + '">'
    );

    data.sectorLinks.forEach(function(l) {
      html.push('<a href="' + l.href + '" id="' + l.id + '">' + l.label + '</a>');
    });

    html.push(
              '</nav>',
            '</div>',
            // Col 3: Offices
            '<div class="footer-col" id="footer-col-offices">',
              '<h4 class="footer-col-title">' + data.colOffices + '</h4>',
              '<nav class="footer-links" aria-label="' + data.colOffices + '">'
    );

    data.officeLinks.forEach(function(l) {
      var flagSvg = l.flag && FLAGS[l.flag] ? FLAGS[l.flag] : '';
      html.push('<a href="' + l.href + '" id="' + l.id + '">' + flagSvg + l.label + '</a>');
    });

    html.push(
              '</nav>',
            '</div>',
            // Col 4: Contact
            '<div class="footer-col" id="footer-col-contact">',
              '<h4 class="footer-col-title">' + data.colContactTitle + '</h4>',
              '<div class="footer-contact-item" id="footer-addr">',
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
                '<span>' + data.contactAddr + '</span>',
              '</div>',
              '<div class="footer-contact-item" id="footer-phone">',
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.07 6.07l.86-.86a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
                '<span><a href="tel:' + data.contactPhone.replace(/\\s+/g, '') + '">' + data.contactPhone + '</a></span>',
              '</div>',
              '<div class="footer-contact-item" id="footer-email">',
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
                '<span><a href="mailto:' + data.contactEmail + '">' + data.contactEmail + '</a></span>',
              '</div>',
              '<a href="' + altUrl + '" style="display:inline-flex; align-items:center; gap:6px; font-size:0.8rem; color:rgba(255,255,255,0.4); margin-top:16px; transition:color 0.2s;" onmouseover="this.style.color=\'#D4B47C\'" onmouseout="this.style.color=\'rgba(255,255,255,0.4)\'" id="footer-lang-alt">' + (isItalian ? FLAGS.uk : FLAGS.it) + data.langSwitchLabel + '</a>',
            '</div>',
          '</div>',
        '</div>',
        // Bottom bar
        '<div class="footer-bottom" id="footer-bottom">',
          '<p class="footer-copy">&copy; <span id="current-year">' + new Date().getFullYear() + '</span> ' + data.legalCopy + '</p>',
          '<nav class="footer-legal" aria-label="Legal links">',
            '<a href="' + data.privacyHref + '" id="footer-privacy">' + data.privacyLabel + '</a>',
            '<a href="' + data.termsHref + '" id="footer-terms">' + data.termsLabel + '</a>',
            '<a href="' + data.complianceHref + '" id="footer-compliance">' + data.complianceLabel + '</a>',
          '</nav>',
        '</div>',
      '</div>'
    );

    return html.join('\n');
  }

  var isMounted = false;

  // Mount components
  function mount() {
    if (isMounted) return;

    var headerEl = document.getElementById('site-header');
    var footerEl = document.getElementById('site-footer');
    if (!headerEl && !footerEl) return;

    isMounted = true;
    var data = CONTENT[lang] || CONTENT.en;

    // Header Mount
    if (headerEl) {
      var isHome = (page === 'home');
      if (isHome) {
        headerEl.className = 'site-header transparent transparent-nav';
        headerEl.setAttribute('data-transparent', 'true');
      } else {
        headerEl.className = 'site-header solid solid-nav';
        headerEl.setAttribute('data-transparent', 'false');
      }
      headerEl.innerHTML = renderHeader(data);
    }

    // Footer Mount
    if (footerEl) {
      footerEl.className = 'site-footer';
      footerEl.setAttribute('role', 'contentinfo');
      footerEl.innerHTML = renderFooter(data);
    }

    // Update current year if span exists
    var yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Attach Mobile Nav Toggle
    var toggle = document.getElementById('nav-toggle');
    var menu   = document.getElementById('nav-menu');
    if (toggle && menu) {
      toggle.onclick = function() {
        var open = menu.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(open));
        var lines = toggle.querySelectorAll('.hamburger-line');
        if (open) {
          if (lines[0]) lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
          if (lines[1]) lines[1].style.opacity   = '0';
          if (lines[2]) lines[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
          lines.forEach(function(l) { l.style.transform = ''; l.style.opacity = ''; });
        }
      };

      menu.querySelectorAll('a').forEach(function(a) {
        a.onclick = function() {
          menu.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
          toggle.querySelectorAll('.hamburger-line').forEach(function(l) {
            l.style.transform = ''; l.style.opacity = '';
          });
        };
      });
    }
  }

  // Mount immediately if elements exist, or on DOM ready
  if (document.getElementById('site-header') || document.getElementById('site-footer')) {
    mount();
  }
  document.addEventListener('DOMContentLoaded', mount);
  window.addEventListener('load', mount);
})();
